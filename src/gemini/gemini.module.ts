import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { ConfigsModule } from 'src/configs/configs.module';
import { GeminiController } from './gemini.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigsModule,
    HttpModule.register({
      timeout: 50000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class GeminiModule {}
