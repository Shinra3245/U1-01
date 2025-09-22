// --- DATOS Y VARIABLES GLOBALES ---
const members = [
    { name: "Omar", photo: "images/Omar.png", desc: "Estudiante de ING. en Sistemas Computacionales apasionado por el desarrollo web." },
    { name: "Emilio", photo: "images/emilio.jpg", desc: "Mi nombre es Emilio y soy estudiante de Ing. en Sistemas del TECNM, me encanta trabajar con novedosas herramientas :D" }
];
let memberIndex = 0;

// --- ELEMENTOS DEL DOM ---
const colorButton = document.getElementById("colorButton");
const switchButton = document.getElementById("switchButton");
const memberPhoto = document.getElementById("member-photo");
const memberDesc = document.getElementById("member-desc");
const relojInput = document.form_reloj.reloj;


// --- FUNCIONES ---

/**
 * Muestra la información de un integrante en la página.
 * @param {number} index - El índice del integrante a mostrar.
 */
function showMember(index) {
    const member = members[index];
    memberPhoto.src = member.photo;
    typeAnimation(member.desc);
    const nextIndex = (index + 1) % members.length;
    switchButton.textContent = `Mostrar a ${members[nextIndex].name}`;
}

/**
 * Anima el texto de la descripción como si se estuviera escribiendo.
 * @param {string} text - El texto a animar.
 */
function typeAnimation(text) {
    let i = 0;
    memberDesc.textContent = ''; // Limpia el párrafo
    function escribir() {
        if (i < text.length) {
            memberDesc.textContent += text.charAt(i);
            i++;
            setTimeout(escribir, 40); // Velocidad de escritura
        }
    }
    escribir();
}

/**
 * Actualiza el reloj digital cada segundo.
 */
function avanzarHora() {
    const hactual = new Date();
    const hora = String(hactual.getHours()).padStart(2, '0');
    const minutos = String(hactual.getMinutes()).padStart(2, '0');
    const segundos = String(hactual.getSeconds()).padStart(2, '0');
    relojInput.value = `${hora}:${minutos}:${segundos}`;
    setTimeout(avanzarHora, 1000);
}




// Se ejecuta cuando todo el HTML ha cargado
window.addEventListener('DOMContentLoaded', () => {
    showMember(0);    // Muestra el primer integrante al cargar la página
    avanzarHora();    // Inicia el reloj
});

// Evento para el botón de cambiar integrante
switchButton.addEventListener("click", () => {
    memberIndex = (memberIndex + 1) % members.length;
    showMember(memberIndex);
});

// Evento para cambiar el color de fondo
const colors = ["#121212", "#2c3e50", "#34495e", "#2c2c54", "#474787"];
let colorIndex = 0;
colorButton.addEventListener("click", () => {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
});