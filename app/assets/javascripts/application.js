// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require application_helper
//= require firebase/firebase-app
//= require firebase/firebase-auth
//= require firebase-app
//= require firebase-ui-auth
//= require_tree .

// Required to avoid InvalidToken error when logout via AJAX.
$(document).ajaxComplete(function(event, xhr, settings) {
  var csrf_param = xhr.getResponseHeader('X-CSRF-Param');
  var csrf_token = xhr.getResponseHeader('X-CSRF-Token');

  if (csrf_param) {
    $('meta[name="csrf-param"]').attr('content', csrf_param);
  }
  if (csrf_token) {
    $('meta[name="csrf-token"]').attr('content', csrf_token);
  }
});
