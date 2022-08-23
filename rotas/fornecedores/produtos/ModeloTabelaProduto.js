const Sequelize = require("sequelize")
const instancia = require("../../../banco-de-dados")
const ModeloTabelaFornecedor = require("../ModeloTabelaFornecedor")

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: ModeloTabelaFornecedor,
            key: "id"
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: "produtos",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: "data_atualizacao",
    version: "versao"
}

module.exports = instancia.define("produto", colunas, opcoes);