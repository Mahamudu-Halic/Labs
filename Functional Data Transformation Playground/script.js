//TODO: String Transformations
//capitalize the first letter of a string
const capitalize = (str) => {
    if (typeof str !== "string") {
        return "invalid input"
    }
    return str.split(" ").map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(" ");
}

//reverse a string
const reverseString = (str) => {
    if (typeof str !== "string") {
        return "invalid input"
    }
    return str.split("").reverse().join("")
}

//check if a string is a palindrome
const isPalindrome = (str) => {
    if (typeof str !== "string") {
        return "invalid input"
    }
    return str === reverseString(str);
}

//counts the number of words in a string
const wordCount = (str) => {
    if (typeof str !== "string") {
        return "invalid input"
    }

    return str.split(" ").length;
}

//TODO: Array Transformations
//doubles every number in an array
const doubleNumbers = (arr) => {
    if (!Array.isArray(arr)) {
        return "invalid input"
    }
    return arr.map(num => {
        if (typeof num === "number") {
            return num * 2;
        }
    });
}

//filters out even numbers from an array
const filterEven = (arr) => {
    if (!Array.isArray(arr)) {
        return "invalid input"
    }
    return arr.filter(num => {
        if (typeof num === "number") {
            return num % 2 === 0;
        }
    })
}
//calculate the sum of all numbers in an array
const sum = (arr) => {
    if (!Array.isArray(arr)) {
        return "invalid input"
    }
    return arr.reduce((acc, num) => {
        if (typeof num === "number") {
            return acc + num;
        } else {
            return "invalid array input" // You don't want to return this as the new accumulated value when the input is valid.
        }
    }, 0)
}

//calculate the average of all numbers in an array
const average = (arr) => {
    if (!Array.isArray(arr)) {
        return "invalid input"
    }
    return sum(arr) / arr.length;
}

//TODO: Object Transformations
//returns the full name of a person object
const fullName = (person) => {
    return `${person?.firstName} ${person?.lastName}`;
}

//checks if a person is 18 or older
const isAdult = (person) => {
    if (typeof person?.age !== "number") {
        return "invalid input for age"
    }

    return person?.age >= 18;
}

//filters an array of person objects by miniAge
const filterByAge = (people, minAge) => {
    return people.filter(person => person.age >= minAge)
}

//TODO: Function Composition
//compose function
const compose = (...fns) => {
    return (args) => fns.reduceRight((acc, fn) => fn(acc), args);
}

//composite function to reverse and capitalize a string
const reverseAndCapitalize = compose(capitalize, reverseString)
const revCapStringsResult = reverseAndCapitalize("Halic")

//composite function to filter and double even numbers
const doubleEvenNumbers = compose(doubleNumbers, filterEven)
const doubledEvensResult = doubleEvenNumbers([2, 34, 4, 6, 5, 3])

