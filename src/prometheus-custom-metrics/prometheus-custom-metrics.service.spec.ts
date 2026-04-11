import { Test, TestingModule } from '@nestjs/testing';
import { PrometheusCustomMetricsService } from './prometheus-custom-metrics.service';

describe('PrometheusCustomMetricsService', () => {
  let service: PrometheusCustomMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrometheusCustomMetricsService],
    }).compile();

    service = module.get<PrometheusCustomMetricsService>(PrometheusCustomMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
