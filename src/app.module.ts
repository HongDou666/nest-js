import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  providers: [AppService], // 应用程序提供者
})
export class AppModule {}
