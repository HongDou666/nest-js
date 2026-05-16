import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import studentsConfiguration from './config/configuration';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

/**
 * 学生模块
 */
@Module({
  imports: [ConfigModule.forFeature(studentsConfiguration)],
  controllers: [StudentsController], // 学生控制器
  providers: [StudentsService], // 学生服务
  exports: [StudentsService], // 学生服务导出
})
export class StudentsModule {}
