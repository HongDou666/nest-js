/**
 * 学生性别
 */
export enum StudentGender {
  Male = 'male',
  Female = 'female',
}

/**
 * 学生领域模型（后续可替换为 TypeORM / Prisma 等持久化实体）
 */
export class Student {
  /**
   * 学生ID
   * @type {string}
   */
  id!: string;
  /**
   * 学生姓名
   * @type {string}
   */
  name!: string;
  /**
   * 学生邮箱
   * @type {string}
   */
  email!: string;
  /**
   * 学生学号
   * @type {string}
   */
  studentNo!: string;
  /**
   * 学生性别
   * @type {StudentGender}
   */
  gender!: StudentGender;
  /**
   * 关联用户 ID（可选）
   * @type {number}
   */
  userId?: number;
  /**
   * 创建时间
   * @type {Date}
   */
  createdAt!: Date;
  /**
   * 更新时间
   * @type {Date}
   */
  updatedAt!: Date;
}
