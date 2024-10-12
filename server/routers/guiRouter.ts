import { Router } from 'express'

import config from '../config.js'
import { getCoors, getPois } from '../controllers/gui.js'
// import { validateRequest } from '../middleware/validateRequest.js'

const poisRouter = Router()

const path = config.poisUri as string
// const secret = config.secret as string ?? ''

poisRouter.get(
  path,
  // validateRequest(secret, 'x-webhook-signature', 'hex'),
  getPois
)

poisRouter.get(
  '/coors',
  // validateRequest(secret, 'x-webhook-signature', 'hex'),
  getCoors
)

export default poisRouter