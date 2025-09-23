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
const quoteElement = document.getElementById('quote-display');


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

/**
 * Traduce texto al español usando una API externa.
 * @param {string} textToTranslate - El texto en inglés.
 * @returns {Promise<string>} - El texto traducido al español.
 */
async function translateToSpanish(textToTranslate) {
    if (!textToTranslate) return "";
    try {
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|es`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }
    } catch (error) {
        console.error("Error en la traducción:", error);
    }
    // Si la traducción falla, devuelve el texto original.
    return textToTranslate;
}

/**
 * Obtiene una frase en inglés, la traduce al español y la muestra.
 */
async function fetchQuote() {
    quoteElement.textContent = 'Cargando y traduciendo frase...';
    try {
        const originalApiUrl = 'https://zenquotes.io/api/random';

        // --- ESTE ES EL ÚNICO CAMBIO ---
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalApiUrl)}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            const englishQuote = data[0].q;
            const author = data[0].a;
            
            const spanishQuote = await translateToSpanish(englishQuote);

            quoteElement.textContent = `"${spanishQuote}" — ${author}`;
        } else {
            throw new Error('La respuesta de la API no contiene frases.');
        }

    } catch (error) {
        console.error('Error al obtener la frase:', error);
        quoteElement.textContent = 'No se pudo cargar la frase. Intenta recargar la página.';
    }
}


// --- EVENT LISTENERS ---

window.addEventListener('DOMContentLoaded', () => {
    showMember(0);
    avanzarHora();
    fetchQuote();
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