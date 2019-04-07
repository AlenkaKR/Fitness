$(document).ready(function() {

	resize();	

	$(window).resize(function() {
		resize();
	});

	function resize() {
		$("#sec-4 .item-descr h3").height('auto').equalHeights();	
		$("#sec-4 .item-descr p").height('auto').equalHeights();	
	};

	$("a[href*='#']").mPageScroll2id();




	$("#form").validator().on("submit", (function(event) {
		if (event.isDefaultPrevented()) {			
			formError();
			submitMSG(false, "Заполните всю форму!");
		} else {
			// все в порядке!      
			
			event.preventDefault(); // Останавливает отправку данных формы при обновлении страницы без выбора действия в форме.
			submitForm();
		}
	}));

	function submitForm() {
		// Инициируем переменную с содержимым формы
		var name = $("#name").val();
		var email = $("#email").val();   

		$.ajax({
			type: "POST",
			url: "php/form-process.php",
			data: "name=" + name + "&email=" + email,
			success : function(text) {
				if (text == "success") {
					formSuccess();
				}
			}
		})
	};

	function formSuccess() {
		$("#msgSubmit").removeClass("hidden");
		$("#form")[0].reset();
		submitMSG(true, "Сообщение отправлено!")
	};

	function formError(){
    $("#form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass();
    });
	};

	function submitMSG(valid, msg){
      var msgClasses;
    if(valid){
      msgClasses = "tada animated text-success text-uppercase";
    } else {
      msgClasses = "w-100 text-danger text-uppercase";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}


}); 