import * as path from 'path'

import {
  Controller,
  Post,
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
  uploadFile(@UploadedFile() file) {
    console.log(file)
    file.url = path.basename(file.path)
    return file
  }
}
