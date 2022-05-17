// Prototypal Inheritance
// every class has a prototype property that is shared by every instance of the class
// any property or method of a class's prototype can be accessed by every object instantiate by that class

class Turtle {
    constructor(name) {
        this.name = name;
        this.weapon = 'hands';
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
    attack() {
        return `Feel the power of my ${this.weapon}`;
    }
}

const leo = new Turtle('Leonardo');
leo.name; // 'Leonardo'
leo.sayHi(); // 'Hi dude, my name is Leonardo'

// normally, you'd add default properties and methods to the class declaration
// you can add more using the prototype property of the class

Turtle.prototype.weapon = 'Hands'; // add new property by assignment
Turtle.prototype.attack = function() {
    return `Feel the power of my ${this.weapon}`;
} // add method to the prototype

const raph = new Turtle('Raphael'); // will have weapon and attack as well

// Find the Prototype
raph.constructor.prototype; // Turtle {attack: [Function], weapon: 'Hands'}
// or
Object.getPrototypeOf(raph); // same as above
raph._proto_ // 'dunder proto', not recommended

//check if prototype of instance
Turtle.prototype.isPrototypeOf(raph) // true


// Own Properties and Prototype Properties
// name property considered it's own property; weapon inherited
raph.hasOwnProperty('name'); // true
raph.hasOwnProperty('weapon'); // false 
// this value the same for all instances and only exists in one place -as property of prototype


// Prototype is live!
// as property or method added, any instances of class will inherit
Turtle.prototype.weapon = 'Feet'; // all instances of Turtle reflect his change

// Overwriting Prototype Properties
leo.weapon = 'Katana Blades';
raph.weapon = 'Sai';

const don = new Turtle('Donatello');
don.weapon = 'Bo Staff';
// these will now become 'own property' of the instance object, 
// and take precedence over prototype property when used in weapons

// Be careful when overwriting the prototype completely - the constructor class needs to be reset

// Use Prototype for Properties that stay the same (unlike weapon :-p)
Turtle.prototype.food = 'Pizza';
Turtle.prototype.eat = function() {
    return `Mmm, this ${this.food} tastes great!`;
}

const mike = new Turtle('Michelangelo');
mike.weapon = 'Nunchakus';



