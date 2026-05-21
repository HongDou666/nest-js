import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from './constants';

/**
 * 全局认证守卫：所有接口默认需携带 Bearer Token
 * 使用 @Public() 可跳过校验
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 获取所有拦截器中标记为公开的接口
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // 获取当前请求的处理器
      context.getClass(), // 获取当前请求的类
    ]);
    // 如果标记为公开，则直接返回 true
    if (isPublic) {
      return true;
    }

    // 获取当前请求
    const request = context.switchToHttp().getRequest<Request>();
    // 获取请求头中的认证信息
    const authorization = request.headers.authorization;

    // 如果未提供认证信息，则抛出异常
    if (!authorization) {
      throw new UnauthorizedException('未提供认证信息');
    }

    // 分割认证信息
    const [scheme, token] = authorization.split(' ');
    // 如果认证格式无效，则抛出异常
    if (scheme !== 'Bearer' || !token?.trim()) {
      throw new UnauthorizedException(
        '认证格式无效，请使用 Authorization: Bearer <token>',
      );
    }

    // 占位：后续可替换为 JWT 解析、数据库校验等
    request['user'] = { token: token.trim() };

    return true;
  }
}
