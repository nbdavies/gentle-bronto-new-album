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
  $('.nav-pills').css('background-color', 'rgb(233,151,8,0.5)')
}
function cutTrees() {
  $('#trees').filter(':not(:animated)').animate({ top: windowHeight * 0.8 }, 1000)
  $('.nav-pills').css('background-color', 'rgb(0,0,0,0)')
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
