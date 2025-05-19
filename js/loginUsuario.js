function logout(botao) {
    localStorage.clear();
    location.reload();
    alert("Deslogado com sucesso! ");
    $(".logado").css("display", "none");
    $(".deslogado").css("display", "inline-block");
}

$(document).ready(function () {

    // Verifica se esta logado 
    logado();

    // Limpa os dados dos inputs do form
    limparForm();

    $("#notificacao-modal-entrar").hide();

    // Responsável por efetuar o login
    logar();

    // ----------------------------------------------------------------------- 
    // FUNÇÕES DE CONTROLE DO LOGIN

    function limparForm() {
        $("#email").val("");
        $("#senha").val("");
    }

    function logado() {
        if (localStorage.getItem("idUsuario") == null || localStorage.getItem("idUsuario") == "null") {
            // console.log(localStorage.getItem("idUsuario"));
            $(".logado").css("display", "none");
            $(".deslogado").css("display", "inline-block");
        } else {

            // Nome do usuário
            var nomeUsuario = localStorage.getItem("nomeUsuario");

            var res = nomeUsuario.split(" ");
            document.getElementById("nomeUsuario").append(res[0]);

            // Id do usuário
            var idUsuario = localStorage.getItem("idUsuario");

            $(".idDoUsuario").val(idUsuario);

            $(".logado").css("display", "inline-block");
            $(".deslogado").css("display", "none");

        }
    }

    function logar() {
        $("#entrar").click(function () {

            $(".alert").removeClass("alert-success");
            $(".alert").addClass("alert-danger");

            var txtEmail = $("#email");
            var txtSenha = $("#senha");

            $(".email-invalid-feedback").css("display", "none");
            $(".senha-invalid-feedback").css("display", "none");

            email = $("#email").val();
            filtro = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if (!txtEmail.val() && !txtSenha.val()) {
                $("#msgNotificacao-modal-entrar").text('Preencha corretamente os campos de email e senha');
                $("#notificacao-modal-entrar").show();
                return false;
            } else if (txtEmail.val() == null || txtEmail.val() == "" || !filtro.test(email)) {
                $(".email-invalid-feedback").text('Preencha corretamente o campo email');
                $("#msgNotificacao-modal-entrar").css("display", "none");
                $(".email-invalid-feedback").css("display", "block");
                $(".senha-invalid-feedback").css("display", "none");
                return false;
            } else if (txtSenha.val() == null || txtSenha.val() == "") {
                $(".senha-invalid-feedback").text('Preencha corretamente o campo senha');
                $("#msgNotificacao-modal-entrar").css("display", "none");
                $(".email-invalid-feedback").css("display", "none");
                $(".senha-invalid-feedback").css("display", "block");
                return false;
            } else {
                $("#notificacao-modal-entrar").hide();
                var data = {
                    email: $("#email").val(),
                    senha: $("#senha").val()
                };
                $.post("http://localhost:8001/user/login",
                    data,
                    function (data, status) {
                        $(".alert").removeClass("alert-danger");
                        $(".alert").addClass("alert-success");

                        $("#notificacao-modal-entrar").show();
                        console.log(data.status);
                        if (data.status == 1) {
                            localStorage.setItem("idUsuario", data.id);
                            localStorage.setItem("nomeUsuario", data.nome);
                            $("#msgNotificacao-modal-entrar").css("display", "block");
                            $("#msgNotificacao-modal-entrar").text('Usuário logado com sucesso');
                            $(".logado").css("display", "inline-block");
                            $(".deslogado").css("display", "none");
                            window.setTimeout(function(){
                                location.reload()
                                $(".close").click();
                            },2000)
                        } else {
                            $("#msgNotificacao-modal-entrar").css("display", "block");
                            $(".alert").removeClass("alert-success");
                            $(".alert").addClass("alert-danger");
                            $("#msgNotificacao-modal-entrar").text(data.msg);
                            console.log(data.msg);
                        }
                    });
                limparForm();
            }
        });
    }
});