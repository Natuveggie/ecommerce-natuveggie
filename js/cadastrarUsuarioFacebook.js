
$('#cadastrar-facebook-button').on('click', function () {

    OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');

    OAuth.popup('facebook').then(facebook => {
        // console.log('facebook:', facebook);

        facebook.me().then(data => {
            // console.log(data);

            $("#nome").val(data.name);
            $("#emailCadastrado").val(data.email);
            $("#emailConfirmar").val(data.email);
            $("#senhaCadastrada").val(data.id);
            $("#senhaConfirmar").val(data.id);

            var dataFacebook = {
                nome: $("#nome").val(),
                email: $("#emailCadastrado").val(),
                emailConfirmar: $("#emailConfirmar").val(),
                senha: $("#senhaCadastrada").val(),
                senhaConfirmar: $("#senhaConfirmar").val(),
                cadastroFacebook: 1,
            }
            $.post("/user/new",
                dataFacebook,
                function (dataFacebook, status) {
                    $("#msgNotificacao-modal-cadastrar").css("display", "block");
                    $("#msgNotificacao-modal-cadastrar").text('Usuário cadastrado com sucesso');
                    $("#notificacao-modal-cadastrar").show();
                    
                    window.setTimeout(function(){
                        $("#link-entrar").click();
                    },2000)
                });
        });
    });
})