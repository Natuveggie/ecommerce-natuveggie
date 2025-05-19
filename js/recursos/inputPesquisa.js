var lista = document.getElementById("lista-busca");

$("#lista-busca").css("display", "none");

window.onclick = function (event) {
    if (event.target == lista) {
        lista.style.display = "none";
    }
}

function myFunction() {
    $("#lista-busca").css("display", "inline-block");

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("pesquisa-menu-desktop");
    filter = input.value.toUpperCase();
    ul = document.getElementById("lista-busca");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

$.get("/store/list/", function (data, status) {

    for (let index = 0; index < data.length; index++) {
        $("#lista-busca").append('<li><a href="/loja/' + data[index]._id + '">' + data[index].nome + '</a></li>');
        // $("#lista-busca").append('<li><a href="/loja/'+ data[index]._id +'">' + data[index].categoria + '</a></li>');
        // $("#lista-busca").append('<li><a href="/loja/'+ data[index]._id +'">' + data[index].tag + '</a></li>');
    }
});

$.get("/product/list/", function (data, status) {
    console.log(data[0].nome);

    for (let index = 0; index < data.length; index++) {
        $("#lista-busca").append('<li><a href="/produto/' + data[index]._id + '">' + data[index].nome + '</a></li>');
    }
});

