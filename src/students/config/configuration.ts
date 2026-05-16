import { registerAs } from '@nestjs/config';

/**
 * 学生模块配置（由 StudentsModule 中 ConfigModule.forFeature 加载）
 */
export default registerAs('students', () => ({
  studentNoPrefix: process.env.STUDENT_NO_PREFIX ?? 'S',
}));
