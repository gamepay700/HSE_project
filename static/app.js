const socket = io();
var TOKEN = 'TOKEN';

/// Starting //

socket.on("disconnect", function() {
  console.log("Disconnected");
});

socket.on("reconnect", function() {
  console.log("Reconnecting");
});

///

socket.on('connect' , () => { // connct to sockets //
    connect();
});

///

async function connect() { // коннект к сокетам

  ///

  await getToken('getToken');
  console.log('Load: Socket')

  ///

  socket.emit('connect game' , {TOKEN: TOKEN , page: page}); // page = index, none

  ///
}


///

socket.on('start game notify' , function(data) {

  ///

    if (data.code == '0' || data.code == '1') {
      modalErrors(data.message , 'green');
    }

  ///
})

///
function writeBalance(money) {
  let balanceHtml = document.querySelector('.BalanceUser span');
  balanceHtml.textContent = `${money}`;
}


async function sendFetch(cd, data) {
  let response = await fetch(cd, {
            method: `Post`,
            headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
            body: JSON.stringify(data)
        });

    let result = await response.json();

   return result;
}




function showMoney(money) {

  ////

  money = money.toString();
  money = money.replace(/\s/g, '');
  money = parseFloat(money)

  ////

 if (Number.isInteger(money) == false) {

    if (!isFinite(money)) {
        return money;
    }

    money = parseFloat(money).toFixed(2);

    var parts = money.toString().split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return parts.join('.');

 }else{
   return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
 }


}


//// GET TOKEN ///

async function getToken(type) { // reload token //

  ///
  return new Promise(async (resolve , reject) => {

  ///

  let result = await sendFetch('/app/v0.1/api/profile' , {action: type , token: CSRF});

  ///

    if (result.status == 200) {

      TOKEN = result.token;
      resolve(result.token);

    } else {

      TOKEN = 'TOKEN';
      resolve('TOKEN');
    }

  })

  ///

};



// Отключение и включение кнопок //


async function onButtons(element , text = 'Начать игру') {
    element.text(text);
    element.attr('disabled' , false);
}

async function offButtons(element , text = 'Загрузка...') {
    element.text(text);
    element.attr('disabled' , true);
}


function tabletCall() {
  let element = event.target,
      elementCheck = element.classList.contains('tabletCall');

  if (elementCheck== false) {
    return
  }


  let ul = document.querySelector('.head-nav ul');

  ul.classList.toggle('active');
}

////

let headName = document.querySelector('.head-profile-fig_txt'),
    profileMenu = document.querySelector('.profile-menu-mob'),
    headNavCont = ``;

let howAcc = document.querySelectorAll('.how-accord');


if (howAcc.length != 0) {
    for (let i = 0; i < howAcc.length; i++) {
      howAcc[i].addEventListener('click', () => showAccord(i));
    }
    function showAccord(i) {
      let howAccContent = howAcc[i].lastElementChild,
                howAccContentHeight = howAccContent.offsetHeight,
                howAccHeight = howAcc[i].offsetHeight,
                howHeight = howAccContentHeight + howAccHeight + 20;
                containsAttr = howAcc[i].hasAttribute('style');


            if (containsAttr == true) {
              howAcc[i].classList.remove('active');
              howAcc[i].removeAttribute(`style`);
              return
            }


            howAcc[i].classList.add('active');
            howAcc[i].style.height = `${howHeight}px`;
    }
}
function modifyIndex(event) {
  let bodyElem = document.querySelector('body'),
      bodyElemOffset = bodyElem.offsetWidth,
      insertElem = document.querySelector('.profile_cont'),
      actionBlock = document.querySelector('.findFirstElement');

      if (bodyElemOffset > 671 || actionBlock == null) {return}

      insertElem.prepend(actionBlock);

}
function modifySettingsMobaile(event) {
    let bodyElem = document.querySelector('body'),
        bodyElemOffset = bodyElem.offsetWidth,
        profileCheck = document.querySelector('#chagePassword') , profileSale = '';

    if ($('.profile-sct-stock.green').length > 0) {
        profileSale = document.querySelector('.profile-sct-stock.green');
    }

    if (bodyElemOffset > 671) {return;}
    if (profileCheck) {


        let firstBlock = document.querySelector('.profile-sct.background'),
        bonusBlock = document.querySelector('.profile-sct-stock'),
        passBlock = document.querySelector('#chagePassword');

        firstBlock.after(bonusBlock);
        // firstBlock.before(bonusBlock);
        bonusBlock.after(passBlock);

    } else if (profileSale) {
        let firstBlock = document.querySelector('.profile-sct.background');
        firstBlock.before(profileSale);

    }
}

