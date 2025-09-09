# NoSeguidores

![logo](/frontend/images/followers.jpg)

## Qué es NoSeguidores?
NoSeguidores es una herramienta que se utiliza para resolver una cuestión que todos hemos querido saber alguna vez: ver las personas que no nos siguen en Instagram.

Es 100% **seguro** ya que tus datos nunca salen de tu dispositivo hacia servidores externos de Instagram. Solo envías los archivos JSON que tú mismo descargas.

### Características
- Interfaz moderna y diseño responsive
- Máxima seguridad: Procesamiento local de los datos
- Alto Rendimiento: Motor de procesamiento en C++
- Sin registros ni contraseñas
- Gratuito y Open Source

## Cómo usar NoSeguidores?
La forma de utilizar esta herramienta es bien sencilla:
1. Accede a la web [noseguidores.com](https://noseguidores.com)
2. Sigue las instrucciones explicadas paso a paso de cómo conseguir los archivos desde Instagram para garantizar máxima seguridad
3. Introduce los archivos en el formulario requerido
4. La web mostrará los resultados

## Demo
![Video demostración](/frontend/images/screenshots/demovideo.webm)

## Explicación a Alto Nivel
1. El usuario sube los archivos descargados de Instagram (`followers.json` y `following.json`).  
2. El backend recibe los archivos y ejecuta un binario en **C++** (para obtener el máximo rendimiento).  
3. El programa compara los conjuntos de seguidos y seguidores, devolviendo la lista de personas a las que sigues pero que no te siguen de vuelta.  
4. El backend envía los resultados al frontend.  
5. El frontend los muestra en una interfaz moderna y fácil de usar.

## Stack tecnológico
- Para el despliegue del frontend utilizamos Vercel
- Para el despliegue del backend usamos Render junto a UptimeRobot para mandar peticiones cada 5 minutos y el servidor no se "duerma"
- El frontend está hecho en HTML, CSS y JS vanilla
- El backend está construido en Node y express
- El programa binario está hecho en C++
- HTTPS habilitado

### Cómo ejecutarlo en local?
1. Clona el respositorio
2. Instalar dependencias del backend
    pnpm install
3. Inicia el servidor desde la carpeta de backend
    npm run dev 
4. Inicia el frontend
    npx servor ./frontend
5. Añade los archivos al formulario

### Estado del proyecto
**Estadísticas actuales (Septiembre 2025)**
Desplegado y funcionando en producción
Múltiples usuarios verificados por Google Analytics
Promocionado en redes sociales

### Licencia
Este proyecto está bajo la Licencia MIT

### Autor
Claudio Rivas, estudiante de Ingeniería Informática en la Universidad de Granada