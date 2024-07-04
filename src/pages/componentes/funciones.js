let imagenIndex = 0;
const imagenes = ["/ImagenesPaginaPrincipal/Verde1.jpg", "/ImagenesPaginaPrincipal/Verde2.jpg"]; // Agrega las rutas de tus imágenes aquí

export function cambiarImagen(delta) {
    imagenIndex += delta;
    if (imagenIndex < 0) {
        imagenIndex = imagenes.length - 1;
    } else if (imagenIndex >= imagenes.length) {
        imagenIndex = 0;
    }
    const imagen = document.querySelector('.imagenes img');
    imagen.src = imagenes[imagenIndex];
}

  export function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });


  }

export function mostrarTestimonios(testimonios) {
    const contenedorTestimonios = document.getElementById('contenedor-testimonios');
    const navegacionTestimonios = document.querySelector('.navegacion-testimonios');

    testimonios.forEach((testimonio, index) => {
        const testimonioDiv = document.createElement('div');
        testimonioDiv.classList.add('testimonio');

        const imagenTestimonio = document.createElement('img');
        imagenTestimonio.src = testimonio.foto;
        imagenTestimonio.alt = 'Foto del testimonio';

        const parrafoTestimonio = document.createElement('p');
        parrafoTestimonio.textContent = testimonio.opinion;

        testimonioDiv.appendChild(imagenTestimonio);
        testimonioDiv.appendChild(parrafoTestimonio);

        contenedorTestimonios.appendChild(testimonioDiv);

        const botonNavegacion = document.createElement('button');
        botonNavegacion.classList.add('circulo');
        botonNavegacion.addEventListener('click', () => mostrarTestimonio(index));
        navegacionTestimonios.appendChild(botonNavegacion);
    });

    function mostrarTestimonio(index) {
        const testimonios = document.querySelectorAll('.testimonio');
        testimonios.forEach(testimonio => testimonio.style.display = 'none');
        testimonios[index].style.display = 'block';
        const circulos = document.querySelectorAll('.circulo');
        circulos.forEach(circulo => circulo.classList.remove('activo'));
        circulos[index].classList.add('activo');
    }

    mostrarTestimonio(0);
}