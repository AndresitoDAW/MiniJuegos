document.addEventListener("DOMContentLoaded", () => {
  const celdas = document.querySelectorAll(".celda");
  const mensaje = document.getElementById("mensaje");
  const reiniciarBtn = document.getElementById("reiniciar");

  let turno = "X";
  let tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  let juegoActivo = true;

  // Función para manejar clics en celdas
  celdas.forEach(celda => {
    celda.addEventListener("click", () => {
      if (!juegoActivo) return;

      const [fila, col] = celda.dataset.pos.split("-").map(Number);

      if (tablero[fila][col] === "") {
        tablero[fila][col] = turno;
        celda.textContent = turno;

        if (verificarGanador(fila, col)) {
          mensaje.textContent = `¡Ganó ${turno}!`;
          juegoActivo = false;
        } else if (esEmpate()) {
          mensaje.textContent = "¡Empate!";
          juegoActivo = false;
        } else {
          turno = turno === "X" ? "O" : "X";
        }
      }
    });
  });

  // Función para verificar si hay ganador
  function verificarGanador(fila, col) {
    const simbolo = tablero[fila][col];

    // Fila
    if (tablero[fila].every(c => c === simbolo)) return true;

    // Columna
    if (tablero.every(f => f[col] === simbolo)) return true;

    // Diagonal principal
    if (fila === col && tablero.every((f, i) => f[i] === simbolo)) return true;

    // Diagonal secundaria
    if (fila + col === 2 && tablero.every((f, i) => f[2 - i] === simbolo)) return true;

    return false;
  }

  // Función para detectar empate
  function esEmpate() {
    return tablero.flat().every(c => c !== "");
  }

  // Función para reiniciar el juego
  reiniciarBtn.addEventListener("click", reiniciar);

  function reiniciar() {
    tablero = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    turno = "X";
    juegoActivo = true;
    mensaje.textContent = "";
    celdas.forEach(c => c.textContent = "");
  }
});
