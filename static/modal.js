let modalAll = document.querySelector('.modal'),
    code = ``;


var adress = document.domain;


    function showModal() {
        let modalContent = modalAll.firstElementChild;
        blockScroll();

        modalAll.classList.remove('modal-close'); //Show block
        modalContent.classList.add('modalShow'); //Start anim and pin up Element
    }

    function insertCodeModal(code) {
        modalAll.insertAdjacentHTML('afterbegin', code);
    }

    function closeModal(event) {

        let elem = event.target,
            elemCheck = elem.classList.contains('exitOfModal');
        if (elemCheck == false) {return}
        event.preventDefault();
        closeModals();
    }
    function blockScroll() {
        let body = document.querySelector('body');

        body.classList.add('hidden');
    }
    function unlockScroll() {
        let body = document.querySelector('body');

        body.classList.remove('hidden');
    }
    function clickOutObject(event) {
        let elem = event.target;

        if (elem == modalAll) {closeModals();}
    }
    function closeModals() {
        let modalContent = modalAll.firstElementChild;
        cleanClass();
        modalContent.classList.add('modalOut');
        setTimeout(function () {
            modalAll.innerHTML = ``;
            modalAll.classList.add('modal-close');
        }, 300);
        unlockScroll();

        modalPadding()
    }

    function cleanClass() {
        let modalContent = modalAll.firstElementChild;
        modalContent.classList.remove('modalOut');
        modalContent.classList.remove('modalShow');
    }

    function modalAuth(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('auth');

        if (elemCheck == false) {return}


        modalAuthCode(elem);

    }
    function modalAuthCode(elem) {
         modalAll.innerHTML = ``;

        let result = htmlOfAuth(elem);

        insertCodeModal(result);
        showModal();

        setTimeout(function() {
           recaptchaCallbackReload();
        } , 500);
    }
    function changeStep(event) {
        let elem = event.target;
        let elemCheck = elem.classList.contains('step');


        if (elemCheck == false) {return}

        modalAll.innerHTML = ``;

        let result = htmlOfAuth(elem);

        insertCodeModal(result);
        showModal();

        setTimeout(function() {
           recaptchaCallbackReload();
        } , 500)

    }

    async function checkModals(type) {

        modalAll.innerHTML = ``;

        let result = await showModalsForNotify(type);

        insertCodeModal(result);
        showModal();

    }


    function getBonus(event) {
        let elem = event.target;
        let elemCheck = elem.classList.contains('getBonus');

        if (elemCheck == false) {return}

        checkModals('getBonus');
    }


    ///

    var captha;
    function recaptchaCallbackReload() {

      if ($('#captha').length) {

        if (theme == 'dark') { // add attribute
           $('#captha').attr('data-theme' , 'dark');
        }


         captha = grecaptcha.render('captha', {
           'sitekey' : captha_code,
         });
      }

    }

    ///

    async function showModalsForNotify(type) {

        let code = '';


        if (type == 'getBonus') {

            code = `<form id = "getBonusForUser" class="modal-auth widthCont authLine modalAnim">
                        <h2 class="modal-auth_title">Получить бонус +${params.VK_PARAMS.bonus} L</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth rigthMargin" aria-label="Закрыть окно"></a>

                        <p class="modal-auth_subTitle top">Чтобы получить бонус на баланс подпишитесь на нашу группу и рассылку!</p>

                        <label for="forget" class="modal-auth-label ">
                            <span class="modal-auth-label_txt">Подпишитесь на группу</span>
                            <a  href = "${params.VK_PARAMS.group}" target = "_blank" class="modal-auth_btn blue">Подписаться</a>
                        </label>


                        <label for="forget" class="modal-auth-label topMargin">
                            <span class="modal-auth-label_txt">Подпишитесь на рассылку Промо-кодов</span>
                            <a href = "${params.VK_PARAMS.notify}" target = "_blank" class="modal-auth_btn blue">Подписаться</a>
                        </label>

                        <button class="modal-auth_btn getBonusForUser buttonTop">Получить бонус</button>

                        <p class="modal-auth_subTitle">Если Вы выполнили все условия - нажмите <br>"Получить бонус"</p>

                    </form>`;

        }else if (type == 'getBonusEveryDay') {


            code = `<form id = "getBonusDaysOneForUser" class="modal-auth widthCont authLine modalAnim">
                        <h2 class="modal-auth_title">Бонусы каждый день!</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth rigthMargin" aria-label="Закрыть окно"></a>
                        <p class="modal-auth_subTitle top">Заходите каждый день и получайте <br>награду до <b>100 L</b> на баланс!</p>
                        <button class="modal-auth_btn getBonusForUserDay buttonTop">Получить бонус</button>
                    </form>`;

        }  else if (type == 'getVideo') {

            code = `<form class="modal-auth widthCont authLine modalAnim">
                        <h2 class="modal-auth_title">Ознакомьтесь с системой</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth rigthMargin" aria-label="Закрыть окно"></a>
                        <iframe style="height: 200px;margin-top: 50px;" width="500" height="315"  src="https://www.youtube.com/embed/2rloN-4b-rc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </form>`;

         }  else if (type == `captcha`) {
            code = `<form class="modal-auth widthCont authLine modalAnim findCaptchaForm">
                        <h2 class="modal-auth_title">Пройдите капчу</h2>
                        <div id = "captha" class="modal-auth-label" style="margin-top:50px;"></div>
                        <button class="modal-auth_btn profileBtn bonus longBtn" onclick="promoFetch(event);">Активировать</button>
                    </form>`;

         } else if (type == `newGame`) {
            code = `<form class="modal-auth widthCont authLine modalAnim findCaptchaForm">
                        <h2 class="modal-auth_title">Новый режим!</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth rigthMargin" aria-label="Закрыть окно"></a>
                        <p class="modal-auth_subTitle top">Мы добавили новый режим! <br>Скорее тестировать!</p>
                        <a href = "/cubs"  class="modal-auth_btn profileBtn bonus longBtn">Перейти</a>
                    </form>`;
         }else if (type == `dark`) {
            code = `<form class="modal-auth widthCont authLine modalAnim findCaptchaForm">
                        <h2 class="modal-auth_title">Темная тема!</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth rigthMargin" aria-label="Закрыть окно"></a>
                        <p class="modal-auth_subTitle top">Брр! Темная тема сайта! <br>Ваши глаза будут спокойны </p>
                            <br>

                            <p class="theme-swtich_text profile-sct_txt">Переключиться <span></span></p>
                            <br>

                            <label for="theme" class="theme-switch_lebel switch">
                                <input type="checkbox" id="theme">
                                <span class="slider round"></span>
                            </label>


                    </form>`;

         } else if (type == `payment`) {
            code = `<form class="modal-auth widthCont authLine modalAnim findCaptchaForm">
                        <h2 class="modal-auth_title">Бонус к пополнению!</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth rigthMargin" aria-label="Закрыть окно"></a>
                        <p class="modal-auth_subTitle top">Для вас был выдан бонус +${showMoney(payment)}% к пополнению счета! <br> Успей пополнить, чтобы получить награду! </p>
                        <button href = "/cubs"  class="modal-auth_btn profileBtn bonus longBtn payInCheck payIn">Пополнить</button>
                    </form>`;

        }

        ///

        return code;

        ///
    }

    function htmlOfAuth(elem) {

        let key_id = '';


        if (elem.classList.contains('signIn')) {
            code = `<form id = "authForm" class="modal-auth widthCont authLine modalAnim">
                        <h2 class="modal-auth_title">Авторизация</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth" aria-label="Закрыть окно"></a>
                        <p class="modal-auth_subTitle top">Авторизация через соц. сети</p>
                        <div class="modal-auth-cont">
                            <a href="http://oauth.vk.com/authorize?client_id=${vk_id}&redirect_uri=https://${adress}/app/v0.1/api/authSoc/vk.php&response_type=code&state=${CSRF}" class="modal-auth-cont_btn">Вконтакте</a>
                            <a href="https://www.facebook.com/v3.1/dialog/oauth?client_id=${fb_id}&amp;redirect_uri=https://${adress}/app/v0.1/api/authSoc/fb.php&amp;response_type=code&state=${CSRF}" class="modal-auth-cont_btn fb">Facebook</a>
                        </div>
                        <p class="modal-auth_subTitle ">или</p>
                        <label for="log" class="modal-auth-label">
                            <span class="modal-auth-label_txt">Введите Вашу почту:</span>
                            <input required autocomplete="off" name = "email" id="log" type="email" class="modal-auth-label_inp" placeholder="test@gmail.com">
                        </label>
                        <label for="pass" class="modal-auth-label">
                            <span class="modal-auth-label_txt">Укажите пароль:</span>
                            <input required minlength = "6" autocomplete="off" name = "password" id="pass" type="password" class="modal-auth-label_inp" placeholder="Testpassword!2121">
                        </label>

                        <div id = "captha" class="modal-auth-label"></div>

                        <button data-auth="auth" class="modal-auth_btn authButtonJs">Авторизация</button>
                        <p class="modal-auth-auth">
                            <button class="step signUp">Регистрация</button>
                            /
                            <button class="step forget">Восстановить пароль</button>
                        </p>
                    </form>`;


        } else if (elem.classList.contains('signUp')) {


            code = `<form id = "regForm" class="modal-auth widthCont authLine modalAnim">
                        <h2 class="modal-auth_title">Регистрация</h2>
                        <a class="modal-auth_exit exitOfModal  exitOfModalWidth" aria-label="Закрыть окно"></a>

                        <p class="modal-auth_subTitle top">Авторизация через соц. сети</p>
                        <div class="modal-auth-cont">
                            <a href="http://oauth.vk.com/authorize?client_id=${vk_id}&redirect_uri=https://${adress}/app/v0.1/api/authSoc/vk.php&response_type=code&state=${CSRF}" class="modal-auth-cont_btn">Вконтакте</a>
                            <a href="https://www.facebook.com/v3.1/dialog/oauth?client_id=${fb_id}&amp;redirect_uri=https://${adress}/app/v0.1/api/authSoc/fb.php&amp;response_type=code&state=${CSRF}" class="modal-auth-cont_btn fb">Facebook</a>
                        </div>
                        <p class="modal-auth_subTitle ">или</p>
                        <label for="mail" class="modal-auth-label ">
                            <span class="modal-auth-label_txt">Введите Вашу почту:</span>
                            <input required autocomplete="off" name = "email" id="mail" type="email" class="modal-auth-label_inp" placeholder="test@gmail.com">
                        </label>
                        <label for="log" class="modal-auth-label">
                            <span class="modal-auth-label_txt">Введите Ваш логин:</span>
                            <input required maxlength = "20" minlength = "4"  autocomplete="off" name = "login" id="log" type="text" class="modal-auth-label_inp" placeholder="testlogin">
                        </label>
                        <label for="pass" class="modal-auth-label">
                            <span class="modal-auth-label_txt">Придумайте пароль:</span>
                            <input required minlength = "6" autocomplete="off" name = "password" id="pass" type="password" class="modal-auth-label_inp" placeholder="Testpassword!2121">
                        </label>

                        <div id = "captha" class="modal-auth-label"></div>

                        <button data-auth="reg" class="modal-auth_btn regButtonJs">Зарегистрироваться</button>
                        <p style = "padding-top:10px" class="index-sct_txt">Я подтверждаю, что мне исполнилось 18 лет и я ознакомился с <a href="https://lotbet.org/pages/terms/licence">условиями предоставления услуг.</a> </p>

                        <p class="modal-auth-auth">
                            <button class="step signIn">Авторизация</button>
                            /
                            <button class="step forget">Восстановить пароль</button>
                        </p>
                    </form>`;
        } else if (elem.classList.contains('forget')) {


            code = `<form id = "resetForm" class="modal-auth widthCont authLine modalAnim">
                        <h2 class="modal-auth_title">Восстановить пароль</h2>
                        <a class="modal-auth_exit exitOfModal exitOfModalWidth" aria-label="Закрыть окно"></a>

                        <p class="modal-auth_subTitle top">Авторизация через соц. сети</p>
                        <div class="modal-auth-cont">
                            <a href="http://oauth.vk.com/authorize?client_id=${vk_id}&redirect_uri=https://${adress}/app/v0.1/api/authSoc/vk.php&response_type=code&state=${CSRF}" class="modal-auth-cont_btn">Вконтакте</a>
                            <a href="https://www.facebook.com/v3.1/dialog/oauth?client_id=${fb_id}&amp;redirect_uri=https://${adress}/app/v0.1/api/authSoc/fb.php&amp;response_type=code&state=${CSRF}" class="modal-auth-cont_btn fb">Facebook</a>
                        </div>
                        <p class="modal-auth_subTitle ">или</p>
                        <label for="forget" class="modal-auth-label ">
                            <span class="modal-auth-label_txt">Введите Вашу почту:</span>
                            <input required autocomplete="off" name = "email" id="forget" type="email" class="modal-auth-label_inp" placeholder="test@gmail.com">
                        </label>
                        <div id = "captha" class="modal-auth-label"></div>
                        <button data-auth="forget" class="modal-auth_btn sendButtonJs">Восстановить</button>

                        <p class="modal-auth-auth">
                            <button class="step signIn">Авторизация</button>
                            /
                            <button class="step signUp">Регистрация</button>
                        </p>
                    </form>`;


        }

        return code;
    }

    function htmlOfPay(elem) {
        if (elem.classList.contains('payIn')) {
            let codeBtn = ``;
            for (key in systems_pay) {
                codeBtn += `<button data-system="${systems_pay[key].id}" class="payin-cont_btn alt system ">
                                <img src="${systems_pay[key].img}" alt="${systems_pay[key].title}">${systems_pay[key].title}
                            </button>`;
            }

            //

            let summ = '';

            if (payment) {

                summ = '<div style = "margin-bottom: 15px" class="payin-cont_btn green">Бонус +'+showMoney(payment)+'% к пополнению!</div>'

            }

            //

            code  = ` <article class="modal-auth authLine long modalShow">
                            <h2 class="modal-auth_title alt">Пополненение счета</h2>
                            <button class="modal-auth_exit exitOfModal" aria-label="Закрыть окно"></button>
                            <div class="payin tabletPay">

                                <article class="payin-cont ">

                                 ${summ}

                                    <div class="payin-cont_wrap alternate">
                                        <button data-summ="50" class="payin-cont_btn findBtn green">50 L</button>
                                        <button data-summ="500" class="payin-cont_btn findBtn">500 L</button>
                                        <button data-summ="5000" class="payin-cont_btn findBtn">5000 L</button>
                                    </div>
                                    <form id="payForm">
                                        <label for="payIn" class="modal-auth-label ">
                                            <span class="modal-auth-label_txt">Укажите сумму:</span>
                                            <input value="50" minlength="1" maxlength="8" name="amount" required="" oninput="inputValue(event)" id="payIn" type="text" class="modal-auth-label_inp inputValue index-sct-art-label_inp payInInput" placeholder="Например: 100">
                                        </label>


                                    <p class="payin-cont_plus">К зачислению: <mark data-summ="0" class="amount">0 L</mark></p>
                                    <button class="index-sct-art_button alt payinBtn">Пополнить</button>
                                    <input name="system" type="hidden" value = "1">
                                    </form>
                                </article>
                                <article class="payin-cont">
                                    <h3 class="payin-cont_title">Выберите систему:</h3>
                                    <div class="payin-cont_wrap alt ">${codeBtn}</div>
                                </article>


                            </div>
                        </article>`;
        } else if (elem.classList.contains('payOut')) {

            let codeBtnOut = ``;

            for (key in systems) {
                codeBtnOut += `<button data-komission = "${systems[key].komission}"  data-system="${systems[key].id}" class="payin-cont_btn alt system ">
                                <img src="${systems[key].img}" alt="${systems[key].title}">${systems[key].title}
                            </button>`;
            }

            ///

            code = `<article class="modal-auth authLine long">
                            <h2 class="modal-auth_title alt">Вывод средств</h2>
                            <button class="modal-auth_exit exitOfModal " aria-label="Закрыть окно"></button>
                            <div class="payin tabletPay">

                               <form id = "payoutForm">
                                <div class="payin-cont">
                                    <label for="summ" class="modal-auth-label  top">
                                        <span class="modal-auth-label_txt">Укажите сумму:</span>
                                        <input oninput="inputValue(event)" value="0" required minlength = "1" maxlength = "5" name = "amount" id="summ" type="text"  class="modal-auth-label_inp inputValue" placeholder="Например: 100">
                                    </label>
                                    <label for="wallet" class="modal-auth-label ">
                                        <span class="modal-auth-label_txt">Введите Ваш кошелёк:</span>
                                        <input required minlength = "1" name = "wallet" id="wallet" type="text" class="modal-auth-label_inp payInInput" placeholder="Например: 79526320422">
                                    </label>

                                    <p class="payin-cont_plus">К зачислению<span class="help-sub"> ? <span class="help-sub_txt">Мы подсчитали сумму с учетом комиссий платежной системы.</span></span>: <mark data-summ="50" class="amount">50 L</mark></p>

                                    <input name="system" type="hidden" value = "0">
                                    <button class="index-sct-art_button alt payoutBtn">Вывести</button>
                                </div>
                                </form>

                                <article class="payin-cont">
                                    <h3 class="payin-cont_title">Выберите систему:</h3>
                                    <div class="payin-cont_wrap alt ">
                                        ${codeBtnOut}
                                    </div>
                                </article>
                            </div>
                        </article>`;
        } else {
            let text = 'Ошибка!',
                color = `red`;
            modalErrors(text, color);
        }
    }

    function filtrationInput(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('inputValue'),
            regx = /^[0-9.]$/;

        if (elemCheck == false) {return}


        if (!event.key.match(regx)) {
            event.preventDefault();
        }
    }


    function setDefaultSysyem(event) {
        let elem = document.querySelector('.payin-cont_btn.system');

        elem.classList.add('check');
    }
    // Значение инупта пополнение / вывод
    function inputValue(event) {
        let elem = document.querySelector('.inputValue'),
            elemValue = elem.value,
            outElem = document.querySelector('.payin-cont_plus mark'),
            commissionBtn = document.querySelector('.system.check');


        setKomission();


        if (event != undefined) {
            deleteMarkButton();
        }

    }
    // поплнение
    function changePaySumm(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('findBtn'), allBtn = document.querySelectorAll('.findBtn');

        if (elemCheck == false) {return}

        for (let i = 0; i < allBtn.length; i++) {
            allBtn[i].classList.remove('green');
        }

        ///

        let findInp = document.querySelector('#payIn'),
            // elemSumm = elem.getAttribute('data-summ'),
            elemSumm = trimStr(elem.textContent),

            // outElem = document.querySelector('.payin-cont_plus mark'),
            systemHidden = document.querySelector('input[name="system"]'),
            elemValue = elem.getAttribute('data-system');


        systemHidden.value = `${elemValue}`;
        elem.classList.add('green');
        findInp.value = `${elemSumm}`;
        // outElem.textContent = `${elemSumm} L`;
        // outElem.setAttribute('data-summ', `${elemSumm}`);

        setKomission()
    }
    function deleteMarkButton() {
       let allActiveBtn = document.querySelectorAll('.findBtn.green');

       if (allActiveBtn.length == 0) {return;}

       for (let i = 0; i < allActiveBtn.length; i++) {
           allActiveBtn[i].classList.remove('green');
       }
    }

    // функция Смена системы пополнения/вывода
    function changeSystem(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('system') , allSystem = document.querySelectorAll('.system');

        if (elemCheck == false) {return}

        for (let i = 0; i < allSystem.length; i++) {
            allSystem[i].classList.remove('check');
        }

        ///

        let systemHidden = document.querySelector('input[name="system"]'),
            elemValue = elem.getAttribute('data-system');


        systemHidden.value = `${elemValue}`;
        elem.classList.add('check');

        setKomission()
    }
    // Функция посдчета комисии и вывода итоговых значений
    function setKomission() {
        let elemIn = document.querySelector('.inputValue'),
            elem = document.querySelector('.system.check'),
            elemSumm = elemIn.value,
            elemOutput = document.querySelector('.amount'),
            elemOutSumm = 0,
            elemKomission = 0;

        let contaiinsInput = document.querySelector('#payIn');
        elemSumm = parseFloat(elemSumm);

        if (elem != null) {
            elemKomission = elem.getAttribute('data-komission');
        }

        let payMath = payment / 100;

        elemKomission = elemKomission/100;
        elemOutSumm = elemKomission * elemSumm;
        elemOutSumm = elemSumm - elemOutSumm;
        elemOutSumm = elemOutSumm;

        if (!elemOutSumm) {
            elemOutSumm = 0;
        }

        ///

        if (payment != 0 && contaiinsInput != null) {
            elemOutSumm = Number(elemOutSumm) + (elemOutSumm * payMath);
        }

        ///

        elemOutput.textContent = `${showMoney(elemOutSumm)} L`;
        //elemOutput.setAttribute('data-summ', elemOutSumm);
    }
    function moveInputValue(event) {
        let inputValue = document.querySelector('.inputValue').value,
            insertValue = document.querySelector('.amount');

        insertValue.setAttribute('data-summ', inputValue);
        insertValue.textContent = `${inputValue} L`;
    }
    function deleteNullImg() {
        let nullImg = document.querySelectorAll('[src="0"]');
        for (var i = 0; i < nullImg.length; i++) {
            nullImg[i].remove();
        }
    }
    function payin(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('payInCheck');

        if (elemCheck == false) {return}

        modalAll.innerHTML = ``;

        htmlOfPay(elem);
        insertCodeModal(code);
        // deleteNullImg();
        // inputValue();

        if (!elem.classList.contains('payOut')) {
            setDefaultSysyem();
        }

        inputValue();

        showModal();
        parseBalance(elem);
        moveInputValue();
        setKomission()
    }
    function modalErrors(text, color) {
        let modalHtml = `
        <p class="modalErrors-txt ${color}">
            <span class="modalErrors-txt_dscr">${text}</span>
            <span class="modalErrors-txt_anim"></span>
        </p>`;
        let insertBlock = document.querySelector('.modalErrors');

        insertBlock.insertAdjacentHTML('afterbegin', modalHtml);

        let animationStroke = document.querySelector('.modalErrors-txt_anim');
        let modalFind = document.querySelector('.modalErrors-txt');

        setTimeout(function(event) {
            animationStroke.classList.add('animStroke');
        }, 50)
        setTimeout(function(event) {
            modalFind.classList.add('fadeOutPopUp');
        },2000)
        setTimeout(function(event) {
            modalFind.remove();
        },2500)
    }


    ///

    function sumResult(data) {
        let arr = JSON.parse(data);
        let sum = 0;

        if (arr != 0) {

        arr.forEach(function(number) {
         sum += number
        } );

        }

        return sum;
    }

    function checkGameModal(data , event) {


        // let elem = event.target,
        //     elemCheck = elem.classList.contains('callCheck');

        // if (elemCheck == false) {return}

       //

       let block_seeds = '';
       let button;
       if(data.seeds.server_seed == '0'){

        block_seeds = `<label for="" class="modal-auth-label light">
                 <span class="modal-auth-label_txt">Серверный сид(зашифрован):</span>
                 <input disabled value = "Данные зашифрованы"  type="text" class="modal-auth-label_inp" placeholder="Смените сид пару, чтобы увидеть результат">
                </label>`;

        button = `<button disabled class="modal-auth_btn top checkGame mtop">Для проверки смените сид</button>`;

       }else{

        block_seeds = `<label for="" class="modal-auth-label light">
         <span class="modal-auth-label_txt">Серверный сид(расшифрован):</span>
         <input disabled value = "${data.seeds.server_seed}" type="text" class="modal-auth-label_inp" placeholder="Смените сид пару, чтобы увидеть результат">
        </label>`;

        button = `<a href = "/pages/check/verify?server_seed=${data.seeds.server_seed}&client_seed=${data.seeds.client_seed}&nonce=${data.seeds.nonce}&category=${data.category.id}&seeds_id=${data.seeds.seeds_id}" class="modal-auth_btn top checkGame mtop">Проверить игру</a>`;

       }

     // Визуализация игры DICE

    let title;


    let sum = sumResult(data.battle.others);
    let cubeObj = JSON.parse(data.battle.others);
    let cubeCount = cubeObj.length;
    let cubeHtml = ``;


    for (let i = 0; i < cubeCount; i++) {
      cubeHtml += `<div class="scene">
                      <div class="cube show-front">
                        <div class="cube__face cube__face--front"><img src="/public/img/cube/k_1-min.png" alt="side cube, 1 dotted"></div>
                        <div class="cube__face cube__face--back"><img src="/public/img/cube/k_2-min.png" alt="side cube, 1 dotted"></div>
                        <div class="cube__face cube__face--right"><img src="/public/img/cube/k_3-min.png" alt="side cube, 1 dotted"></div>
                        <div class="cube__face cube__face--left"><img src="/public/img/cube/k_4-min.png" alt="side cube, 1 dotted"></div>
                        <div class="cube__face cube__face--top"><img src="/public/img/cube/k_5-min.png" alt="side cube, 1 dotted"></div>
                        <div class="cube__face cube__face--bottom"><img src="/public/img/cube/k_6-min.png" alt="side cube, 1 dotted"></div>
                      </div>
                    </div>`
    }
     if (sum == '0') {
        title = `<h4 class="check-modal-viz_title">Игра не проведена</h4>`;
        button = `<button disabled class="modal-auth_btn top checkGame mtop">Игра не проведена</button>`;
     }else {
        title = `<h4 class="check-modal-viz_title">Визуализация игры:</h4>
                    <div class="payin-cont_wrap alt ">
                        <!--<div class="check-modal-viz_disc"></div>-->
                        ${cubeHtml}
                    </div>`;
     }




     ///

     let block_game = `<article class="check-modal-viz">
                    ${title}
                </article>`;

       //

       let block = `<article class="modal-auth authLine long ">
        <h2 class="modal-auth_title alt">${data.category.title} #${data.battle.id}</h2>
        <button class="modal-auth_exit exitOfModal  exitFix" aria-label="Закрыть окно"></button>
        <div class="payin">
            <article class="payin-cont">
              <p class="check-modal-inf">
                <span class="check-modal-inf_txt">Игрок: <mark><a href="/user/${data.player.id}">${data.player.login}</a></mark></span>
                <span class="check-modal-inf_txt">Ставка: <mark>${data.battle.amount} L</mark></span>
              </p>

            ${block_seeds}
            <div class="check-modal_cont">
                <label for="" class="modal-auth-label light">
                    <span class="modal-auth-label_txt">Клиентский сид:</span>
                    <input disabled value = "${data.seeds.client_seed}" name=""type="text" class="modal-auth-label_inp" placeholder="clientSeed">
                </label>
                <label for="" class="modal-auth-label light">
                    <span class="modal-auth-label_txt">Число(Nonce):</span>
                    <input disabled value = "${data.seeds.nonce}" type="text" class="modal-auth-label_inp" placeholder="Nonce">
                </label>
            </div>
            ${button}
            </article>
            <article class="payin-cont">
                <h3 class="check-modal-inf"><span class="check-modal-inf_txt">Выпало: <mark>${sum} очков</mark></span></h3>

                ${block_game}

            </article>
        </div>
    </article>`;

    insertCodeModal(block);
    showModal();
    appAnimate(cubeObj, `modal`);
    }


