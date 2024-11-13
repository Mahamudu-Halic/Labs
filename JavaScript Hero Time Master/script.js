const selectedHours = document.getElementById("select-hours")
const alarmSound = document.getElementById("alarm-sound")
const setAlarmBtn = document.getElementById("set-alarm")
let selectedHour = '24'
let myAlarm

class Clock {
    constructor(format = "24") {
        const currentTime = new Date();
        this.format = format
        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        this.seconds = currentTime.getSeconds();
        this.ampm = this.hours >= 12 ? 'PM' : 'AM';
        this.alarmTime = null
    }

    getFormattedTime() {
        return (this.format === '12') ? this.get12HourTime() : `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;
    }

    get12HourTime() {
        // Convert to 12-hour format
        this.hours = this.hours % 12;
        this.hours = this.hours ? this.hours : 12; // Convert hour '0' to '12'
        return `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds} ${this.ampm}`;
    }

    setAlarm(hours, minutes) {
        this.alarmTime = {hours: parseInt(hours), minutes: parseInt(minutes), seconds: 0};
    }

    checkAlarm() {
        if (this.alarmTime && this.hours === this.alarmTime.hours &&
            this.minutes === this.alarmTime.minutes) {
            alarmSound.play();  // Play the alarm sound when time matches
            alert('Alarm Time!');  // Show an alert message
        }
    }
}

const updateTime = () => {
    const dateTime = new Clock(selectedHour)
    document.getElementById("display-time").textContent = dateTime.getFormattedTime();
    dateTime.checkAlarm()
}

setInterval(() => updateTime(), 1000) // Call updateTime()

// event listeners
selectedHours.addEventListener("change", (e) => {
    selectedHour = e.target.value
    updateTime()
})

setAlarmBtn.addEventListener("click", () => {
    const alarmTimeInput = document.getElementById('alarm-time').value;
    if (alarmTimeInput) {
        const [hours, minutes] = alarmTimeInput.split(':'); // Get hours and minutes from the input
        const myClock = new Clock();
        myClock.setAlarm(hours, minutes); // Set the alarm time
        alert(`Alarm set for ${hours}:${minutes}`); // Alert the user that the alarm is set
    } else {
        alert('Please select a valid time for the alarm!');
    }
})

