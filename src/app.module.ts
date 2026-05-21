import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

/**
 * 应用程序模块
 */
@Module({
  imports: [
    // ConfigModule.forRoot：配置模块
    ConfigModule.forRoot({
      isGlobal: true, // 全局配置
      envFilePath: '.env', // 环境变量文件
      load: [configuration], // 加载配置
    }),
    StudentsModule, // 学生模块
    UsersModule, // 用户模块
  ],
  controllers: [AppController], // 应用程序控制器
  // 应用程序提供者
  providers: [
    AppService, // 应用程序服务
    {
      provide: APP_GUARD, // 全局守卫
      useClass: AuthGuard, // 使用AuthGuard守卫
    },
  ],
})
export class AppModule {}
