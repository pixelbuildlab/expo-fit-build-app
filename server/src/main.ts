import {NestFactory} from '@nestjs/core';
import {ConfigService} from '@nestjs/config';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('HTTP');

  app.enableCors({
    origin: configService.get('cors.origin'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: configService.get('cors.credentials'),
  });

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.use((req, res, next) => {
    const start = Date.now();

    logger.log(`${req.method} ${req.url} - ${req.ip}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.log(
        `${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`,
      );
    });

    next();
  });

  const port = configService.get<number>('port');
  if (!port) {
    throw new Error('Unsafe');
  }
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
