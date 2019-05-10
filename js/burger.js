$(document).ready(function() {

    $(".cross-button").hide();
    $(".vertical-menu").addClass("hidden");
  
    $(".burger-menu-button").click(function() {
        $(".vertical-menu").removeClass("hidden");
        $(".vertical-menu").addClass("visable");
        $(".burger-menu-button").hide();
        $(".cross-button").show();
    });

    $(".cross-button").click(function() {
        $(".vertical-menu").removeClass("visable");
        $(".vertical-menu").addClass("hidden");
        $(".cross-button").hide();
        $(".burger-menu-button").show();
    });

});