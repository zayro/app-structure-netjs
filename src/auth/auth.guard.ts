import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {checkToken} from '../utils'

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request) {
            if (!request.headers.authorization) {
                return false;
            }

            const auth = request.headers.authorization;


            if (auth.split(' ')[0] !== 'Bearer') {
                throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            }
            const token = auth.split(' ')[1];

            //const response =  await this.validateToken(request.headers.authorization);
            return true;
        }
    }

    async validateToken(token: string) {


        try {
            const decoded: any = await jwt.verify(token, process.env.SECRET);

            return decoded;
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}