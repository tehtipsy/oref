import type { Request, Response } from 'express'
import fs from 'fs'

export async function getPois (_req: Request, res: Response) {
  const fileName = 'pois.data.json'
  try {
    const data = fs.readFileSync(fileName, 'utf8')
    res.json(JSON.parse(data).pois)
  } catch (error) {
    console.error(error)
  }
}

export async function getCoors (_req: Request, res: Response) {
  const fileName = 'coors.data.json'
  try {
    const data = fs.readFileSync(fileName, 'utf8')
    res.json(JSON.parse(data).coors)
  } catch (error) {
    console.error(error)
  }
}