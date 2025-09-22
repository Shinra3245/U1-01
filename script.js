// --- DATOS Y VARIABLES GLOBALES ---
const members = [
    { name: "Omar", photo: "images/Omar.png", desc: "Mi nombre es Omar y soy Estudiante de ING. en Sistemas Computacionales apasionado por el desarrollo web." },
    { name: "Emilio", photo: "images/emilio.jpg", desc: "Mi nombre es Emilio y soy estudiante de Ing. en Sistemas del TECNM, me encanta trabajar con novedosas herramientas :D" }
];
let memberIndex = 0;

// CAMBIO 1: Añade una variable para guardar el ID del temporizador.
let typingTimeoutId = null;

// --- ELEMENTOS DEL DOM ---
const colorButton = document.getElementById("colorButton");
const switchButton = document.getElementById("switchButton");
const memberPhoto = document.getElementById("member-photo");
const memberDesc = document.getElementById("member-desc");
const relojInput = document.form_reloj.reloj;


// --- FUNCIONES ---

function showMember(index) {
    const member = members[index];
    const nextIndex = (index + 1) % members.length;
    
    // Inicia la animación de desvanecimiento
    memberPhoto.classList.add('fade-out');

    setTimeout(() => {
        // Esto se ejecuta a la mitad de la transición (200ms)
        memberPhoto.src = member.photo; // Cambia la imagen mientras está invisible
        typeAnimation(member.desc);
        switchButton.textContent = `Mostrar a ${members[nextIndex].name}`;
        
        // Elimina la clase para que la nueva imagen aparezca suavemente
        memberPhoto.classList.remove('fade-out');
    }, 200); // El tiempo debe ser la mitad de la duración de la transición en CSS
}

/**
 * Anima el texto de la descripción como si se estuviera escribiendo.
 * @param {string} text - El texto a animar.
 */
function typeAnimation(text) {
    // CAMBIO 2: Cancela cualquier animación que esté en curso.
    clearTimeout(typingTimeoutId);

    let i = 0;
    memberDesc.textContent = ''; // Limpia el párrafo
    function escribir() {
        if (i < text.length) {
            memberDesc.textContent += text.charAt(i);
            i++;
            // CAMBIO 3: Guarda el ID del nuevo temporizador en nuestra variable.
            typingTimeoutId = setTimeout(escribir, 40); // Velocidad de escritura
        }
    }
    escribir();
}

function avanzarHora() {
    const hactual = new Date();
    const hora = String(hactual.getHours()).padStart(2, '0');
    const minutos = String(hactual.getMinutes()).padStart(2, '0');
    const segundos = String(hactual.getSeconds()).padStart(2, '0');
    relojInput.value = `${hora}:${minutos}:${segundos}`;
    setTimeout(avanzarHora, 1000);
}


// --- EVENT LISTENERS ---
window.addEventListener('DOMContentLoaded', () => {
    showMember(0);
    avanzarHora();
});

switchButton.addEventListener("click", () => {
    memberIndex = (memberIndex + 1) % members.length;
    showMember(memberIndex);
});

const colors = ["#121212", "#2c3e50", "#34495e", "#2c2c54", "#474787"];
let colorIndex = 0;
colorButton.addEventListener("click", () => {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
});

// --- FUNCIONALIDAD EXTRA: EFECTO DE FOCO ---

// Selecciona el contenedor principal
const mainContainer = document.querySelector('.main-container');

// Añade un 'escuchador' para el evento 'mousemove'
mainContainer.addEventListener('mousemove', (e) => {
    // 1. Obtiene las dimensiones y posición de la tarjeta en la pantalla
    const rect = mainContainer.getBoundingClientRect();

    // 2. Calcula la posición X del mouse DENTRO de la tarjeta
    //    (Posición del mouse en la ventana - Posición inicial de la tarjeta)
    const x = e.clientX - rect.left;

    // 3. Calcula la posición Y del mouse DENTRO de la tarjeta
    const y = e.clientY - rect.top;

    // 4. Actualiza las variables CSS con las nuevas coordenadas
    mainContainer.style.setProperty('--mouse-x', `${x}px`);
    mainContainer.style.setProperty('--mouse-y', `${y}px`);
});

// Opcional: Resetea la posición cuando el mouse sale de la tarjeta
mainContainer.addEventListener('mouseleave', () => {
    mainContainer.style.setProperty('--mouse-x', '50%');
    mainContainer.style.setProperty('--mouse-y', '50%');
});