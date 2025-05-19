$(document).ready(function () {
    var _id = localStorage.getItem("idUsuario");

    // Menu lateral
    sectionMenuLateral();

    // Verifica se esta logado 
    logando();

    // Carrega os dados dos campos
    carregarTodos();

    // Botão que possibilita alterar dados
    alterarDadosConta();

    // Botão que deleta conta do usuário
    deletarConta();

    // Botão que deleta loja do usuário
    deletarLoja();

    // Carrega os endereços no input
    carregarEnderecoInput();

    deletarEndereco();

    deletarCartao();

    carregarCartaoInput();

    // ----------------------------------------------------------------------- 
    // ALTERAR DADOS DOS CAMPOS

    $("#dadosConta").css("display", "none");
    $("#segurancaConta").css("display", "none");

    disabledTrue();

    $("#altearDadosConta").click(function () {
        $("#dadosConta").css("display", "block");
        $("#altearDadosConta").css("display", "none");

        disabledFalse();
    });

    $("#cancelar").click(function () {
        $("#dadosConta").css("display", "none");
        $("#altearDadosConta").css("display", "block");
        window.location.href = "/perfil";
        disabledTrue();
    });

    $("#altearSeguranca").click(function () {
        $("#segurancaConta").css("display", "block");
        $("#altearSeguranca").css("display", "none");

        disabledFalse();
    });

    // ----------------------------------------------------------------------- 
    // FUNÇÕES DE CONTROLE DA PÁGINA DE PERFIL

    function deletarConta() {
        $("#deletarDadosConta").click(function () {
            var _id = localStorage.getItem("idUsuario");

            $.ajax({
                url: "http://localhost:8001/user/" + _id,
                type: "DELETE",
                success: function (xhr) {
                    alert('Usuário excluído com sucesso');
                    window.location.href = "http://localhost:8001/";
                    localStorage.clear();
                }
            });
        });
    }

    if (localStorage.getItem("idLoja") == null) {
        $('#contaLoja').css("display", "none")
    } else {
        $('#contaLoja').css("display", "block")
    }
    function deletarLoja() {
        $("#deletarDadosLoja").click(function () {
            var _id = localStorage.getItem("idLoja");

            $.ajax({
                url: "http://localhost:8001/store/" + _id,
                type: "DELETE",
                success: function (xhr) {
                    alert('Loja excluída com sucesso');
                    window.location.href = "http://localhost:8001/perfil";
                    localStorage.removeItem("idLoja")
                }
            });
        });
    }

    function deletarEndereco() {
        $('#select-endereco').change(function () {
            var idEnderecoSelecionado = jQuery(this).val();

            console.log(idEnderecoSelecionado);
            

            $("#deletarEndereco").click(function () {
                $.ajax({
                    url: "http://localhost:8001/adress/" + idEnderecoSelecionado,
                    type: "DELETE",
                    success: function (xhr) {
                        alert('Endereco excluído com sucesso');
                        window.location.href = "/perfil";
                    }
                });
            });
        });
    }

    function deletarCartao() {
        $("#select-cartao").change(function () {
            var idCartaoSelecionado = jQuery(this).val();            

            $("#deletarCartao").click(function () {
                $.ajax({
                    url: "http://localhost:8001/cart/" + idCartaoSelecionado,
                    type: "DELETE",
                    success: function (xhr) {
                        alert('Cartão excluído com sucesso');
                        window.location.href = "/perfil";
                    }
                });
            });
        });
    }

    function carregarTodos() {
        var _id = localStorage.getItem("idUsuario");

        $.get("http://localhost:8001/user/" + _id, function (data, status) {
            $("#emailDoUsuario").val(data.email);
            $("#nomeDoUsuario").val(data.nome);
            $("#dataDeNascimento").val(data.dataDeNascimento);
            $("#senhaDoUsuario").val(data.senha);

            if (data.documento == null || data.cnpj == null || data.celular == null || data.telefone == null || data.dataDeNascimento == null) {
                $("#documentoDoUsuario").attr("placeholder", "Você não tem nenhum CPF cadastrado");
                $("#cnpjUsuario").attr("placeholder", "Você não tem nenhum CNPJ cadastrado");
                $("#celDoUsuario").attr("placeholder", "Você não tem nenhum celular cadastrado");
                $("#telDoUsuario").attr("placeholder", "Você não tem nenhum telefone fixo cadastrado");
                $("#dataDeNascimento").attr("placeholder", "Você não tem uma data de nascimento cadastrada");
            } else {
                $("#documentoDoUsuario").val(data.documento)
                $("#cnpjUsuario").val(data.cnpj)
                $("#celDoUsuario").val(data.celular)
                $("#telDoUsuario").val(data.telefone)
                $("#dataDeNascimento").val(data.dataDeNascimento);
            }

            if (data.sexo == "Feminino") {
                $("#feminino").attr("selected", "selected");
            } else {
                $("#masculino").attr("selected", "selected");
            }
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

    function carregarCartaoInput() {
        $.get("http://localhost:8001/cart/list/", function (data, status) {

            var _id = localStorage.getItem("idUsuario");

            for (let index = 0; index < data.length; index++) {
                if (data[index]._id == null || data[index]._id == "" || data[index]._id == undefined) {
                    $("#select-cartao").append('<option>' + "Você não tem número de cartão cadastrado" + '</option>');
                } else {
                    if (_id === data[index].idUsuario) {
                        var cartao = ["Número do cartão: " + data[index].numeroCartao];

                        cartao.forEach(function (item) {
                            $("#select-cartao").append('<option value="' + data[index]._id + '">' + item + '</option>');
                        });

                    } else {
                        $("#select-cartao").append('<option>' + "Você não tem número de cartão cadastrado" + '</option>');
                    }
                }
            }

            var txtCartao = $("#select-cartao");

            if (txtCartao.val() == null || txtCartao.val() == "") {
                $("#select-cartao").append('<option>' + "Você não tem nenhum endereço cadastrado" + '</option>');
            }
        });
    };

    function alterarDadosConta() {
        $("#salvarDadosConta").click(function () {
            var txtNome = $("#nomeDoUsuario");
            var txtDataDeNascimento = $("#dataDeNascimento");
            var txtEmail = $("#emailDoUsuario");
            var txtSenha = $("#senhaDoUsuario");
            var txtDocumento = $("#documentoDoUsuario");
            var txtCelular = $("#celDoUsuario");
            var txtNumDoCartao = $("#numDoCartao");
            var txtNomeDoCartao = $("#nomeDoCartao");
            var txtEndereco = $("#endereco");

            email = $("#emailDoUsuario").val();
            filtro = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if (!txtEmail.val() && !txtNome.val() && !txtDocumento.val() && !txtCelular.val() && !txtDataDeNascimento.val()) {
                alert('Preencha corretamente o campo de e-mail, nome completo, documento, celular e data de nascimento');
                txtEmail.addClass("is-invalid");
                return false;
            } else if (txtEmail.val() == null || txtEmail.val() == "" || !filtro.test(email)) {
                alert('Preencha corretamente o campo e-mail');
                txtEmail.addClass("is-invalid");
                return false;
            } else if (txtNome.val() == null || txtNome.val() == "") {
                alert('Preencha corretamente o campo nome completo');
                txtEmail.addClass("is-invalid");
                return false;
            } else if (txtDocumento.val() == null || txtDocumento.val() == "") {
                alert('Preencha corretamente o campo documento');
                txtEmail.addClass("is-invalid");
                return false;
            } else if (txtCelular.val() == null || txtCelular.val() == "") {
                alert('Preencha corretamente o campo celular');
                txtEmail.addClass("is-invalid");
                return false;
            } else if (txtSenha.val() == null || txtSenha.val() == "") {
                alert('Preencha corretamente o campo senha');
                txtEmail.addClass("is-invalid");
                return false;
            } else {
                var data = {
                    email: $("#emailDoUsuario").val(),
                    senha: $("#senhaDoUsuario").val(),
                    nome: $("#nomeDoUsuario").val(),
                    dataDeNascimento: $("#dataDeNascimento").val(),
                    sexo: $("option[name='sexo']:selected").val(),
                    documento: $("#documentoDoUsuario").val(),
                    cnpj: $("#cnpjUsuario").val(),
                    celular: $("#celDoUsuario").val(),
                    telefone: $("#telDoUsuario").val(),
                    numdocartao: $("#numDoCartao").val(),
                    nomedocartao: $("#nomeDoCartao").val(),
                    endereco: $("#endereco").val(),
                };

                var _id = localStorage.getItem("idUsuario");

                $.ajax({
                    url: "http://localhost:8001/user/" + _id,
                    type: "PUT",
                    data: data,
                    success: function (data, xhr) {
                        alert("Meus dadaos alterado com sucesso!");
                        $("#dadosConta").css("display", "none");
                        $("#altearDadosConta").css("display", "block");
                        window.location.href = "perfil";
                        disabledTrue();
                    }, error: function (data, xhr) {
                        alert("Não foi possível alterar seu Meus Dados!")
                    }
                });
            }
        });
    }

    function disabledTrue() {
        $("#emailDoUsuario").attr("disabled", true)
        $("#nomeDoUsuario").attr("disabled", true)
        $("#dataDeNascimento").attr("disabled", true)
        $("#documentoDoUsuario").attr("disabled", true)
        $("#cnpjUsuario").attr("disabled", true)
        $("#celDoUsuario").attr("disabled", true)
        $("#telDoUsuario").attr("disabled", true)
        $("#numDoCartao").attr("disabled", true)
        $("#nomeDoCartao").attr("disabled", true)
        $("#senhaDoUsuario").attr("disabled", true)
        $("#endereco").attr("disabled", true)
    }

    function disabledFalse() {
        $("#emailDoUsuario").attr("disabled", false)
        $("#nomeDoUsuario").attr("disabled", false)
        $("#dataDeNascimento").attr("disabled", false)
        $("#documentoDoUsuario").attr("disabled", false)
        $("#cnpjUsuario").attr("disabled", false)
        $("#celDoUsuario").attr("disabled", false)
        $("#telDoUsuario").attr("disabled", false)
        $("#senhaDoUsuario").attr("disabled", false)
    }

    function sectionMenuLateral() {
        $(".seguranca-content").css("display", "none");

        $(".sidebar-seguranca").click(function () {
            $(".seguranca-content").css("display", "block");
            $(".dados-content").css("display", "none");
        });

        $(".sidebar-meus-dados").click(function () {
            $(".dados-content").css("display", "block");
            $(".seguranca-content").css("display", "none");
        });
    }

    function logando() {
        if (localStorage.getItem("idUsuario") == null || localStorage.getItem("idUsuario") == "null") {

            $("#myBtn").click();

            // console.log(localStorage.getItem("idUsuario"));
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
