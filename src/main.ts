import helmet from 'helmet';


import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { SwaggerConfiguration } from './core/config/swagger';
import { MongoExceptionFilter } from './core/config/mongoose-exception.filter';

async function bootstrap() {
  // TODO: add interceptor to remove fields (password from user)
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter())

  SwaggerConfiguration.setup(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
