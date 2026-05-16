// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

/**
 * 更新学生：所有字段可选，校验规则与创建一致
 * @PartialType(CreateStudentDto) 部分类型
 */
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
