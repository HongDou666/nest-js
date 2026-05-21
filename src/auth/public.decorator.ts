import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from './constants';

/**
 * 标记接口为公开，全局 AuthGuard 将跳过认证校验
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
