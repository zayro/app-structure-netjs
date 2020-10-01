import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard}  from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private  AuthService: AuthService) {}

    
    @Get()
    @UseGuards(AuthGuard)
    getData(): any {
      return this.AuthService.select()
    }

}
