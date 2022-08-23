const ModeloTabelaFornecedor = require("../rotas/fornecedores/ModeloTabelaFornecedor")
const ModeloTabelaProduto = require("../rotas/fornecedores/produtos/ModeloTabelaProduto")

const modelos = [
    ModeloTabelaFornecedor,
    ModeloTabelaProduto
];

modelos.forEach(async modelo => {
    try {
        await modelo.sync()
        console.log("\nTabelas Criadas com sucesso\n")
    } catch (error) {
        console.log({ error: error.message });
    }
});