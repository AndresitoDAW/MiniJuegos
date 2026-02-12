document.addEventListener("DOMContentLoaded", () => {
  const boton1 = document.getElementById("boton-1");
  const boton2 = document.getElementById("boton-2");
  const boton3 = document.getElementById("boton-3");
  const boton4 = document.getElementById("boton-4");
  const boton5 = document.getElementById("boton-5");
  const boton6 = document.getElementById("boton-6");
  const marco = document.getElementById("marco-juegos");

  boton1.addEventListener("click", () => {
    marco.src = "pages/tres-en-raya/index.html";
  });

  boton2.addEventListener("click", () => {
    marco.src = "pages/dibujar/index.html";
  });

  boton3.addEventListener("click", () => {
    marco.src = "pages/2048/2048-master/index.html"
  });

  boton4.addEventListener("click", () => {
    marco.src = "pages/Snake-JavaScript-master/index.html"
  });

  boton5.addEventListener("click", () => {
    marco.src = "pages/canvas-tetris-master/index.html";
  });

  boton6.addEventListener("click", () => {
    marco.src = "pages/pong/index.html";
  });
});