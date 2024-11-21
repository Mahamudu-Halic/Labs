// Define a JavaScript object to represent a superhero
const hero = {
    // Properties to describe the hero
    name: 'Batman', // Hero's public name
    secretIdentity: "Bruce Wayne", // Hero's secret identity
    powers: ["strength", "speed", "money"], // Hero's superpowers
    weakness: 'women', // Hero's weakness

    // Method to use a specific power
    usePower(powerName) {
        // Check if the hero has the specified power
        if (this.powers.includes(powerName))
            // Log a message to the console if they do
            console.log(`${this.name} uses ${powerName}`);
    },

    // Method to reveal the hero's secret identity
    revealIdentity() {
        // Log a message to the console revealing the hero's secret identity
        console.log(`${this.name} is actually ${this.secretIdentity}`);
    }
}

// Create a constructor to create new superheroes
function SuperHero(name, secretIdentity, powers, weakness) {
    this.name = name;
    this.secretIdentity = secretIdentity;
    this.powers = powers;
    this.weakness = weakness;
}

// Add a method to use a specific power
SuperHero.prototype.usePower = function (powerName) {
    if (this.powers.includes(powerName)) console.log(`${this.name} uses ${powerName}`)
}


// Add a method to reveal the hero's secret identity'
SuperHero.prototype.revealIdentity = function () {
    console.log(`${this.name} is actually ${this.secretIdentity}`);
}


// Create instance of SuperHero
const superman = new SuperHero('Superman', 'Clark Kent', ['flight', 'heat vision', 'superhuman strength'], 'kryptonite');
superman.usePower('flight');


// Create an array of SuperHero instances
const superHeroes = [
    new SuperHero('Superman', 'Clark Kent', ['flight', 'heat vision', 'superhuman strength'], 'kryptonite'),
    new SuperHero('Batman', 'Bruce Wayne', ['strength', 'speed', 'money'], 'women'),
    new SuperHero('Wonder Woman', 'Marie Curie', ['agility', 'leadership', 'telepathy'], 'cancer'),
    new SuperHero('Spider-Man', 'Peter Parker', ['web-slinging', 'superhuman strength', 'agility'], 'radioactive spiders'),
    new SuperHero('Iron Man', 'Tony Stark', ['genius intellect', 'superhuman strength', 'flight'], 'arc reactor overload'),
    new SuperHero('Captain America', 'Steve Rogers', ['superhuman strength', 'agility', 'leadership'], 'vibranium poisoning'),
    new SuperHero('Lex Luthor', 'Alexander Luthor', ['genius intellect', 'wealth', 'manipulation'], 'kryptonite'),
    new SuperHero('Joker', 'Jack Napier', ['cunning', 'unpredictability', 'toxic laughing gas'], 'batman'),
    new SuperHero('Green Goblin', 'Norman Osborn', ['genius intellect', 'wealth', 'glider'], 'spider-man'),
]


// Log all superheroes and their powers
superHeroes.forEach(hero => console.log(hero))


// Filter and log superheroes with the power of agility
const agilityHeroes = superHeroes.filter(hero => hero.powers.includes("agility"))
console.log(agilityHeroes)


// Map and log all superheroes' powers'
const powers = superHeroes.map(hero => hero.powers.map(power => power))
console.log(powers)