const selectedHours = document.getElementById("select-hours")
const alarmSound = document.getElementById("alarm-sound")

let selectedHour = '24'

class Clock {
    constructor(format = "24") {
        const currentTime = new Date();
        this.format = format
        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        this.seconds = currentTime.getSeconds();
        this.ampm = this.hours >= 12 ? 'PM' : 'AM';
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
}

const updateTime = () => {
    const dateTime = new Clock(selectedHour)
    document.getElementById("display-time").textContent = dateTime.getFormattedTime();
}

setInterval(() => updateTime(), 1000) // Call updateTime()

// event listeners
selectedHours.addEventListener("change", (e) => {
    selectedHour = e.target.value
    updateTime()
})


