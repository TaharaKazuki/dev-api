import NodeGeocoder from 'node-geocoder'

type IGeocoderProvider =
  | 'freegeoip'
  | 'datasciencetoolkit'
  | 'locationiq'
  | 'mapquest'
  | 'openmapquest'
  | 'tomtom'
  | 'nominatimmapquest'
  | 'opencage'
  | 'geocodio'
  | 'yandex'
  | 'teleport'
  | 'pickpoint'

const geocoder = NodeGeocoder({
  provider: process.env.GEOCODER_PROVIDER as IGeocoderProvider,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
})

export default geocoder
