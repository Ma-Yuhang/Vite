export default function getEnv(envConfig: Record<string, any>): EnvConfig {
  const envObj: any = {}
  for (const [key, value] of Object.entries(envConfig)) {
    envObj[key] = value === 'true' ? true : value === 'false' ? false : value
    // 处理端口为数字的情况
    if (value === 'VITE_PORT') {
      envObj[key] === Number(value)
    }
  }
  return envObj
}
