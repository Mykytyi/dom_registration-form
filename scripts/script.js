'use strict';

let cities = {
  'Kyiv': [],
  'Center': ['Not in the list', 'Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr'],
  'North': ['Not in the list', 'Chernihiv', 'Sumy'],
  'East': ['Not in the list', 'Donetsk', 'Kharkiv', 'Luhansk'],
  'South': ['Not in the list', 'Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia'],
  'West': ['Not in the list', 'Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod']
};

const fullNameStr = document.getElementById('fullname');
const telephNumb = document.getElementById('telephone');
const selectReg = document.getElementById('selectReg');
const chckBox = document.getElementById('reject');
const subButt = document.getElementById('submUsInf');
const telLabel = document.querySelector('.check-label');

//flags
let isFullNameStr = false;
let isTelephNum = false;

let selectCity = document.getElementById('selectCity');
selectCity.style.display = 'none';

selectReg.addEventListener('change', function(event) {
  selectCity.innerHTML = '';//очистка select
  let chosenReg; //Будущий массив с городами, для заполнения второго select
  selectReg.options[0].disabled = true; //disable 'none' option

  for (var i = 0; i < selectReg.options.length; i++) {
    let option = selectReg.options[i];
    if(option.selected && option.value !== 'none') {
      chosenReg = cities[option.value];
    }
  }

  if (chosenReg !== undefined && chosenReg.length > 0) {
    for(let city of chosenReg) {
      let cityProto = `<option value='${city}'>${city}</option>`;
      selectCity.insertAdjacentHTML('afterbegin', cityProto);
    }
    selectCity.style.display = 'block';
  } else {
    selectCity.style.display = 'none';
  }
});
chckBox.addEventListener('change', function() {
  if (chckBox.checked) {
    telLabel.style.display = 'none';
    selectReg.style.display = 'none';
  } else {
    telLabel.style.display = 'block';
    selectReg.style.display = 'block';
  }
});
document.addEventListener('click', function() {
  if (isFullNameStr && selectReg.value !== 'none' && isTelephNum) {
    subButt.disabled = false;
    subButt.style.backgroundColor = 'transparent';
  } else {
    subButt.disabled = true;
    subButt.style.backgroundColor = 'red';
  }
});

fullNameStr.onblur = function() {
  let fullNameArr = this.value.trim().split(' ');

  if (fullNameArr.length === 2) {
    fullNameStr.style.backgroundColor = '\#87E368';
    isFullNameStr = true;
  } else {
    fullNameStr.style.backgroundColor = '\#EE6257';
    isFullNameStr = false;
  }
};
telephNumb.onblur = function() {
  const validTelNum = /([+]380|380|012)(\d{9})/;

  if (validTelNum.test(this.value.toString())) {
    telephNumb.style.backgroundColor = '\#87E368';
    isTelephNum = true;
  } else if (!validTelNum.test(this.value.toString())) {
    telephNumb.style.backgroundColor = '\#EE6257';
    isTelephNum = false;
  }
};
