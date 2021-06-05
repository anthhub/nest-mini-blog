import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitBody,
  ApiImplicitFile,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'
import * as fs from 'fs'

import { IUserRequest } from '../../interfaces/auth.interface'

import multer = require('multer')

@ApiUseTags('file')
@ApiBearerAuth()
@Controller('file')
@UseGuards(AuthGuard('jwt'))
export class FileController {
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'img',
  })
  @Post('upload')
  @ApiOperation({ title: '上传图片' })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5242880,
      },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, '../../static')
        },
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')
          cb(null, `image-${Date.now()}.${name[1]}`)
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Req() req: IUserRequest) {
    file.url =
      process.env.API_ENV === 'development'
        ? `http://${'localhost:8000'}/${file.filename}`
        : `njj.liuma.top/${file.filename}`

    console.log(file)
    return file
  }

  @Get('upload/:filename')
  @ApiOperation({ title: '下载图片' })
  getFile(@Param('filename') filename: string, @Res() resp) {
    return fs.createWriteStream('../../static/' + filename).pipe(resp)

    // return new Promise((resolve, reject) => {
    //   fs.readFile(filename, (err, data) => {
    //     if (err) {
    //       console.error(err)
    //       reject(err)
    //       return
    //     }

    //     const stream = fs.createWriteStream('../../../static/' + filename)
    //     var responseData = [] //存储文件流
    //     if (stream) {
    //       //判断状态
    //       stream.on('data', function(chunk) {
    //         responseData.push(chunk)
    //       })
    //       stream.on('end', function() {
    //         var finalData = Buffer.concat(responseData)
    //         resp.write(finalData)
    //         resp.end()
    //       })
    //     }
    //   })
    // })
  }
}
