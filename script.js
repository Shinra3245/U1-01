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
if(memberIndex == 0){
    document.getElementById("switchButton").textContent = "Sigue Omar";
}else{
    document.getElementById("switchButton").textContent = "Sigue Emilio";
}
memberIndex = (memberIndex + 1) % members.length;
//console.log(memberIndex);
document.getElementById("member-photo").src = members[memberIndex].photo;
document.getElementById("member-desc").textContent = members[memberIndex].desc;


});
function avanzarHora(){
    var hactual = new Date();
    var horaActual = hactual.getHours() + ":"
                    + hactual.getMinutes()  + ":"
                    + hactual.getSeconds();
    document.form_reloj.reloj.value = horaActual;
    setTimeout("avanzarHora()", 1000);
} 
