var loadTime = 0;

$(document).ready(function () {
  loadTime = Date.now() - timerStart;
  $(".progress-bar").animate(
    { width: "90%" },
    {
      duration: loadTime,
      complete: function () {
        $(".progress").css("visibility", "visible");
      },
    }
  );
});

$(window).on("load", function () {
  loadTime = Date.now() - timerStart;
  console.log("Windows Load Time:" + loadTime);
  $(".progress-bar").animate(
    { width: "100%" },
    {
      complete: function () {
        $(".progress").css("visibility", "hidden");
      },
    }
  );

  $(".loaderr").fadeOut(1000);
});
