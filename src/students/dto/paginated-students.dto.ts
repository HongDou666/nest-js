import { Student } from '../entities/student.entity';

/**
 * 分页列表统一返回结构
 */
export interface PaginatedStudentsDto {
  /**
   * 学生列表
   * @type {Student[]}
   */
  items: Student[];
  /**
   * 总条数
   * @type {number}
   */
  total: number;
  /**
   * 页码
   * @type {number}
   */
  page: number;
  /**
   * 每页条数
   * @type {number}
   */
  pageSize: number;
}
