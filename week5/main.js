function amIOldEnough() {
    let age = document.getElementById("age").value;
    age = parseInt(age, 10); // parseInt() is not working
    console.log(age);
    if (age < 12) {
        console.log(`In the if with ${age}`);
        document.getElementById("result").innerHTML = 'No, sorry.';
    } else if (age < 18) {
        console.log(`In the else-if with ${age}`);
        document.getElementById("result").innerHTML = 'Only if you are accompanied by an adult.';
    } else {
        console.log(`In the else with ${age}`);
        document.getElementById("result").innerHTML = 'Yep, come on in.';
    }
}

const theButton = document.getElementById("ageButton");

//theButton.addEventListener("click", amIOldEnough);
