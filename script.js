//функция чтобы определить что написали в инпут
let zapros = '';
let valueInput;
zapros = document.getElementById("input");
zapros.addEventListener('keydown', function (e) {
    //по нажатию энтера записывает значение
    if (e.keyCode == 13) {
        valueInput = document.querySelector('input').value;
        findValue(valueInput); //Вызываем функцию для дальнейшего использования полученного значения, передаём введённое пользователем значение
        console.log(typeof valueInput);
    }
});
/*это можешь удалять*/
//Сама функция, которая проверяет записано ли значение в переменной и создаёт div для демонстрации
function findValue(val) {
    console.log(val);
    let div = document.createElement('div');
    console.log(typeof (div));
    div.style = 'padding: 10px';
    div.style = 'width: 100px';
    div.style.backgroundColor = 'gold';
    div.style.boxShadow = '5px 5px 15px 5px #333';
    div.innerHTML = `${val}`;
    document.body.append(div);
};

/*это для выпадающего меню Когда пользователь нажимает на кнопку, переключаться раскрывает содержимое */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  // Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
 

/////////////////////////////////
//модальные окна
// Получить модальный

let modal = document.getElementById("myModal");

// Получить кнопку, которая открывает модальный
let btn = document.getElementById("myBtn");

// Получить элемент <span>, который закрывает модальный
let span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
btn.onclick = function () {
  modal.style.display = "block";
}

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function () {
  modal.style.display = "none";
}

// Когда пользователь щелкает в любом месте за пределами модального, закройте его
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Получить модальный
let modalLike = document.getElementById("myModalLike");

// Получить кнопку, которая открывает модальный
let btnLike = document.getElementById("myBtnLike");

// Получить элемент <span>, который закрывает модальный
let spanLike = document.getElementsByClassName("closeLike")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
btnLike.onclick = function () {
  modalLike.style.display = "block";
}

// Когда пользователь нажимает на <span> (x), закройте модальное окно
spanLike.onclick = function () {
  modalLike.style.display = "none";
}


//оключает перезагрузку страницы при нажатии на кнопку
let zal = document.getElementById('zal');
zal.onclick = function () {
  modalLike.style.display = "none";
}

let add = document.getElementById('add');
add.onclick = function () {
  modalLike.style.display = "none";
}