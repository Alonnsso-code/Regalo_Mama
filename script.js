// --- 1. LÓGICA DE LA PANTALLA DE CARGA Y MÚSICA INICIAL ---
const corazon = document.getElementById('corazon');
const barraProgreso = document.getElementById('barra-progreso');
const mensajeCarga = document.getElementById('mensaje-carga');
const pantallaCarga = document.getElementById('pantalla-carga');
const contenidoPrincipal = document.getElementById('contenido-principal');

// Variables de audio
const musicaFondo = document.getElementById('musica-fondo');
const musicaCarta = document.getElementById('musica-carta');

let progreso = 0;
const incremento = 20;
const mensajes = ["Toca el corazón", "Siente el amor...", "Un poco más...", "Casi listo...", "¡Una última vez!"];
let musicaIniciada = false;

corazon.addEventListener('click', () => {
    // Al primer clic, inicia la música de fondo
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

// --- 2. BASE DE DATOS DE LAS CARTAS Y CANCIONES ---
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

// --- 3. MAQUINITA PARA EL EFECTO FADE DE AUDIO ---
function desvanecerVolumen(audio, accion) {
    let volumen = accion === 'subir' ? 0 : 1;
    audio.volume = volumen; 
    
    if (accion === 'subir') {
        audio.play();
    }

    let fade = setInterval(() => {
        if (accion === 'subir') {
            volumen += 0.05; 
            if (volumen >= 1) {
                audio.volume = 1;
                clearInterval(fade); 
            } else {
                audio.volume = Math.min(1, volumen); 
            }
        } else {
            volumen -= 0.05; 
            if (volumen <= 0) {
                audio.volume = 0;
                audio.pause(); 
                clearInterval(fade); 
            } else {
                audio.volume = Math.max(0, volumen); 
            }
        }
    }, 40); 
}

// --- 4. ABRIR Y CERRAR CARTAS ---
const modalCarta = document.getElementById('modal-carta');
const tituloRemitente = document.getElementById('remitente-carta');
const textoCarta = document.getElementById('texto-carta');

function abrirCarta(autor) {
    // 1. Mostrar la carta visualmente
    tituloRemitente.textContent = textosFamilia[autor].titulo;
    textoCarta.textContent = textosFamilia[autor].cuerpo;
    modalCarta.classList.remove('modal-oculto');

    // 2. Transición de audio: baja el fondo y sube la carta
    desvanecerVolumen(musicaFondo, 'bajar');
    
    musicaCarta.src = textosFamilia[autor].cancion;
    desvanecerVolumen(musicaCarta, 'subir');
}

function cerrarCarta() {
    // 1. Ocultar la carta visualmente
    modalCarta.classList.add('modal-oculto');
    
    // 2. Transición de audio: baja la carta y sube el fondo
    desvanecerVolumen(musicaCarta, 'bajar');
    desvanecerVolumen(musicaFondo, 'subir');
}

// --- 5. LÓGICA DE LOS PUNTITOS DEL CARRUSEL ---
const carrusel = document.getElementById('carrusel');
const puntos = document.querySelectorAll('.punto');

carrusel.addEventListener('scroll', () => {
    let index = Math.round(carrusel.scrollLeft / carrusel.clientWidth);
    
    puntos.forEach(punto => punto.classList.remove('activo'));
    
    if(puntos[index]) {
        puntos[index].classList.add('activo');
    }
});
