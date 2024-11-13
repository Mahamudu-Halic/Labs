const hero = {
    name: 'Batman',
    secretIdentity: "Bruce Wayne",
    powers: ["strength", "speed", "money"],
    weakness: 'women',
    usePower(powerName) {
        if (this.powers.includes(powerName)) console.log(`${this.name} uses ${powerName}}`)
    },
    revealIdentity() {
        console.log(`${this.name} is actually ${this.secretIdentity}`);
    }
}

function SuperHero(name, secretIdentity, powers, weakness) {
    this.name = name;
    this.secretIdentity = secretIdentity;
    this.powers = powers;
    this.weakness = weakness;
}

SuperHero.prototype.usePower = function (powerName) {
    if (this.powers.includes(powerName)) console.log(`${this.name} uses ${powerName}`)
}

SuperHero.prototype.revealIdentity = function () {
    console.log(`${this.name} is actually ${this.secretIdentity}`);
}

const superman = new SuperHero('Superman', 'Clark Kent', ['flight', 'heat vision', 'superhuman strength'], 'kryptonite');
superman.usePower('flight');

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