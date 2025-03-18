const currentTimeDisplay = document.getElementById('current-time');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm');
const stopAlarmButton = document.getElementById('stop-alarm');

let alarmTime = null;
let alarmTimeout = null;

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  if (alarmTime && `${hours}:${minutes}` === alarmTime) {
    triggerAlarm();
  }
}


function triggerAlarm() {
  alert('Alarm! Wake up!');
  stopAlarmButton.disabled = false;
  alarmTime = null;
}


setAlarmButton.addEventListener('click', () => {
  alarmTime = alarmTimeInput.value;
  if (!alarmTime) {
    alert('Please set a valid time.');
    return;
  }
  alert(`Alarm set for the timing ${alarmTime}`);
  stopAlarmButton.disabled = false;
});


stopAlarmButton.addEventListener('click', () => {
  clearTimeout(alarmTimeout);
  stopAlarmButton.disabled = true;
  alarmTime = null;
  alert('Alarm stopped.');
});


setInterval(updateTime, 1000);
updateTime(); 