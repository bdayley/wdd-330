// document.forms returns an HTML collection of all the forms in the order they appear in the markup,
// even if there is only one form; use index notation to return the form object
const form = document.forms[0];
// you could also use 
// document.getElementByTagname('form')[0];
// document.forms['search'];
const input = form.elements.searchInput;

//input.addEventListener('focus', () => alert('focused'), false);

//input.addEventListener('blur', () => alert('blurred'), false);

//input.addEventListener('change', () => alert('changed'), false);

form.addEventListener('submit', search, false);

function search() {
    alert(`You Searched for: ${input.value}`);
    event.preventDefault();
}

/*
input.value = 'Search Here';
// remove the text if input box is clicked on
input.addEventListener('focus', function() {
    if (input.value==='Search Here') {
        input.value = ''
    }
}, false);
// put the text back if the box is empty and not in focus
input.addEventListener('blur', function() {
    if (input.value==='') {
        input.value = 'Search Here';
    }
}, false);
*/
