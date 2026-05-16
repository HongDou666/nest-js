import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * 列表查询（分页 + 简单筛选）
 */
export class QueryStudentDto {
  /**
   * 页码
   * @IsOptional() 可选
   * @Type(() => Number) 类型转换
   * @IsInt() 整数
   * @Min(1) 最小值为1
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  /**
   * 每页条数
   * @IsOptional() 可选
   * @Type(() => Number) 类型转换
   * @IsInt() 整数
   * @Min(1) 最小值为1
   * @Max(100) 最大值为100
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 10;

  /**
   * 关键词
   * @IsOptional() 可选
   * @IsString() 字符串
   */
  @IsOptional()
  @IsString()
  keyword?: string;
}
