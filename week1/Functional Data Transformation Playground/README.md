# Week 1.2

## Lab Activity: Functional Data Transformation Playground

### Learning Objectives

- Master essential JavaScript functions for working with strings, arrays, and objects.
- Understand and apply functional programming principles:
  - Pure functions: Always produce the same output for a given input, no side
    effects.
  - Higher-order functions: Take or return functions.
  - Immutability: Avoid modifying original data, and create new transformed copies

- Practice function composition to create complex transformations from simpler one

### Scenario:
You are given a dataset containing various types of information: strings, arrays of numbers, and
objects representing people. Your task is to build a set of pure functions to extract, transform,
and functionally analyze this data.

### Tasks:
1. String Transformations:
   - `capitalize(str)`: Capitalizes the first letter of a string.
   <pre>
   const capitalize = (str) => {
         if (typeof str !== "string") {
            return "invalid input"
         }
   
         return str.split(" ").map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(" ");
   }
   </pre>
   - `reverse(str)`: Reverses a string.
   <pre>
   const reverseString = (str) => {
        if (typeof str !== "string") {
            return "invalid input"
        }
   
        return str.split("").reverse().join("")
   }
   </pre>
   - `isPalindrome(str)`: Checks if a string is a palindrome (reads the same backward as forward).
   <pre>
    const isPalindrome = (str) => {
        if (typeof str !== "string") {
            return "invalid input"
        }
   
        return str === reverseString(str);
    }
   </pre>

   - `wordCount(str)`: Counts the number of words in a string.
   <pre>
     const wordCount = (str) => {
     
        if (typeof str !== "string") {
            return "invalid input"
        }
    
        return str.split(" ").length;
     }
   </pre>
2. Array Transformations:
    - `double(arr)`: Doubles every number in an array.
   <pre>
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
    </pre>

   - `filterEven(arr)`: Filters out even numbers from an array.
    <pre>
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
   </pre>
   - `sum(arr)`: Calculates the sum of all numbers in an array.
    <pre>
    const sum = (arr) => {
        if (!Array.isArray(arr)) {
            return "invalid input"
        }
        return arr.reduce((acc, num) => {
            if (typeof num === "number") {
                return acc + num;
            } else {
                return "invalid array input"
            }
        }, 0)
    }
   </pre>
   - `average(arr)`: Calculates the average of all numbers in an array.
    <pre>
    const average = (arr) => {
        if (!Array.isArray(arr)) {
            return "invalid input"
        }
        return sum(arr) / arr.length;
    }
   </pre>

3. Object Transformations:
   - `fullName(person)`: Returns the full name of a person object (given
   properties firstName and lastName).
    <pre>
    const fullName = (person) => {
        return `${person?.firstName} ${person?.lastName}`;
    }
   </pre>
   - `isAdult(person)`: Checks if a person is 18 or older (given property age).
    <pre>
    const isAdult = (person) => {
        if (typeof person?.age !== "number") {
            return "invalid input for age"
        }
    
        return person?.age >= 18;
    }
   </pre>
   - `filterByAge(people, minAge)`: Filters an array of person objects to keep
   only those at least minAge years old.
    <pre>
    const filterByAge = (people, minAge) => {
        return people.filter(person => person.age >= minAge)
    }
   </pre>
4. Function Composition:
  - Use the `compose(...fns)` function (you can find implementations online) to
   combine your functions in interesting ways. For example, create a function to
   reverse and capitalize a string, or to double all the even numbers in an array.
    <pre>
    //compose function
    const compose = (...fns) => {
        return (args) => fns.reduceRight((acc, fn) => fn(acc), args);
    }
   </pre>
   <pre>
        //composite function to reverse and capitalize a string
        const reverseAndCapitalize = compose(capitalize, reverseString)
        const revCapStringsResult = reverseAndCapitalize("Halic")
    </pre>
   <pre>
    //composite function to filter and double even numbers
    const doubleEvenNumbers = compose(doubleNumbers, filterEven)
    const doubledEvensResult = doubleEvenNumbers([2, 34, 4, 6, 5, 3])
   </pre>