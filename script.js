// Colores para el fondo
const colors = ["#f4f4f4", "#ffcccc", "#ccffcc", "#ccccff", "#ffffcc"];
let colorIndex = 0;
// Datos de los integrantes
const members = [
{ photo: "images/omar.jpeg", desc: "Estudiante de ING. en Sistemas Computacionales apacionado por el desarrollo web" },
{ photo: "alumno2.jpg", desc: "Alumno 2 - Descripción breve." }
];
let memberIndex = 0;
// Botón cambio de color
document.getElementById("colorButton").addEventListener("click", () => {
document.body.style.backgroundColor = colors[colorIndex];
colorIndex = (colorIndex + 1) % colors.length;
});
// Botón cambio de integrante
document.getElementById("switchButton").addEventListener("click", () => {
memberIndex = (memberIndex + 1) % members.length;
document.getElementById("member-photo").src = members[memberIndex].photo;
document.getElementById("member-desc").textContent = members[memberIndex].desc;
});