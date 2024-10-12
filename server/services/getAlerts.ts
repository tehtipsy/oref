import type { OrefAlertResponse } from "../../types/oref.js"
import config from "../config.js"

export default async function fetchOrefAlerts (): Promise<OrefAlertResponse | undefined> {
  const url = `${config.serverUrl}${config.alertUri}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data as OrefAlertResponse
  } catch (error) {
    throw new Error(error)
  }
}