import { join } from 'path'
import { glob } from 'glob'

// 注册所有路由（读取 router.js app 方法，并执行）
const initRouters = async app => {
  const files = await glob(`${join(import.meta.dirname, '..')}/**/router.js`)
  await Promise.all(files.map(async file => {
    const { use } = await import(file)
    if (use) {
      await use(app)
    }
  }))
}

export {
  initRouters,
}