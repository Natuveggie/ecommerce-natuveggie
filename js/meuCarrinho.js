if (localStorage.getItem("carrinho") != null) {
    carregar();
    // removerItemCarrinho();
} else {
    $("#tabela").append(`<tr>
            <td>
                <img class="carrinho-produto-img" src="./img/imagem-padrao-produto.png" alt="">
            </td>
            <td class="carrinho-produto-detalhes">
                <span>
                    Lorem ipsum
                    <p>Lorem <strong>ipsum</strong></p>
                </span>
            </td>
            <td class="carrinho-produto-entrega">Lorem ipsum</td>
            <td class="carrinho-produto-qtd">
                <a class="menos" onclick="less()">-</a>
                <input type="number" name="numero" id="num" value=0>
                <a class="mais" onclick="more()">+</a><br>
                <button type='button' class='carrinho-produto-remover remover-item'>Remover</button>
            </td>
            <td class="carrinho-produto-preco">R$ <span>0,00</span></td>
            <td class="carrinho-produto-total">
                <p>R$ <span>0,00</span></p>
            </td>
        </tr>`);
}

function carregar() {
    var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));

    limparCarrinho();

    for (let index = 0; index < listaCarrinho.length; index++) {

        let preco = parseFloat((listaCarrinho[index].precoProduto).replace(',', '.'));
        let qtd = listaCarrinho[index].qtdProduto;

        $("#subtotal").text(listaCarrinho[index].subtotal)
        $("#total").text(listaCarrinho[index].total);

        $("#tabela").append(`<tr>
                <td>
                    <img class='carrinho-produto-img' src='img/uploads/${listaCarrinho[index].imgProduto}'>
                </td>
                <td class='carrinho-produto-detalhes'>
                    <span>
                        ${listaCarrinho[index].nomeProduto}
                    </span>
                </td>
                <td class='carrinho-produto-entrega'>
                    ${listaCarrinho[index].entregaProduto}
                </td>
                <td class='carrinho-produto-qtd'>
                    <a class='menos' href='javascript:decremento("${listaCarrinho[index].idProduto}", ${index})'>-</a>
                    <input type='number' name='numero' id='${index}num${listaCarrinho[index].idProduto}'  value='${listaCarrinho[index].qtdProduto}'>
                    <a class='mais' href='javascript:incremento("${listaCarrinho[index].idProduto}",${index})'>+</a>
                    <br>
                    <button type='button' class='carrinho-produto-remover' href='javascript:removerItemCarrinho("${listaCarrinho[index].idProduto}", ${index})'>Remover</button>
                </td>
                <td class='carrinho-produto-preco'>
                    R$ <span>${listaCarrinho[index].precoProduto}</span>
                </td>
                <td class='carrinho-produto-total'>
                    <p>R$ <span id='${index}total${listaCarrinho[index].idProduto}' class='totalProduto'>${(qtd * preco).toFixed(2)}</span></p>
                </td>
            </tr>`);
    }
}

function decremento(id, index) {

    var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));

    let qtd = `#${index}num${id}`;
    let total = `#${index}total${id}`

    let preco = parseFloat((listaCarrinho[index].precoProduto).replace(',', '.'));

    let decremento = parseInt($(qtd).val());
    $(qtd).val(decremento - 1)
    $(total).text(((decremento - 1) * preco).toFixed(2))

    listaCarrinho[index].qtdProduto = decremento - 1;

    localStorage.setItem("carrinho", JSON.stringify(listaCarrinho))

    atualizarSubtotal();

    atualizarTotal();
}

function incremento(id, index) {
    var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));

    let qtd = `#${index}num${id}`;
    let total = `#${index}total${id}`

    let preco = parseFloat((listaCarrinho[index].precoProduto).replace(',', '.'));

    let incremento = parseInt($(qtd).val());
    $(qtd).val(incremento + 1)
    $(total).text(((incremento + 1) * preco).toFixed(2))

    listaCarrinho[index].qtdProduto = incremento + 1;

    localStorage.setItem("carrinho", JSON.stringify(listaCarrinho))

    atualizarSubtotal();

    atualizarTotal();
}

function atualizarSubtotal() {

    var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));

    var subtotal = 0;

    for (let index = 0; index < listaCarrinho.length; index++) {

        var qtd = listaCarrinho[index].qtdProduto;

        var preco = parseFloat(listaCarrinho[index].precoProduto.replace(',', '.'));

        subtotal = subtotal + (preco * qtd);

        listaCarrinho[index].subtotal = subtotal;
        localStorage.setItem("carrinho", JSON.stringify(listaCarrinho))
    }

    $("#subtotal").text(subtotal.toFixed(2))
}

function atualizarTotal(index) {
    var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));

    var total = 0;
    var subtotal = 0;

    for (let index = 0; index < listaCarrinho.length; index++) {

        var qtd = listaCarrinho[index].qtdProduto;

        var preco = parseFloat(listaCarrinho[index].precoProduto.replace(',', '.'));

        subtotal = subtotal + (preco * qtd)
        total = subtotal + 3;

        listaCarrinho[index].total = total;
        localStorage.setItem("carrinho", JSON.stringify(listaCarrinho))
    }

    $("#total").text(total.toFixed(2))
}

function limparCarrinho() {
    $("#limparCarrinho").click(function () {
        localStorage.removeItem("carrinho");
        window.setTimeout(function () {
            location.reload()
        }, 1000)
    })
}

function removerItemCarrinho(id, index) {
    var listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));
}