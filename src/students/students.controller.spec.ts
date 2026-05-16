import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  const mockStudentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [{ provide: StudentsService, useValue: mockStudentsService }],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    const id = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';

    it('学生不存在时应设置 404 并写入定制 JSON', () => {
      mockStudentsService.findById.mockReturnValue(undefined);
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const result = controller.findOne(id, response);

      expect(result).toBeUndefined();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(response.json).toHaveBeenCalledWith({
        code: 'STUDENT_NOT_FOUND',
        message: `学生不存在: ${id}`,
      });
    });

    it('学生存在时应返回学生且不调用 status/json', () => {
      const student = {
        id,
        name: '张三',
        email: 'a@b.com',
        studentNo: 'S001',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockStudentsService.findById.mockReturnValue(student);
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const result = controller.findOne(id, response);

      expect(result).toEqual(student);
      expect(response.status).not.toHaveBeenCalled();
      expect(response.json).not.toHaveBeenCalled();
    });
  });
});
