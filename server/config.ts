import dotenv from 'dotenv'
dotenv.config()

export default {
  serverPort: process.env.SERVER_PORT,
  serverUrl: process.env.SERVER_URL,
  
  secret: process.env.SOME_SECRET,
  alertUri: '/alert',
  poisUri: '/pois',
  orefPollingRate: parseInt(process.env.OREF_POLLING_RATE ?? '5') * 1000
}