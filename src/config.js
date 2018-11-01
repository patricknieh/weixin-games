const env = process.env.NODE_ENV
export default {
  API_HOST: env === 'development' ? '/api/' : '../../'
}
