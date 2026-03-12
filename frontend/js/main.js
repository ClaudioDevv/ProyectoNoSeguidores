//Botones y carrusel
document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    const content = document.querySelector(".info-contenido.activo");
    const slides = content.querySelectorAll(".slide");
    const dots = content.querySelectorAll(".dot");
    const prevButton = content.querySelector(".prev");
    const nextButton = content.querySelector(".next");
    const carruselImagenes = content.querySelector(".carrusel-imagenes");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("activo", i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("activo", i === index);
        });
    }

    prevButton.onclick = () => {
        if (currentIndex > 0) currentIndex--;
        showSlide(currentIndex);
    }

    nextButton.onclick = () => {
        if (currentIndex < slides.length - 1) currentIndex++;
        showSlide(currentIndex);
    }

    dots.forEach((dot, index) => {
        dot.onclick = () => {
            currentIndex = index;
            showSlide(currentIndex);
        }
    })

    carruselImagenes.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carruselImagenes.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (isSwiping) return;
        isSwiping = true;
        
        const swipeDistance = touchEndX - touchStartX;
        if (swipeDistance > 50 && currentIndex > 0) {
            currentIndex--;
        } else if (swipeDistance < -50 && currentIndex < slides.length - 1) {
            currentIndex++;
        }

        showSlide(currentIndex);

        setTimeout(() => {
            isSwiping = false;
        }, 300);
    }

    showSlide(currentIndex);
});

//Animacion scroll header
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });
});

//Entrada en la web fade-in
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("show");
        }, index * 200);
    });
});


//Api
document.querySelector("#calcularNoSeguidores").addEventListener("click", async function (event) {
    event.stopPropagation();  // Evitar propagación de eventos
    event.preventDefault()

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
    let response = await fetch("https://proyectonoseguidores.onrender.com/procesar", {
    //let response = await fetch("http://localhost:8080/procesar", {
        method: "POST",
        body: formData
    });
    console.log("Respuesta recibida");

    let data = await response.json();

    if (data.error) {
        let salida = document.getElementById("output")
        salida.className = "error_mode"
        
        let errorMsg = document.createElement("div");
        errorMsg.className = "error-message"; // Corregido: asignación de clase
        errorMsg.innerText = "⚠️ Error: " + data.error;

        salida.innerHTML = "";
        salida.appendChild(errorMsg);

    } else {
        // Limpiar el contenido anterior del output
        const output = document.getElementById("output");
        if(output.classList.contains("error_mode")){
            output.classList.remove("error_mode")
        }
        output.innerHTML = "";

        // data.resultado ya es un array de nombres
        data.resultado.forEach((nombre) => {
            const div = document.createElement("div");
            div.textContent = nombre.trim();
            div.className = "data-item"
            output.appendChild(div);
        });
    }
    // Mostrar la sección de resultados cuando los datos estén listos
    document.getElementById("resultados").style.display = "block";
});

