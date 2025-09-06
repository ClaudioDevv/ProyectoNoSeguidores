import express from 'express'
import helmet from 'helmet'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'


import { execFile } from 'node:child_process'
import { corsMiddleware } from './middlewares/cors.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CPP_EXECUTABLE = path.resolve(__dirname, "../cplusplus/noseguidores")

const app = express()
const PORT = process.env.PORT ?? 8080

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 20 * 1024 * 1024  // 20MB por archivo
  }
})


app.use(helmet())
app.use(corsMiddleware())



app.get('/', (req, res) => {
  res.send('API funcionando correctamente')
})

app.post(
  '/procesar', 
  upload.fields([
    { name: "seguidos", maxCount: 1 },
    { name: "seguidores", maxCount: 1 }
  ]),
  (req, res) => {

  const seguidos = req.files.seguidos?.[0]
  const seguidores = req.files.seguidores?.[0]

  if (!seguidos || !seguidores) {
    return res.status(400).json({ error: "Faltan archivos" })
  }

  if(seguidos.originalname != 'following.json' || seguidores.originalname != 'followers_1.json'){
    return res.status(400).json({ error: "Archivos incorrectos" })
  }

  try {
    execFile(CPP_EXECUTABLE, [seguidos.path, seguidores.path], (error, stdout, stderr) => {
      // limpieza
      fs.unlink(seguidos.path, () => {})
      fs.unlink(seguidores.path, () => {})

      if (error) {
        // Capturamos los códigos de salida 1 y 3
        if (error.code === 1) {
          return res.status(400).json({ error: "Número incorrecto de argumentos" })
        } else if (error.code === 3) {
          return res.status(400).json({ error: "Fallo al cargar los archivos" })
        } else {
          return res.status(500).json({ error: "Error inesperado en el servidor" })
        }
      }

      const lista = stdout.trim().split("\n")
      res.json({ resultado: lista })
    })
  
  } catch(e){
    res.status(500).json({error: 'Error inesperado en el servidor'})
  }

})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`)
})
