// objects chapter
/*
const dice = {
    sides: 6,
    roll() {
        return Math.floor(this.sides * Math.random() + 1)
    }
}
*/

// Create object using a constructor function:

// this function defines the properties and methods of an object
/*
const Dice = function(sides=6){
    this.sides = sides;
    this.roll = function() {
        return Math.floor(this.sides * Math.random() +1)
    }
}

// create an instance of the dice constructor function using the new operator
const redDice = new Dice; // don't need () unless default argument need to be provided

const whiteDice = new Dice(4) // four sides
*/

// Class Declaration (this is the preferred way; more succint, easier to read, implicitly in strict mode)
class Dice {
    constructor(sides=6) {
        this.sides = sides
    }

    roll() {
        return Math.floor(this.sides * Math.random() + 1)
    }

    static description() {
        return 'A way of choosing random numbers'
    }
}

// the class declaration syntax works in exactly the same way as the constructor function syntax 

const blueDice = new Dice(20); // this contains an instance of the Dice class
blueDice instanceof Dice // true
blueDice.sides // 20
blueDice.roll() // 13

// Constructor Property
blueDice.constructor // [Function: Dice]
// you can use this to instatiate a copy of any object, without referencing actual constructor, ie if unkown
const greenDice = new blueDice.constructor(10);

// use static keyword in class declaration to create static method
// sometimes called class methods in other programming languages
// static method called by class directly, rather than by instance
Dice.description() // call from dice class
// redDice.description would give an error

