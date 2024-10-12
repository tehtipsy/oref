import type { OrefAlert } from '../../types/oref.d.ts';
import fs from 'fs'

export function saveAlert (alert: { timestamp: Date, data: OrefAlert }) {
  const fileName = alert.data.id
  fs.writeFileSync(`${fileName}.data.json`, JSON.stringify(alert));
  savePois(alert)
}

export function savePois (update: { timestamp: Date, data: OrefAlert } ) {
  const fileName = 'pois.data.json'

  // Read the existing JSON file
  const rawData = fs.readFileSync(fileName, 'utf-8');
  const jsonData = JSON.parse(rawData);
  const newAlerts = update.data.data.map((poi) => {
    return {
      name: poi,
      timestamp: `${update.timestamp.toLocaleTimeString()} - ${update.timestamp.toLocaleDateString() }`,
      cat: update.data.cat,
      desc: update.data.desc,
      id: update.data.id,
      title: update.data.title
    }
  }).filter((poi) => {
    const existing = jsonData.pois.find(i => i.name === poi.name && i.id === poi.id)
    return !existing
  })

  jsonData.pois.push(...newAlerts);

  const updatedData = JSON.stringify(jsonData, null, 2);

  fs.writeFileSync(fileName, updatedData);

  console.log('New object added successfully!')
}