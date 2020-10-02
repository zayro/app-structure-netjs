import { Controller, Get, Post, Res, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { message, token } from '../utils';

@Controller('auth')
export class AuthController {

    constructor(private AuthService: AuthService) { }


    @Get()    
    setLogin(@Res() res, @Query() query, @Param() param): any {
        
        this.AuthService.login(query.username).then(reponse => {

            reponse.token = token(reponse, '12222');
            return res.status(200).send(
                message(true, 'success', reponse )
            );
        }).catch(error => {
            return res.status(500).send({
                success: false,
                message: error
            });
        })
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    getUser(@Res() res, @Query() query, @Param() param): any {
        
        this.AuthService.login(query.username).then(reponse => {
            return res.status(200).send(reponse);
        }).catch(error => {
            return res.status(500).send({
                success: false,
                message: error
            });
        })
    }    

    @Post('/user')
    @UseGuards(AuthGuard)
    SetRegister(@Res() res, @Query() query, @Param() param): any {
        
        this.AuthService.login(query.username).then(reponse => {
            return res.status(200).send(reponse);
        }).catch(error => {
            return res.status(500).send({
                success: false,
                message: error
            });
        })
    }    
    

}
