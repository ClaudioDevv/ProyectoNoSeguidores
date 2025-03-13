from flask import Flask, request, jsonify
import subprocess
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CPP_EXECUTABLE = os.path.abspath("cplusplus/tu_programa")

# Permitir CORS (para que la web pueda comunicarse con la API)
CORS(app, origins=["https://noseguidores.com", "https://api.noseguidores.com"])

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
@cross_origin()
def procesar():
    if 'seguidos' not in request.files or 'seguidores' not in request.files:
        print("Archivos no recibidos")  # depurar
        return jsonify({"error": "Faltan archivos"}), 400

    print("Archivos recibidos: seguidos, seguidores")  # depurar
    seguidos = request.files['seguidos']
    seguidores = request.files['seguidores']

    seguidos_path = os.path.join(UPLOAD_FOLDER, "seguidos.json")
    seguidores_path = os.path.join(UPLOAD_FOLDER, "seguidores.json")

    seguidos.save(seguidos_path)
    seguidores.save(seguidores_path)

    try:
        # Ejecutamos el programa en C++
        resultado = subprocess.run(
            [CPP_EXECUTABLE, seguidos_path, seguidores_path],
            capture_output=True, text=True
        )
        print("Salida de error:", resultado.stderr)  # Depurar errores

        if resultado.returncode != 0:
            return jsonify({"error": "Error al ejecutar el programa"}), 500

        return jsonify({"resultado": resultado.stdout.strip()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)

