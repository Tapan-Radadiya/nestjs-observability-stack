import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from "prom-client"
@Injectable()
export class PrometheusCustomMetricsService {
    constructor(
        @InjectMetric('http_requests_total') public couter: Counter<string>,
        @InjectMetric('http_request_duration_seconds') public duraction: Histogram<string>
    ) { }

    async recordMetric(method, route, status, duration) {
        if (typeof duration !== 'number') return // validate any random arbitry value as string
        this.couter.inc({
            method,
            route,
            status: status.toString()
        })

        this.duraction.observe({
            method, route, status: status.toString()
        }, duration)
    }
}
