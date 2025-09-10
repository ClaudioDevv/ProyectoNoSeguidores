import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'https://noseguidores.com',
  'https://proyecto-no-seguidores-claudiodevvs-projects.vercel.app',
  'https://proyecto-no-seguidores-95etwd3yv-claudiodevvs-projects.vercel.app',
  //'http://192.168.1.109:46725',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})