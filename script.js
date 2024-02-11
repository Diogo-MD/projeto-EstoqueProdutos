/*
Classe Produto:

Descrição: Representa um produto genérico em um estoque, com atributos como nome, quantidade disponível e preço unitário.
Métodos:
Constructor: Inicializa os atributos do produto com os valores passados como parâmetro.
calcularValorTotal(): Calcula e retorna o valor total do produto multiplicando a quantidade disponível pelo preço unitário.
Classe ProdutoPerecivel (Herda de Produto):

Descrição: Representa um produto perecível em um estoque, herdando características da classe Produto e adicionando a funcionalidade de verificar a validade.
Métodos:
Constructor: Chama o construtor da classe pai (Produto) e adiciona o atributo data de validade.
verificarValidade(): Verifica se o produto perecível está dentro da data de validade, retornando true se estiver válido e false caso contrário.
Classe Estoque:

Descrição: Representa o estoque de produtos, contendo funcionalidades para adicionar, remover, verificar disponibilidade e calcular o valor total do estoque.
Métodos:
Constructor: Inicializa o estoque com uma lista vazia de produtos.
adicionarProduto(produto): Adiciona um produto à lista de produtos no estoque.
// removerProduto(nome): Remove um produto da lista pelo nome.
verificarEstoqueDisponivel(nome): Verifica e exibe a quantidade disponível de um produto pelo nome.
calcularValorTotalEstoque(): Calcula e exibe o valor total do estoque somando o valor total de cada produto.
Exemplo de Uso:

Criação do Estoque:
Instancia um objeto meuEstoque da classe Estoque.
Adição de Produtos:
Adiciona produtos do tipo Produto e ProdutoPerecivel ao estoque.
Verificação e Cálculos:
Realiza operações como verificar a disponibilidade de produtos, calcular o valor total do estoque e remover um produto específico.
Exibição de Resultados:
Exibe resultados das operações realizadas no estoque.
*/

class Estoque {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    removerProduto(nome) {
        let produtoRemover = null;

        for (let i = 0; i < this.produtos.length; i++) {
            if (this.produtos[i].nome === nome) {
                produtoRemover = this.produtos[i];
                this.produtos.splice(i, 1);
                console.log(`Produto ${nome} removido do estoque.`)
                break;
            }
        }

        if (!produtoRemover) {
            console.log(`Produto ${nome} não encontrado no estoque.`);
        }

    }

    verificarEstoqueDisponível(nome) {
        let produtoEncontrado = null;

        for (let i = 0; i < this.produtos.length; i++) {
            if (this.produtos[i].nome === nome) {
                produtoEncontrado = this.produtos[i];
                break;
            }
        }

        if (produtoEncontrado) {
            console.log(`Quantidade disponível de ${nome}: ${produtoEncontrado.quantidadeDisponivel}`);
        } else {
            console.log(`Produto ${nome} não encontrado no estoque.`);
        }
    }

    calcularTotalEstoque() {
        let valorTotalEstoque = 0;

        // Percorre a lista de produtos e soma os valores totais de cada produto
        this.produtos.forEach(produto => {
            valorTotalEstoque += produto.calcularValorTotal();
        });
        return valorTotalEstoque;
    }
}

class Produto {
    constructor(nome, quantidadeDisponivel, precoUnitario) {
        this.nome = nome;
        this.quantidadeDisponivel = quantidadeDisponivel;
        this.precoUnitario = precoUnitario;
    }

    calcularValorTotal() {
        return this.quantidadeDisponivel * this.precoUnitario;
    }
}

class ProdutoPerecivel extends Produto {
    constructor(nome, quantidadeDisponivel, precoUnitario, dataValidade) {
        super(nome, quantidadeDisponivel, precoUnitario);
        this.dataValidade = dataValidade;
    }
}

// Crie uma instância do Estoque
const meuEstoque = new Estoque();

function cadastrarProduto() {
    // Armazena os dados recebidos no input em variáveis
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);
    const precoUnitario = parseFloat(document.getElementById("precoUnitario").value);

    // Identifica se o produto é perecível ou não
    const ehperecivel = document.getElementById("ehPerecivel").value;

    // Verifica se a data de validade é anterior à data atual
    const dataDeValidadeInput = document.getElementById("dataValidade").value;
    const dataDeValidade = new Date(dataDeValidadeInput);
    const hoje = new Date();

    if (ehperecivel === "Perecivel" && dataDeValidade < hoje) {
        alert("Produto com data de validade vencida. Verifique e tente novamente!");
        return;
    }

    // Define quais ações são feitas dependendo se o produto é perecível ou não
    let prodClasse;
    switch (ehperecivel) {
        case "Perecivel":
            prodClasse = new ProdutoPerecivel(nome, quantidade, precoUnitario, dataDeValidade);
            break;

        case "naoPerecivel":
            prodClasse = new Produto(nome, quantidade, precoUnitario);
            break;

        default:
            alert("Verifique todos os campos e tente novamente!");
            return;
    }

    meuEstoque.adicionarProduto(prodClasse);
    document.getElementById("produtosForm").reset();

    exibirProdutos();
}

function exibirProdutos() {
    const produtosList = document.getElementById("produtosList");
    const valorTotalEstoqueSpan = document.getElementById("valorTotalEstoque");

    produtosList.innerHTML = "";

    let valorTotalEstoque = 0;

    for (let i = 0; i < meuEstoque.produtos.length; i++) {
        const produtoItem = document.createElement("li");
        const produtoCard = criarProdutoCard(meuEstoque.produtos[i]);
        produtoItem.appendChild(produtoCard);
        produtosList.appendChild(produtoItem);

        // Atualiza o valor total do estoque
        valorTotalEstoque += meuEstoque.produtos[i].calcularValorTotal();
    }

    // Atualiza o valor total do estoque na div
    valorTotalEstoqueSpan.textContent = valorTotalEstoque.toFixed(2);
}

function decrementarQuantidade(nome) {
    const produto = meuEstoque.produtos.find(produto => produto.nome === nome);

    if (produto && produto.quantidadeDisponivel > 0) {
        produto.quantidadeDisponivel--;

        // Atualiza a lista de produtos e o valor total do estoque
        exibirProdutos();
        console.log("Quantidade de " + nome + " decrementada. Nova quantidade: " + produto.quantidadeDisponivel);

        // Verifica se a quantidade chegou a zero e adiciona a classe "produto-esgotado"
        if (produto.quantidadeDisponivel === 0) {
            const produtoCard = document.getElementById(`produto-${nome}`);
            if (produtoCard) {
                produtoCard.classList.add("produto-esgotado");
            }
        }
    } else {
        alert("Produto não encontrado ou quantidade já é zero.");
    }
}

function criarProdutoCard(produto) {
    const produtoCard = document.createElement("div");
    produtoCard.className = `produto-card ${produto.quantidadeDisponivel === 0 ? 'produto-esgotado' : ''}`;
    produtoCard.id = `produto-${produto.nome}`;

    const detalhesProduto = document.createElement("div");
    detalhesProduto.textContent = `${produto.nome} - Quantidade: ${produto.quantidadeDisponivel} - Valor Total: R$${produto.calcularValorTotal()}`;
    produtoCard.appendChild(detalhesProduto);

    // Adiciona o botão de decremento
    const botaoDecremento = document.createElement("button");
    botaoDecremento.textContent = "Remover";
    botaoDecremento.className = "button-decremento";
    botaoDecremento.onclick = function () {
        decrementarQuantidade(produto.nome);
    };
    produtoCard.appendChild(botaoDecremento);

    return produtoCard;
}