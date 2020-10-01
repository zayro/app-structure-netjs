import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'secret12356789',
      signOptions: { expiresIn: '60s' }
  })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
