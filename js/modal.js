/* -------------------------------------------------------------------------------------- */
/* MODAL LOGIN CADASTRO */

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

$("#msgNotificacao-modal-entrar").css("display", "none");

btn.onclick = function() {
   modal.style.display = "block";
}
 
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
 }
}