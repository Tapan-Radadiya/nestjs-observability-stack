import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  slowRouteService(): Promise<string> {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Request Completed Successfully')
      }, 5000)
    })
  }
}
