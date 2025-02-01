import express from 'express'
import jwt from 'jsonwebtoken'
import { model } from './model.js'
import { pick } from 'lodash-es'
const router = express.Router()

router.post('/', async (req, res) => { // 增加
  const data = await model.create(pick(req.body, ['name', 'password']))
  res.status(201).json(data)
  // const token = jwt.sign({ id: data.id }, 'ssjkljl', { expiresIn: '24h' })
  // res.status(201).json({ token })
})

router.delete('/:id', async (req, res) => { // 删除
  const { id } = req.params
  const data = await model.destroy({ where: { id } })
  data ? res.json({ id }) : res.status(404).json({ msg: '用户不存在' })
})

router.put('/:id', async (req, res) => { // 修改
  const { id } = req.params
  const data = await model.findByPk(id)
  if (!data) return res.status(404).json({ msg: '用户不存在' })
  const { name, password } = req.body
  await data.update({ name, password })
  res.json(data)
})

router.get('/:id', async (req, res) => { // 查询
  const { id } = req.params
  const data = await model.findByPk(id)
  res.json(data ?? {})
})

router.get('/', async (req, res) => { // 分页列表查询
  const { limit = 10, offset = 0 } = req.query
  const data = await model.findAndCountAll({
    order: [['id', 'ASC']],
    limit,
    offset,
    attributes: {
      // include: ['deletedAt'] // 可覆盖默认配置
    },
    paranoid: false,
  })
  res.json(data)
})

const use = app => app.use('/api/user', router)
export {
  use
}