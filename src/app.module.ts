import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import configuration from './conf/configuration';

@Module({
  imports: [ConfigModule.forRoot({load: [configuration]}), AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
