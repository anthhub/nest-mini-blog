import {
  Controller,
  Post,
  Req,
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

import { IUserRequest } from '../../interfaces/auth.interface'

import multer = require('multer')
import * as os from 'os'

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
          cb(null, './upload/')
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
        ? `http://${'localhost:3003'}/${file.filename}`
        : `${'http://101.132.79.152'}/${file.filename}`

    console.log(file)
    return file
  }
}
