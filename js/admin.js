$(document).ready(function () {

    // Carrega dados para dos indicador dos usuários
    carregaNumerosUsuarios();

    // Carrega dados para dos indicador dos clientes
    carregaNumerosClientes();

    // Carrega dados para dos indicador das lojas
    carregaNumerosLoja();

    // Carrega dados para dos indicador das produtos
    carregaNumerosProdutos()

    // Carrega os clientes na tabela
    carregaClientesTabela();

    // Carrega os clientes na tabela
    carregaVendedoresTabela();

    // Verifica se esta logado 
    logando();

    // ----------------------------------------------------------------------- 
    // FUNÇÕES DA PÁGINA DE ADMIN

    function carregaNumerosUsuarios() {
        $.get("/users/number", function (data, status) {
            $("#numUsuarios").text(data)
        });
    }

    function carregaNumerosClientes() {
        $.get("/user/list", function (data, status) {

            var i = 0;
            for (let index = 0; index < data.length; index++) {
                console.log(data[index].documento);

                if(data[index].documento != null){
                    i++;
                }

                $("#numClientes").text(i)
                
            }
        });
    }

    function carregaNumerosLoja() {
        $.get("/stores/number", function (data, status) {
            $("#numLojas").text(data)

        });
    }

    function carregaNumerosProdutos() {
        $.get("/products/number", function (data, status) {
            $("#numProdutos").text(data)

        });
    }

    function carregaClientesTabela() {
        $("#tabela-clientes").empty();
        $.get("/user/list", function (data, status) {

            var regex = /@natuveggie\.com$/;

            for (i = 0; i < data.length; i++) {
                var hierarquia = regex.test(data[i].email);  

                $("#tabela-clientes").append(`<tr>
                    <td style="font-weight: 600">${hierarquia == true? "Admin": "User"}</td>
                    <td>${data[i].nome}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].senha != null? "...": ""}</td>
                    <td>
                        <a onclick='editarUsuarios("${data[i]._id}")'>
                            <i class='fas fa-edit'></i>
                        </a>
                        <a onclick='deletarUsuario("${data[i]._id}")'>
                            <i class='fa fa-trash' aria-hidden='true'></i>
                        </a>
                    </td>
                </tr>`);
            }
        });
    }

    function carregaVendedoresTabela() {
        $("#tabela-vendedores").empty();
        $.get("/seller/list", function (data, status) {
            for (i = 0; i < data.length; i++) {
                $("#tabela-vendedores").append("<tr><td>" + data[i].nome + "</td><td>" + data[i].email + "</td><td><a onclick='editarProduto(&quot;" + data[i]._id + "&quot;)'><i class='fas fa-edit'></i></a><a onclick='deletarProduto(&quot;" + data[i]._id + "&quot;)'><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr>");
            }
        });
    }

    function logando() {
        if (localStorage.getItem("idUsuario") == null || localStorage.getItem("idUsuario") == "null") {
            // window.location.href = "http://localhost:8001/";

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
        // console.log("Id do usuário: " + idUsuario);

        $(".idDoUsuario").val(idUsuario);

        $(".logado").css("display", "inline-block");
        $(".deslogado").css("display", "none");
    }
});

function editarUsuarios(_id, data) {
    $.get("/user/" + _id, function (data, status) {
        $("#idUsuario").val(_id);

        $("#nomeUsuarioAdmin").val(data.nome);
        $("#emailUsuario").val(data.email);
        $("#senhaUsuario").val(data.senha);

        $("#modalAdicionarProduto").show();
    });
}

function deletarUsuario(_id) {
    $.ajax({
        url: "/user/" + _id,
        type: "DELETE",
        success: function (xhr) {
            carregaClientesTabela();
            alert("Usuário excluído com sucesso");
        }
    });
}

function cadastraProduto() {
    $("#cadastrar-produto").click(function () {
        limparForm();

        var txtImagemProduto = $("#imagemProduto");
        var txtNomeProduto = $("#nomeProduto");
        var txtDescricaoProduto = $("#descricaoProduto");

        if (txtNomeProduto.val() == null || txtNomeProduto.val() == "") {
            $(".nome-produto-invalid-feedback").text('Preencha corretamente o campo nome do produto');
            $(".nome-produto-invalid-feedback").css("display", "block");
            return false;
        } else if (txtDescricaoProduto.val() == null || txtDescricaoProduto.val() == "") {
            $(".descricao-produto-invalid-feedback").text('Preencha corretamente o campo descrição do produto');
            $(".descricao-produto-invalid-feedback").css("display", "block");
            $(".nome-produto-invalid-feedback").css("display", "none");
            return false;
        } else if (txtEntregaProduto.val() == null || txtEntregaProduto.val() == "") {
            $(".entrega-produto-invalid-feedback").text('Preencha corretamente o campo de entrega do produto');
            $(".entrega-produto-invalid-feedback").css("display", "block");
            $(".descricao-produto-invalid-feedback").css("display", "none");
            return false;
        } else {
            limpaValidacoes();

            var data = {
                tempIMG: encodeURIComponent(JSON.stringify(tempIMG)),
                nome: $("#nomeProduto").val(),
                descricao: $("#descricaoProduto").val(),
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