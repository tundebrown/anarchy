// Mobile Menu

$(function() {
    $(".menu-btn").click(function() {
      $('.menu').toggleClass('active');
      return false;
    });
  });


$(document).ready(function(){
	$('.menu-btn').click(function(){
		$(".menu-toggle").toggleClass('open');
	});
});

$(document).ready(function(){
	$('.rm-on-click').click(function(){
		$(".menu-toggle").toggleClass('open');
	});
});

$(function() {
    $(".rm-on-click").click(function() {
      $('.menu').toggleClass('active');
      // return false;
    });
  });
  