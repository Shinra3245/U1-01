// Colores para el fondo 
const gradients = [
    "linear-gradient(45deg, #f4f4f4, #ffcccc)", // Gris claro a rosa claro
    "linear-gradient(45deg, #ffcccc, #ccffcc)", // Rosa claro a verde claro
    "linear-gradient(45deg, #ccffcc, #ccccff)", // Verde claro a azul claro
    "linear-gradient(45deg, #ccccff, #ffffcc)", // Azul claro a amarillo claro
    "linear-gradient(45deg, #ffffcc, #f4f4f4)"  // Amarillo claro a gris claro
];

let colorIndex = 0;

// Datos de los integrantes
const members = [
    { photo: "images/Omar.jpeg", desc: "Estudiante de ING. en Sistemas Computacionales apacionado por el desarrollo web" },
    { photo: "images/serch.png", desc: "Estudiante de Ing. en Sistemas Computacionales apacionado por el Front-End y el Desarrollo Movil" }
];

let memberIndex = 0;

// Botón cambio de color
document.getElementById("colorButton").addEventListener("click", () => {
    // Aplica el gradiente actual
    document.body.style.backgroundImage = gradients[colorIndex];
    // Incrementa el índice para el siguiente color
    colorIndex = (colorIndex + 1) % gradients.length;
});

// Botón cambio de integrante
document.getElementById("switchButton").addEventListener("click", () => {
    memberIndex = (memberIndex + 1) % members.length;
    document.getElementById("member-photo").src = members[memberIndex].photo;
    document.getElementById("member-desc").textContent = members[memberIndex].desc;
});