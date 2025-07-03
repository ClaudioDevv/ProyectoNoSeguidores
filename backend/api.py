from flask import Flask, request, jsonify
import subprocess
import os
import uuid
import json
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "https://noseguidores.com",
    "https://api.noseguidores.com",
    "https://proyectonoseguidores.onrender.com",
    "https://proyecto-no-seguidores-claudiodevvs-projects.vercel.app",
    "https://proyecto-no-seguidores-95etwd3yv-claudiodevvs-projects.vercel.app"
])

# Ruta al ejecutable C++
CPP_EXECUTABLE = os.getenv("CPP_EXECUTABLE", os.path.abspath("cplusplus/noseguidores"))

# Carpeta donde guardar los archivos temporalmente
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configuración del logging (para producción)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.after_request
def aplicar_headers(response):
    response.headers['Content-Security-Policy'] = "default-src 'self' https://noseguidores.com"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'no-referrer'
    response.headers['Permissions-Policy'] = 'geolocation=(), microphone=()'
    return response

@app.route('/', methods=['GET'])
def home():
    return "API funcionando correctamente", 200

@app.route('/procesar', methods=['POST'])
def procesar():
    if 'seguidos' not in request.files or 'seguidores' not in request.files:
        return jsonify({"error": "Faltan archivos"}), 400

    seguidos = request.files['seguidos']
    seguidores = request.files['seguidores']

    # Validar nombres de archivo (opcional, pero puede ayudar)
    if seguidos.filename != "following.json" or seguidores.filename != "followers_1.json":
        return jsonify({"error": "Los archivos deben llamarse 'following.json' y 'followers_1.json'."}), 400

    # Validar contenido JSON
    try:
        json.load(seguidos.stream)
        seguidos.stream.seek(0)  # Volver al inicio del archivo
    except json.JSONDecodeError:
        return jsonify({"error": "El archivo 'following.json' no es un JSON válido."}), 400

    try:
        json.load(seguidores.stream)
        seguidores.stream.seek(0)
    except json.JSONDecodeError:
        return jsonify({"error": "El archivo 'followers_1.json' no es un JSON válido."}), 400

    # Crear nombre único para los archivos (usuarios concurrentes)
    uid = str(uuid.uuid4())
    seguidos_path = os.path.join(UPLOAD_FOLDER, f"{uid}_following.json")
    seguidores_path = os.path.join(UPLOAD_FOLDER, f"{uid}_followers.json")

    try:
        seguidos.save(seguidos_path)
        seguidores.save(seguidores_path)

        # Ejecutar programa C++
        resultado = subprocess.run(
            [CPP_EXECUTABLE, seguidos_path, seguidores_path],
            capture_output=True, text=True
        )

        if resultado.returncode == 1:
            return jsonify({"error": "Error: Número incorrecto de argumentos."}), 400
        elif resultado.returncode == 2:
            return jsonify({"error": "Error: Los archivos no tienen los nombres esperados."}), 400
        elif resultado.returncode == 3:
            return jsonify({"error": "Error: No se pudieron cargar los archivos."}), 500
        elif resultado.returncode == 4:
            return jsonify({"error": "Error interno del servidor."}), 500
        elif resultado.returncode != 0:
            return jsonify({"error": "Error desconocido al ejecutar el programa."}), 500

        # Éxito: se devuelve el resultado como lista JSON
        lista = resultado.stdout.strip().split('\n')
        return jsonify({"resultado": lista})

    except Exception as e:
        logger.error(f"Error al procesar archivos: {e}")
        return jsonify({"error": "Error interno del servidor."}), 500

    finally:
        # Eliminar archivos temporales
        if os.path.exists(seguidos_path):
            os.remove(seguidos_path)
        if os.path.exists(seguidores_path):
            os.remove(seguidores_path)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=False)
