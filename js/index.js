var app = {
		
	lang: null,
		
	initialize : function() {

		$(function() {
			var w = $(window).width();
			var menu = $('nav ul');
			if (w <= 768 ) {
				$("ul.top-nav li a.scroll").click(function(event) {
					menu.slideToggle();
				});
			}
		});

		$('[data-translate]').jqTranslate('index', { path:'js/langpack'});		

		$(function() {
			$(".lang-Changer-es-index").click(function(event) {
				$('#contactForm').formValidation('setLocale', 'es_ES');				
				$('[data-translate]').jqTranslate('index', { forceLang : 'es',path:'js/langpack' }); return false;							
			});
			$(".lang-Changer-en-index").click(function(event) {
				$('#contactForm').formValidation('setLocale', 'en_US');				
				$('[data-translate]').jqTranslate('index', { forceLang : 'en',path:'js/langpack' }); return false;
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
								message: {
									en_US: 'The name is required.',
									es_ES: 'El campo es obligatorio.'
								}								 
							}
						}
					},
					
					tel: {
						validators: {
							notEmpty: {
								message: {
									en_US: 'The phone number is required.',
									es_ES: 'El campo es obligatorio.'
								}
							},
							stringLength: {
								min: 7,
								max: 13,
								message: {
									en_US: 'The phone must be between 7 and 13 numbers.',
									es_ES: 'El t&eacute;lefono debe tener entre 7 y 13 n&uacute;meros.'
								}
							},
							regexp: {
								regexp: /^[0-9\s\-()+\.]+$/,
								message: {
									en_US: 'The phone number can only contain the digits.',
									es_ES: 'Debe ingresar solo n&uacute;meros.'
								}
							}
						}
					},				
					 email: {
						validators: {
							notEmpty: {
								message: {
									en_US: 'The e-mail is required.',
									es_ES: 'El campo es obligatorio.'
								}
							},
							emailAddress: {
								message: {
									en_US: 'The input is not a valid email address.',
									es_ES: 'El email ingresado es incorrecto.'
								}
							}
						}
					},
					message: {
						validators: {
							notEmpty: {
								message: {
									en_US: 'The message is required.',
									es_ES: 'El campo es obligatorio.'
								}
							}						
						}
					}
				},
				addOns: {
					reCaptcha2: {
						element: 'captchaContainer',						
						theme: 'dark',
						siteKey: '6LcV3BcTAAAAALOu96DdhK_7nGq62rbHzLzcfTR2',
						timeout: 120,
						message: {
									en_US: 'The input is not a valid captcha.',
									es_ES: 'El captcha ingresado no es valido.'
						}						
					},
					i18n:{}
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
						var type = BootstrapDialog.TYPE_SUCCESS;
				  
					    //Si llega un codigo de error
					    if (result!="success"){
					        type =  BootstrapDialog.TYPE_DANGER;
					    	BootstrapDialog.show({
						        type : type,
						        title: "Formulario de contacto",
						        message: result
					    	});					        
					    }else{
					    	BootstrapDialog.show({
						        type : type,
						        title: "Formulario de contacto",
						        message: "Envio exitoso"
					    	});
					    }					   
						console.log(result);						
						$('#contactForm').formValidation('resetForm', true);												
					}
				});				
			});
		});

		$(function() {
			// Variable para guardar el idioma
			var lang;
			 
			var nav = navigator.userAgent.toLowerCase();
			if(nav.indexOf("msie") != -1 || nav.indexOf("rv") != -1){ // msi for IE and rv for IE11+
			    var req = new XMLHttpRequest();
			    req.open('GET', 'resources/inspect-headers.py?filter_name=accept-language', false);
			    req.send(null);
			    var headers = req.getAllResponseHeaders().toLowerCase();
			    var contentLanguage = headers.match( /^content-language\:(.*)$/gm );
			    if(contentLanguage[0]) {
					lang= contentLanguage[0].split(": ")[1];
			    }
			} else {		
			    if (navigator.languages==undefined) {
					if (navigator.language==undefined) {
						// Internet Explorer Compatibility
						lang= navigator.userLanguage.slice(0,2);
					} else {
						// Old navigator compatibility
						lang= navigator.language.slice(0,2);
					}
			    } else { 
					lang= navigator.languages[0].slice(0,2);				
			    }
			}
			if (lang == "es") {
				$('#contactForm').formValidation('setLocale', 'es_ES');				
				$('[data-translate]').jqTranslate('index', { forceLang : 'es',path:'js/langpack' }); return false;					
			}else if (lang == "en") {
				$('#contactForm').formValidation('setLocale', 'en_US');				
				$('[data-translate]').jqTranslate('index', { forceLang : 'en',path:'js/langpack' }); return false;
			}else{
				$('#contactForm').formValidation('setLocale', 'es_ES');				
				$('[data-translate]').jqTranslate('index', { forceLang : 'es',path:'js/langpack' }); return false;	
			};			
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


