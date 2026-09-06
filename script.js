// --- 1. LÓGICA DE LA PANTALLA DE CARGA ---
const corazon = document.getElementById('corazon');
const barraProgreso = document.getElementById('barra-progreso');
const mensajeCarga = document.getElementById('mensaje-carga');
const pantallaCarga = document.getElementById('pantalla-carga');
const contenidoPrincipal = document.getElementById('contenido-principal');
const musicaFondo = document.getElementById('musica-fondo'); // Seleccionamos el audio

let progreso = 0;
const incremento = 20;
const mensajes = ["Toca el corazón", "Siente el amor...", "Un poco más...", "Casi listo...", "¡Una última vez!"];
let musicaIniciada = false; // Variable para saber si la música ya empezó

corazon.addEventListener('click', () => {
    // Si es el primer toque, empieza a reproducir la música
    if (!musicaIniciada) {
        musicaFondo.play();
        musicaIniciada = true;
    }

    if (progreso < 100) {
        progreso += incremento;
        barraProgreso.style.width = `${progreso}%`;

        let indiceMensaje = Math.floor(progreso / 25); 
        if (indiceMensaje < mensajes.length) {
            mensajeCarga.textContent = mensajes[indiceMensaje];
        }

        if (progreso >= 100) {
            mensajeCarga.textContent = "Hecho con amor";
            setTimeout(() => {
                pantallaCarga.style.opacity = '0';
                setTimeout(() => {
                    pantallaCarga.style.display = 'none';
                    contenidoPrincipal.classList.remove('oculto');
                }, 800);
            }, 500);
        }
    }
});

//Logica de las cartas
const textosFamilia = {
    'alonso': { titulo: "De: Diego", cuerpo: "Feliz cumpleaños mamá.\n\nEres la mejor del mundo y quería hacerte este detalle para que lo tengas siempre en tu celular." },
    'hermana': { titulo: "De: Flo", cuerpo: "Escribe aquí el mensaje de tu hermana..." },
    'hermano': { titulo: "De: Emi", cuerpo: "Escribe aquí el mensaje de tu hermano..." },
    'papa': { titulo: "De: Cristian", cuerpo: "Escribe aquí el mensaje de tu papá..." }
};

const modalCarta = document.getElementById('modal-carta');
const tituloRemitente = document.getElementById('remitente-carta');
const textoCarta = document.getElementById('texto-carta');

function abrirCarta(autor) {
    tituloRemitente.textContent = textosFamilia[autor].titulo;
    textoCarta.textContent = textosFamilia[autor].cuerpo;
    modalCarta.classList.remove('modal-oculto');
}

function cerrarCarta() {
    modalCarta.classList.add('modal-oculto');
}

//Logica de los puntitos del carrusel
const carrusel = document.getElementById('carrusel');
const puntos = document.querySelectorAll('.punto');

//Detecta qué foto está en el centro de la pantalla
carrusel.addEventListener('scroll', () => {
    //Calcula el índice de la foto actual dividiendo el scroll por el ancho del carrusel
    let index = Math.round(carrusel.scrollLeft / carrusel.clientWidth);
    
    //Remueve la clase 'activo' de todos los puntos
    puntos.forEach(punto => punto.classList.remove('activo'));
    
    //Se la añade solo al punto de la foto actual
    if(puntos[index]) {
        puntos[index].classList.add('activo');
    }
});
