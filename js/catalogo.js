var tempIMG = [];

$("#imagemProduto").on('change', function (event) {
    var files = document.getElementById("imagemProduto").files;

    for (let index = 0; index < files.length; index++) {
        (function (file) {
            var reader = new FileReader();

            reader.onloadend = function () {
                tempIMG.push(reader.result);
                // console.log(reader.result);
            }
            reader.readAsDataURL(file);
        })(files[index]);
    }
});

$(document).ready(function () {
    var _id = localStorage.getItem("idUsuario");

    $('.dinheiro').mask('#.##0,00', { reverse: true });

    $('#imagemLoja').prop('disabled', true);

    // Verifica se esta logado 
    logando();

    // Carrega os produtos na tabela
    carregaProdutosTabela();

    // Cadastra produto
    cadastraProduto();

    // Limpa os campos de validações
    limpaValidacoes();

    // Verifica se o produto é por encomenda 
    opcaoEncomenda();

    // ----------------------------------------------------------------------- 
    // FUNÇÕES DA PÁGINA DA LOJA DE PRODUTOS
    function opcaoEncomenda() {
        $("#encomenda").css("display", "none");
        $('#check').on('click', function () {
            var checkbox = $('#check:checked').length;
            console.log(checkbox);

            if (checkbox === 1) {
                $("#qtdEstoque").attr("disabled", true)
                $("#encomenda").css("display", "inline-flex");
            } else {
                $("#qtdEstoque").attr("disabled", false)
                $("#encomenda").css("display", "none");
            }
        });
    }

    function limpaValidacoes() {
        $('.nome-produto-invalid-feedback').css('display', 'none');
        $('.descricao-produto-invalid-feedback').css('display', 'none');
        $('.entrega-produto-invalid-feedback').css('display', 'none');
        $('.qtd-estoque-invalid-feedback').css('display', 'none');
        $('.preco-produto-invalid-feedback').css('display', 'none');
        $('.preco-promocional-produto-invalid-feedback').css('display', 'none');
    }

    function logando() {
        if (localStorage.getItem("idUsuario") == null || localStorage.getItem("idUsuario") == "null") {

            $("#myBtn").click();

            console.log(localStorage.getItem("idUsuario"));
            $(".logado").css("display", "none");
            $(".deslogado").css("display", "inline-block");
        }

        // Nome do usuário
        var nomeUsuario = localStorage.getItem("nomeUsuario");

        if (nomeUsuario == null || nomeUsuario == "" || nomeUsuario == undefined) {
            document.getElementById("nomeUsuarioMenu").append("Cliente");
        } else {
            var res = nomeUsuario.split(" ");
            document.getElementById("nomeUsuarioMenu").append(res[0]);
        }

        // Id do usuário
        var idUsuario = localStorage.getItem("idUsuario");

        $(".idDoUsuario").val(idUsuario);

        $(".logado").css("display", "inline-block");
        $(".deslogado").css("display", "none");
    }
});

function carregaProdutosTabela() {
    $("#tabela").empty();
    $.get("/product/list", function (data, status) {
        for (i = 0; i < data.length; i++) {
            $("#tabela").append("<tr><td><img class='lista-produto-img' src='img/uploads/" + data[i].name[0] + "' alt='" + data[i].descricao + "'></td><td>" + data[i].nome + "</td><td>" + data[i].qtdEstoque + "</td><td>" + "R$ " + data[i].preco + "</td><td><a onclick='editarProduto(&quot;" + data[i]._id + "&quot;)'><i class='fas fa-edit'></i></a><a onclick='deletarProduto(&quot;" + data[i]._id + "&quot;)'><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr>");
        }
    });
}

