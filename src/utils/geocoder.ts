import NodeGeocoder from 'node-geocoder'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') })

const geocoder = NodeGeocoder({
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
})

export default geocoder
