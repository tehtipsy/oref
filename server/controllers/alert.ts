import type { Request, Response } from 'express'
import { makeRequest, stopRequests } from '../services/getAlertInterval.js'

async function safeJsonFetch (url: string, headers: any): Promise<any> {
  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    if (!text.trim()) {
      // console.log('Empty response received');
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw new Error('Invalid JSON response');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getOrefData (_req: Request, res: Response) {
  const url = 'https://www.oref.org.il/WarningMessages/alert/alerts.json'
  const headers = {
    '$data': 'Array',
    'Referer': 'https://www.oref.org.il',
    'X-Requested-With': 'XMLHttpRequest'
  }

  try {
    const data = await safeJsonFetch(url, { headers })
    res.json(data ? data : 'No Alert')
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}

export async function triggerOrefRequest (_req: Request, res: Response) {
  makeRequest()
  res.send('Request triggered manually')
}

export async function stopOrefRequests (_req: Request, res: Response) {
  const response = stopRequests()
  res.send(response)
}