async function appAnimate(cubeObj, block) {
  let cube = document.querySelectorAll('.show-front');
  let animStorage = {
    0: "show-front",
    1: "show-back",
    2: "show-right",
    3: "show-left",
    4: "show-top",
    5: "show-bottom"};

    if (block === `modal`) {
        cube = document.querySelectorAll('.modal-auth .show-front');
    }

  for (let i = 0; i < cube.length; i++) {
    let actualNum = cubeObj[i];
    cube[i].classList.add(animStorage[actualNum - 1]);
  }
}
function parseBalance(elem) {
    let element = elem;
    if (element.classList.contains('payOut') != true) {return}

    let balanceUser = document.querySelector('.BalanceUser span'),
        inputOut = document.querySelector('#summ'),
        balanceReg = balanceUser.innerHTML.replace(/\s/g, '');

    balanceReg = Math.floor(balanceReg);
    inputOut.value = Number(balanceReg);
}
    function modalGame(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('callChangeMode');

        if (elemCheck == false) {return}

        let article = ``;

        for(key in games) {
            article += `<article class="modal-game-art ${games[key].api}">
                            <img src="${games[key].img}" alt="Режим ${games[key].title}" class="modal-game-art_img">
                            <h3 class="modal-game-art_title">${games[key].title}</h3>
                            <button onclick="changeMode(event)" data-status="${games[key].status}" data-title="${games[key].title}" data-id="${games[key].id}" data-mode="${games[key].api}" class="modal-game-art_btn dice exitOfModal exitOfModalWidth">Выбрать</button>
                            <a href="${games[key].rules}" class="modal-game-art_link">Как играть?</a>
                        </article>`;
        }

        code = `<div class="modal-auth  veryLong">
            <div class="modal-game_cont">
                <h2 class="modal-auth_title alt">Режимы игры</h2>
                <p class="modal-game_txt">Выберите режим и начните поиск соперника</p>
            </div>
            <button class="modal-auth_exit exitOfModal" aria-label="Выйти из профиля"></button>

            <div class="modal-game_wrap">
                ${article}
            </div>
        </div>`;

        insertCodeModal(code);
        deactivateBtn();
        changeContentBtn();
        showModal();
    }
    function deactivateBtn() {
        let btn = document.querySelectorAll('.modal-game-art_btn');

        for (let i = 0; i < btn.length; i++) {
            if (btn[i].getAttribute(`data-status`) == 0) {
                continue
            }
            btn[i].textContent = `Скоро`;
            btn[i].setAttribute(`disabled`, `true`);
        }
    }
    function changeContentBtn() {
        let btn = document.querySelectorAll('.modal-game-art_btn'),
            callChangeMode = document.querySelector('.callChangeMode');

        if (callChangeMode.classList.contains('alt') == false) {
            return
        }

        for (let i = 0; i < btn.length; i++) {
            if (btn[i].getAttribute('data-title') == callChangeMode.textContent) {
                btn[i].setAttribute(`disabled`, `true`);
                btn[i].textContent = `Выбрано`;
            }
        }
    }
    function modalNav(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('callNav');

        if (elemCheck == false) {return}

        code = `
                <div class="modal-nav">

                    <ul class="modal-nav-ul">
                        <!--<li><a href="#">${headName} Профиль</a></li>
                        <li><a href="#">Выплаты</a></li>
                        <li><a href="#">Как это работает ?</a></li>-->
                        <li><a href="/pages/profile/">${headName} - Профиль</a></li>
                        ${headNavCont}
                    </ul>
                </div>
                <button class="exit modal-auth_exit exitOfModal" aria-label="Выйти из профиля"></button>`;

        insertCodeModal(code);
        if (headName == null) {
            let removable = document.querySelector('.modal-nav-ul li');
            removable.remove();
        }
        modalPadding(0)
        showModal();
    }
    function modalPadding(param = `inherit`) {
        let modalBlock = document.querySelector('.modal');
        if (param == 0) {
            modalBlock.style.padding = `0px`;
        } else {
            modalBlock.removeAttribute('style');
        }

    }
    function htmlOfHistory(result) {
        let data = ``;

        for(key in result.result) {
            data += `
                        <h3 class="modal-battle_subTitle">Игра ${result.result[key].id}</h3>
                        <label for="${result.result[key].id}" class="index-sct-art-label alt checkLabel">
                            <input readOnly value="${result.result[key].hash}" minlength="1" name="${result.result[key].id}" id="${result.result[key].id}" type="text" class="index-sct-art-label_inp" placeholder="hyef29de33fio6vj6gph8fxghxdp9hd79rnymfe1cdur6s5nls1f6lrfjjafcp0v">
                            <a href="/pages/check/?id=${result.result[key].id}" class="modal-auth_btn top">Проверить</a>
                        </label>`
        }

        code = `<article class="modal-auth authLine medium modalShow">
                    <h2 class="modal-auth_title alt">Последние ${Object.keys(result.result).length} игр</h2>
                    <button class="modal-auth_exit exitOfModal" aria-label="Закрыть окно"></button>
                    <article class="modal-battle_cont top">
                        ${data}
                    </article>
                </article>`;

        return code;
    }
    function historyModal(event) {
        let elem = event.target,
            elemCheck = elem.classList.contains('battle-history');

        if (elemCheck == false) {return}

        historyQuery(event)

        // insertCodeModal(htmlOfHistory());
        // showModal();
    }
    async function historyQuery(event) {
        let data = new FormData(),
            csrf = document.querySelector('#CSRF').value;

        data.append('token', csrf);
        data.append('action', `getBattleGame`);
        data.append('api', `battle`);


        let response = await fetch('/app/v0.1/api/public', {
                method: `Post`,
                body: data
            });

        let result = await response.json();

       if (result.status == 200) {
            insertCodeModal(htmlOfHistory(result));
            showModal();
       } else {
            modalErrors(result.status,`red`)
       }

    }

    async function captchaCheckPromo() {
        event.preventDefault();
        await checkModals(`captcha`);
        await recaptchaCallbackReload();
    }
    async function captchaResult() {
        event.preventDefault();
        let result = grecaptcha.getResponse();

        return result;
    }


    async function changeMode(event) {
      let buttonMode = document.querySelector('.index-change_game'),
          buttonModeChild = buttonMode.firstElementChild,
          modeName = event.target.getAttribute('data-title'),
          mode = event.target.getAttribute('data-mode');

      buttonMode.classList.add('alt');
      buttonMode.classList.remove('ants');
      buttonModeChild.textContent = modeName;
      buttonModeChild.setAttribute('data-name',mode);

      let domain = document.domain;

      location.replace('https://'+domain+'/' + mode);


    }


    // function eqBlock() {
