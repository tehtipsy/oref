import config from "../config.js";
import fetchOrefAlerts from "./getAlerts.js";
import { saveAlert } from "./saveNewPois.js";

export async function makeRequest () {
  const timestamp = new Date()
  try {
    const data = await fetchOrefAlerts();
    console.log(data, timestamp)
    if (data && data !== 'No Alert') {
      // Write Pois to local storage if available
      saveAlert({ data, timestamp })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const intervalId = setInterval(makeRequest, config.orefPollingRate)

export function stopRequests () {
  clearInterval(intervalId)
  return 'Automatic requests stopped'
}

process.on('SIGINT', () => {
  clearInterval(intervalId)
  console.log('Automatic requests stopped. Server shutting down.')
  process.exit()
});