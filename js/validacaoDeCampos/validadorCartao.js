jQuery(function ($) {
    $("#adicionar-cartao").click(function () {
        var txtNumeroCartao = $(".cc-number");
        var txtNomeImpresso = $(".nome-cartao");
        var txtValidadeCartao = $(".cc-exp");
        var txtCodigoSeguranca = $(".cc-cvc");
        var txtParcela = $(".parcela");

        var data = {
            numeroCartao: $(".cc-number").val(),
            nomeImpresso: $(".nome-cartao").val(),
            validadeCartao: $(".cc-exp").val(),
            codigoSeguranca: $(".cc-cvc").val(),
            parcela: $(".parcela").val(),

            idUsuario: localStorage.getItem("idUsuario")
        }

        $.post("/cart/new",
            data,
            function (data, status) {
                alert('Cartao cadastrado com sucesso');
                // window.location.href = "finalizar-compra";
            });
        });
});