function modifyProfileMobaile(event) {
   let  bodyElem = document.querySelector('body'),
        bodyElemOffset = bodyElem.offsetWidth,
        firstBlock = '' , profileCont = '';

    if ($('.inf-section').length > 0) {
        profileCont = document.querySelector('.inf-section');
    }


    if (bodyElemOffset > 671 && profileCont) {return}


    if ($('.profile-sct.background').length > 0) {
        firstBlock = document.querySelector('.profile-sct.background');
        firstBlock.before(profileCont);
    }



  }
function modifyHeader() {
    let bodyElem = document.querySelector('body'),
        bodyElemOffset = bodyElem.offsetWidth;

    if (bodyElemOffset > 671) {return}

    let headDefault = document.querySelector('.head_wrap'),
        insertBlock = document.querySelector('.head_default'),
        headProfile = document.querySelector('.head-profile'),
        headProfileRemove = document.querySelector('.head-profile-fig'),
        headCode = ``;
        headNavCont = document.querySelector('.head-nav ul').innerHTML;

    if (headProfile != null) {
        headProfileRemove.remove();
        headCode = headProfile.innerHTML;
        headName = headName.innerHTML;
    } else {
        headCode = document.querySelector('.head-btn_elem').outerHTML;
    }

    let headNew = `<div class="mobaile_wrap">
                    <button class="head-burger callNav" aria-label="Вызыв модального окна"></button>
                    <h1 class="head_title"><a href="/" style="color: inherit;">LOTBET</a></h1>
                   </div>
                   <div class="mobaile_wrap"> ${headCode} </div>`;
    insertBlock.insertAdjacentHTML('afterbegin', headNew);
}
function modifyProfileMenu(event) {
    let bodyElem = document.querySelector('body'),
        bodyElemOffset = bodyElem.offsetWidth;


    if (bodyElemOffset > 671 || profileMenu == null) {return}

    const lkMenu = document.querySelector('.profile-nav'),
      	  clouselkMenu = document.querySelector('.profile-nav_close'),
      	  openlkMenu = document.querySelector('.profile-menu-mob');

      function openlkMenuFunc() {

      ///  $('.profile-menu-mob').text('Закрыть меню');


        lkMenu.classList.remove('fadeOutLkMenu');
        lkMenu.classList.toggle('fadeInLkMenu');
      }


      function closelkMenu() {

       // $('.profile-menu-mob').text('Открыть меню');

        lkMenu.classList.remove('fadeInLkMenu');
        lkMenu.classList.toggle('fadeOutLkMenu');
      }

      openlkMenu.addEventListener('click', openlkMenuFunc);
      clouselkMenu.addEventListener('click', closelkMenu);
}
  function execCopy(event) {
    let //execInp = document.querySelector('.execCopy'),
        execChange = event.target,
        execChangeCheck = execChange.classList.contains('execCall');

    if (execChangeCheck == false) {return}

    execChange.focus();
    execChange.select();
    document.execCommand('copy');
  }
  // function preloader(event) {
  //   let preloadElem = document.querySelectorAll('.preloader');
  //   for (let i = 0; i < preloadElem.length; i++) {
  //      preloadElem[i].classList.toggle('preloaderColor');
  //      preloadElem[i].classList.toggle('preloaderShine');
  //   }
  // }
  function trimSpace(str) {
    if (typeof str == 'string') {
      let strInner = str.replace(/\s/g, '');
      return strInner;
    }
	  let strInner = str.innerHTML.replace(/\s/g, '');
	  return strInner;
	}
  // function trimSpace(str) {
  //   let strInner;
  //   if (typeof str == 'string') {
  //    strInner = str.replace(/\s/g, '');
  //   } else {

  //    strInner = str.innerHTML.replace(/\s/g, '');
  //   }


  //   return strInner;
  // }

	function trimStr(str, trimSymbol = true) {
	  strInner = trimSpace(str);

	  if (trimSymbol == false) {return Number(strInner)}

	  strInner = strInner.replace(/[^-0-9]/gim,'');
	  return Number(strInner);
	}
  function loadMini(event) {

    let loadBlock = document.querySelector('.loaderFind');

    if (loadBlock == null) {return}
    loadBlock.classList.toggle('loaderTop');

    setTimeout(function(event) {
      loadBlock.classList.toggle('loaderTop');
    }, 1000)
  }
  function animatedBalance(direction,summ) {
    let balance = document.querySelector('.BalanceUser span'),
        directionMode = direction,
        balanceCount,
        balancePlus = (summ.toString()).replace(/\s/g, ''),
        balanceReg = balance.innerHTML.replace(/\s/g, ''),
        balacneAnim = ``,
        balanceText = $('.BalanceUser:not(:first)');


    if (directionMode == `green`) {
      balacneAnim = `<span class="animSpan balanceTop">+ ${showMoney(balancePlus)} L</span>`
      balance.insertAdjacentHTML('afterend', balacneAnim);

      balanceCount =+ parseFloat(balanceReg) + parseFloat(balancePlus);
      balance.textContent = showMoney(balanceCount);
      balanceText.text(showMoney(balanceCount) + ' L');

    } else if (directionMode == `red`) {
      balacneAnim = `<span class="animSpan balanceBottom">- ${showMoney(balancePlus)} L</span>`
      balance.insertAdjacentHTML('afterend', balacneAnim);

      balanceCount = parseFloat(balanceReg) - parseFloat(balancePlus);
      balance.textContent = showMoney(balanceCount);
      balanceText.text(showMoney(balanceCount) + ' L');
    }

    setTimeout(function() {
        let balanceAnimFind = document.querySelector('.animSpan');
        if (balanceAnimFind == null) {return}
        balanceAnimFind.remove();
    }, 500)
  }


