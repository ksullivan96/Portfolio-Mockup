/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
	"use strict";
	
	var images = [
			'img/iphone-icon.svg',
			'img/iphone-icon2.svg',
			'img/iphone-icon3.svg',
			'img/iphone-icon4.svg',
			'img/iphone-icon5.svg',
			'img/iphone-icon6.svg',
			'img/iphone-icon7.svg',
			'img/iphone-icon8.svg',
			'img/iphone-icon9.svg',
			'img/iphone-icon10.svg',
			'img/iphone-icon11.svg',
			'img/iphone-icon12.svg',
			'img/iphone-icon13.svg',
			'img/iphone-icon14.svg',
			'img/iphone-icon15.svg',
			'img/iphone-icon16.svg',
			'img/iphone-icon17.svg',
			'img/iphone-icon18.svg',
			'img/iphone-icon19.svg',
			'img/iphone-icon20.svg',
			'img/iphone-icon21.svg',
			'img/iphone-icon22.svg',
			'img/iphone-icon23.svg',
			'img/iphone-icon24.svg',
			'img/iphone-icon25.svg',
			'img/iphone-icon26.svg',
			'img/iphone-icon27.svg'
		],
		
	    $overlay = $('<div class="overlay"></div>'),
	    $portfoliocontent = $('<div class="port-content"></div>'),
	    $title = $('<h2></h2>'),
	    $img = $('<div class="img-link"></div>'),
		$github = $('<a href=""><img src="img/icon/github.svg" id="github" alt="github-icon" /></a>'),
	    $description = $('<h4></h4>'),
	    $work = $('<p></p>'),
	    $skillsUl = $('<ul class="skills"></ul>'),
		$next = $('<div class="next"></div>'),
		$prev = $('<div class="prev"></div>'),
		$close = $('<span class="close"></span>');
	
	$overlay.append($title);
	$overlay.append($img);
	$overlay.append($description);
	$overlay.append($work);
	$overlay.append($next);
	$overlay.append($prev);
	$overlay.append($close);
	$overlay.append($skillsUl);
	$overlay.append($github);
	$('body').append($overlay);
	
	
	$('.mobile-first').on({
		mouseenter: function () {
			$('.iphone-scroll').delay(400)
				.queue(function (next) { $(this).attr('src', 'img/iphone-icon2.svg'); next(); });

			$.each(images, function (i, val) {
				if (i === 26) {
					$('.iphone-scroll').delay(600).queue(function (next) { $(this).attr('src', 'img/iphone-icon2.svg'); next(); });

					$($(images).get().reverse()).each(function (i, val) {
						$('.iphone-scroll').delay(10).queue(function (next) { $(this).attr('src', val); next(); });
					});
				} else {
				    $('.iphone-scroll').delay(10).queue(function (next) { $(this).attr('src', val); next(); });
				}
			});
		},
		mouseleave: function () {
			$('.iphone-scroll').delay(1000).queue(function (next) { $('.iphone-scroll').attr('src', 'img/iphone-icon.svg'); next(); });
		}
	});

	$('.responsive').hover(function () {
		$('.narrow-phone').delay(500)
			.queue(function (next) {
				$('.narrow-phone').css('transform', 'rotate(90deg)');
				next();
			}).delay(1200)
			.queue(function (next) {
				$(this).attr('src', 'img/wide-phone.svg');
				next();
			});
	},
		function () {
			$('.narrow-phone').css('transform', '');

			if ($('.narrow-phone').attr('src') !== 'img/wide-phone.svg') {
				event.stopPropagation();
			} else {
				$('.narrow-phone').delay(500)
						.queue(function (next) {
						$(this).css('transform', 'rotate(0deg)');
						next();
					}).delay(1200)
					.queue(function (next) {
						$(this).attr('src', 'img/narrow-phone.svg');
						next();
					});
			}
		}
		);

	$('.interactive').on({
		mouseenter: function () {
			$('.interactive-img').delay(700)
				.queue(function (next) {
					$(this).attr('src', 'img/desktop-overlay.svg');
					next();
				});
		},
		mouseleave: function () {
			$('.interactive-img').delay(700)
				.queue(function (next) {
					$(this).attr('src', 'img/desktop.svg');
					next();
				});
		}
	});
	$(document).scroll(function () {
		var y = $(this).scrollTop();
		if (y > 65) {
			$('.mobile-first').animate({
				opacity: '1'
			}, 900);
		}
		if (y > 345) {
			$('.responsive').animate({
				opacity: '1'
			}, 900);
		}
		if (y > 560) {
			$('.interactive').animate({
				opacity: '1'
			}, 900);
		}

	});
	$('.portfolio-link').on('click', function (event) {
		var portfolio = 'portfolio.json';
		function displayPage(response) {
			var pageHTML = "",
			    project = "",
				numProject = 0;
			$.each(response.Portfolio, function (i, head) {
				var link = i,
				    img = head.img,
				    title = head.title;
				numProject += 1;
				pageHTML += '<div class="project" id="' + i + '">';
				pageHTML += '<img src="' + img + '" alt="' + title + '" />';
				pageHTML += '<h2>' + title + '</h2>';
				pageHTML += '</div>';
			});
			
			$('.content').html(pageHTML);
			
			$(".project").on('click', function (e) {
				e.preventDefault();
				$('.container').animate({
					opacity: "0.5"
				}, 'fast');
				var index = parseInt($(this).attr('id'), 10);
				function loadInfo() {
					if (numProject === (index + 1)) {
						$next.hide();
					} else {
						$next.show();
					}
					if (index === 0) {
						$prev.hide();
					} else {
						$prev.show();
					}
					var overlayHTML = '',
						portfolioLink = response.Portfolio[index],
						skillsHTML = '',
						imgHTML = '';
					
					imgHTML += '<a href="' + portfolioLink.link + '"target="_blank">';
					imgHTML += '<img src="' + portfolioLink.img + '"';
					imgHTML += ' alt="' + portfolioLink.title + ' image"/>';
					imgHTML += '</a>';


					$title.text(portfolioLink.title);
					$img.html(imgHTML);
					$description.text(portfolioLink.description);
					$work.text(portfolioLink.work);

					$.each(portfolioLink.skills, function (i, listItem) {
						skillsHTML += "<li>" + listItem + "</li>";
					});
					$skillsUl.html(skillsHTML);
					$github.attr('href', portfolioLink.git);
				}
				loadInfo();
				
				$('.overlay').show(function () {
					$('body').css('overflow-y', 'hidden');
				});
				
				function closeOverlay() {
					$('.container').animate({
						opacity: "1"
					}, 'fast');
					$('.overlay').animate({
						display: "none"
					}, "fast");
					$('body').css('overflow-y', 'auto');
				}
				
				function nextProject() {
					if (numProject === (index + 1)) {
						$next.hide();
					} else {
						index += 1;
						loadInfo();
					}
				}
				
				function prevProject() {
					if (index <= 0) {
						$prev.hide();
					} else {
						index -= 1;
						loadInfo();
						
					}
				}
				
				$next.click(nextProject);
				$prev.click(prevProject);
				$('.close').click(closeOverlay);
				$(document).keydown(function (event) {
					if (event.keyCode === 27 || event.keyCode === 8) {
						event.preventDefault();
						closeOverlay();
					} else if (event.keyCode === 39) {
						nextProject();
					} else if (event.keyCode === 37) {
						prevProject();
					}
					if (event.keyCode === 38 || event.keyCode === 40) {
						if ($('.overlay').is(":visible")) {
							event.preventDefault();
						}
					}
					
				});
				
			});
			
		}
		$.getJSON(portfolio, displayPage);
		
		if ($('.jumbo-header').is(":visible")) {
			$('.jumbo-header').animate({
				height : "120px"
			}, 'slow');
			$('.jumbo-header h1').animate({
				"padding-top" : "15px"
			}, 'slow').text('Portfolio');
			$('.shape').animate({
				top: '228px'
			}, 'slow');
		}
	});
	
	$('.about-link').on('click', function (event) {
		if ($('.jumbo-header').is(":visible")) {
			$('.jumbo-header').animate({
				height : "450px"
			}, 'slow');
			$('.jumbo-header h1').animate({
				"padding-top" : "160px"
			}, 'slow').text('Creative Gains');
			$('.shape').animate({
				top: '558px'
			}, 'slow');
		}
		event.preventDefault();
		var content = 'index-content.html';
		function displayPage(response) {
			$('.content').html(response);
		}
		$.get(content, displayPage);
	});
});