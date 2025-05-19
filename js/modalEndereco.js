/* -------------------------------------------------------------------------------------- */
/* MODAL ALTERAR */

var modalAlterar = document.getElementById("modalAlterar");
var btnAlterar = document.getElementById("btnAlterar");

var spanModalAlterar = document.getElementsByClassName("closeModalAlterar")[0];

btnAlterar.onclick = function () {
  $("#modalAlterarTitulo").text('Editar endereço de entrega');
  $("#adicionar-endereco").css("display", "none");
  $("#alterar-endereco").css("display", "block");
  modalAlterar.style.display = "block";
  $("#campoEnderecoSelecionado").css("display", "none");

  var _id = localStorage.getItem("idUsuario");
  console.log(_id);

}

spanModalAlterar.onclick = function () {
  modalAlterar.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalAlterar) {
    modalAlterar.style.display = "none";
  }
}

/* -------------------------------------------------------------------------------------- */
/* MODAL Adicionar */

var modalAlterar = document.getElementById("modalAlterar");
 
var btnAdicionar = document.getElementById("btnAdicionar");

var spanModalAlterar = document.getElementsByClassName("closeModalAlterar")[0];

btnAdicionar.onclick = function() {
  $("#modalAlterarTitulo").text('Adicionar endereço de entrega');
  $("#alterar-endereco").css("display", "none");
  $("#adicionar-endereco").css("display", "block");
  $("#campoEnderecoSelecionado").css("display", "none");
  modalAlterar.style.display = "block";
}

spanModalAlterar.onclick = function () {
  modalAlterar.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalAlterar) {
    modalAlterar.style.display = "none";
  }
}