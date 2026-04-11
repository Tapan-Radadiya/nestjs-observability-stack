import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('slow-route')
  slowRoute(): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.appService.slowRouteService())
    })
  }

  @Get('error-route')
  errorRoute(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Unable to process the req try after some time" })
  }

  @Get('random-delay')
  async randomDelayRoute(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const delay = Math.floor(Math.random() * 4000)
    await new Promise<void>((resolve) =>
      setTimeout(resolve, delay),
    );
    return res.status(HttpStatus.OK).json({ delay, message: "Req processed" })
  }
}
