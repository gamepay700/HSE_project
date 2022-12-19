var domain = document.domain;
var CSRF = $('#CSRF').val(); //csrf


function getCsrf() {

	CSRF = $('#CSRF').val(); //csrf
	return CSRF;

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


///

function defalutSwitch() {
	let	input = document.querySelector('.switch input'),
		text = document.querySelector('.theme-swtich_text span');

	if (input == null) {return}

	if (theme == `light`) {
		input.removeAttribute('checked');
		text.textContent =  `на темную тему`;
	} else {
		input.setAttribute('checked', `checked`);
		text.textContent =  `на светлую тему`;
	}
}
defalutSwitch();

function toggleDarkTheme(event) {
	let element = event.target,
		CSRF = document.querySelector('#CSRF').value;
	if (event.target.classList.contains('round') == false) {return}

	let head = document.querySelector('head'),
		darkTheme = document.querySelector('link[href="/public/style/theme/dark.css?v=7"]'),
		text = document.querySelector('.theme-swtich_text span');

	if (theme == `light`) {
		head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="/public/style/theme/dark.css?v=7">`)
		theme = `dark`;
		text.textContent =  `на светлую тему`;
	} else {
		darkTheme.remove();
		theme = `light`;
		text.textContent =  `на темную тему`
	}

	sendFetch('/app/v0.1/api/auth', { token:CSRF , action:'verifySettings' , mode:theme});

}


window.addEventListener('click', toggleDarkTheme);


$('body').on('submit', '#authForm', async function(event) {
	event.preventDefault();

	let data = $(this).serializeArray();

    let elem = $('.authButtonJs');
	let text = elem.text();

	elem.text('Загрузка...');
	elem.prop('disabled' , true);

	data.push(
		   {name: "action", value: 'login'},
		   {name: "token", value: await getCsrf()}
	);

	//

	$.post('/app/v0.1/api/auth' , data , function(data) {

		if (data.status == '200') {
			window.location.replace('https://'+domain+'/'); // load lk //
		}else{
		  modalErrors(data.status , 'red');
		  grecaptcha.reset(captha);

		  elem.text(text);
	      elem.prop('disabled' , false);
		}

	});

});

function trimResult() {
  let removeBlocks = document.querySelectorAll('.removeBlock');

  for (let i = 0; i < removeBlocks.length; i++) {
    removeBlocks[i].remove();
  }
}
function checkResult(seed, summ , type = 0) {

  let block;

  type == 1 ?
   block = `<label for="summ" class="index-sct-art-label alt label">
                        <span class="modal-auth-label_txt">Поле:</span>
                        <span class="index-sct-art-text">${summ}</span>
                        <span class="index-sct-art-text">0 - кристалл, 2 - бомба</span>
                    </label>`

  : type == 2 ?

    block = `<label for="summ" class="index-sct-art-label alt label">
                        <span class="modal-auth-label_txt">Число:</span>
                        <input disabled required="" minlength="1" name="summ" id="summ" type="text" class="index-sct-art-label_inp" placeholder="Например: 1022" value="${summ}">
                    </label>`
  :
   block = `<label for="summ" class="index-sct-art-label alt label">
                        <span class="modal-auth-label_txt">Сумма:</span>
                        <input disabled required="" minlength="1" name="summ" id="summ" type="text" class="index-sct-art-label_inp" placeholder="Например: 1022" value="${summ}">
                    </label>`


  let reslutBlock = `<article class="index-sct-art alt removeBlock">
                    <h3 class="index-sct-art_minTitle bottomMin">Информация о проверке:</h3>
                    <label for="serverSeed" class="index-sct-art-label alt label">
                        <span class="modal-auth-label_txt">Серверный сид ( зашифрованный в SHA-256 ):</span>
                        <input disabled required="" minlength="1" name="serverSeed" id="serverSeed" type="text" class="index-sct-art-label_inp" placeholder="Например: 1022" value="${seed}">
                    </label>
                    ${block}
                </article>`;
  const resultInsert = document.querySelector('.resultInsert');

  resultInsert.insertAdjacentHTML('afterend', reslutBlock);
}
function genResult(mode) {
  let resultBlock = ``;
  const resultInsert = document.querySelector('.resultInsert');

  if (mode == 'cubs') {

    reslutBlock = `<article class="index-sct-art alt removeBlock">
                <h3 class="index-sct-art_minTitle bottomMin">Как мы генерируем число ?</h3>

                <p class="index-sct-art-text">Мы представили пример на языке PHP.
                </p>
                <p class="index-sct-art-text grey">
                    &lt;?php <br><br>


                 function getCubsNumber($data)<br>
				{<br><br>

				  $min = 0;<br>
				  $max = 100;<br><br>


				  $hash = hash('sha512' , $data['client_seed'].$data['server_seed'].$data['nonce']);<br>
				  $normalized = hexdec($hash) / (16 ** strlen($hash));<br><br>

				  return number_format($min + $normalized * ($max - $min) , 2 , '.' , '');<br>
				}


                 <br><br>



                    ?&gt;
                </p>
            </article>`


  }else if (mode == `mines`) {
    reslutBlock = `<article class="index-sct-art alt removeBlock">
                <h3 class="index-sct-art_minTitle bottomMin">Как мы генерируем поле ?</h3>
                <p class="index-sct-art-text">В основе используется Тасование Фишера — Йетса. Изначально генерируется поле с числами и хеш для сида.
                Хеш мы переводим в байты, перемешиваем и получаем ключи для бомб.</p>
            </article>`
  } else if (mode == `dice`) {
    reslutBlock = `<article class="index-sct-art alt removeBlock">
                <h3 class="index-sct-art_minTitle bottomMin">Как мы генерируем число ?</h3>

                <p class="index-sct-art-text">Мы представили пример на языке PHP.
                </p>
                <p class="index-sct-art-text grey">
                    &lt;?php <br><br>


                function getNumber($data){ // получим дату ( активные сиды ) <br><br>

                 //<br><br>

                 updateSeed($data['users_id']); // обновим Nonce для пользователя<br><br>

                 ///<br><br>

                 $hash = hash('sha512' , $data['client_seed'].$data['server_seed'].$data['nonce']); // подставляем значения<br><br>
                 $normalized = hexdec($hash) / (16 ** strlen($hash)); // получение числа <br><br>

                 ///<br><br>

                 return floor(5 + $normalized * 31); // переводим число в нормальный вид<br><br>

                 }  <br><br>



                    ?&gt;
                </p>
            </article>`
  } else {
    modalErrors(`Мы не нашли режим ${mode}`, `red`);
  }

  resultInsert.insertAdjacentHTML('afterend', reslutBlock);
}

async function signUpQuery(event) {
    	event.preventDefault();
    	let form = document.querySelector('.form'),
    		data = new FormData(form),
    		elem = event.target,
    		elemText = elem.innerHTML,
        	csrf = document.querySelector('#CSRF').value,
        	dataAction = form.action.value,
        	mode = document.querySelector('.__select__title').getAttribute('data-mode'),
        	allInputsForm =  document.querySelectorAll('.form .index-sct-art-label > input');

        if (mode == null) {
        	modalErrors(`Укажите режим!`, `red`);
        	return
        }
        for (let i = 0; i < allInputsForm.length; i++) {
        	if (allInputsForm[i].value == ``) {
        		modalErrors(`Заполните все поля формы!`, `red`)
        		return
        	}
        }

        data.append('token', await getCsrf());
        data.append('mode', mode);
        data.delete('singleSelect');
    	elem.innerHTML = `Загрузка...`
    	elem.setAttribute('disabled', true);

	    let response = await fetch('/app/v0.1/api/public', {
	            method: `Post`,
	            body: data
	        });

	    let result = await response.json();

	    if (result.status == `200`) {


            modalErrors('Результат загружен', `green`)

	    	trimResult();
	    	genResult(mode);

	    	///

	    	if (mode == 'cubs') {
                checkResult(result.info.server_seed, result.info.number , 2);
	    	}else if (mode == `mines`) {
                checkResult(result.info.server_seed, result.info.area , 1);
	    	} else if (mode == `dice`) {
	    		checkResult(result.info.server_seed, result.info.number);
	    	}

	    	//

		    elem.innerHTML = `${elemText}`
	        elem.removeAttribute('disabled');

	    }else {
	    	elem.innerHTML = `${elemText}`
    		elem.removeAttribute('disabled')
	    	result.status
	    	modalErrors(result.status, `red`)
	    }



	}


async function stopGameQuery(time, dataId, stopTimer = false) {

	    console.log('Load: Timer_Query')

	    ///
	    if (stop == true) {return}

    	let data = new FormData(),
        	csrf = document.querySelector('#CSRF').value,
        	queryInterval;

        data.append('token', csrf);
        data.append('timer', time);
        data.append('battle_id', dataId);

	    let response = await fetch('/app/v0.1/api/modes', {
	            method: `Post`,
	            body: data
	        });

	    let result = await response.json();

	   if (result.status == 200) {
	   	timeStart = false;
	   	stopTimer = false;

	   	///

	   //	let token = await getToken('getToken'); // send my token
	   	socket.emit('add amount' , {TOKEN: result.info})

	   	///

	   } else {
	   	stopTimer = true;
	   	//setTimeout(stopGameQuery, 5000,  time, dataId, stopTimer);
	   }

	}


async function promoFetch(event) {
	event.preventDefault();
	let data = new FormData(),
    	csrf = document.querySelector('#CSRF').value,
    	form = document.querySelector('.bonus-form'),
    	button = event.target,
    	buttonCheck = button.classList.contains(`bonus`),
    	buttonTxt = button.textContent;

    if (buttonCheck != true) {return}

    lockButton(button);

	// let captha = await captchaCheckPromo();

    data.append('token', await getCsrf());
    data.append('action', `getPromo`);
    data.append('code', form.bonus.value);
    data.append('g-recaptcha-response', await captchaResult());

    let response = await fetch('/app/v0.1/api/profile', {
            method: `Post`,
            body: data
        });

    let result = await response.json();

   if (result.status == 200) {

   	    ///

   	    if (result.type == 1) {

   	       if (payment == 0) {payment = result.bonus;}
           checkModals('payment');

   	    }else{
           modalErrors(`Бонус + ${showMoney(result.bonus)} L был зачислен на счет`, `green`);
           animatedBalance(`green`, showMoney(result.bonus));
   	    }

	   	//writeBalance(showMoney(response.bonus));

	   	unlockButton(buttonTxt, button)
	   	$('#bonus').val('');

	   	///


   } else {

   	    //

	   	modalErrors(result.status, `red`);
	   	unlockButton(buttonTxt, button)

	   	///
   }
   closeModals();

}
function unlockButton(buttonTxt, button) {
	button.textContent = `${buttonTxt}`;
   	button.removeAttribute(`disabled`);
}
function lockButton(button, txt = `Загрузка...`) {
	button.setAttribute('disabled', `true`);
	button.textContent = `${txt}`;
}

	async function getMoney() {
    	let data = new FormData(),
        	csrf = document.querySelector('#CSRF').value;

        data.append('token', await getCsrf());
        data.append('action', `getBalance`);

	    let response = await fetch('/app/v0.1/api/profile', {
	            method: `Post`,
	            body: data
	        });

	    let result = await response.json();

	   if (result.status == 200) {
	   	writeBalance(showMoney(result.balance))
	   } else {
	   	modalErrors(result.status, `red`);
	   }

	}

///

$('body').on('submit', '#resetForm', async function(event) {
	event.preventDefault();

	let data = $(this).serializeArray();

	data.push(
		   {name: "action", value: 'reset'},
		   {name: "token", value: await getCsrf()}
	);


	let elem = $('.sendButtonJs');
	let text = elem.text();

	elem.text('Загрузка...');
	elem.prop('disabled' , true);

	//

	$.post('/app/v0.1/api/auth' , data , function(data) {

		if (data.status == '200') {

			modalErrors('Инструкция отправлена! Перейдите на почту' , 'green');
			document.getElementById('resetForm').reset()

			elem.text(text);
	        elem.prop('disabled' , false);


			grecaptcha.reset(captha);
			//window.location.replace('https://'+domain+'/profile/');
		}else{

		  modalErrors(data.status , 'red');
		  grecaptcha.reset(captha);

		  elem.text(text);
	      elem.prop('disabled' , false);
		}

	});


});

///

$('body').on('submit', '#regForm', async function(event) {
	event.preventDefault();

	let data = $(this).serializeArray();

	data.push(
		   {name: "action", value: 'register'},
		   {name: "token", value: await getCsrf()}
	);

	//

	let elem = $('.regButtonJs');
	let text = elem.text();

	elem.text('Загрузка...');
	elem.prop('disabled' , true);

	///

	$.post('/app/v0.1/api/auth' , data , function(data) { // post request //

		if (data.status == '200') {
			window.location.replace('https://'+domain+'/?action=register&money='+data.money);
		}else{
		  modalErrors(data.status , 'red');
		  grecaptcha.reset(captha);

		  elem.text(text);
	      elem.prop('disabled' , false);
		}
	});



});



$('body').on('submit', '#payForm', async function(event) {
	event.preventDefault();

	let data = $(this).serializeArray();

	data.push(
		   {name: "action", value: 'payment'},
		   {name: "token", value: await getCsrf()},
	);

	//

	let elem = $('.payinBtn');
	let text = elem.text();

	elem.text('Загрузка...');
	elem.prop('disabled' , true);

	///

	$.post('/app/v0.1/api/profile' , data , function(data) {
		if (data.status == '200') {

			location.replace(data.url);


			elem.text(text);
	        elem.prop('disabled' , false);
		}else{
		  modalErrors(data.status , 'red');
		  elem.text(text);
	      elem.prop('disabled' , false);
		}
	});


});

///


$('body').on('submit', '#payoutForm', async function(event) {
	event.preventDefault();

	let data = $('#payoutForm').serializeArray();

	data.push(
		   {name: "action", value: 'payout'},
		   {name: "token", value: await getCsrf()},
	);

	//

	let elem = $('.payoutBtn');
	let text = elem.text();

	elem.text('Загрузка...');
	elem.prop('disabled' , true);

	///

	$.post('/app/v0.1/api/profile' , data , function(data) {
		if (data.status == '200') {


			animatedBalance(`red`,showMoney(data.amount));

			modalErrors('Вывод создан!' , 'green');
			closeModals(); // close modal //

		}else{

		  modalErrors(data.status , 'red');
		  //grecaptcha.reset();

		  elem.text(text);
	      elem.prop('disabled' , false);
		}
	});


});


//


$('body').on('click', '.exitButton', async function(event) {
	event.preventDefault();

	let data = await sendFetch('/app/v0.1/api/profile' , {action: 'exit' , token: await getCsrf()})

	///


		if (data.status == '200') {

			// отмена поиска игр //

			socket.emit('cancel game' , {TOKEN: data.token});
			window.location.replace('https://'+domain+'/');

			///
		}

});


//

$('body').on('submit', '#changePassword', function(event) {
	event.preventDefault();

	let data = $(this).serializeArray();

	data.push(
		   {name: "action", value: 'changePassEmail'},
		   {name: "token", value: CSRF},

	);

	//

	let elem = $('.verifyButton');
	let text = elem.text();

	elem.text('Загрузка...');
	elem.prop('disabled' , true);

	///

	$.post('/app/v0.1/api/auth' , data , function(data) {
		if (data.status == '200') {

			modalErrors('Пароль восстановлен' , 'green');
			document.getElementById('changePassword').reset()

	       setTimeout(function() {
			window.location.replace('https://'+domain+'/');
		    } , 2000);


		}else{
		  modalErrors(data.status , 'red');
		  elem.text(text);
	      elem.prop('disabled' , false);
		}
	});


});

///

$('body').on('submit', '#verifyForm', async function(event) {
	event.preventDefault();

	let data = $(this).serializeArray();

	data.push(
		   {name: "action", value: 'verifySettings'},
		   {name: "token", value: await getCsrf()},
	);

	//

	let elem = $('.verifyButton');
	let text = elem.text();

	offButtons(elem);

	///

	$.post('/app/v0.1/api/auth' , data , function(data) {
		if (data.status == '200') {

			if (data.email == 'send') {
				modalErrors('Инструкция отправлена на почту' , 'green');
			}else{
				modalErrors('Сохранено' , 'green');
			}

			onButtons(elem , text);


		}else{
		  modalErrors(data.status , 'red');
		  onButtons(elem , text);
		}
	});


});


///



$('body').on('submit', '#chagePassword', async function(event) {
	event.preventDefault();

	let data = $(this).serializeArray();

	data.push(
		   {name: "action", value: 'changePassword'},
		   {name: "token", value: await getCsrf()},
	);

	//

	let elem = $('.changePassButton');
	let text = elem.text();

	offButtons(elem);

	///

	$.post('/app/v0.1/api/profile' , data , function(data) {

		if (data.status == '200') {

		  modalErrors('Пароль изменен!' , 'green');
		  document.getElementById('chagePassword').reset()

	      onButtons(elem , text);

		}else{
		  modalErrors(data.status , 'red');
		  onButtons(elem , text);
		}

	});



});

///


$('body').on('click', '.statsUsers', async function(event) {
	event.preventDefault();

	let data = [];
	let type = $(this).attr('data-button'); // attribyte
	let user = $(this).attr('data-user'); // attribyte

	///

	let elem = $(this);
	let text = elem.text();

	offButtons(elem);

	///

	let result = await sendFetch('/app/v0.1/api/profile' , {type: type , action: 'showStats' , token: await getCsrf(), user:user});

	if (result.status == 200) {

		if (user) {
			$('.showTable').attr('style', '');

		}

	    let block = `<table class="index-table long topMin"><thead>${result.html.props}</thead><tbody>${result.html.table}</tbody></table>`;
		$('.showTable').html(block);

	}else{

		modalErrors(result.status , 'red');
	}

	//

	onButtons(elem , text);


});


///

$('body').on('click', '.reloadSeed', async function(event) {
	event.preventDefault();

	let data = [];

	data.push(
		   {name: "action", value: 'reloadSeed'},
		   {name: "token", value: await getCsrf()},
	);

	//

	let elem = $('.reloadSeed');
	let text = elem.text();

	offButtons(elem);

	///

	$.post('/app/v0.1/api/profile' , data , function(data) {
		if (data.status == '200') {

		  modalErrors('Данные обновлены' , 'green');

		  ///

          $('.ClientSeedJs').val(data.info.client_seed);
          $('.ServerSeedJs').val(data.info.server_seed);
          $('.IdJS').text(data.info.id);
          $('.NonceJs').val('0');

		  ///

		  onButtons(elem , text);

		}else{
		  modalErrors(data.status , 'red');
		  onButtons(elem , text);
		}
	});


});

///


$('body').on('click', '.refMoney', async function(event) {
	event.preventDefault();

	let data = [];

	data.push(
		   {name: "action", value: 'refMoney'},
		   {name: "token", value: await getCsrf()},
	);

	//

	let elem = $('.refMoney');
	let text = elem.text();

	elem.text('Загрузка...');
	elem.prop('disabled' , true);

	///

	$.post('/app/v0.1/api/profile' , data , function(data) {
		if (data.status == '200') {

		  modalErrors('Бонус получен!' , 'green');

		  elem.text('Снять 0.00 L');
	      elem.prop('disabled' , false);

	      animatedBalance(`green`,showMoney(data.bonus));

		}else{
		  modalErrors(data.status , 'red');
		  elem.text(text);
	      elem.prop('disabled' , false);
		}
	});


});

///


async function checkGame(id , callback) {

	if (id == '0') {
		return;
	}

	///

	let data = [];

	data.push(
		   {name: "action", value: 'checkGame'},
		   {name: "token", value: await getCsrf()},
		   {name: "id", value:id}
	);

	///

    $.post('/app/v0.1/api/public' , data , function (data) {


           callback(data);

    })

    ///
}

///


$('body').on('submit', '#checkGame', function(event) {
	event.preventDefault();

	//

	let elem = $('.checkGame');
	let text = elem.text();

	let id = $(this).serializeArray();
	id = id['0']['value']; // id game //

	offButtons(elem);

	///


	checkGame(id , function(data) {

		loadResultInGames(data);

		onButtons(elem , text);

	    ///

	});

});

function loadResultInGames(data) {
     if (data.status == '200') {

			history.pushState(null, null, '?id='+data.info.battle.id);

			modalErrors('Результат загружен' , 'green');

			if (data.info.category.api == 'dice') {
				gameHtmlDice(data.info);
			}else if (data.info.category.api == 'battle') {
               gameHtmlBattle(data.info);
			}else if (data.info.category.api == 'mines') {
               gameHtmlMines(data.info);
			}else if (data.info.category.api == 'cubs') {
               gameHtmlCubs(data.info);
			}

			document.getElementById('checkGame').reset()

		}else{
			modalErrors(data.status , 'red');
		}
}

//

function gameHtmlDice(data) {

	///

	let block = '',
	    winnerInfo;
	let players = data.players;
	let winner = 'Игра не завершена';

	///

	$('.gameResultsCheck').remove();

	///
	if (data.battle.others == `draw`) {
		winner = `Ничья`;
	}else if (data.battle.others) {

       winnerInfo = JSON.parse(data.battle.others);
       winnerInfo = winnerInfo.users_id;

	}

	///

	for (key in players) {

		if (winnerInfo == players[key].id) {
		  winner = '<a class = "getSeed getSeedCheck" token = "'+players[key].token+'"  >'+players[key].login+'</a>';
		}

		///

		block += '<a class = "getSeed getSeedCheck" token = "'+players[key].token+'"  >'+players[key].login+'</a>';

	}


	///

	$('.index-sct:last').prepend(`
     <h2 class="index-sct_title  gameResultsCheck toUp">${data.category.title} #${data.battle.id}</h2>
            <div class="index-sct-art alt gameResultsCheck toUp">
                <div class="check_wrap">
                    <article>
                        <h3 class="index-sct-art_minTitle bottomMin">Информация</h3>
                        <p class="index-sct-art-text dicorColum">
                            <span>Режим:  <mark>${data.category.title}</mark></span>
                            <span>Ставка:  <mark>${data.battle.amount} L</mark></span>
                            <span>Победитель: ${winner}</span>
                        </p>
                    </article>

                    <article>
                        <h3 class="index-sct-art_minTitle bottomMin">Результат</h3>
                        <p class="index-sct-art-text dicorColum">
                            <span>Игроки: ${block}</span>
                        </p>
                    </article>
                </div>



        `);

	moveResult();
}



function gameHtmlBattle(data) {

	///

	console.log('Load: Battle')

	///

	let block = '', winner = 'Игра не завершена' , players = data.players , others = JSON.parse(data.battle.others) , diapazone = 0;


	///

	$('.gameResultsCheck').remove();

	///


	for (key in players) {

		if (players[key].status == '1') { // winner
		  winner = '<a href = "/user/'+players[key].id+'"   >'+players[key].login+'</a> Ставка: '+showMoney(players[key].bet)+' L ('+showMoney(players[key].procent)+'%)';
		}

		///

		diapazone = JSON.parse(players[key].diapazone);
		block += '<a href = "/user/'+players[key].id+'"  >'+players[key].login+'</a> Ставка: '+showMoney(players[key].bet)+' L ('+showMoney(players[key].procent)+'%) ( Диапазон: '+showMoney(diapazone[0])+' до '+showMoney(diapazone[1])+') <br>';

	}


	///

	$('.index-sct:last').prepend(`
     <h2 class="index-sct_title  gameResultsCheck toUp">${data.category.title} #${data.battle.id}</h2>
            <div class="index-sct-art alt gameResultsCheck toUp">
                <div class="check_wrap altWrap">
                    <article class="noneDot">
                        <h3 class="index-sct-art_minTitle bottomMin">Информация</h3>
                        <p class="index-sct-art-text dicorColum">
                            <span>Режим:  <mark>${data.category.title}</mark></span>
                            <span>Банк:  <mark>${data.battle.amount} L</mark></span>
                            <span>Соль:  <mark>${others.salt}</mark></span>
                            <span>Число:  <mark>${others.number}</mark></span>
                            <span>Генерация:  <mark><a rel="noreferrer noopener" target = "_blank" href = "https://emn178.github.io/online-tools/sha256.html">${others.number+'|'+others.salt}</a></mark></span>
                            <span>Сид:  <mark class="seed">${others.hash}</mark></span>
                            <span>Победитель: ${winner}</span>
                        </p>
                    </article>

                    <article class="noneDot">
                        <h3 class="index-sct-art_minTitle bottomMin">Результат</h3>
                        <p class="index-sct-art-text dicorColum">
                            <span>${block}</span>
                        </p>
                    </article>
                </div>



        `);

	moveResult();
}

///



function gameHtmlCubs(data) {

	///

	console.log('Load: cubsCheck')

	///

	let area , nonce , server_seed , client_seed , number , result = 0 , chance = 0;
	let block = '', players = data.players;

	///

	$('.gameResultsCheck').remove();

	///

	for (key in players) {

		area = JSON.parse(players[key].others);
		block = '<a href = "/user/'+players[key].id+'"  >'+players[key].login+'</a>';

		///

		nonce = players[key].seeds.nonce
		client_seed = players[key].seeds.client_seed
		server_seed = players[key].seeds.server_seed

		///

		number = players[key].info.number
		result = players[key].info.result
		chance = players[key].info.chance

	}

	///

	$('.index-sct:last').prepend(`
     <h2 class="index-sct_title  gameResultsCheck toUp">${data.category.title} #${data.battle.id}</h2>
            <div class="index-sct-art alt gameResultsCheck toUp">
                <div class="check_wrap altWrap">
                    <article class="noneDot">
                        <h3 class="index-sct-art_minTitle bottomMin">Информация</h3>
                        <p class="index-sct-art-text dicorColum">
                          <span>Режим:  <mark>${data.category.title}</mark></span>
                          <span>Ставка:  <mark>${data.battle.amount} L</mark></span>


                          <span>Число:  <mark>${number}</mark></span>
                          <span>Шанс:  <mark>${chance}%</mark></span>
                          <span>Результат:  <mark>${result == 0 ? '<b class = "red">Проигрыш</b>' : '<b class = "green">Выигрыш</b>'}</mark></span>

                        </p>
              </article>


              <article class="noneDot">
                 <h3 class="index-sct-art_minTitle bottomMin">Проверка</h3>
                 <p class="index-sct-art-text dicorColum">
                    <span>Игрок:  <mark>${block}</mark></span>
                    <span>Client Seed:  <mark style = "word-break: break-all;" >${client_seed}</mark></span>
                    <span>Server Seed:  <mark style = "word-break: break-all;" >${server_seed}</mark></span>
                    <span>Nonce:  <mark>${nonce}</mark></span>
                 </p>
             </article>

       </div>`);

	moveResult();
}



function gameHtmlMines(data) {

	///

	console.log('Load: minerCheck')

	///

	let area , nonce , server_seed , client_seed , bomb , step = 0;
	let block = '', players = data.players;

	///

	$('.gameResultsCheck').remove();

	///

	for (key in players) {

		area = JSON.parse(players[key].others);
		block = '<a href = "/user/'+players[key].id+'"  >'+players[key].login+'</a>';

		///

		nonce = players[key].seeds.nonce
		client_seed = players[key].seeds.client_seed
		server_seed = players[key].seeds.server_seed

		///

		bomb = players[key].info.bomb
		step = players[key].info.step

	}

	///

	$('.index-sct:last').prepend(`
     <h2 class="index-sct_title  gameResultsCheck toUp">${data.category.title} #${data.battle.id}</h2>
            <div class="index-sct-art alt gameResultsCheck toUp">
                <div class="check_wrap altWrap">
                    <article class="noneDot">
                        <h3 class="index-sct-art_minTitle bottomMin">Информация</h3>
                        <p class="index-sct-art-text dicorColum">
                          <span>Режим:  <mark>${data.category.title}</mark></span>
                          <span>Ставка:  <mark>${data.battle.amount} L</mark></span>

                          <span>Поле:  <mark style = "word-break: break-all;" >${area}</mark></span>
                          <span> 0 - кристалл , 1 - открытый кристалл , 2 - бомба , 3 - открытая бомба</span>


                          <span>Бомб:  <mark>${bomb}</mark></span>
                          <span>Шаг:  <mark>${step}</mark></span>

                        </p>
              </article>


              <article class="noneDot">
                 <h3 class="index-sct-art_minTitle bottomMin">Проверка</h3>
                 <p class="index-sct-art-text dicorColum">
                    <span>Игрок:  <mark>${block}</mark></span>
                    <span>Client Seed:  <mark style = "word-break: break-all;" >${client_seed}</mark></span>
                    <span>Server Seed:  <mark style = "word-break: break-all;" >${server_seed}</mark></span>
                    <span>Nonce:  <mark>${nonce}</mark></span>
                 </p>
             </article>

       </div>`);

	moveResult();
}



///

$('body').on('click', '.getSeed', function(event) {
	event.preventDefault();

	//

	let data = [];
	let id = $(this).attr('token'); // battleuser //


	//

	data.push(
		   {name: "action", value: 'getSeed'},
		   {name: "id", value: id},
		   {name: "token", value: CSRF}
	);

	//

	$.post('/app/v0.1/api/public' , data , function(data) {
		if (data.status == '200') {
			checkGameModal(data.info); // modal//
		}else{
		    modalErrors(data.status , 'red');
		}

	});

	//

});



/// Нажатие на Кинуть кости, считываем форму игры

$('body').on('submit', '#startGameMode', function(event) {
    event.preventDefault();

    let data = $('#startGameMode').serializeArray();

    let elem = $('.startGameMode');
    let text = elem.text();
    offButtons(elem);

    //

    data.push(
        {name: "token", value: CSRF},  // send to games //
    );

    //

    $.post('/app/v0.1/api/modes' , data , async function(data) {

        if (data.status == '200') {

            ///

            start_reload = false;
            delete data['status'];

            /// dice game //

            await appAnimate(data.info.cubs);

            setTimeout(function() {

              ///

              modalErrors('Вам выпало - '+data.info.sum+' очков' , 'green');
              $('.myPoints').html(data.info.sum+' очков')

              ///

              elem.text('Ожидайте остальных игроков...')

              setTimeout(function() {
              	socket.emit('add amount' , {TOKEN: data.info.token})
              } , 700)


              ///

            }, 1000);

            ///


        }else{

          modalErrors(data.status , 'red');
          onButtons(elem , text);
        }

    });




});


$('body').on('submit', '#getBonusForUser', async function(event) {
	event.preventDefault();


	let data = $(this).serializeArray();

    let elem = $('.getBonusForUser');
	let text = elem.text();

	offButtons(elem);

	data.push(
		   {name: "action", value: 'getBonus'},
		   {name: "type", value: 'VK'},
		   {name: "token", value: await getCsrf()}
	);

	//

	$.post('/app/v0.1/api/profile' , data , function(data) {

		if (data.status == '200') {
			modalErrors('Бонус +'+data.bonus+' L был зачислен!')

			///

	        animatedBalance(`green`,data.bonus);


	        ///

	        closeModals();

		}else{
		  modalErrors(data.status , 'red');
		  onButtons(elem , text);
		}

	});

});


$('body').on('click', '.getBonusForUserDay', function(event) {
	event.preventDefault();
    getBonusEveryDay($('.getBonusForUserDay'));
});


$('body').on('click', '.getBonusDays', function(event) {
	event.preventDefault();
    checkModals($(this).attr('type'));
});


$('body').on('click', '.cancelPayout', function(event) {
	event.preventDefault();
    cancelPayout($(this) , $(this).attr('data-id'));
});

async function cancelPayout(elem , id) {

	offButtons(elem);

	let result = await sendFetch('/app/v0.1/api/profile', {action: 'cancelPayout' , id: id , token: await getCsrf()});

	if (result.status == 200) {

		//

		modalErrors('Вывод отменен' , 'green');
		animatedBalance(`green`,result.money);
		elem.replaceWith('<b class = "red">Отменено</b>');

		//

	}else{
		modalErrors(result.status, 'red');
		onButtons(elem , 'Отменить вывод');
	}


}


/// BONUS ON EVERY DAY ///

async function getBonusEveryDay(button) {

        let data = new FormData;

        data.append('token', CSRF);
        data.append('action', 'getBonusEveryDay');
        offButtons(button)

	    let response = await fetch('/app/v0.1/api/profile', {
	            method: `Post`,
	            body: data
	        });

	    let result = await response.json();

	    if (result.status == `200`) {

           	modalErrors('Бонус +'+result.bonus+' L был зачислен!')

			///

	        animatedBalance(`green`,result.bonus);

	        closeModals();

	    }else {
	    	onButtons(button , 'Получить бонус');
	    	modalErrors(result.status, `red`)

	    	closeModals();
	    }



	}

///

async function getAddElements(limit , type , user = 0 ) {

	let result = await sendFetch('/app/v0.1/api/profile' , {action: 'addElements' , type: type , token: await getCsrf() , limit: limit , user: user});

	if (result.status == 200) { // add to data
       $('.index-table_nth:last').after(result.table);
	}

}

///

$('body').on('click', '.addElements', async function(event) {
	event.preventDefault();

	let limit = $(this).attr('data-limit');
	let type = $(this).attr('data-type');
	let user = $(this).attr('data-user');

	let elem = $(this).parent();

	elem.html(`<div style = 'margin: 0 auto;' class="loader mini">
                      <svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"></circle></svg>
                 </div>`);

	await getAddElements(limit , type , user);

	elem.remove();

});