function initSelect() {
  let insertBlock = document.querySelector('.__select__content'),
      optionCustom = ``,
      selectTitle = document.querySelector('.__select__title');

  if (typeof AMOUNTS == `undefined`) {
    for (key in games) {


      optionCustom += `<input id="singleSelect${games[key].id}" class="__select__input" type="radio" name="singleSelect"/>
                       <label for="singleSelect${games[key].id}" class="__select__label" data-mode="${games[key].api}">${games[key].title}</label>`;

                     //  checkSelect();
    }
  } else {
    for (let i = 0; i < AMOUNTS.length; i++) {
         optionCustom += `<input id="singleSelect${i}" class="__select__input" type="radio" name="singleSelect"/>
                          <label for="singleSelect${i}" class="__select__label">${AMOUNTS[i]} L</label>`;
    }
    selectTitle.textContent = `${AMOUNTS[0]} L`;
  }

  insertBlock.insertAdjacentHTML('beforeend', optionCustom);

  let optionCustomFirst = document.querySelector('.__select__input');
  optionCustomFirst.classList.add('checked');
  markedLabel(0);
}
function markedLabel(index) {
  let allLabel = document.querySelectorAll('.__select__input');

  for (let i = 0; i < allLabel.length; i++) {
    allLabel[i].removeAttribute('checked');
  }

  allLabel[index].setAttribute('checked', `checked`);
}
function convertNumToString(num) {
  return `${num}`;
}
function cleanTablePreload() {
  let loadContent = document.querySelectorAll('.loadContent');

  for (let i = 0; i < loadContent.length; i++) {
    loadContent[i].className = ``;
  }
}
function closeSelect(event) {
  let elemForCheck = event.target,
      elem = document.querySelector('.__select');

  if (elem == null) {return}

  let elemCheck = elem.compareDocumentPosition(elemForCheck),
      trigger = elem.getAttribute('data-state')

      if (elemCheck == 20) {
          return
      }
      if (trigger == `active`) {
        elem.setAttribute('data-state', ``);
      }
}
function checkSelect() {
  const locationUrl = window.location.href,
        checkUrl = /verify/.test(locationUrl);

  if (checkUrl == true) {
    customSelect();
    importData();
  }
}
function checkParam(param,nonce = false) {
  if (nonce == true && param == undefined) {
    param = 0;
    return param;
  }
  if (param == undefined) {param = ``;return param;} else {return param;}
}
function importData() {
  let form = document.querySelector('.form'),
      selectTitle = document.querySelector('.__select__title'),
      seedId = document.querySelector('.IdJS'),
      mode = ``;


  if (getData.category == undefined || Object.keys(games).length < getData.category || getData.category < 0) {
    getData.category = `Выберите`;
  } else if (getData.category == 1) {
    getData.category = `Кости`;
    getData.mode = `dice`;
  } else if (getData.category == 2) {
    getData.category = `Минер`;
    getData.mode = `miner`;
  }


  form.client_seed.value = `${checkParam(getData.client_seed)}`;
  form.server_seed.value = `${checkParam(getData.server_seed)}`;
  form.nonce.value = `${checkParam(getData.nonce)}`;
  selectTitle.setAttribute(`data-mode`, getData.mode);
  selectTitle.textContent = `${getData.category}`;
}
function activePage() {
  let locationUrl = window.location.href,
        HowUrl = /how/.test(locationUrl),
        PayoutUrl = /payout/.test(locationUrl),
        CheckUrl = /check/.test(locationUrl),
        navTabs = document.querySelectorAll('.head-nav ul li');

  if (HowUrl == true) {
    navTabs[0].classList.add('hover');
  } else if (PayoutUrl == true) {
    navTabs[1].classList.add('hover');
  } else if (CheckUrl == true) {
    navTabs[2].classList.add('hover');
  }
}



