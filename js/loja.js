$(document).ready(function () {

    carregaDadosLoja();

    carregarProdutos();

});


function carregaDadosLoja() {
    var _id = localStorage.getItem("idLoja");

    $.get("/store/" + _id, function (data, status) {

        $('.bannerloja').css('background', 'url(/img/uploads/' + data.name[0]);

        if (data.nome == null || data.nome == "" || data.nome == undefined) {
            $(".nomeLoja").text();
        } else {
            $(".nomeLoja").text(data.nome);
        }

        if (data.cidade == null || data.cidade == "" || data.cidade == undefined) {
            $(".enderecoLoja").text(endereco);
        } else {
            var endereco = data.cidade + " - " + data.uf;
            $(".enderecoLoja").text(endereco);
        }

        if (data.descricao == null || data.descricao == "" || data.descricao == undefined) {
            $(".descricaoLoja").text();
        } else {
            $(".descricaoLoja").text(data.descricao);
        }
    });
}

function carregarProdutos() {
    var _id = localStorage.getItem("idLoja");

    $.get("/product/store/" + _id, function (data, status) {

        for (let index = 0; index <= 8; index++) {
            
            if (!data.length == null || !data.length == "" || !data.length == undefined) {
                if (data[index].nomeProduto != null) {
                    $('#produto' + [index]).attr("src", "/img/uploads/" + data[index].imgProduto[0]);
                    $('#nomeProduto' + [index]).text(data[index].nomeProduto);
                    $('#precoProduto' + [index]).text("R$" + data[index].precoProduto).append("<span>" + "kg" + "</span>");
                    $('#linkProduto' + [index]).attr("href", "/produto/" + data[index].idProduto);
                }
            }
        }
    });
}