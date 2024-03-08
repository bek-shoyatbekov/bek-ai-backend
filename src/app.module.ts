import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigsModule } from './configs/configs.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [UsersModule, ConfigsModule, GeminiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
