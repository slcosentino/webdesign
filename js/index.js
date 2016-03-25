var app = {
		
	lang: null,
		
	initialize : function() {

		$('[data-translate]').jqTranslate('index', { path:'js/langpack'});

		$(function() {
			$(".lang-Changer-es-index").click(function(event) {
				$('[data-translate]').jqTranslate('index', { forceLang : 'es',path:'js/langpack' }); return false;
				$('#contactForm').formValidation('setLocale', 'es_ES');
				$('#contactForm').formValidation.reCaptcha2.language('es');				
			});
			$(".lang-Changer-en-index").click(function(event) {
				$('[data-translate]').jqTranslate('index', { forceLang : 'en',path:'js/langpack' }); return false;
				$('#contactForm').formValidation('setLocale', 'en_US');
				$('#contactForm').formValidation.reCaptcha2.language('en');
			});
		});

		$(function() {
			$(".scroll").click(function(event) {
				event.preventDefault();
				$('html,body').animate({
					scrollTop : $(this.hash).offset().top
				}, 1000);
			});

			var pull = $('#pull');
			menu = $('nav ul');
			menuHeight = menu.height();
			$(pull).on('click', function(e) {
				e.preventDefault();
				menu.slideToggle();
			});
			
			$(window).resize(function() {
				var w = $(window).width();
				if (w > 320 && menu.is(':hidden')) {
					menu.removeAttr('style');
				}
			});

			$("#slider4").responsiveSlides({
				auto : true,
				pager : true,
				nav : true,
				speed : 500,
				namespace : "callbacks",
				before : function() {
					$('.events').append("<li>before event fired.</li>");
				},
				after : function() {
					$('.events').append("<li>after event fired.</li>");
				}
			});

			$('#horizontalTab').easyResponsiveTabs({
				type : 'default', //Types: default, vertical, accordion           
				width : 'auto', //auto or any width like 600px
				fit : true
			// 100% fit in a container
			});

			$().UItoTop({
				easingType : 'easeOutQuart'
			});
			
			$('#contactForm').formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				row: {
					valid: 'field-success',
					invalid: 'field-error'
				},				
				fields: {
					name: {
						validators: {
							notEmpty: {
								message: 'El campo es obligatorio.'
							}
						}
					},
					
					tel: {
						validators: {
							notEmpty: {
								message: 'El campo es obligatorio.'
							},
							stringLength: {
								min: 7,
								max: 13,
								message: 'El t&eacute;lefono debe tener entre 7 y 13 n&uacute;meros.'
							},
							regexp: {
								regexp: /^[0-9\s\-()+\.]+$/,
								message: 'Debe ingresar solo n&uacute;meros.'
							}
						}
					},				
					 email: {
						validators: {
							notEmpty: {
								message: 'El campo es obligatorio.'
							},
							emailAddress: {
								message: 'El email ingresado es incorrecto.'
							}
						}
					},
					message: {
						validators: {
							notEmpty: {
								message: 'El campo es obligatorio.'
							}						
						}
					}
				},
				addOns: {
					reCaptcha2: {
						element: 'captchaContainer',
						language: 'es',
						theme: 'dark',
						siteKey: '6LcV3BcTAAAAALOu96DdhK_7nGq62rbHzLzcfTR2',
						timeout: 120,
						message: 'El captcha ingresado no es valido.'
					}
				}				
			})
			 .on('success.form.fv', function(e) {
				// Prevent form submission
				e.preventDefault();

				var $form = $(e.target),
					fv    = $form.data('formValidation');
			
				$.ajax({
					url: $form.attr('action'),
					type: 'POST',
					data: $form.serialize(),
					success: function(result) {											
						console.log(result);						
						$('#contactForm').formValidation('resetForm', true);						
						FormValidation.AddOn.reCaptcha2.reset('captchaContainer');
					}
				});
			});

		});
		
		

	},

	bindEvents : function() {

		addEventListener("load", function() {
			setTimeout(this.hideURLbar, 0);
		}, false);

	},

	hideURLbar : function() {
		window.scrollTo(0, 1);
	}

};

app.initialize();


