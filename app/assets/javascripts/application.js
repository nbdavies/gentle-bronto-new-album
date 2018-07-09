// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require_tree .
let scollTop, treeLine, windowHeight, windowBottom, ticking;
function getDimensions() {
  scrollTop = window.pageYOffset;
  windowHeight = window.innerHeight;
  windowBottom = scrollTop + windowHeight;
  treeLine = scrollTop + document.querySelector('#shows').getBoundingClientRect().top;
}
function animateTrees() {
  getDimensions();
  if (treeLine > scrollTop) {
    cutTrees();
  } else if (treeLine <= scrollTop) {
    growTrees();
  }
}
function growTrees() {
  $('#trees').filter(':not(:animated)').animate({ top: 0 }, 1000)
}
function cutTrees() {
  $('#trees').filter(':not(:animated)').animate({ top: windowHeight * 0.8 }, 1000)
}
window.addEventListener('scroll', function() {
  clearTimeout($.data(this, 'scrollTimer'));
  $.data(this, 'scrollTimer', setTimeout(function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        animateTrees();
        ticking = false;
      });
      ticking = true;
    }
  }, 250));
});

$(document).ready(function(){
  // $(window).on('scroll', function(){
  //   last_known_scroll_position = window.scrollY;
  //
  //   if (!ticking) {
  //     window.requestAnimationFrame(function() {
  //       reactToScroll(last_known_scroll_position);
  //       ticking = false;
  //     });
  //     ticking = true;
  //   }
  // })
  //
  // var last_known_scroll_position = 0;
  // var ticking = false;

  // $('body').on('activate.bs.scrollspy', '#shows', function() {
  //   $('#trees').animate({ top: 0 }, 1000)
  // })
  //
  // function reactToScroll(scroll_pos) {
  //   if (scroll_pos > $('#shows').offset().top) {
  //     $('#trees').animate({ top: 0 }, 1000)
  //   } else {
  //     $('#trees').animate({ top: $(window).height() * 0.8 }, 1000)
  //   }
  // }
  //
  // $('a[href*="#"]')
  //   .not('[href="#"]')
  //   .not('[href="#0"]')
  //   .click(function(event) {
  //     if (
  //       location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
  //       &&
  //       location.hostname == this.hostname
  //     ) {
  //       var target = $(this.hash);
  //       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  //       if (target.length) {
  //         event.preventDefault();
  //         $('html, body').animate({
  //           scrollTop: target.offset().top
  //         }, 1000, function() {
  //           var $target = $(target);
  //           $target.focus();
  //           if ($target.is(":focus")) {
  //             return false;
  //           } else {
  //             $target.attr('tabindex','-1');
  //             $target.focus();
  //           };
  //         });
  //       }
  //     }
  //   });
  // $(window).trigger('scroll');
});
