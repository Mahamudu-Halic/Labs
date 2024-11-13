//TODO: String Transformations
//capitalize the first letter of a string
const capitalize = (str) => (typeof str !== "string") ? "invalid input" : str.split(" ").map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(" ");

//reverse a string
const reverseString = (str) => (typeof str !== "string") ? "invalid input" : str.split("").reverse().join("");

//check if a string is a palindrome
const isPalindrome = (str) => (typeof str !== "string") ? "invalid input" : str === reverseString(str);

//counts the number of words in a string
const wordCount = (str) => (typeof str !== "string") ? "invalid input" : str.split(" ").length;

//TODO: Array Transformations
//doubles every number in an array
const doubleNumbers = (arr) => (!Array.isArray(arr)) ? "invalid input" : arr.map(num => (typeof num === "number") && num * 2);

//filters out even numbers from an array
const filterEven = (arr) => (!Array.isArray(arr)) ? "invalid input" : arr.filter(num => (typeof num === "number" && num % 2) === 0);
//calculate the sum of all numbers in an array
const sum = (arr) => (!Array.isArray(arr)) ? "invalid input" : arr.reduce((acc, num) => (typeof num === "number") && acc + num, 0);

//calculate the average of all numbers in an array
const average = (arr) => (!Array.isArray(arr)) ? "invalid input" : sum(arr) / arr.length;

//TODO: Object Transformations
//returns the full name of a person object
const fullName = (person) =>  `${person?.firstName} ${person?.lastName}`;

//checks if a person is 18 or older
const isAdult = (person) => (typeof person?.age !== "number") ? "invalid input for age" : person?.age >= 18;

//filters an array of person objects by miniAge
const filterByAge = (people, minAge) => people.filter(person => person.age >= minAge)


//TODO: Function Composition
//compose function
const compose = (...fns) => (args) => fns.reduceRight((acc, fn) => fn(acc), args);

//composite function to reverse and capitalize a string
const reverseAndCapitalize = compose(capitalize, reverseString)
const reverseAndCapitalizeResult = reverseAndCapitalize("Halic")

//composite function to filter and double even numbers
const doubleEvenNumbers = compose(doubleNumbers, filterEven)
const doubledEvensResult = doubleEvenNumbers([2, 34, 4, 6, 5, 3])

