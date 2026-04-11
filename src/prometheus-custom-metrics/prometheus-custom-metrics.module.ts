import { Module } from '@nestjs/common';
import { PrometheusCustomMetricsService } from './prometheus-custom-metrics.service';
import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { PrometheusCustomMetricsInterceptor } from './prometheus-custom-metrics.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    PrometheusCustomMetricsService,
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total Number Of Requests',
      labelNames: ['method', 'route', 'status']
    }),
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: "Life cycle time for a particular req-res",
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.3, 0.5, 1, 2, 5]
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: PrometheusCustomMetricsInterceptor
    }
  ]
})
export class PrometheusCustomMetricsModule { }
