import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import LokiTransport from 'winston-loki';
import { PrometheusModule } from "@willsoto/nestjs-prometheus"
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new LokiTransport({
          host: 'http://192.168.1.31:3100',
          labels: {
            app: 'NestJs Observability Stack'
          },
          json: true
        }),
      ]
    }),
    PrometheusModule.register({
      path: '/metrics/logger'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
