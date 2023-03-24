import { ArgumentsHost, Catch } from '@nestjs/common';
import { ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const exectionContex = host.switchToHttp();
    const response: Response = exectionContex.getResponse<Response>();
    response.redirect(301, 'http://192.168.1.5:3001/login');
  }
}
