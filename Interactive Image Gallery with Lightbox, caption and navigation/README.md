# Week 1.2

## Lab Activity: : Functional Data Transformation Playground

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
   - `reverse(str)`: Reverses a string.
   - `isPalindrome(str)`: Checks if a string is a palindrome (reads the same
   backward as forward).
   - `wordCount(str)`: Counts the number of words in a string.
2. Array Transformations:
   - `double(arr)`: Doubles every number in an array.
   - `filterEven(arr)`: Filters out even numbers from an array.
   - `sum(arr)`: Calculates the sum of all numbers in an array.
   - `average(arr)`: Calculates the average of all numbers in an array.
3. Object Transformations:
   - `fullName(person)`: Returns the full name of a person object (given
   properties firstName and lastName).
   - `isAdult(person)`: Checks if a person is 18 or older (given property age).
   - `filterByAge(people, minAge)`: Filters an array of person objects to keep
   only those at least minAge years old.
4. Function Composition:
  - Use the `compose(...fns)` function (you can find implementations online) to
   combine your functions in interesting ways. For example, create a function to
   reverse and capitalize a string, or to double all the even numbers in an array.