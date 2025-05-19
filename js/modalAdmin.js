/* -------------------------------------------------------------------------------------- */
/* MODAL ALTERAR USUÁRIO DA PÁGINA ADMIN */

var modalAdicionarProduto = document.getElementById("modalAdicionarProduto");

var btnAdicionarProduto = document.getElementById("btnAdicionarProduto");

var spanmodalAdicionarProduto = document.getElementsByClassName("closeModalAlterar")[0];

btnAdicionarProduto.onclick = function () {
    modalAdicionarProduto.style.display = "block";
  }
  
  spanmodalAdicionarProduto.onclick = function () {
    modalAdicionarProduto.style.display = "none";
  }
  
  window.onclick = function (event) {
    if (event.target == modalAdicionarProduto) {
      modalAdicionarProduto.style.display = "none";
    }
  }