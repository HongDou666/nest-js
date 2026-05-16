import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 应用程序控制器
 */
@Controller()
export class AppController {
  /**
   * 构造函数
   * @param appService 应用程序服务
   */
  constructor(private readonly appService: AppService) {}

  /**
   * 获取Hello World
   * @returns {string} Hello World
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
