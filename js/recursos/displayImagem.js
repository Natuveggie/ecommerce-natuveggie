var sizes = jQuery(".product--size").find("span");
sizes.click(function () {
    sizes.removeClass("active");
    $(this).addClass("active");
});

var thumbs = $(".icon-images").find("img");
thumbs.click(function () {
    var src = $(this).attr("src");
    var dp = $(".display-img");
    dp.attr("src", src);
});