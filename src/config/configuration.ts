/**
 * 应用级配置（由 ConfigModule.forRoot 的 load 加载）
 */
export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  secret: process.env.SECRET ?? 'zqc',
});
