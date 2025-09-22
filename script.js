// --- DATOS Y VARIABLES GLOBALES ---
const members = [
    { name: "Omar", photo: "images/Omar.png", desc: "Mi nombre es Omar y soy Estudiante de ING. en Sistemas Computacionales apasionado por el desarrollo web." },
    { name: "Emilio", photo: "images/emilio.jpg", desc: "Mi nombre es Emilio y soy estudiante de Ing. en Sistemas del TECNM, me encanta trabajar con novedosas herramientas :D" }
];
let memberIndex = 0;

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

    memberPhoto.classList.add('fade-out');

    setTimeout(() => {
        memberPhoto.src = member.photo; 
        typeAnimation(member.desc);
        switchButton.textContent = `Mostrar a ${members[nextIndex].name}`;
        memberPhoto.classList.remove('fade-out');
    }, 200); 
}

/**
 * 
 * @param {string} text 
 */
function typeAnimation(text) {
    clearTimeout(typingTimeoutId);

    let i = 0;
    memberDesc.textContent = ''; 
    function escribir() {
        if (i < text.length) {
            memberDesc.textContent += text.charAt(i);
            i++;
            typingTimeoutId = setTimeout(escribir, 40); 
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


const mainContainer = document.querySelector('.main-container');

mainContainer.addEventListener('mousemove', (e) => {
    const rect = mainContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mainContainer.style.setProperty('--mouse-x', `${x}px`);
    mainContainer.style.setProperty('--mouse-y', `${y}px`);
});

mainContainer.addEventListener('mouseleave', () => {
    mainContainer.style.setProperty('--mouse-x', '50%');
    mainContainer.style.setProperty('--mouse-y', '50%');
});