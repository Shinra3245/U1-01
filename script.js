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


async function fetchQuote() {
    const quoteElement = document.getElementById('quote-display');
    
    // Array de APIs alternativas para probar
    const apiOptions = [
        {
            url: 'https://api.quotegarden.io/api/v3/quotes/random',
            transform: (data) => `"${data.data.quoteText}" — ${data.data.quoteAuthor}`
        },
        {
            url: 'https://zenquotes.io/api/random',
            transform: (data) => `"${data[0].q}" — ${data[0].a}`
        },
        // API local de respaldo con frases predefinidas
        {
            local: true,
            quotes: [
                { phrase: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.", author: "John Lennon" },
                { phrase: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt" },
                { phrase: "No es el más fuerte de las especies el que sobrevive, sino el más adaptable.", author: "Charles Darwin" },
                { phrase: "La imaginación es más importante que el conocimiento.", author: "Albert Einstein" },
                { phrase: "El éxito es ir de fracaso en fracaso sin perder el entusiasmo.", author: "Winston Churchill" }
            ]
        }
    ];

    // Función para usar frases locales como respaldo
    function useLocalQuote() {
        const localOption = apiOptions.find(option => option.local);
        const randomQuote = localOption.quotes[Math.floor(Math.random() * localOption.quotes.length)];
        return `"${randomQuote.phrase}" — ${randomQuote.author}`;
    }

    try {
        // Intentar con las APIs externas primero
        for (let i = 0; i < apiOptions.length - 1; i++) {
            const apiOption = apiOptions[i];
            try {
                const response = await fetch(apiOption.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    mode: 'cors' // Explicitly request CORS
                });
                
                if (response.ok) {
                    const data = await response.json();
                    quoteElement.textContent = apiOption.transform(data);
                    return; // Éxito, salir de la función
                }
            } catch (error) {
                console.log(`API ${apiOption.url} falló:`, error.message);
                continue; // Probar siguiente API
            }
        }
        
        // Si todas las APIs fallan, usar frases locales
        throw new Error('Todas las APIs externas fallaron');
        
    } catch (error) {
        console.log('Usando frases locales como respaldo');
        quoteElement.textContent = useLocalQuote();
    }
}

// Llamar la función al cargar la página
window.addEventListener('DOMContentLoaded', fetchQuote);