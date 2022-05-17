const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted

    const hero = {}; // create an empty object

    hero.name = form.heroName.value; // create a name property based on the input field's value
    hero.realName = form.realName.value;
    
    /* hero.powers = [];
    for (let i=0; i < form.powers.length; i++) {
        if (form.powers[i].checked) {
            hero.powers.push(form.powers[i].value);
        }
    } */
    // the above code can be refactored to the following,  which uses the spread 
    // operator to turn the node list into an array allowing us to use filter and map
    hero.power = [...form.powers].filter(box => box.checked).map(box => box.value);
    // you could check one with: document.forms.hero.powers[0].checked = true; or in the input tag

    hero.category = form.category.value;
    hero.age = form.age.value;
    hero.city = form.city.value;
    // you can use selectedIndex, and get the actual text in the selected option
    // form.city.options[form.city.selectedIndex].text
    hero.origin = form.origin.value;

    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    
    return hero;
}

/*
form.addEventListener('submit', validate, false);

function validate(event) {
    const firstLetter = form.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');    
    }
}
*/
// give instant feedback:
const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}

form.heroName.addEventListener('blur', validateInline, false);

// it would be more realistic to have generic addError() and removeError() functions to apply to various fields

// you can disable the button by adding to the tag, or by the following
function disableSubmit(event) {
    if(event.target.value === ''){
    document.getElementById('submit').disabled = true;
    } else {
    document.getElementById('submit').disabled = false;
    }
}

form.heroName.addEventListener('keyup', disableSubmit, false);