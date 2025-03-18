function updateClock() {
   let now = new Date();
   let hours = now.getHours().toString().padStart(2, "0");
   let minutes = now.getMinutes().toString().padStart(2, "0");
   let seconds = now.getSeconds().toString().padStart(2, "0");

   document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

function toggleTheme() {
   let body = document.body;
   body.style.background = body.style.background === "black" ? "white" : "black";
   body.style.color = body.style.color === "white" ? "black" : "white";
}


