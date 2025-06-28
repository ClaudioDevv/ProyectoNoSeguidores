from flask import Flask, request, jsonify
import subprocess
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CPP_EXECUTABLE = os.path.abspath("cplusplus/noseguidores")

# Permitir CORS (para que la web pueda comunicarse con la API). No olvidar cambiar la dirección local
CORS(app, origins=[
    "https://noseguidores.com",
    "https://api.noseguidores.com",
    "https://proyectonoseguidores.onrender.com",
    "https://proyecto-no-seguidores-claudiodevvs-projects.vercel.app",
    "https://proyecto-no-seguidores-95etwd3yv-claudiodevvs-projects.vercel.app"
])


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.after_request
def aplicar_headers(response):
    # Agregar headers de seguridad
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

    # Validar nombres de archivos
    if seguidos.filename != "following.json" or seguidores.filename != "followers_1.json":
        return jsonify({"error": "Los archivos deben llamarse 'following.json' y 'followers_1.json'."}), 400

    seguidos_path = os.path.join(UPLOAD_FOLDER, "following.json")
    seguidores_path = os.path.join(UPLOAD_FOLDER, "followers_1.json")

    seguidos.save(seguidos_path)
    seguidores.save(seguidores_path)

    try:
        # Ejecutar el programa en C++
        resultado = subprocess.run(
            [CPP_EXECUTABLE, seguidos_path, seguidores_path],
            capture_output=True, text=True
        )

        # Manejar códigos de retorno
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

        # Si todo va bien, devolver el resultado
        return jsonify({"resultado": resultado.stdout.strip()})

    except Exception as e:
        return jsonify({"error": "Error interno del servidor."}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)

