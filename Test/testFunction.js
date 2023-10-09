document.addEventListener("DOMContentLoaded", () => {
    const genderSelect = document.getElementById("gender");
    const startButton = document.getElementById("startButton");
    const timeRemaining = document.getElementById("timeRemaining");
    const playerIppon = document.getElementById("playerIppon");
    const playerWazaAri = document.getElementById("playerWazaAri");
    const opponentIppon = document.getElementById("opponentIppon");
    const opponentWazaAri = document.getElementById("opponentWazaAri");
    const shidos = document.getElementById("shidos");
    const matchResult = document.getElementById("matchResult");
    const addIpponButton = document.getElementById("addIpponButton");
    const addWazaAriButton = document.getElementById("addWazaAriButton");
    const addShidoButton = document.getElementById("addShidoButton");
    const stopButton = document.getElementById("stopButton");
    const resetButton = document.getElementById("resetButton");
  
    let duration = 0;
    let timerInterval;
    let isRunning = false;
  
    startButton.addEventListener("click", () => {
      const selectedGender = genderSelect.value;
      if (selectedGender === "male") {
        duration = 5 * 60;
      } else {
        duration = 4 * 60;
      }
      startMatch();
    });
  
    addIpponButton.addEventListener("click", () => addPoint("ippon"));
    addWazaAriButton.addEventListener("click", () => addPoint("waza_ari"));
    addShidoButton.addEventListener("click", addShido);
    stopButton.addEventListener("click", stopTimer);
    resetButton.addEventListener("click", resetMatch);
  
    function addPoint(pointType) {
      if (!isRunning) return;
  
      const selectedPlayer = prompt("Enter player who scored (player/opponent):");
      if (!selectedPlayer) return;
  
      if (selectedPlayer === "player") {
        if (pointType === "ippon") playerIppon.textContent++;
        else if (pointType === "waza_ari") playerWazaAri.textContent++;
      } else if (selectedPlayer === "opponent") {
        if (pointType === "ippon") opponentIppon.textContent++;
        else if (pointType === "waza_ari") opponentWazaAri.textContent++;
      }
    }
  
    function addShido() {
      if (!isRunning) return;
      shidos.textContent++;
      if (shidos.textContent >= 3) {
        stopMatch("hansoku-make");
      }
    }
  
    function stopTimer() {
      clearInterval(timerInterval);
      isRunning = false;
      addIpponButton.disabled = true;
      addWazaAriButton.disabled = true;
      addShidoButton.disabled = true;
      stopButton.disabled = true;
      resetButton.disabled = false;
    }
  
    function resetMatch() {
      clearInterval(timerInterval);
      duration = 0;
      isRunning = false;
      timeRemaining.textContent = duration;
      playerIppon.textContent = 0;
      playerWazaAri.textContent = 0;
      opponentIppon.textContent = 0;
      opponentWazaAri.textContent = 0;
      shidos.textContent = 0;
      matchResult.textContent = "";
      addIpponButton.disabled = true;
      addWazaAriButton.disabled = true;
      addShidoButton.disabled = true;
      stopButton.disabled = true;
      resetButton.disabled = true;
    }
  
    function updateTime() {
      if (duration <= 0) {
        clearInterval(timerInterval);
        matchResult.textContent = "Match ended in a draw.";
        stopButton.disabled = true;
        resetButton.disabled = false;
      } else {
        duration--;
        timeRemaining.textContent = duration;
      }
    }
  
    function startMatch() {
      isRunning = true;
      addIpponButton.disabled = false;
      addWazaAriButton.disabled = false;
      addShidoButton.disabled = false;
      stopButton.disabled = false;
      resetButton.disabled = true;
      timerInterval = setInterval(updateTime, 1000);
    }
  });
  