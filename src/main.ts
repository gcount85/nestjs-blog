import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService); // main.ts에서 환경변수 사용하는 법
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프에 validationPipe 객체 추가
  app.use(cookieParser()); // 쿠키를 Request 객체에서 읽어오는 미들웨어

  // 세션 사용을 위한 설정
  app.use(
    session({
      secret: 'mysecret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // set static files
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000, () => {
    console.log(
      `자 이제 시작이야 nest~ listening on ${configService.get('serviceUrl')}`,
    );
  });
}
bootstrap();
