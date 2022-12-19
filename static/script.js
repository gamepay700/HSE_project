var csrf_token = $('meta[name="csrf-token"]').attr('content')

function loadCategories(){
	$.post('/categories/load').then(e=>{


		e.categories.forEach((e)=>{  


            $("#categories").append('<div class="itemCategory">\
                <div class="row"> \
                    <div class="col-3"><img src="'+e[2]+'" class="imgCategory"></div>\
                    <div class="col"><span class="textItemCategory">'+e[1]+'</span></div>\
                </div>\
            </div>');
        }); 

	}).fail(e=>{
		notification('error', JSON.parse(e.responseText).message)
	});
}

function loadTovars(start = 0, min_cost = 0, max_cost = 1000000000){
	$('#loadTovars').show();
	$('#loadMore').hide();
	$.post('/tovars/load',{start, min_cost, max_cost}).then(e=>{

		minimal_cost = min_cost
		maximal_cost = max_cost

		start_tovars += 20
		tovars_20 = e.tovars
		allTovars = e.all_tovars

		if(start == 0){
			$('#tovars').show().html('');
		}
		
		$('#loadTovars').hide();

		if(start_tovars < allTovars.length && tovars_20.length != 0){
			$('#loadMore').show()
		}

		if(tovars_20.length == 0){
			$("#tovars").html('<center><span style="font-size:20px;">Товаров пока что нет</span></center>')
		}

		if(tovars_20.length == 1){
			// $('#loadTovars').html('<span></span>')
		}

		tovars_20.forEach((e)=>{  


            $("#tovars").append('<div class="col-lg-4 " style="margin-bottom:10px">\
            <div class="HomeCard game-box text-center fadeInDown" style="padding:15px;"  id="tovar-47">\
\
                <div class="HomeCard-Image" style="background-image: url('+e[5]+');">\
                </div>\
                <div class="HomeCard-Icon">\
                    <img alt="icon" src="static/images/logo3.png" style="height:40px;position: relative;top: 10px;">\
                </div>\
                <h4 class="HomeCard-Title">'+e[1]+'\
                </h4>\
                <p class="HomeCard-Text">'+e[4]+'\
                </p>\
                <button class="newBtn btn-auth" onclick="openBuyTovar('+e[0]+')" style="margin-bottom: 5px;">Купить <span class="countBacket">'+e[2]+' p.</span></button>\
\
\
            </div>\
        </div>');
        });

	}).fail(e=>{
		notification('error', JSON.parse(e.responseText).message)
	});



}

function openBuyTovar(id){
	$.post('/tovars/buy_open', {id}).then(e=>{
		if(e.error == 1){
			notification('error', e.message)
			return false
		}

		$("#tovarId").val(id)
		$('#buyModal').modal('show');
	}).fail(e=>{
		notification('error', JSON.parse(e.responseText).message)
	});
}

function buyTovar(){
	email = $("#tovarEmail").val()
	id = $("#tovarId").val()

	$.post('/tovars/buy', {email, id}).then(e=>{
		if(e.error == 1){
			notification('error', e.message)
			return false
		}else{
			notification('success', e.message)
			$('#buyModal').modal('hide');
		}
	}).fail(e=>{
		notification('error', JSON.parse(e.responseText).message)
	});
}

function myBuys(){
	email = $("#myEmail").val()

	$.post('/tovars/my_buys', {email}).then(e=>{
		if(e.error == 1){
			notification('error', e.message)
			return false
		}else{
			notification('success', e.message)
			$('#myBuyModal').modal('hide');
		}
	}).fail(e=>{
		notification('error', JSON.parse(e.responseText).message)
	});
}

function notification(type, mess){
	alert(mess)
}

function checkRules(that){
	type = $(that).is(':checked')
	if (type){
		$('#btnBuy').removeAttr('disabled', 'disabled')
	}else{
		$('#btnBuy').attr('disabled', 'disabled')
	}
}