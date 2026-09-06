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

// --- 2. LÓGICA DE LAS CARTAS (Diseño de Autor) ---
const textosFamilia = {
    'alonso': { 
        titulo: "De: Diego", 
        cuerpo: "Feliz cumpleaños mamá.\n\nEres la mejor del mundo y quería hacerte este detalle para que lo tengas siempre en tu celular.",
        cancion: "cancion-alonso.mp3" 
    },
    'hermana': { 
        titulo: "De: Flo", 
        cuerpo: "Escribe aquí el mensaje de tu hermana...",
        cancion: "cancion-hermana.mp3" 
    },
    'hermano': { 
        titulo: "De: Emi", 
        cuerpo: "Escribe aquí el mensaje de tu hermano...",
        cancion: "cancion-hermano.mp3" 
    },
    'papa': { 
        titulo: "De: Amor", 
        cuerpo: "Escribe aquí el mensaje de tu papá...",
        cancion: "cancion-papa.mp3" 
    }
};

// --- MAQUINITA PARA EL EFECTO FADE DE AUDIO ---
function desvanecerVolumen(audio, accion) {
    let volumen = accion === 'subir' ? 0 : 1;
    audio.volume = volumen; // Aseguramos que empiece en 0 o 1
    
    if (accion === 'subir') {
        audio.play();
    }

    let fade = setInterval(() => {
        if (accion === 'subir') {
            volumen += 0.05; // Sube el volumen un 5%
            if (volumen >= 1) {
                audio.volume = 1;
                clearInterval(fade); // Detiene la maquinita
            } else {
                audio.volume = Math.min(1, volumen); // Por seguridad, nunca pasa de 1
            }
        } else {
            volumen -= 0.05; // Baja el volumen un 5%
            if (volumen <= 0) {
                audio.volume = 0;
                audio.pause(); // Pausa la canción cuando llega a cero
                clearInterval(fade); // Detiene la maquinita
            } else {
                audio.volume = Math.max(0, volumen); // Por seguridad, nunca baja de 0
            }
        }
    }, 40); // Esto hace que el cambio tarde unos 800 milisegundos en total (súper suave)
}

// --- NUEVAS FUNCIONES DE LAS CARTAS ---
const modalCarta = document.getElementById('modal-carta');
const tituloRemitente = document.getElementById('remitente-carta');
const textoCarta = document.getElementById('texto-carta');
const musicaCarta = document.getElementById('musica-carta');
const musicaFondo = document.getElementById('musica-fondo');

function abrirCarta(autor) {
    // 1. Mostrar la carta visualmente de inmediato
    tituloRemitente.textContent = textosFamilia[autor].titulo;
    textoCarta.textContent = textosFamilia[autor].cuerpo;
    modalCarta.classList.remove('modal-oculto');

    // 2. Magia de audio cruzado: baja el fondo y sube la carta
    desvanecerVolumen(musicaFondo, 'bajar');
    
    musicaCarta.src = textosFamilia[autor].cancion;
    desvanecerVolumen(musicaCarta, 'subir');
}

function cerrarCarta() {
    // 1. Ocultar la carta
    modalCarta.classList.add('modal-oculto');
    
    // 2. Magia de audio cruzado inverso: baja la carta y sube el fondo
    desvanecerVolumen(musicaCarta, 'bajar');
    desvanecerVolumen(musicaFondo, 'subir');
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
