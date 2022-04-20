//открывайет меню


let button = document.getElementById("shevron");
let windowBlock = document.getElementById('second');
console.log(windowBlock);
button.addEventListener('click', test);

function test() {
    windowBlock.classList.toggle('newStyle');
    button.classList.toggle('black');
    console.log(event)
}


//модальное окно сделать!!!!!
 
// function myFunction() {
//     document.getElementById("second").classList.toggle("newStyle");
// }

// window.onclick = function (event) {
//     if (!event.target.matches('.shevron')) {
//         let dropdowns = document.getElementsByClassName("second");
//         if (dropdowns.classList.contains('newStyle')) {
//             dropdowns.classList.remove('newStyle');
//         }
//     }
// }

// console.log(event); 


// document.getElementById("myDropdown").onblur = function() {
//     myFunction();
// }










// poisk.onclick = function() {
//     alert('AAAAAAAA');
//   };