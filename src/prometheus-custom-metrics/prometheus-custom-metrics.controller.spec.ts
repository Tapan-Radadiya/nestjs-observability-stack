import { Test, TestingModule } from '@nestjs/testing';
import { PrometheusCustomMetricsController } from './prometheus-custom-metrics.controller';

describe('PrometheusCustomMetricsController', () => {
  let controller: PrometheusCustomMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrometheusCustomMetricsController],
    }).compile();

    controller = module.get<PrometheusCustomMetricsController>(PrometheusCustomMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