function customSelect() {
  const selectSingle = document.querySelector('.__select');
  if (selectSingle == null) {return}
  initSelect();
  const selectSingle_title = selectSingle.querySelector('.__select__title');
  const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

  // Toggle menu
  selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    } else {
      selectSingle.setAttribute('data-state', 'active');
    }
  });

  // Close when click to option
  for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle.setAttribute('data-state', '');
      let selectData = selectSingle_labels[i].getAttribute('data-mode');

      if (selectData == null) {return}

      selectSingle_title.setAttribute('data-mode', selectData);


      if (selectData == 'mines') {

        insertInputForBomb(1);

      }else{

        insertInputForBomb();

      }


    });
  }


}


function insertInputForBomb(type = 0) {

  let count = $('.bombCheck').length;

   if (type == 1) { // add

     if (count <= 0) {

      $('.hiddenSeed').after(` <label for="bomb" class="index-sct-art-label alt bombCheck">
                    <span class="modal-auth-label_txt">Кол-во бомб (от 2 до 24):</span>
                    <input value = '2' required minlength="1" name="bomb" id="bomb" type="number" class="index-sct-art-label_inp NonceJs" placeholder="0">
                </label>`);
     }


   }else{ // dell

     $('.bombCheck').remove();

   }


}


function deleteElem(element) {
	element.remove();
}
function preload() {

    if ($('.preloader').length > 0) {

		  let preloader = document.querySelector('.preloader');
		  preloader.classList.add('fadeOut');
		  setTimeout(deleteElem, 350, preloader);

    }

}
function deferredStyle() {
	let style = `<link rel="stylesheet" href="../css/deferred.css?v=7">`,
		styleInsert = document.querySelector('[href="../css/tablet.css?v=7"]');

	styleInsert.insertAdjacentHTML('afterend', style);
}
function moveResult() {
	let toUp = document.querySelectorAll('.toUp'),
		markBlock = document.querySelector('.index-sct'),
		body = document.querySelector('body').offsetWidth;

	if (body > 1024 || toUp.length == 0) {return}

	for (let i = toUp.length - 1; i >= 0; i--) {
		markBlock.prepend(toUp[i]);
	}
}

//deferredStyle();

window.addEventListener('load', moveResult);
window.addEventListener('load', modifyProfileMobaile);
window.addEventListener('load', ()=> {if (page == 0 || page == 'index') {setTimeout(preload, 150)}});
//window.addEventListener('load', deferredStyle);
window.addEventListener('click', tabletCall);
window.addEventListener('click', closeSelect);
window.addEventListener('load', checkSelect);
window.addEventListener('load', activePage)
window.addEventListener('DOMContentLoaded', modifyHeader);
window.addEventListener('DOMContentLoaded', modifyProfileMenu);
window.addEventListener('DOMContentLoaded', modifySettingsMobaile);
window.addEventListener('DOMContentLoaded', modifyIndex)
window.addEventListener('click', execCopy);

/// register //

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });
}

////
