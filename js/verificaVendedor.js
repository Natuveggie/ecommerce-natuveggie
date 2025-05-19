$(document).ready(function () {

    $(".loja").click(function () {
        var _id = localStorage.getItem("idUsuario");

        $.get("/user/" + _id, function (data, status) {
            if (data.documento == null || data.celular == null || data.telefone == null || data.dataDeNascimento == null) {
                alert("Primeiro preencha os dados de documento, telefone, celular e data de nascimento")
                window.location.href = "/perfil";
            } else {
                window.location.href = "/cadastrar-loja";
            }
        });
    });

    $(".produtos").click(function () {
        var _id = localStorage.getItem("idUsuario");

        $.get("/user/" + _id, function (data, status) {
            if (data.documento == null || data.celular == null || data.telefone == null || data.dataDeNascimento == null) {
                alert("Primeiro preencha os dados de documento, telefone, celular e data de nascimento")
                window.location.href = "/perfil";
            }else if (localStorage.getItem("idLoja") == null || localStorage.getItem("idLoja") == "null") {
                window.location.href = "/cadastrar-loja";
                alert("Cadastre uma loja primeiro!")
            } else {
                window.location.href = "/catalogo";
            }
        });
    });
});