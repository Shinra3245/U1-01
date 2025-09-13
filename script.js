// Colores para el fondo
const colors = ["#f4f4f4", "#ffcccc", "#ccffcc", "#ccccff", "#ffffcc"];
let colorIndex = 0;
// Datos de los integrantes
const members = [
{ photo: "images/Omar.jpeg", desc: "Estudiante de ING. en Sistemas Computacionales apacionado por el desarrollo web" },
{ photo: "images/emilio.jpg", desc: "Mi nombre es Emilio y soy estudiante de Ing. en Sistemas del TECNM, me encanta trabajar con herramientas novedosas :D" }
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
//console.log(memberIndex);
document.getElementById("member-photo").src = members[memberIndex].photo;
document.getElementById("member-desc").textContent = members[memberIndex].desc;
if(memberIndex == 1){
    document.getElementById("bolala").textContent = "hola papito soy la bola, como tass 👻";
}else{
    document.getElementById("bolala").textContent = "soy el buñuelo xd";
}

});