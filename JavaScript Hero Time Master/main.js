const clock = document.getElementById("clock")
const alarmInput = document.getElementById("alarm-input")
const setAlarmBtn = document.getElementById("set-alarm-btn")
const clearAlarmBtn = document.getElementById("clear-alarm-btn")
const timeFormat = document.getElementById("time-format")
const audioPlayer = document.getElementById("audio-player")

let currentTime = new Date();

// This is the Clock constructor function that initializes the current time and alarmTime properties
function Clock() {
    /**
     * Initialize the hour, minute, and second properties with the current time
     * Initialize the alarmTime property as null
     */
    this.hour = currentTime.getHours();
    this.minute = currentTime.getMinutes();
    this.second = currentTime.getSeconds();
    this.alarmTime = null;
}

/**
 * Clock constructor function
 * @description Initializes the hour, minute, and second properties with the current time.
 *              Initializes the alarmTime property as null.
 */
Clock.prototype.updateTime = function () {
    currentTime = new Date();
    this.hour = currentTime.getHours();
    this.minute = currentTime.getMinutes();
    this.second = currentTime.getSeconds();
}


/**
 * Updates the current time of the Clock instance.
 * @description This method retrieves the current date and time,
 *              and updates the hour, minute, and second properties
 *              of the Clock instance to reflect the current time.
 * @returns {string} The formatted time in 24-hour format
 */
Clock.prototype.getFormattedTime = function () {
    return `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`
}


/**
 * Returns the current time in 12-hour format.
 * @description This method retrieves the current time,
 *              formats it into a 12-hour format, and
 *              returns the formatted time.
 */
Clock.prototype.get12HourTime = function () {
    this.ampm = this.hour >= 12 ? 'PM' : 'AM';
    const hour = this.hour % 12;
    return `${hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')} ${this.ampm}`
}


/**
 * Sets the alarm time for the Clock instance.
 * @description This method takes an hour and a minute as input,
 *              formats them into a 24-hour format, and
 *              sets the alarmTime property of the Clock instance.
 *              @param {Number} hour - The hour to set the alarm for
 *              @param {Number} minute - The minute to set the alarm for
 *              @returns {string} The formatted alarm time in 24-hour format
 */
Clock.prototype.setAlarm = function (hour, minute) {
    const formattedHour = hour.toString().padStart(2, '0')
    const formattedMinute = minute.toString().padStart(2, '0')

    this.alarmTime = `${formattedHour}:${formattedMinute}:00`
    alert(`alarm has been set to ${this.alarmTime}`)
}


/**
 * Clears the alarm time for the Clock instance.
 * @description This method clears the alarmTime property of the Clock instance.
 */
Clock.prototype.clearAlarm = function () {
    this.alarmTime = null
    audioPlayer.pause()
}


/**
 * Starts the timer for the Clock instance.
 * @description This method sets an interval to update the time and check for the alarm.
 */
Clock.prototype.start = function () {
    setInterval(() => {
        this.updateTime()
        clock.textContent = timeFormat.value === '12' ? this.get12HourTime() : this.getFormattedTime()
        if (this.alarmTime && this.getFormattedTime() === this.alarmTime) audioPlayer.play()
    }, 1000)
}


// Create a new Clock instance and start the timer
const dateTime = new Clock()
dateTime.start()


// Add event listeners for setting and clearing the alarm
setAlarmBtn.addEventListener('click', () => {
    const [hour, minute] = alarmInput.value.split(':')
    hour && minute && dateTime.setAlarm(hour, minute)
})


// Add event listener for clearing the alarm when the input field is empty
clearAlarmBtn.addEventListener('click', () => {
    alarmInput.value = ""
    dateTime.clearAlarm()
})


// Add event listener for changing the time format when the dropdown menu is changed
timeFormat.addEventListener('change', () => {
    clock.textContent = timeFormat.value === '12' ? dateTime.get12HourTime() : dateTime.getFormattedTime();
});