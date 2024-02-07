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
removerProduto(nome): Remove um produto da lista pelo nome.
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
        
    }

    removerProduto(produto) {

    }

    verificarEstoqueDisponível() {

    }

    calcularTotalEstoque() {

    }
}

class Produto {
    constructor(nome, quantidadeDisponivel, precoUnitario) {
        this.nome = nome;
        this.quantidadeDisponivel = quantidadeDisponivel;
        this.precoUnitario = precoUnitario;
    }

    calcularValortotal() {
        return this.quantidadeDisponivel * this.precoUnitario;
    }
}

class ProdutoPerecivel extends Produto {
    constructor(nome, quantidadeDisponivel, precoUnitario, dataValidade) {
        super(nome, quantidadeDisponivel, precoUnitario)
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
    const dataDeValidade = new Date(document.getElementById("dataValidade").value);

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
    console.log(Estoque.produtos)
    
}

