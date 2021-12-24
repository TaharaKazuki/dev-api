import NodeGeocoder from 'node-geocoder'

const geocoder = NodeGeocoder({
  provider: 'google',
  httpAdapter: 'https',
  apiKey: '',
  formatter: null,
})

export default geocoder
