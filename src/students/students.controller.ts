import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { Public } from '../auth/public.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { UsersService } from '../users/users.service';
import { StudentsService } from './students.service';

/**
 * 学生 REST 接口：Controller 仅负责 HTTP 与参数，业务在 Service
 * @Controller('students') 学生控制器
 * @Post() 创建学生
 * @Get() 查询学生列表
 * @Get(':id') 查询学生
 * @Patch(':id') 更新学生
 * @Delete(':id') 删除学生
 */
@Controller('students')
export class StudentsController {
  /**
   * @param studentsService 本模块 providers 注册，与 Controller 同属 StudentsModule
   * @param usersService 跨模块注入：StudentsModule imports UsersModule，且 UsersModule exports UsersService
   */
  constructor(
    private readonly studentsService: StudentsService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * 创建学生
   * @param createStudentDto 创建学生DTO
   * @returns 学生
   */
  @Post() // Post请求
  @HttpCode(HttpStatus.CREATED) // 创建成功状态码
  create(@Body() createStudentDto: CreateStudentDto): Student {
    return this.studentsService.create(createStudentDto);
  }

  /**
   * 查询学生列表（公开，无需认证）
   * @param query 查询学生DTO
   * @returns 学生列表
   */
  @Public()
  @Get() // Get请求
  @HttpCode(HttpStatus.OK) // 查询成功状态码
  findAll(@Query() query: QueryStudentDto) {
    return this.studentsService.findAll(query);
  }

  /**
   * 获取学生详情（公开，无需认证）
   * @param id 学生ID
   * @returns 学生
   */
  @Public()
  @Get(':id') // Get请求
  @HttpCode(HttpStatus.OK) // 查询成功状态码
  findOne(
    @Param('id', ParseUUIDPipe) id: string, // ParseUUIDPipe 校验传入的参数是不是合法的 UUID 格式
    @Res({ passthrough: true }) response: Response, // passthrough: true 允许你操作原生 response（设置状态码、header、cookie 等），同时仍然保留 Nest 的自动 return 响应能力。
  ): Student | void {
    const student = this.studentsService.findById(id);
    if (!student) {
      response.status(HttpStatus.NOT_FOUND).json({
        code: 'STUDENT_NOT_FOUND',
        message: `😯学生不存在: ${id}`,
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      });
      return;
    }
    return student;
  }

  /**
   * 更新学生
   * @param id 学生ID
   * @param updateStudentDto 更新学生DTO
   * @returns 学生
   */
  @Patch(':id') // Patch请求
  @HttpCode(HttpStatus.OK) // 更新成功状态码
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Student {
    return this.studentsService.update(id, updateStudentDto);
  }

  /**
   * 删除学生
   * @param id 学生ID
   * @returns 学生
   */
  @Delete(':id') // Delete请求
  @HttpCode(HttpStatus.NO_CONTENT) // 删除成功状态码
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.studentsService.remove(id);
  }
}
