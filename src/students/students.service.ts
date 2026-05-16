import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { CreateStudentDto } from './dto/create-student.dto';
import { PaginatedStudentsDto } from './dto/paginated-students.dto';
import { QueryStudentDto } from './dto/query-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

/**
 * 学生业务逻辑（内存存储，后续可替换为仓储层）
 */
@Injectable()
export class StudentsService {
  constructor(private readonly config: ConfigService) {}

  /**
   * 学生列表
   */
  private readonly students = new Map<string, Student>();

  /**
   * 创建学生
   * @param dto 创建学生DTO
   * @returns 学生
   */
  create(dto: CreateStudentDto): Student {
    // 生成学生学号
    const studentNo = dto.studentNo ?? this.generateStudentNo();

    // 检查邮箱是否已存在, 如果邮箱已存在，则抛出冲突异常
    const duplicateEmail = [...this.students.values()].some(
      (s) => s.email.toLowerCase() === dto.email.toLowerCase(),
    );
    if (duplicateEmail) {
      throw new ConflictException('该邮箱已被注册');
    }

    // 检查学号是否已存在, 如果学号已存在，则抛出冲突异常
    const duplicateNo = [...this.students.values()].some(
      (s) => s.studentNo === studentNo,
    );
    if (duplicateNo) {
      throw new ConflictException('学号已存在');
    }

    // 创建学生
    const now = new Date();
    const student: Student = {
      id: randomUUID(), // 生成学生ID
      name: dto.name.trim(), // 学生姓名
      email: dto.email.trim().toLowerCase(), // 学生邮箱
      studentNo, // 学生学号
      createdAt: now, // 创建时间
      updatedAt: now, // 更新时间
    };

    // 将学生添加到学生列表 返回学生
    this.students.set(student.id, student);
    return student;
  }

  /**
   * 查询学生列表
   * @param query 查询学生DTO
   * @returns 学生列表
   */
  findAll(query: QueryStudentDto): PaginatedStudentsDto {
    const page = query.page ?? 1; // 页码
    const pageSize = query.pageSize ?? 10; // 每页条数
    const keyword = query.keyword?.trim().toLowerCase(); // 关键词

    // 获取学生列表 并按创建时间排序
    let list = [...this.students.values()].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    // 如果关键词不为空，则过滤学生列表
    if (keyword) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(keyword) ||
          s.email.includes(keyword) ||
          s.studentNo.toLowerCase().includes(keyword),
      );
    }

    const total = list.length; // 总条数
    const start = (page - 1) * pageSize; // 起始条数
    const items = list.slice(start, start + pageSize); // 分页数据

    return { items, total, page, pageSize };
  }

  /**
   * 按 ID 查询学生（不存在则 undefined，不抛异常；供 Controller 自定义响应等场景）
   * @param id 学生ID
   */
  findById(id: string): Student | undefined {
    return this.students.get(id);
  }

  /**
   * 查询学生
   * @param id 学生ID
   * @returns 学生
   */
  findOne(id: string): Student {
    const student = this.findById(id);
    if (!student) {
      throw new NotFoundException(`学生不存在: ${id}`);
    }
    return student;
  }

  /**
   * 更新学生
   * @param id 学生ID
   * @param dto 更新学生DTO
   * @returns 学生
   */
  update(id: string, dto: UpdateStudentDto): Student {
    // 获取学生
    const existing = this.findOne(id);
    // 如果邮箱不为空，则检查邮箱是否已存在 如果邮箱已存在，则抛出冲突异常
    if (dto.email && dto.email.trim().toLowerCase() !== existing.email) {
      const dup = [...this.students.values()].some(
        (s) =>
          s.id !== id &&
          s.email.toLowerCase() === dto.email!.trim().toLowerCase(),
      );
      if (dup) {
        throw new ConflictException('该邮箱已被注册');
      }
    }

    // 如果学号不为空，则检查学号是否已存在 如果学号已存在，则抛出冲突异常
    const nextNo = dto.studentNo ?? existing.studentNo;
    if (dto.studentNo) {
      const dupNo = [...this.students.values()].some(
        (s) => s.id !== id && s.studentNo === nextNo,
      );
      if (dupNo) {
        throw new ConflictException('学号已存在');
      }
    }

    // 更新学生
    const updated: Student = {
      ...existing, // 老学生数据
      name: dto.name !== undefined ? dto.name.trim() : existing.name,
      email:
        dto.email !== undefined
          ? dto.email.trim().toLowerCase()
          : existing.email,
      studentNo:
        dto.studentNo !== undefined ? dto.studentNo : existing.studentNo,
      updatedAt: new Date(),
    };

    this.students.set(id, updated);
    return updated;
  }

  /**
   * 删除学生
   * @param id 学生ID
   * @returns 学生
   */
  remove(id: string): void {
    // 如果学生不存在，则抛出异常
    if (!this.students.has(id)) {
      throw new NotFoundException(`学生不存在: ${id}`);
    }
    this.students.delete(id);
  }

  /**
   * 生成学生学号
   * @returns 学生学号
   */
  private generateStudentNo(): string {
    const secret = this.config.get<string>('secret', 'zqc');
    const prefix = this.config.get<string>('students.studentNoPrefix', 'S');
    const randomPart = randomUUID()
      .replace(/-/g, '')
      .slice(0, 12)
      .toUpperCase();
    return `${secret}-${prefix}${randomPart}`;
  }
}
