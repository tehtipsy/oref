import { Router } from 'express'

import config from '../config.js'
import { getOrefData } from '../controllers/alert.js'
// import { validateRequest } from '../middleware/validateRequest.js'

const alertRouter = Router()

const path = config.alertUri as string
// const secret = config.secret as string ?? ''

alertRouter.get(
  path,
  // validateRequest(secret, 'x-webhook-signature', 'hex'),
  getOrefData
)

export default alertRouter