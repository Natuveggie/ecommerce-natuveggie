destaquesDaSemana();

maisVendidos();

// ----------------------------------------------------------------------- 
// FUNÇÕES DE CONTROLE DA PÁGINA DE INDEX

function maisVendidos() {

    $.get("/product/list", function (data, status) {

        // Verifica se o produto é o mais vendido da semana

        for (let index = 0; index <= 5; index++) {
            if (!data.length == null || !data.length == "" || !data.length == undefined) {

                if (data[index].maisVendidos == "Não") {
                    $('#produto' + [index]).attr("src", "img/uploads/" + data[index].name[0]);
                    $('#nomeProduto' + [index]).text(data[index].nome);                   
                    $('#precoProduto' + [index]).text("R$" + data[index].preco).append("<span>" + "kg" + "</span>");
                    $('#linkProduto' + [index]).attr("href", "/produto/" + data[index]._id);

                    $('.link-produto').click(function () {

                        var idProduto = $(this).attr('data-produto');

                        if (idProduto == "maisVendido0") {
                            localStorage.setItem("idProduto", data[0]._id);
                        } else if (idProduto == "maisVendido1") {
                            localStorage.setItem("idProduto", data[1]._id);
                        } else if (idProduto == "maisVendido2") {
                            localStorage.setItem("idProduto", data[2]._id);
                        } else if(idProduto == "maisVendido3") {
                            localStorage.setItem("idProduto", data[3]._id);
                        }else if(idProduto == "maisVendido4") {
                            localStorage.setItem("idProduto", data[4]._id);
                        }

                    });
                }
            }
        }
    });
}

function destaquesDaSemana() {

    $.get("/store/list", function (data, status) {

        for (let index = 0; index <= 4; index++) {

            // Verifica se loja foi criada há uma semana

            var dataCricao = moment.utc(data[index].created).local().format();
            var m = moment(dataCricao);
            var d = moment().diff(m, 'days');

            if (!data.length == null || !data.length == "") {
                if (d >= 0 && d <= 7) {
                    $('.loja' + [index]).attr("src", "/img/uploads/" + data[index].name[0]);
                    $('.link-loja').attr('href', "/loja/" + data[index]._id);
                }

                $('.link-loja').click(function () {

                    var idLoja = $(this).attr('data-loja');

                    if (idLoja == "loja1") {
                        localStorage.setItem("idLoja", data[0]._id);
                    } else if (idLoja == "loja2") {
                        localStorage.setItem("idLoja", data[1]._id);
                    } else if (idLoja == "loja3") {
                        localStorage.setItem("idLoja", data[2]._id);
                    } else if (idLoja == "loja4") {
                        localStorage.setItem("idLoja", data[3]._id);
                    }

                });
            }
        }
    });
}