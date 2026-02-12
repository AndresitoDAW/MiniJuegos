let colorSeleccionado = null;
let pincelActivo = false;

function cambiarColor(color) {
  colorSeleccionado = color;

  // Activar pincel si no lo está
  if (!pincelActivo) {
    pincelActivo = true;
    document.getElementById("desactivar").value = "PINCEL ACTIVADO";
  }
}

function desactivarPincel() {
  pincelActivo = false;
  document.getElementById("desactivar").value = "PINCEL DESACTIVADO...";
}

function borrarTablero() {
  const celdas = document.querySelectorAll("#tablaDibujo td");
  celdas.forEach(celda => {
    celda.style.backgroundColor = "white";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const celdas = document.querySelectorAll("#tablaDibujo td");

  celdas.forEach(celda => {
    celda.style.width = "20px";
    celda.style.height = "20px";
    celda.style.backgroundColor = "white";
    celda.style.border = "1px solid black";
    celda.style.cursor = "pointer";

    celda.addEventListener("click", () => {
      if (pincelActivo && colorSeleccionado) {
        celda.style.backgroundColor = colorSeleccionado;
      }
    });
  });
});
