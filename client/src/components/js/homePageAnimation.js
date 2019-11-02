import $ from "jquery";

$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  if(scroll>=350){
    if(!$(".first-intro").hasClass("bounceInLeft")){
      $(".first-intro").addClass("bounceInLeft");
      $(".first-intro").css('visibility','visible');
    }
  }
  if(scroll>=750){
    if(!$(".second-intro").hasClass("bounceInRight")){
      $(".second-intro").addClass("bounceInRight");
      $(".second-intro").css('visibility','visible');
    }
  }
  if(scroll>=1150){
    if(!$("#skill-section .animated").hasClass("zoomInRight")){
      $("#skill-section .animated").addClass("zoomInRight");
      $("#skill-section .animated").css('visibility','visible');
    }
  }
  if(scroll>=2200 && scroll<=2800){
    $("#contact-section .card").css("transform", 'translateZ(0px)');
  }else{
    $("#contact-section .card").css("transform", 'perspective(550px) translateZ(-200px)');
  }
  if(scroll>=2850){
    if(!$("#social-section .animated").hasClass("fadeInUp")){
      $("#social-section .animated").addClass("fadeInUp");
      $("#social-section .animated").css('visibility','visible');
    }
  }
  if(scroll>=2920){
    if(!$(".footer").hasClass("bounceInUp")){
      $(".footer").addClass("bounceInUp");
      $(".footer").css('visibility','visible');
    }
  }
});

$("#get-started-btn").on('click', function(){
  $(window).scrollTo({ top: 690, behavior: 'smooth' });
});
