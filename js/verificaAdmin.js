$(document).ready(function () {
    var _id = localStorage.getItem("idUsuario");

    verificaTodos();

    function verificaTodos() {
        $.get("/user/" + _id, function (data, status) {
            var regex = /@natuveggie\.com$/;

            var emailNatuveggie = regex.test(data.email);

            $(".sidebar-admin").css("display", "none");

            if(emailNatuveggie == true){
                $(".sidebar-admin").css("display", "block");
            }
        });
    }
});