//   let indexSct = document.querySelectorAll('.index-sct'),
//       bodyOffset = document.querySelector('body').offsetWidth,
//       lastChild = indexSct[0].lastElementChild,
//       lastChildTwo = indexSct[1].lastElementChild,
//       lastChildHeight = lastChild.offsetHeight,
//       lastChildTwoHeight = lastChildTwo.offsetHeight;

//     if (bodyOffset < 670 || lastChild.closest('.index-sct-art') == false) {return}

//     if (lastChildHeight > lastChildTwoHeight) {
//         lastChildTwo.style.height = `${lastChildHeight}px`;
//     } else if (lastChildHeight < lastChildTwoHeight) {
//       lastChild.style.height = `${lastChildTwoHeight}px`;
//     }
// }

    // window.addEventListener('click', checkGame);
    window.addEventListener('click', historyModal);
    window.addEventListener('keypress', filtrationInput);
    window.addEventListener('click', modalNav);
    window.addEventListener('click', modalGame);
    window.addEventListener('click', changeSystem);
    window.addEventListener('click', changePaySumm);
    window.addEventListener('click', getBonus);
    window.addEventListener('click', payin);
    window.addEventListener('click', modalAuth);
    window.addEventListener('click', closeModal);
    window.addEventListener('click', changeStep);
    window.addEventListener('mousedown', clickOutObject);
