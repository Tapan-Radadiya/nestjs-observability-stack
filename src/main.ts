import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 3000
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1')
  await app.listen(port);

  console.log(`Accessible at: http://192.168.1.31:${port}`);
}
bootstrap();
