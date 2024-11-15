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


function handleClick() {
    console.log(this.id)
    console.log(this.textContent)
}


// const handleClick = (e) => {
//     console.log(this.id)
//     console.log(this.textContent)
// } // TypeError: Cannot read properties of undefined (reading 'id')


function createCounter() {
    let count = 0;

    return {
        increment() {
            count++;
            console.log(this.count)
        },

        getCount() {
            return count
        }
    }
}

function createTimer(duration, elementId) {
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