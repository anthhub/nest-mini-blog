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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './upload/')
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname.replace('.', `-${Date.now()}.`))
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Req() req: IUserRequest) {
    file.url = `${'http://101.132.79.152'}/${file.filename}`
    console.log(file)
    return file
  }
}
