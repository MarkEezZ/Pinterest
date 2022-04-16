let button = document.getElementById("shevron");
let windowBlock = document.getElementById('second');
console.log(windowBlock);
button.addEventListener('click', test);
function test() {
    windowBlock.classList.toggle('newStyle')
}