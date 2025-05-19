if (localStorage.getItem("carrinho") != null) {
    var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));
    
    for (let index = 0; index < listaCarrinho.length; index++) {

        let totalCarrinho = (listaCarrinho[index].total);

        $("#preco").text("R$ " + totalCarrinho);
    }
}