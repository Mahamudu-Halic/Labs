const clickMeBtn = document.getElementById('click-me-btn')
const Person = {
    name: 'John Doe',
    age: 30,
    greet() {
        console.log(`Hello, my name is ${this.name} and my age is ${this.age}`);
    }
}

Person.greet(); // Output: Hello, my name is John Doe and my age is 30

Person.greet.call({name: 'Jane Doe', age: 25}); // Output: Hello, my name is Jane Doe and my age

Person.greet.apply({name: 'Jane Doe', age: 25}); // Output: Hello, my name is Jane Doe and my age

Person.greet.bind({name: 'John Doe', age: 25})(); // Output: Hello, my name is Jane Doe and my age


/**
 * Logs the id and text content of the element that triggered this event handler to the console.
 * @this {HTMLElement} The element that triggered the event handler.
 */
function handleClick() {
    console.log(this.id)
    console.log(this.textContent)
}

/**
 * Creates a counter object with two methods: increment and getCount.
 *
 * The returned object has two methods:
 *  - `increment()`: increments the counter and logs the new count to the console.
 *  - `getCount()`: returns the current count.
 *
 * @returns {Object} An object with two methods: `increment()` and `getCount()`.
 */
function createCounter() {
    let count = 0;

    return {
        /**
         * Increments the counter by one and logs the new count to the console.
         * @returns {undefined}
         */
        increment() {
            count++;
            console.log(this.count)
        },

        /**
         * Returns the current count of the counter.
         *
         * @returns {number} The current count.
         */
        getCount() {
            return count
        }
    }
}

function createTimer(duration, elementId) {
    if(typeof timer !== "number" && typeof elementId !== "string") return "invalid inputs"

    const timer = document.createElement('div')
    timer.id = elementId
    document.body.appendChild(timer)
    const timeInterval = setInterval(function () {
        if (duration > 0) {
            duration--
            timer.textContent = duration;
        } else {
            clearInterval(timeInterval)
            console.log('Timer finished')
            console.log(this)
        }
    }, 1000)
}

createTimer(5, "hello")


clickMeBtn.addEventListener('click', handleClick);