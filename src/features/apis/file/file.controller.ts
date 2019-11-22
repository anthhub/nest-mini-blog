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

function getIPAddress() {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    if (devName) {
      const iface = interfaces[devName]
      for (const alias of iface) {
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          return alias.address
        }
      }
    }
  }
}

const ip = getIPAddress()
console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: ip', ip)
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
    file.url = `${ip}/${file.filename}`
    console.log(file)
    return file
  }
}
