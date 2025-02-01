import { glob } from 'glob'

const initRoutes = async app => {
  const files = await glob(`${import.meta.dirname}/**/*.js`)
  await Promise.all(files.map(async file => {
    const { use } = await import(file)
    if (use) {
      await use(app)
    }
  }))
}

export {
  initRoutes,
}