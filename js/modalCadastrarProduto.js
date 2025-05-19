var modalAdicionarProduto = document.getElementById("modalAdicionarProduto");

var btnAdicionarProduto = document.getElementById("btnAdicionarProduto");

var spanmodalAdicionarProduto = document.getElementsByClassName("closeModalAlterar")[0];

btnAdicionarProduto.onclick = function () {
  modalAdicionarProduto.style.display = "block";

  $("#imagemProduto").css("display", "inline-flex");
  $("#imgProduto").css("display", "none");

  $("#nomeProduto").val("");
  $("#descricaoProduto").val("");
  $("#entregaProduto").val("");
  $("#qtdEstoque").val("");
  $("#qtdMinima").val("");
  $("#precoProduto").val("");
  $("#precoPromocionalProduto").val("");

}

spanmodalAdicionarProduto.onclick = function () {
  modalAdicionarProduto.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalAdicionarProduto) {
    modalAdicionarProduto.style.display = "none";
  }
}