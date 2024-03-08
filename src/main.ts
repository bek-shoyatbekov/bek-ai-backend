import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  await app.listen(config.get('APP_PORT'));

  app.enableCors();
}
bootstrap().then(() => {
  console.log('App started on port ' + process.env.APP_PORT);
});
