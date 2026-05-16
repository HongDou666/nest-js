import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import metadata from './metadata';

/**
 * 引导应用程序的主函数
 * @returns {Promise<void>}
 */
async function bootstrap() {
  // 创建应用实例
  const app = await NestFactory.create(AppModule);

  // 创建Swagger配置
  const config = new DocumentBuilder()
    .setTitle('My NestJS App') // 设置标题
    .setDescription('My NestJS App API description') // 设置描述
    .setVersion('1.0') // 设置版本
    .addServer('http://localhost:3000', 'Localhost') // 添加服务器
    .addTag('My NestJS App') // 设置标签
    .build();
  await SwaggerModule.loadPluginMetadata(metadata); // 加载插件元数据 用于生成swagger文档 (要先设置plugins: ["@nestjs/swagger"], typeCheck: true)
  const documentFactory = () => SwaggerModule.createDocument(app, config); // 创建文档
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  }); // 设置API文档路径

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤掉不在DTO中的属性
      forbidNonWhitelisted: true, // 如果请求中包含不在DTO中的属性，则抛出异常
      transform: true, // 自动转换请求中的数据类型
      transformOptions: {
        enableImplicitConversion: true, // 启用隐式类型转换
      },
    }),
  );

  // 监听端口
  await app.listen(process.env.PORT ?? 3000);
}

/**
 * 启动应用程序
 */
void bootstrap();
