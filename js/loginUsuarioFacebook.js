
$('#facebook-button').on('click', function () {

    OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');

    OAuth.popup('facebook').then(facebook => {
        // console.log('facebook:', facebook);

        facebook.me().then(data => {
            // console.log(data);

            $("#email").val(data.email);
            $("#senha").val(data.id);

            var dataFacebook = {
                email: $("#email").val(),
                senha: $("#senha").val(),
            }
            $.post("http://localhost:8001/user/login",
            dataFacebook,
                function (dataFacebook, status) {
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");

                    $("#notificacao-modal-entrar").show();
                    console.log(dataFacebook.status);
                    if (dataFacebook.status == 1) {
                        localStorage.setItem("idUsuario", dataFacebook.id);
                        localStorage.setItem("nomeUsuario", dataFacebook.nome);
                        $("#msgNotificacao-modal-entrar").css("display", "block");
                        $("#msgNotificacao-modal-entrar").text('Usuário logado com sucesso');
                        $(".logado").css("display", "inline-block");
                        $(".deslogado").css("display", "none");
                        window.setTimeout(function(){
                            location.reload()
                            $(".close").click();
                        },2000)
                    } else {
                        $(".alert").removeClass("alert-success");
                        $(".alert").addClass("alert-danger");
                        $("#msgNotificacao-modal-entrar").css("display", "block");
                        $("#msgNotificacao-modal-entrar").text(dataFacebook.msg);
                        $("#msgNotificacao-modal-entrar").text("Login inválido!");
                        console.log(dataFacebook.msg);
                    }
                });
        });
    });
})