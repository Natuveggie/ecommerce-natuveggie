$(document).ready(function () {

    // Limpa o formulário de cadastro
    limparForm();

    // Tira as validações
    limpaValidacoes();

    $("#notificacao-modal-cadastrar").hide();

    // Modal para cadastrar dados da conta
    cadastrarDadosConta();
});

// ----------------------------------------------------------------------- 
// FUNÇÕES DE CONTROLE DA PÁGINA DE PERFIL

function limparForm() {
    $("#idUsuario").val("");
    $("#nome").val("");
    $("#email").val("");
    $("#emailConfirmar").val("");
    $("#senhaCadastrada").val("");
    $("#senhaConfirmar").val("");
}

function limpaValidacoes() {
    $(".nome-invalid-feedback").css("display", "none");
    $(".emailCadastrado-invalid-feedback").css("display", "none");
    $(".emailConfirmar-invalid-feedback").css("display", "none");
    $(".senhaCadastrada-invalid-feedback").css("display", "none");
    $(".senhaConfirmar-invalid-feedback").css("display", "none");
}

function cadastrarDadosConta() {
    $("#cadastrar").click(function () {

        $(".alert").removeClass("alert-success");
        $(".alert").addClass("alert-danger");

        var txtNome = $("#nome");
        var txtEmail = $("#emailCadastrado");
        var txtEmailConfirmar = $("#emailConfirmar");
        var txtSenha = $("#senhaCadastrada");
        var txtSenhaConfirmar = $("#senhaConfirmar");

        $(".nome-invalid-feedback").css("display", "none");
        $(".emailCadastrado-invalid-feedback").css("display", "none");
        $(".emailConfirmar-invalid-feedback").css("display", "none");
        $(".senhaCadastrada-invalid-feedback").css("display", "none");
        $(".senhaConfirmar-invalid-feedback").css("display", "none");

        email = $("#emailCadastrado").val();
        filtro = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if (!txtNome.val() && !txtEmail.val() && !txtSenha.val()) {
            $("#msgnotificacao-modal-cadastrar").text('Preencha corretamente os campos de nome, email, confirmar email e senha');
            $("#notificacao-modal-cadastrar").show();
            return false;
        } else if (txtNome.val() == null || txtNome.val() == "") {
            $(".nome-invalid-feedback").text('Preencha corretamente o campo nome');
            $("#msgnotificacao-modal-cadastrar").css("display", "none");
            $(".nome-invalid-feedback").css("display", "block");
            $(".emailCadastrado-invalid-feedback").css("display", "none");
            return false;
        } else if (txtEmail.val() == null || txtEmail.val() == "" || !filtro.test(email)) {
            $(".emailCadastrado-invalid-feedback").text('Preencha corretamente o campo email');
            $("#msgnotificacao-modal-cadastrar").css("display", "none");
            $(".emailCadastrado-invalid-feedback").css("display", "block");
            $(".senhaCadastrada-invalid-feedback").css("display", "none");
            return false;
        } else if (txtEmail.val() != txtEmailConfirmar.val()) {
            $(".emailConfirmar-invalid-feedback").text('Os emails não conferem');
            $("#msgnotificacao-modal-cadastrar").css("display", "none");
            $(".emailConfirmar-invalid-feedback").css("display", "block");
            return false;
        } else if (txtSenha.val() == null || txtSenha.val() == "") {
            $(".senhaCadastrada-invalid-feedback").text('Preencha corretamente o campo senha');
            $("#msgnotificacao-modal-cadastrar").css("display", "none");
            $(".emailCadastrado-invalid-feedback").css("display", "none");
            $(".senhaCadastrada-invalid-feedback").css("display", "block");
            return false;
        } else if (txtSenha.val() != txtSenhaConfirmar.val()) {
            $(".senhaConfirmar-invalid-feedback").text('As senhas não conferem');
            $("#msgnotificacao-modal-cadastrar").css("display", "none");
            $(".senhaCadastrada-invalid-feedback").css("display", "none");
            $(".senhaConfirmar-invalid-feedback").css("display", "block");
            return false;
        } else {
            $("#notificacao").hide();
            var data = {
                nome: $("#nome").val(),
                email: $("#emailCadastrado").val(),
                emailConfirmar: $("#emailConfirmar").val(),
                senha: $("#senhaCadastrada").val(),
                senhaConfirmar: $("#senhaConfirmar").val()
            };
            $.post("/user/new",
                data,
                function (data, status) {
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");
                    $("#msgNotificacao-modal-cadastrar").css("display", "block");
                    $("#msgNotificacao-modal-cadastrar").text('Usuário cadastrado com sucesso');
                    $("#notificacao-modal-cadastrar").show();

                    window.setTimeout(function(){
                        $("#link-entrar").click();
                    },2000)
                });
            limparForm();
        }
    });
}