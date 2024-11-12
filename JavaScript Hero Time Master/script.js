const selectedHours = document.getElementById("select-hours")

let selectedHour = '24'

function Clock(format = "24") {
    this.format = format

    // Get current time
    const currentTime = new Date();
    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.seconds = currentTime.getSeconds();

    // Method to format time in 24-hour format "HH:MM:SS"
    this.getFormattedTime = function () {
        if (this.format === '12') {
            return this.get12HourTime();
        }

        return `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;
    };

    // Method to format time as "HH:MM:SS AM/PM"
    this.get12HourTime = function () {
        this.ampm = this.hours >= 12 ? 'PM' : 'AM';
        // Convert to 12-hour format
        this.hours = this.hours % 12;
        this.hours = this.hours ? this.hours : 12; // Convert hour '0' to '12'
        return `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds} ${this.ampm}`;
    };

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

