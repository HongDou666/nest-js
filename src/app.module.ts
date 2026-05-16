import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';

/**
 * 应用程序模块
 */
@Module({
  imports: [StudentsModule, UsersModule], // 导入学生模块
  controllers: [AppController], // 应用程序控制器
  providers: [AppService], // 应用程序提供者
})
export class AppModule {}
