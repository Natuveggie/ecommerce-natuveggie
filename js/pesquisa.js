$.get("/product/list", function (data, status) {
    for (let index = 0; index <= 4; index++) {
            
        if (!data.length == null || !data.length == "" || !data.length == undefined) {
            if (data[index].nome != null) {
                $('#produto' + [index]).attr("src", "/img/uploads/" + data[index].name[0]);
                $('#nomeProduto' + [index]).text(data[index].nome);
                $('#precoProduto' + [index]).text("R$" + data[index].preco).append("<span>" + "kg" + "</span>");
                $('#linkProduto' + [index]).attr("href", "/produto/" + data[index]._id);
            }
        }
    }
});