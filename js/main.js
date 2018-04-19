//----------------- validacion correo y contraseña-------------
$(document).ready(function(){
	//Seccion de abrir y cerrar sideNav
	$("#burguer").click(function() {
			$("#sidenav").css("width","270px");
		});

		$("#btn-cerrar").click(function() {
			$("#sidenav").css("width","0");
		});

	//Seccion Sign Up obtener Nombre y correo
    $("#padre-btn-iniciar").on("click", $("#btn-iniciar"), function(e) {
        $(".red").remove();
        if(correo()){
            if(contrasena()){
                window.open('menu.html','_self',false);  
            }
        }
    });

    //validación contraseña
    function contrasena(){
        var nameValue = $("#contrasena").val();
        console.log(nameValue);
        if (!(/^[0-9]{2,8}$/).test(nameValue)){
            $("#espacio-error-nombre").append('<p class="red">Contraseña debe incluir max 8 números</p>');
            $("#contrasena").val("");
            console.log("second");
            return false;
        }else{
            return true;
        }
    }

    //validacion correo 
    function correo(){
        var emailValue = $("#correo").val();
        console.log(emailValue);
        if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(emailValue)){
            $("#espacio-error-nombre").append('<p class="red">Correo Invalido</p>');
            $("#correo").val("");
            console.log("first");
            return false;
        } else{
            localStorage.setItem('email',emailValue);
            return true;
        }
    }

    //-----------------guardamos las tarjetas ingreadas en perfil.html-------------

    //Esta seccion imprime el correo electronico guardado en storage
	var correoElec = localStorage.getItem('email'); 
	$("#correo-storage").html(correoElec);

	//Mi variable con el arreglo debe ser global
	var numeros = [];
	$("#btn-agregar").click(function(){
		var tarjetaNum = $("#input-tarjeta").val();
		$("#input-tarjeta").val("");
		
		if(tarjetaNum == ""){
			return false;
		} else{
			//creo un arreglo al cual hago push los numeros ingresados por el usuario, 
			//es este arreglo el que despues guardo en localStorage con stringify
		    numeros.push(tarjetaNum);
		    console.log(numeros);
		    localStorage.setItem("numTarjeta", JSON.stringify(numeros));
		    console.log(localStorage.getItem("numTarjeta"));

		    var numerosGuardados = localStorage.getItem("numTarjeta");
			
		    $("#items").append('<div class="div-numeros">'+tarjetaNum+'</div>');
		}	
	});

	/* ---------------------ajax y API-saldo.html--------------------- */

	//Aqui manejo el numero de tarjeta del select---------------------

	//Primero creo las opciones del select de manera dinamica trayendo value desde localStorage
	console.log(localStorage.getItem("numTarjeta"));
	var parseJson = JSON.parse(localStorage.getItem("numTarjeta"));
	console.log(parseJson.length);
	console.log(parseJson[0]);
	var cantidadNumeros = parseJson.length;

	if(cantidadNumeros == 1){
		console.log("switch 1");
		$("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option>');
	} else if (cantidadNumeros == 2){
		console.log("switch 2");
            $("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option><option value="'+parseJson[1]+'">'+parseJson[1]+'</option>');
	}else if (cantidadNumeros == 3 ){
		console.log("switch 3");
            $("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option><option value="'+parseJson[1]+'">'+parseJson[1]+'</option><option value="'+parseJson[2]+'">'+parseJson[2]+'</option>');
	} else if (cantidadNumeros == 4 ){
		console.log("switch 4");
            $("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option><option value="'+parseJson[1]+'">'+parseJson[1]+'</option><option value="'+parseJson[2]+'">'+parseJson[2]+'</option><option value="'+parseJson[3]+'">'+parseJson[3]+'</option>');
	}

	//Desabilito el input cuando se hace seleccion, el div que tenia display none se habilita ya que los elementos que estan disabled no responden a los handlers de eventos
	$("#input-tarjeta2").click(function(event) {
		$("#select-input").val("");
		$("#select-input").prop( "disabled", true );
		$(".select-div-disable").css('display','inherit');
	});

	$(".select-div-disable").click(function() {
		$(this).hide().prev($("#select-input")).prop("disabled", false).focus();
	});

	//parte del habilitar y desabilitar SELECT
	$("#select-input").click(function(event) {
		$("#input-tarjetat").prop( "disabled", true );
		$(".input-div-disable").css('display','inherit');
	});

	$(".input-div-disable").click(function() {
		$(this).hide().prev($("#input-tarjeta2")).prop("disabled", false).focus();
	});
	// fin de seccion de habilitar y deshabilitar

	/*Prueba
	$("#btn-saldo").click(function(event){
		event.preventDefault();
		$(".caja-saldo").remove();
		if($("#input-tarjeta2").val() == "" || $("#select-input").val() == ""){
			$("#input-tarjeta2").val("");
			$("#select-input").val("");
			alert("Debes escoger una opcion");
		} else{
			if($("#input-tarjeta2").val() != ""){
				console.log("primer if");
				var numeroTarj = $("#input-tarjeta2").val();
				llamarAjax(numeroTarj);
				$("#input-tarjeta2").val("");
			} 
			if($("#select-input").val() != ""){
				console.log($("#select-input").val());
				var numeroTarj2 = $("#select-input").val();
				llamarAjax(numeroTarj2);
			}
		}	
	}); */
				
	//Aqui extraigo el numero de tarjeta del input regular
	$("#btn-saldo").click(function(){
		$(".caja-saldo").remove();
		if($("#input-tarjeta2").val() == ""){
			$("#input-tarjeta2").val("");
			return false;
		} else{
			var numeroTarj = $("#input-tarjeta2").val();
			llamarAjax(numeroTarj);
			$("#input-tarjeta2").val("");
			$("#select-input").val(""); 
		}
			
	});

	//Ahora extraigo el value de la seleccion cuando se hace click
	$("#btn-saldo").click(function() {
		$(".caja-saldo").remove();
		if($("#select-input").val() == ""){
		alert("Escoge una tarjeta");
		return false;
		} else {
			console.log($("#select-input").val());
			var numeroTarj = $("#select-input").val();
			llamarAjax2(numeroTarj);
		}
	});

	/* ------tarifa.html--------- */

	//Desabilito el input cuando se hace seleccion, el div que tenia display none se habilita ya que los elementos que estan disabled no responden a los handlers de eventos
	$("#input-tarjeta3").click(function(event) {
		$("#select-input").val("");
		$("#select-input").prop( "disabled", true );
		$(".select-div-disable2").css('display','inherit');
	});

	$(".select-div-disable2").click(function() {
		$(this).hide().prev($("#select-input")).prop("disabled", false).focus();
	});

	//parte del habilitar y desabilitar SELECT
	$("#select-input").click(function(event) {
		$("#input-tarjetat2").prop( "disabled", true );
		$(".input-div-disable2").css('display','inherit');
	});

	$(".input-div-disable").click(function() {
		$(this).hide().prev($("#input-tarjeta3")).prop("disabled", false).focus();
	});
	
	//Aqui extraigo el numero de tarjeta del input regular
	$("#btn-calcular").click(function(){
		$(".caja-saldo").remove();

		if($("#input-tarjeta3").val() == ""){
			$("#input-tarjeta3").val("");
			return false;
		} else{
			var numeroTarj = $("#input-tarjeta3").val();
			calcularTarifa(numeroTarj);
			$("#input-tarjeta3").val("");
		}	
			
	});

	//Ahora extraigo el value de la seleccion cuando se hace click
	$("#btn-calcular").click(function() {
		$(".caja-saldo").remove();

		if($("#select-input").val() == ""){
		alert("Escoge una tarjeta");
		return false;
		} else {
			console.log($("#select-input").val());
			var numeroTarj = $("#select-input").val();
			$("#select-input").val(""); 
			calcularTarifa(numeroTarj);
		}
	});
});

var llamarAjax = function(numeroTarjeta){
	$.ajax({
		url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
        type    : 'GET',
        dataType: 'json',
        data    : {'bip' : numeroTarjeta},
	})
	.done(function(data) {
		console.log(data.saldoTarjeta);
		$("#container-saldo").append('<div class="caja-saldo"><div class="saldo-total">SALDO TOTAL</div>'+
			'<div class="monto">'+data.saldoTarjeta+'</div></div>');
	})
	.fail(function() {
		$("#container-saldo").append('<div class="text-center">Esta tarjeta es invalida</div>');
		console.log("error pq ajax se esta disparando dos veces, una en el caso de click cuando se extra del input y otra cuando se extrae del select");
	})
	.always(function() {
		console.log("complete");
	});
}

var llamarAjax2 = function(numeroTarjeta){
	$.ajax({
		url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
        type    : 'GET',
        dataType: 'json',
        data    : {'bip' : numeroTarjeta},
	})
	.done(function(data) {
		console.log(data.saldoTarjeta);
		$("#container-saldo").append('<div class="caja-saldo"><div class="saldo-total">SALDO TOTAL</div>'+
			'<div class="monto">'+data.saldoTarjeta+'</div></div>');
	})
	.fail(function() {
		
		console.log("error pq ajax se esta disparando dos veces, una en el caso de click cuando se extra del input y otra cuando se extrae del select");
	})
	.always(function() {
		console.log("complete");
	});
}

var calcularTarifa = function(numeroTarjeta){
	$.ajax({
		url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
        type    : 'GET',
        dataType: 'json',
        data    : {'bip' : numeroTarjeta},
	})
	.done(function(data) {
		if ($("#select-horario").val() == null){
			alert("Debes escoger un horario");
			$("#select-horario").focus();
		} else{
			var costoHorario = $("#select-horario").val();

			$("#container-horario-costo").append('<div class="caja-saldo"><div class="saldo-total">COSTO PASAJE</div>'+
				'<div class="monto">$'+costoHorario+'</div></div>');

			console.log(data.saldoTarjeta);
			var saldoAPI = data.saldoTarjeta;
			var saldoNum = saldoAPI.slice(1, saldoAPI.length);
			var saldoPuro = saldoNum.replace('.', '');
			console.log(saldoPuro);

			console.log("primer");
			$("#container-tarifa").append('<div class="caja-saldo"><div class="saldo-total">SALDO TOTAL</div>'+
				'<div class="monto">$'+(saldoPuro-costoHorario)+'</div></div>');
		}
	})
	.fail(function() {
		console.log("error pq ajax se esta disparando dos veces, una en el caso de click cuando se extra del input y otra cuando se extrae del select");
	})
	.always(function() {
		console.log("complete");
	});
}