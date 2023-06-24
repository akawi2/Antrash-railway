import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { HttpError } from '../http/errors';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {

    catch(exception: MongoError, host: ArgumentsHost) {
        Logger.error(exception);
        const response = host.switchToHttp().getResponse();

        switch (exception.code) {
            case 11000:
                response.status(HttpStatus.BAD_REQUEST).json({
                    message: exception.message,
                    code: HttpError.duplicate,
                    details: {
                        fields: Object.keys(exception['keyValue'])
                    },
                })
                break;
            default: response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Wrong data',
                code: HttpError.unknown
            })
        }
    }
}