function editarProduto(_id, data) {
    $.get("/product/" + _id, function (data, status) {
        $("#idProduto").val(_id);
        $("#modalAlterarTitulo").text("Alterar produto");
        $("#cadastrar-produto").val("Salvar produto");

        for (let index = 0; index < 3; index++) {
            if (data.name[index] != "" || data.name[index] != null || data.name[index] != undefined) {
                $("#imagemProduto").css("display", "none");
                $("#imgProduto").css("display", "inline-flex");
                $("#imgProduto").append("<img class='lista-produto-img' src='img/uploads/" + data.name[index] + "' alt='" + data.descricao + " 'style='margin: 0 10px'>");
            }
        }

        $("#nomeProduto").val(data.nome);
        $("#descricaoProduto").val(data.descricao);
        $("#entregaProduto").val(data.entrega);
        $("#qtdEstoque").val(data.qtdEstoque);
        $("#qtdMinima").val(data.qtdMinima);
        $("#precoProduto").val(data.preco);
        $("#precoPromocionalProduto").val(data.precoPromocional);

        if (data.qtdEstoque == null || data.qtdEstoque == undefined || data.qtdEstoque == "") {
            $("#check").prop("checked", true);

            var checkbox = $('#check:checked').length;
            console.log(checkbox);

            if (checkbox === 1) {
                $("#qtdEstoque").attr("disabled", true)
                $("#encomenda").css("display", "inline-flex");
            } else {
                $("#qtdEstoque").attr("disabled", false)
                $("#encomenda").css("display", "none");
            }

        }

        $("#modalAdicionarProduto").show();
    });
}

function cadastraProduto() {
    $("#cadastrar-produto").click(function () {
        limparForm();

        $("#imagemProduto").css("display", "none");

        $("#modalAlterarTitulo").text("Cadastrar novo produto");
        $("#cadastrar-produto").val("Cadastrar produto");

        var txtImagemProduto = $("#imagemProduto");
        var txtNomeProduto = $("#nomeProduto");
        var txtDescricaoProduto = $("#descricaoProduto");
        var txtQtdEstoque = $("#qtdEstoque");
        var txtQtdMinima = $("#qtdMinima");
        var txtEntregaProduto = $("#entregaProduto");
        var txtPrecoProduto = $("#precoProduto");
        var txtPrecoPromocionalProduto = $("#precoPromocionalProduto");
        var inputEncomenda = $("#inputEncomenda");

        if (txtNomeProduto.val() == null || txtNomeProduto.val() == "") {
            $(".nome-produto-invalid-feedback").text('Preencha corretamente o campo nome do produto');
            $(".nome-produto-invalid-feedback").css("display", "block");
            return false;
        } else if (txtDescricaoProduto.val() == null || txtDescricaoProduto.val() == "") {
            $(".descricao-produto-invalid-feedback").text('Preencha corretamente o campo descrição do produto');
            $(".descricao-produto-invalid-feedback").css("display", "block");
            $(".nome-produto-invalid-feedback").css("display", "none");
            return false;
        } else if (txtPrecoProduto.val() == null || txtPrecoProduto.val() == "") {
            $(".preco-produto-invalid-feedback").text('Preencha corretamente o campo preço do produto');
            $(".preco-produto-invalid-feedback").css("display", "block");
            $(".descricao-produto-invalid-feedback").css("display", "none");
            return false;
        } else {
            limpaValidacoes();

            var data = {
                tempIMG: encodeURIComponent(JSON.stringify(tempIMG)),
                nome: $("#nomeProduto").val(),
                descricao: $("#descricaoProduto").val(),
                entrega: $("#entregaProduto").val(),
                qtdEstoque: $("#qtdEstoque").val(),
                qtdMinima: $("#qtdMinima").val(),
                preco: $("#precoProduto").val(),
                precoPromocional: $("#precoPromocionalProduto").val(),

                idLoja: localStorage.getItem("idLoja")
            }

            console.log(data);

            var _id = $("#idProduto").val();

            if (_id == null || _id == "") {
                $.post("/product/new",
                    data,
                    function (data, status) {
                        alert('Produto cadastrado com sucesso');
                        window.location.href = "/catalogo";
                    });
                limparForm();
            } else {
                $.ajax({
                    url: "/product/" + _id,
                    type: "PUT",
                    data: data,
                    success: function (data, xhr) {
                        carregaProdutosTabela();
                        alert("Produto salvo com sucesso");
                        window.location.href = "/catalogo";
                    }, error: function (data, xhr) {
                        carregaProdutosTabela();
                        $("#msgNotificacao").text('Erro ao salvar o produto');
                    }
                });
                limparForm();
            }
        }
    })
}

function deletarProduto(_id) {
    $.ajax({
        url: "/product/" + _id,
        type: "DELETE",
        success: function (xhr) {
            carregaProdutosTabela();
            alert("Produto excluído com sucesso");
        }
    });
}

function limparForm() {
    $("#nomeProduto").val("");
    $("#descricaoProduto").val("");
    $("#entregaProduto").val("");
    $("#qtdEstoque").val("");
    $("#qtdMinima").val("");
    $("#precoProduto").val("");
    $("precoPromocionalProduto").val("");
}