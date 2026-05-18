import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator'; // 类验证器
import { StudentGender } from '../entities/student.entity';

/**
 * 创建学生请求体
 */
export class CreateStudentDto {
  /**
   * 学生姓名
   * @IsString() 字符串
   * @IsNotEmpty() 不能为空
   * @Length(2, 64) 长度为2-64个字符
   */
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  name!: string;

  /**
   * 学生邮箱
   * @IsEmail() 邮箱
   */
  @IsEmail()
  email!: string;

  /**
   * 学生学号
   * @IsOptional() 可选
   * @IsString() 字符串
   * @Length(4, 32) 长度为4-32个字符
   * @Matches(/^[A-Za-z0-9_-]+$/, { message: '学号仅允许字母、数字、下划线与短横线' }) 学号仅允许字母、数字、下划线与短横线
   */
  @IsOptional() // 可选
  @IsString() // 字符串
  @Length(4, 32) // 长度为4-32个字符
  @Matches(/^[A-Za-z0-9_-]+$/, {
    message: '学号仅允许字母、数字、下划线与短横线',
  })
  studentNo?: string;

  /**
   * 学生性别
   * @IsEnum(StudentGender) 枚举
   */
  @IsEnum(StudentGender, {
    message: `性别必须是: ${Object.values(StudentGender).join(', ')}`,
  })
  gender!: StudentGender; // gender 和 id、name 一样是必填字段，加 ! 是为了和项目里其它实体字段保持一致，并消除 TS 的未初始化检查。如果希望类型上更“可选”，应改成 gender?: StudentGender，但那会和「创建学生必须传性别」的业务不一致。

  /**
   * 关联用户 ID（可选，传入时会通过 UsersService 校验）
   * @IsOptional() 可选
   * @IsInt() 整数
   * @Min(1) 最小值为1
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number;
}
