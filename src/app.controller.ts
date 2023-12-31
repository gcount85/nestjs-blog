import { Get, Controller, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  @Render('index')
  getHello(): object {
    return {
      // 환경 별 환경변수 출력
      message: this.configService.get('MESSAGE'), // `envFilePath` 지정으로 기존의 ".env" 파일은 인식 못 함
      serviceUrl: this.configService.get('serviceUrl'),
      logLevel: this.configService.get('logLevel'),
      apiVersion: this.configService.get('apiVersion'),
      dbInfo: this.configService.get('dbInfo'),
    };
  }
}
