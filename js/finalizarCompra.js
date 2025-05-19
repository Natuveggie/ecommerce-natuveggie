$(document).ready(function () {
    var _id = localStorage.getItem("idUsuario");

    // Verifica se esta logado
    logando();

    // Modal responsável por Adicionar Novo Endereço
    modalAdicionarEndereco();

    // Modal responsável por Alterar Endereço
    modalAlterarEndereco();

    // Escolhe formas de pagamento
    escolherFormasPagamento();

    // Carrega dados no campo de endereço
    carregarEnderecoInput();

    // Tira as validações
    limpaValidacoes();

    // Carrega dados do resumo do pedido
    carregarResumoPedido();

    // ----------------------------------------------------------------------- 
    // FUNÇÕES DA PÁGINA DE CONCLUIR COMPRA

    function limpaValidacoes() {
        $(".cartao-credito").css("display", "none");
        $(".paypal").css("display", "none");

        $(".cep-invalid-feedback").css("display", "none");
        $(".rua-invalid-feedback").css("display", "none");
        $(".num-invalid-feedback").css("display", "none");
        $(".bairro-invalid-feedback").css("display", "none");
        $(".cidade-invalid-feedback").css("display", "none");
        $(".uf-invalid-feedback").css("display", "none");
        $(".referencia-invalid-feedback").css("display", "none");
        $(".complemento-invalid-feedback").css("display", "none");

        $(".cartao-invalid-feedback").css("display", "none");
        $(".nomeCartao-invalid-feedback").css("display", "none");
        $(".validade-invalid-feedback").css("display", "none");
        $(".cvv-invalid-feedback").css("display", "none");
        $(".parcelar-invalid-feedback").css("display", "none");
    }

    function limparForm() {
        $("#cep").val("");
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#complemento").val("");
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

        // Id do usuário
        var idUsuario = localStorage.getItem("idUsuario");

        $(".idDoUsuario").val(idUsuario);

        $(".logado").css("display", "inline-block");
        $(".deslogado").css("display", "none");
    }

    function carregarEndereco() {
        $('#select-endereco').change(function () {
            var idEnderecoSelecionado = jQuery(this).val();

            $("#idEnderecoSelecionado").val(idEnderecoSelecionado);

            $.get("http://localhost:8001/adress/" + idEnderecoSelecionado, function (data, status) {
                $("#cep").val(data.cep)
                $("#rua").val(data.rua)
                $("#num").val(data.num)
                $("#bairro").val(data.bairro)
                $("#cidade").val(data.cidade)
                $("#uf").val(data.uf)
                $("#referencia").val(data.referencia)
                $("#complemento").val(data.complemento)
            });
        });
    }

    function modalAlterarEndereco() {
        carregarEndereco();

        $("#alterar-endereco").click(function () {
            var txtCep = $("#cep");
            var txtRua = $("#rua");
            var txtNum = $("#num");
            var txtBairro = $("#bairro");
            var txtCidade = $("#cidade");
            var txtUf = $("#uf");
            var txtReferencia = $("#referencia");
            var txtComplemento = $("#complemento");

            if (txtCep.val() == null || txtCep.val() == "") {
                $(".cep-invalid-feedback").text('Preencha corretamente o campo CEP');
                $(".cep-invalid-feedback").css("display", "block");
                return false;
            } else if (txtRua.val() == null || txtRua.val() == "") {
                $(".rua-invalid-feedback").text('Preencha corretamente o campo rua/avenida');
                $(".rua-invalid-feedback").css("display", "block");
                $(".cep-invalid-feedback").css("display", "none");
                return false;
            } else if (txtNum.val() == null || txtNum.val() == "") {
                $(".num-invalid-feedback").text('Preencha corretamente o campo de numero');
                $(".num-invalid-feedback").css("display", "block");
                $(".rua-invalid-feedback").css("display", "none");
                return false;
            } else if (txtBairro.val() == null || txtBairro.val() == "") {
                $(".bairro-invalid-feedback").text('Preencha corretamente o campo bairro');
                $(".bairro-invalid-feedback").css("display", "block");
                $(".rua-invalid-feedback").css("display", "none");
                return false;
            } else if (txtCidade.val() == null || txtCidade.val() == "") {
                $(".cidade-invalid-feedback").text('Preencha corretamente o campo cidade');
                $(".cidade-invalid-feedback").css("display", "block");
                $(".bairro-invalid-feedback").css("display", "none");
                return false;
            } else if (txtUf.val() == null || txtUf.val() == "") {
                $(".uf-invalid-feedback").text('Preencha corretamente o campo estado');
                $(".uf-invalid-feedback").css("display", "block");
                $(".cidade-invalid-feedback").css("display", "none");
                return false;
            } else if (txtReferencia.val() == null || txtReferencia.val() == "") {
                $(".referencia-invalid-feedback").text('Preencha corretamente o campo referencia');
                $(".referencia-invalid-feedback").css("display", "block");
                $(".cidade-invalid-feedback").css("display", "none");
                $(".num-invalid-feedback").css("display", "none");
                return false;
            } else {
                $(".cep-invalid-feedback").css("display", "none");
                $(".rua-invalid-feedback").css("display", "none");
                $(".num-invalid-feedback").css("display", "none");
                $(".bairro-invalid-feedback").css("display", "none");
                $(".cidade-invalid-feedback").css("display", "none");
                $(".uf-invalid-feedback").css("display", "none");
                $(".referencia-invalid-feedback").css("display", "none");
                $(".complemento-invalid-feedback").css("display", "none");

                var data = {
                    cep: $("#cep").val(),
                    rua: $("#rua").val(),
                    num: $("#num").val(),
                    bairro: $("#bairro").val(),
                    cidade: $("#cidade").val(),
                    uf: $("#uf").val(),
                    referencia: $("#referencia").val(),
                    complemento: $("#complemento").val(),

                    idUsuario: localStorage.getItem("idUsuario")
                };

                console.log(data);

                $.ajax({
                    url: "http://localhost:8001/adress/" + idEnderecoSelecionado,
                    type: "PUT",
                    data: data,
                    success: function (data, xhr) {
                        alert("Endereço alterado com sucesso!");
                        $("#dadosConta").css("display", "none");
                        $("#altearDadosConta").css("display", "block");
                        window.location.href = "finalizar-compra";

                        disabledTrue();
                    }, error: function (data, xhr) {
                        alert("Não foi possível salvar o seu endereço!")
                    }
                });
            }
        });
    }

    function modalAdicionarEndereco() {
        $("#adicionar-endereco").click(function () {
            var txtCep = $("#cep");
            var txtRua = $("#rua");
            var txtNum = $("#num");
            var txtBairro = $("#bairro");
            var txtCidade = $("#cidade");
            var txtUf = $("#uf");
            var txtReferencia = $("#referencia");
            var txtComplemento = $("#complemento");

            if (txtCep.val() == null || txtCep.val() == "") {
                $(".cep-invalid-feedback").text('Preencha corretamente o campo CEP');
                $(".cep-invalid-feedback").css("display", "block");
                return false;
            } else if (txtRua.val() == null || txtRua.val() == "") {
                $(".rua-invalid-feedback").text('Preencha corretamente o campo rua/avenida');
                $(".rua-invalid-feedback").css("display", "block");
                $(".cep-invalid-feedback").css("display", "none");
                return false;
            } else if (txtNum.val() == null || txtNum.val() == "") {
                $(".num-invalid-feedback").text('Preencha corretamente o campo de numero');
                $(".num-invalid-feedback").css("display", "block");
                $(".rua-invalid-feedback").css("display", "none");
                return false;
            } else if (txtBairro.val() == null || txtBairro.val() == "") {
                $(".bairro-invalid-feedback").text('Preencha corretamente o campo bairro');
                $(".bairro-invalid-feedback").css("display", "block");
                $(".rua-invalid-feedback").css("display", "none");
                return false;
            } else if (txtCidade.val() == null || txtCidade.val() == "") {
                $(".cidade-invalid-feedback").text('Preencha corretamente o campo cidade');
                $(".cidade-invalid-feedback").css("display", "block");
                $(".bairro-invalid-feedback").css("display", "none");
                return false;
            } else if (txtUf.val() == null || txtUf.val() == "") {
                $(".uf-invalid-feedback").text('Preencha corretamente o campo estado');
                $(".uf-invalid-feedback").css("display", "block");
                $(".cidade-invalid-feedback").css("display", "none");
                return false;
            } else if (txtReferencia.val() == null || txtReferencia.val() == "") {
                $(".referencia-invalid-feedback").text('Preencha corretamente o campo referencia');
                $(".referencia-invalid-feedback").css("display", "block");
                $(".cidade-invalid-feedback").css("display", "none");
                $(".num-invalid-feedback").css("display", "none");
                return false;
            } else {
                $(".cep-invalid-feedback").css("display", "none");
                $(".rua-invalid-feedback").css("display", "none");
                $(".num-invalid-feedback").css("display", "none");
                $(".bairro-invalid-feedback").css("display", "none");
                $(".cidade-invalid-feedback").css("display", "none");
                $(".uf-invalid-feedback").css("display", "none");
                $(".referencia-invalid-feedback").css("display", "none");
                $(".complemento-invalid-feedback").css("display", "none");

                var data = {
                    cep: $("#cep").val(),
                    rua: $("#rua").val(),
                    num: $("#num").val(),
                    bairro: $("#bairro").val(),
                    cidade: $("#cidade").val(),
                    uf: $("#uf").val(),
                    referencia: $("#referencia").val(),
                    complemento: $("#complemento").val(),

                    idUsuario: localStorage.getItem("idUsuario")
                };

                console.log(data);

                $.post("/adress/new",
                    data,
                    function (data, status) {
                        alert('Endereço cadastrado com sucesso');
                        window.location.href = "finalizar-compra";
                    });
                limparForm();
            }
        });
    }

    function escolherFormasPagamento() {
        $("#link-cartao").click(function () {
            $(".cartao-credito").css("display", "block");
            $(".paypal").css("display", "none");
        });
        $("#link-paypal").click(function () {
            $(".paypal").css("display", "block");
            $(".cartao-credito").css("display", "none");
        });
    }

    function carregarEnderecoInput() {
        $.get("http://localhost:8001/adress/list", function (data, status) {
            for (let index = 0; index < data.length; index++) {
                if (data[index]._id == null || data[index]._id == "" || data[index]._id == undefined) {
                    $("#select-endereco").append('<option>' + "Você não tem nenhum endereço cadastrado" + '</option>');
                } else {

                    if (_id === data[index].idUsuario) {

                        if (data[index].num == null || data[index].num == "" || data[index.num == undefined]) {
                            var endereco = [data[index].rua + ", " + data[index].num + ", " + data[index].bairro + ", " + data[index].cidade + "/" + data[index].uf];
                        } else {
                            var endereco = [data[index].rua + ", " + data[index].num + ", " + data[index].bairro + ", " + data[index].cidade + "/" + data[index].uf];
                        }

                        endereco.forEach(function (item) {
                            $("#select-endereco").append('<option value="' + data[index]._id + '">' + item + '</option>');
                        });

                    }

                }
            }
            var txtEndereco = $("#select-endereco");

            if (txtEndereco.val() == null || txtEndereco.val() == "") {
                $("#select-endereco").append('<option>' + "Você não tem nenhum endereço cadastrado" + '</option>');
            }
        });
    }

    function carregarResumoPedido() {
        var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));

        for (let index = 0; index < listaCarrinho.length; index++) {
            $("#subtotal").text(listaCarrinho[index].subtotal)
            $("#total").text(listaCarrinho[index].total);
        }
    }

});