// Creating Objects from Other Objects

// possible to avoid using classes altogether and create new objects base on another object that acts as prototype instead

const Human = {
    arms: 2,
    legs: 2,
    walk() { console.log('Walking'); }
}
// this will act as prototype for all other Human objects

// create an instance of Human using the Object.create() method:

const lois = Object.create(Human);
lois.arms // 2
lois.legs // 2
lois.walk() // Walking

// extra properties can be added:
lois.name = 'Lois Lane';
lois.job = 'Reporter';

// or you can add a second argument to the Object.create() method containing properties to be add

const jimmy = Object.create(Human, {name: { value: 'Jimmy Olsen', enumerable: true }, 
job: { value: 'Photographer', enumerable: true } });
// unwieldy and awkward, can use the mixin() function 

// Object-Based Inheritance
// the Human object can act as a super-class

const Superhuman = Object.create(Human);
Superhuman.change = function() {
    return `${this.realName} goes into a phone box and comes out as ${this.name}`;
};
// create default values so this works
Superhuman.name = 'Name Needed';
Superhuman.realName = 'Real Name Needed';
// use Superhuman object as prototype to create more objects based on it
const superman = Object.create(Superhuman);
superman.name = 'Superman';
superman.realName = 'Clark Kent';
superman.change() // Clark Kent goes into a phone box and comes out as Superman
// above more than using constructor function
// can add init() to Superhuman object that accepts initilaization properties
Superhuman.init = function(name, realName) {
    this.name = name;
    this.realName = realName;
        this.init = undefined // this line removes the init function, so it can only be called once
    return this;
}

// new object more easily created and initiliazed
const batman = Object.create(Superhuman);
batman.init('Batman', 'Bruce Wayne');
// can chain the init
const aquaman = Object.create(Superhuman).init('Aquaman', 'Arthur Curry');

// Object Prototype Chain

// Mixins
// a way of adding properties and methods of some objects to another object without using inheritance
// create own mixin function to get a deep copy (not just a pointer to old object)


// Chaining functions
// possible but can make debugging difficult


// Binding this
// the value of this can lose its scope with functions nested in other functions

superman.friends = [batman, aquaman]
/*
superman.findFriends = function() {
    this.friends.forEach(function(friend) {
        console.log(`${friend.name} is friends with ${this.name}`);
    });
}
superman.findFriends(); // Batman is friends with undefined, etc
*/

// Use that=this, or bind(this), or for-of instead of foreach(), or...

// Use arrow function, cuz they don't have their own this context, this remains bound to original
superman.findFriends = function() {
    this.friends.forEach((friend) => {
        console.log(`${friend.name} is friends with ${this.name}`);
    });
}
// for this reason, arrow functions should be used when anonymous functions are
// require in callbacks

// Borrowing Methods from Prototypes
const fly = batman.fly;
fly.call(batman); // use call method that all functions have

// Borrowing Array Methods
//

// Composition Over Inheritance
// JavaScript does not allow multiple inheritance

// create small objects and use them as building blocks for more complex objects
// if using classes, make them 'skinny'
// borrow a method from a class, rather than inherit the whole thing
