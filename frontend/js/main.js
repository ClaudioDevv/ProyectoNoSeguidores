let currentIndex = 0;
const images = document.querySelectorAll('.fotos'); //seleccion los elementos de la clase fotos y los guarda en una lista

function showImage(index) {
    images.forEach((img, i) => {    //bucle que recorre la lista
        img.classList.toggle('active', i === index); // Activa a foto activa la imagen que corresponde al índice actual y las que no corresponden las desactiva
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; // Avanza al siguiente índice
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Retrocede al índice anterior
    showImage(currentIndex);
}

// Mostrar la primera imagen al cargar la página
showImage(currentIndex);


//Api
document.querySelector("#calcularNoSeguidores").addEventListener("click", async function (event) {
    event.stopPropagation();  // Evitar propagación de eventos

    let seguidos = document.getElementById("seguidos").files[0];
    let seguidores = document.getElementById("seguidores").files[0];

    if (!seguidos || !seguidores) {
        alert("Selecciona ambos archivos");
        return;
    }

    let formData = new FormData();
    formData.append("seguidos", seguidos);
    formData.append("seguidores", seguidores);

    console.log("Enviando datos al backend...");
    let response = await fetch("https://api.noseguidores.com/procesar", {
        method: "POST",
        body: formData
    });
    console.log("Respuesta recibida:", response);

    let data = await response.json();

    if (data.error) {
        document.getElementById("output").innerText = "Error: " + data.error;
    } else {
        // Limpiar el contenido anterior del output
        document.getElementById("output").innerHTML = "";

        // Convertir la lista de nombres en un array (separados por \n)
        const nombresArray = data.resultado.split('\n');

        // Crear un div para cada nombre y agregarlo al output
        nombresArray.forEach(nombre => {
            const div = document.createElement('div');
            div.textContent = nombre.trim(); // Eliminar espacios en blanco alrededor del nombre
            document.getElementById("output").appendChild(div);
        });
    }
});

