import express from 'express'
import { AUTH_COOKIE_NAME, COOKIE_PREFIX } from 'Config'

// (安全实施) 服务端储存 token cookie 设置成httpOnly
export default () => {
  const router = express.Router()

  router.post('/in', (req, res) => {
    const userid = req.body.userid
    res.cookie(`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`, userid, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.cookie(`plain_user_auth`, userid, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.send({ success: true })
  })

  router.post('/out', (req, res) => {
    res.clearCookie(`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`)
    res.send({ success: true })
  })

  return router
}
