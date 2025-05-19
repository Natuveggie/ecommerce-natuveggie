$(document).ready(function () {
    var _id = localStorage.getItem("idProduto");

    carregaDadosProduto();

    // ----------------------------------------------------------------------- 
    // FUNÇÕES DA PÁGINA DO PRODUTO

    function carregaDadosProduto() {

        $.get("/product/" + _id, function (data, status) {
            if (!data == null || !data == "" || !data == undefined) {
                for (let index = 0; index < 3; index++) {
                    $('.produto' + [index]).attr("src", "/img/uploads/" + data.name[index]);
                }
                $("#nomeProduto").text(data.nome);
                $(".descricaoProduto").text(data.descricao);
                $("#entregaProduto").text(data.entrega);
                $('.sizeimg').append("<img src='/img/uploads/" + data.name[0] + "' class='display-img'></img>");
                $('#botao-add-carrinho').append(`<a class="btn-comprar"  onclick="AddCarrinho('${data._id}', '${data.nome}', '${data.preco}', '${data.entrega}', '${data.name[0]}')" style="color: #fff;">Comprar</a>`)
                
                if(data.precoPromocional  == null || !data.precoPromocional == "" || !data.precoPromocional == undefined ){
                    $('#precoProduto').text("De: " + "R$" + data.preco).css("text-decoration", "line-through");
                    $("#precoPromocional").text(`Por: R$ ${data.precoPromocional}`);
                    $(".descricaoProduto").css("margin-top", "15px");
                }else{
                    $('#precoProduto').text("R$" + data.preco);
                }
            } else {
                $('.sizeimg').append("<img src='/img/morango-imagem-3.jpg' class='display-img'>");
            }
        });
    }
});

function AddCarrinho(idProduto, nomeProduto, precoProduto, entregaProduto, imgProduto) {
    console.log(idProduto, nomeProduto, precoProduto, entregaProduto, imgProduto);

    if(localStorage.getItem("carrinho") == null){
        listaProdutos = [];

        listaProdutos.push({
            idProduto: idProduto, 
            nomeProduto: nomeProduto, 
            precoProduto: precoProduto,
            qtdProduto: $(".input-number").val(), 
            entregaProduto: entregaProduto,
            imgProduto: imgProduto,
            subtotal: '',
            total: ''
        });

        localStorage.setItem("carrinho", JSON.stringify(listaProdutos))
    }else{
        var listaProdutosCarrinho = JSON.parse(localStorage.getItem("carrinho"));

        listaProdutosCarrinho.push({
            idProduto: idProduto, 
            nomeProduto: nomeProduto, 
            precoProduto: precoProduto, 
            qtdProduto: $(".input-number").val(), 
            entregaProduto: entregaProduto,
            imgProduto: imgProduto,
            subtotal: '',
            total: ''
        });

        localStorage.setItem("carrinho", JSON.stringify(listaProdutosCarrinho))
    }

    window.location.href = "../carrinho";
}