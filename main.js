const password = document.getElementById("password");
const copyBtn = document.getElementById("copy-password-btn");
const charLength = document.getElementById("char-length-value");
const slider = document.getElementById("slider");
const uppercaseCheck = document.getElementById("uppercase-checkbox");
const lowercaseCheck = document.getElementById("lowercase-checkbox");
const numberCheck = document.getElementById("number-checkbox");
const symbolCheck = document.getElementById("symbol-checkbox");
const strengthStatus = document.getElementById("strength-status");
const generateBtn = document.getElementById("generate-btn");
const bars = document.querySelectorAll(".bars div");

let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let symbols = "!@#$%^&*()_+";

const toast = {
    copyStatus: document.querySelector("#copy-status"),
    /**
     * Show a success copyStatus message
     * @param {string} [message="success"] - the message to show in the copyStatus
     * @returns {void}
     */
    success(message = "success") {
        this.copyStatus.style.color = "#A4FFAF"
        this.copyStatus.textContent = message;

        setTimeout(() => {
            this.copyStatus.textContent = "";
        }, 2000);
    },
    /**
     * Show an error copyStatus message
     * @param {string} [message="something went wrong"] - the message to show in the copyStatus
     * @returns {void}
     */
    error(message = "something went wrong") {
        this.copyStatus.style.color = "#F64A4A"
        this.copyStatus.textContent = message;
        password.value = ""

        setTimeout(() => {
            this.copyStatus.textContent = "";
        }, 2000);
    },
};

function updateSliderBackground() {
    const min = slider.min;
    const max = slider.max;
    const value = slider.value;
    const percentage = ((value - min) / (max - min)) * 100;

    charLength.textContent = slider.value;

    slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
}

/**
 * Copy the generated password to the clipboard
 * @returns {void}
 */
const copyPassword = () => {
    const copyStatus = document.getElementById("copy-status");
    if (!password.value.trim()) return toast.error("no password provided")
    navigator.clipboard.writeText(password.value);
    toast.success("copied")
};

/**
 *
 * @param {string} str - the string to get a random character from
 * @returns string
 */
const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

/**
 * @param {Array<string>} password - the password to shuffle
 * @returns {Array<string>}
 */
const shufflePassword = (password) => password.sort(() => Math.random() - 0.5);

/**
 * Add a character from the given character set to the password, and add it to the pool
 * of available characters. Increment the count of selected options.
 * @param {string} charSet - the set of characters to select from
 * @param {Array<string>} passwordArray - the array of characters to add to
 * @param {string} availableCharacters - the string of all characters that have been selected
 * @param {number} selectedOptions - the number of options that have been selected
 * @returns {{passwordArray: Array<string>, availableCharacters: string, selectedOptions: number}}
 */
const addCharactersToPool = (
    charSet,
    passwordArray,
    availableCharacters,
    selectedOptions
) => {
    passwordArray.push(getRandomChar(charSet));
    availableCharacters += charSet;
    selectedOptions++;

    return {passwordArray, availableCharacters, selectedOptions};
};

/**
 * Generate a password based on the currently selected options
 * @returns {void}
 */
const generatePassword = () => {
    if (slider.value === '0') return toast.error("select character length")
    let passwordArray = [];
    let availableCharacters = "";
    let selectedOptions = 0;

    // Add uppercase letters if checked
    if (uppercaseCheck.checked) {
        ({passwordArray, availableCharacters, selectedOptions} = addCharactersToPool(
            uppercaseLetters,
            passwordArray,
            availableCharacters,
            selectedOptions
        ));
    }

    // Add lowercase letters if checked
    if (lowercaseCheck.checked) {
        ({passwordArray, availableCharacters, selectedOptions} = addCharactersToPool(
            lowercaseLetters,
            passwordArray,
            availableCharacters,
            selectedOptions
        ));
    }

    // Add numbers if checked
    if (numberCheck.checked) {
        ({passwordArray, availableCharacters, selectedOptions} = addCharactersToPool(
            numbers,
            passwordArray,
            availableCharacters,
            selectedOptions
        ));
    }

    // Add symbols if checked
    if (symbolCheck.checked) {
        ({passwordArray, availableCharacters, selectedOptions} = addCharactersToPool(
            symbols,
            passwordArray,
            availableCharacters,
            selectedOptions
        ));
    }

    if (selectedOptions > Number(slider.value)) return toast.error("not enough characters")

    // Handle password strength based on checked checkboxes
    switch (selectedOptions) {
        case 0:
            toast.error("Check at least one checkbox");
            return; // Exit if no checkbox is selected
        case 1:
            bars.forEach((bar) => (bar.className = ""));
            bars[0].className = "very-weak-password";
            strengthStatus.textContent = "too weak";
            break;
        case 2:
            bars.forEach((bar) => (bar.className = ""));
            bars[0].className = "weak-password";
            bars[1].className = "weak-password";
            strengthStatus.textContent = "Weak";
            break;
        case 3:
            bars.forEach((bar) => (bar.className = "medium-password"));
            bars[3].className = "";
            strengthStatus.textContent = "Medium";
            break;
        default:
            bars.forEach((bar) => (bar.className = "strong-password"));
            strengthStatus.textContent = "Strong";
    }

    const passwordLength = slider.value - passwordArray.length;

    for (let i = 0; i < passwordLength; i++) {
        passwordArray.push(
            availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
        );
    }

    // Shuffle the password characters for randomness
    passwordArray = shufflePassword(passwordArray);

    // Display the generated password
    password.value = passwordArray.join("");
};

// event handlers
copyBtn.addEventListener("click", copyPassword);

slider.addEventListener("input", updateSliderBackground);
generateBtn.addEventListener("click", generatePassword);