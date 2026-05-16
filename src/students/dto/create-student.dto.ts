import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator'; // 类验证器

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
