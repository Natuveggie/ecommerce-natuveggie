/* -------------------------------------------------------------------------------------- */
/* EFEITO MODAL LOGIN E CADASTRO */

$("#modal-cadastrar").hide();
$("#notificacao").hide();

$(document).ready(function () {
  $("#link-cadastre").click(function () {
    $("#modal-entrar").hide();
    $("#modal-cadastrar").show();
  });
});

$(document).ready(function () {
  $("#link-entrar").click(function () {
    $("#modal-entrar").show();
    $("#modal-cadastrar").hide();
  });
});