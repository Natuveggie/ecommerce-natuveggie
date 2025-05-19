$(document).ready(function () {
    $(".content-admin").css("display", "none");
    $(".content-compras").css("display", "none");
    $(".content-vendas").css("display", "none");
    $(".content-config").css("display", "none");

    $(".meus-dados").css("display", "block");
    $("#btn-dados").click(function () {
        $(".breadcrumb-text strong").text('Meus dados');
        $(".meus-dados").css("display", "block");
        
    });
    $(".sidebar-admin").click(function () {
        $('.hiders-admin').toggle();
    });
    $(".sidebar-compras").click(function () {
        $('.hiders-compras').toggle();
    });
    $(".sidebar-vendas").click(function () {
        $('.hiders-vendas').toggle();
    });
    $(".sidebar-config").click(function () {
        $('.hiders-config').toggle();
    });

    // Link de navegação

    $(".dados").click(function () {
        window.location.href = "/perfil";
    });
});