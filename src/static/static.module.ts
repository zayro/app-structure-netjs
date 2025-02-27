import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', '../public'),
          exclude: ['/api*'],
        }),
      ],
      
})
export class StaticModule {}
