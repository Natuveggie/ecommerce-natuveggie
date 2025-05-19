// Upload de imagem

var tempIMG = [];

$("#imagemLoja").on('change', function (event) {
    var files = document.getElementById("imagemLoja").files;

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

    // Cadastrar dados da loja
    cadastrarDadosLoja();

    // Carregar dados nos inputs
    carregarTodosInputs();

    // Abre a loja de acordo com o id da própria loja
    abreLojacorreta();

    // Verifica se esta logado 
    logando();

    // ----------------------------------------------------------------------- 
    // ALTERAR DADOS DOS CAMPOS

    $("#dadosLoja").css("display", "none");

    disabledTrue();

    $("#altearDadosLoja").click(function () {
        $("#dadosLoja").css("display", "block");
        $("#altearDadosLoja").css("display", "none");

        disabledFalse();
    });

    $("#cancelar").click(function () {
        $("#dadosLoja").css("display", "none");
        $("#altearDadosLoja").css("display", "block");

        disabledTrue();
    });

    // ----------------------------------------------------------------------- 
    // FUNÇÕES DE CONTROLE DA PÁGINA DE CADASTRAR LOJA

    function abreLojacorreta() {
        $("#btnVerLoja").click(function () {
            var idLoja = localStorage.getItem("idLoja");
            
            window.location.href = "/loja/" + idLoja;
        });
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

    function carregarTodosInputs() {
        var _id = localStorage.getItem("idUsuario");

        $.get("/store/user/" + _id, function (data, status) {

            if (data[0] == "" || data[0] == undefined || data[0] == null) {
                $("#nomeLoja").attr("placeholder", "Você não tem uma loja cadastrada");
                $("#descricaoLoja").attr("placeholder", "Você não tem uma descrição cadastrada");
                $("#politicaLoja").attr("placeholder", "Você não tem uma política cadastrada");
                $("#tagLoja").attr("placeholder", "Você não tem uma tag cadastrada");
                $("#cidadeLoja").attr("placeholder", "Você não tem uma cidade cadastrada");
                $("#ufLoja").attr("placeholder", "Você não tem uma estado (uf) cadastrada");
                $(".botoes-loja").css("display", "none");
            } else {
                localStorage.setItem("idLoja", data[0]._id);
                localStorage.setItem("nomeLoja", data[0].nome);

                $("#idLoja").val(data[0]._id);
                $("#nomeLoja").val(data[0].nome);
                $("#descricaoLoja").val(data[0].descricao);
                $("#categorias").val(data[0].categoria);
                $("#politicaLoja").val(data[0].politica);
                $("#tagLoja").val(data[0].tag);
                $("#select-categorias").val(data[0].categoria);
                $("#select-cidades").val(data[0].cidade);
                $("#select-estados").val(data[0].uf);
                // $(".botoes-loja").css("display", "block");
            }

            if (data[0].name[0] != null || data[0].name[0] != "" ||  data[0].name[0] != undefined){
                $("#imagemLoja").css("display","none");
                $("#imgLoja").css("display","inline-flex");
                $('#imgLoja').append("<img id='imagem-loja' src='img/uploads/" + data[0].name[0] + "' />");
            }
        })
    }

    function cadastrarDadosLoja() {
        $("#salvarDadosLoja").click(function () {
            var txtNomeLoja = $("#nomeLoja");
            var txtDescricaoLoja = $("#descricaoLoja");
            var txtCategoriaLoja = $("#select-categorias");
            var txtPolitcaLoja = $("#politicaLoja");
            var txtTagLoja = $("#tagLoja");
            var txtCidadeLoja = $("#select-cidades");
            var txtUfLoja = $("#select-estados");

            if (!txtNomeLoja.val() && !txtDescricaoLoja.val() && !txtCategoriaLoja.val() && !txtPolitcaLoja.val() && !txtTagLoja.val()) {
                alert('Preencha corretamente os campos de nome, descrição, categoria, política, tag, cidade e uf');
            } else if (txtNomeLoja.val() == null || txtNomeLoja.val() == "") {
                alert('Prencha corremente o campo de nome da loja');
                return false;
            } else if (txtDescricaoLoja.val() == null || txtDescricaoLoja.val() == "") {
                alert('Preencha corremente o campo de descrição da loja');
                return false;
            } else if (txtPolitcaLoja.val() == null || txtPolitcaLoja.val() == "") {
                alert('Preencha corremente o campo de política da loja');
                return false;
            } else if (txtTagLoja.val() == null || txtTagLoja.val() == "") {
                alert('Preencha corremente o campo de tag da loja');
                return false;
            } else if (txtCidadeLoja.val() == null || txtCidadeLoja.val() == "") {
                alert('Preencha corremente o campo de cidade da sua loja');
                return false;
            } else if (txtUfLoja.val() == null || txtUfLoja.val() == "") {
                alert('Preencha corremente o campo de estado(uf) da sua loja');
                return false;
            } else if (txtCategoriaLoja.val() == null || txtCategoriaLoja.val() == "") {
                alert('Preencha corremente o campo de categoria da loja');
                return false;
            } else {
                var data = {
                    nome: $("#nomeLoja").val(),
                    descricao: $("#descricaoLoja").val(),
                    politica: $("#politicaLoja").val(),
                    tag: $("#tagLoja").val(),
                    cidade: $("#select-cidades").val(),
                    uf: $("#select-estados").val(),
                    categoria: $("#select-categorias").val(),
                    tempIMG: encodeURIComponent(JSON.stringify(tempIMG)),

                    idUsuario: localStorage.getItem("idUsuario")
                };

                var _id = $("#idLoja").val();

                if (_id == null || _id == "") {
                    $.post("/store/new",
                        data,
                        function (data, status) {
                            alert('Loja cadastrada com sucesso');
                            window.location.href = "/cadastrar-loja";
                        });
                    limparForm();
                } else {
                    $.ajax({
                        url: "/store/" + _id,
                        type: "PUT",
                        data: data,
                        success: function (data, xhr) {
                            alert("Loja salva com sucesso");
                            window.location.href = "/cadastrar-loja";
                        }, error: function (data, xhr) {
                            alert('Erro ao salvar o produto');
                        }
                    });
                    limparForm();
                }
            }
        });
    }

    function disabledTrue() {
        $('#imagemLoja').prop('disabled', true);
        $("#nomeLoja").attr("disabled", true);
        $("#descricaoLoja").attr("disabled", true);
        $("#politicaLoja").attr("disabled", true);
        $("#tagLoja").attr("disabled", true);
        $("#select-cidades").attr("disabled", true);
        $("#select-estados").attr("disabled", true);
        $("#select-categorias").attr("disabled", true);
    }

    function disabledFalse() {
        $('#imagemLoja').prop('disabled', false);
        $("#nomeLoja").attr("disabled", false);
        $("#descricaoLoja").attr("disabled", false);
        $("#politicaLoja").attr("disabled", false);
        $("#tagLoja").attr("disabled", false);
        $("#select-cidades").attr("disabled", false);
        $("#select-estados").attr("disabled", false);
        $("#select-categorias").attr("disabled", false);
    }

});