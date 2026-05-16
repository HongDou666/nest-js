import { Injectable } from '@nestjs/common';

/**
 * 应用程序服务
 */
@Injectable()
export class AppService {
  /**
   * 获取Hello World
   * @returns {string} Hello World
   */
  getHello(): string {
    return 'Hello NestJS!';
  }
}
