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
  Response,
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
import * as path from 'path'

import { IUserRequest } from '../../interfaces/auth.interface'

import multer = require('multer')

const location = path.join(process.cwd(), '/static')

const base =
  process.env.NODE_ENV === 'production'
    ? `http://njj.liuma.top`
    : `http://localhost:8000`

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
          cb(null, location)
        },
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')
          cb(null, `image-${Date.now()}.${name[1]}`)
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Req() req: IUserRequest) {
    file.url = `${base}/${file.filename}`

    console.log(file)
    return file
  }

  @Get('download/:filename')
  @ApiOperation({ title: '下载图片' })
  getFile(@Param('filename') filename: string, @Res() resp) {
    const uri = path.join(location, '/', filename)
    console.log('uriuriuriuriuriuriuri', uri)
    resp.setHeader('Content-Type', 'image/jpg')
    return fs.createReadStream(uri).pipe(resp)
  }
}
