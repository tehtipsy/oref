import type { Request, Response, NextFunction } from 'express'

import { getSignatureString, isSignatureValid } from './signatureValidation.js'

export const validateRequest = (secret: string, headerName: string, encoding: 'base64' | 'hex') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const body = encoding === 'base64' ? req.body as string : JSON.stringify(req.body)
    const signature = req.headers[headerName]
    const signatureString = getSignatureString(signature ?? '')

    if (isSignatureValid(secret, signatureString, body, encoding)) {
      next()
    } else {
      console.log(`Invalid signature for ${headerName} Request`)
      res.status(400).json({ error: 'Invalid signature' })
    }
  }
