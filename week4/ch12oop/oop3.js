// Public and Private Methods
/*
by default, an object's methods are public in JavaScript
public because they can be queries directly and changed by assignment
*/

/*
We can use the concept of variable scope to keep some properties and methods
private inside of a class declaration. Prevent them from being accesed or changed
*/
/*
class Turtle {
    constructor(name, color) {
        this.name = name;
        let _color = color; 
        this.setColor = color => {
            if(typeof color === 'string') {
                return _color = color;
            } else {
                throw newError('Color must be a string!')
            }
        }
        this.getColor = () => _color;
    }
}
*/


// creating _color as a variable inside the scope of the constructor function inside the 
// class declaration makes it impossible to access outside this scope

// The Object Constructor
// Objects have built in methods 

// Enumerable Properties
// Good practice is for all built-in methods to be non-enumerable
// and and user-defined to be made enumerable



//Inheritance Using -extends-
class Turtle {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
    swim() {
        return `${this.name} paddles in the water`;
    }
    toString() {
        return `A turtle called ${this.name}`;
    }
}

//sub class or child class
class NinjaTurtle extends Turtle {
    constructor(name) {
        super(name); // keyword super refers to parent class and can be used to access any properties and methods of parent class
        this.weapon = 'hands';
    }
    attack() {
        return `Feel the power of my ${this.weapon}!`
    }
}

// Polyphormism - different objects can have the same method but implement it in different ways

// the way the toString() method is implemented is different between objects
[1,2,3].toString() // '1,2,3'
2..toString; // '2'
raph.toString(); // '[object Object]; (before toString method added to Turtle class)

// you can override the toString() method using the prototype, so more meaningful info is displayed
raph.toString(); // 'A turtle called Raphael'

//Adding Methods to Built-in Objects
/*
 * this is possible to add more functionalitily
 * this is known as monkey-patching 
 * it is mostly frowned upon in the JavaScript community (unlike Ruby, more generally embraced)
 * it can cause unexpected behavior
 */

// Property Attributes and Descriptors
// Getting and Setting Property Descriptors

// Getters and Setters
// an object property descriptor can have get() and set() methods instead of a value attribute
// must have one or the other, can't have both
// getters and setters give you more power in controlling the way property assignment works
// should be used sparingly and with care