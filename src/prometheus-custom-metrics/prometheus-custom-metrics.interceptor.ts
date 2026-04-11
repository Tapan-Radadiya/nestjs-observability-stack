import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrometheusCustomMetricsService } from './prometheus-custom-metrics.service';

@Injectable()
export class PrometheusCustomMetricsInterceptor implements NestInterceptor {
  constructor(
    private readonly prometheusService: PrometheusCustomMetricsService
  ) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const httpContext = context.switchToHttp()

    const req = httpContext.getRequest()
    const res = httpContext.getResponse()

    const { method, url, route: { path } } = req
    const reqStartTime = Date.now()

    return next
      .handle()
      .pipe(
        tap(async () => {
          const reqResTime = (Date.now() - reqStartTime) / 1000
          const status = res.statusCode
          await this.prometheusService.recordMetric(method, path, status, reqResTime)
        }));
  }
}
