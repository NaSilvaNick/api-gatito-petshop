const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");
const { SerializadorFornecedor } = require("../../Serializador");
const roteadorProdutos = require("./produtos");

roteador.options("/", (requisicao, resposta) => {
	resposta
		.set("Access-Control-Allow-Methods", "GET")
		.set("Access-Control-Allow-Headers", "Content-Type")
		.status(200)
		.end();
});

roteador.get("/", async (requisicao, resposta) => {
	const resultados = await TabelaFornecedor.listar();
	const serializador = new SerializadorFornecedor(resposta.getHeader("Content-Type"));
	resposta.status(200).send(
		serializador.serializar(resultados)
	);
});

const verificarFornecedor = async (requisicao, resposta, proximo) => {
	try {
		const id = requisicao.params.idFornecedor;
		const fornecedor = new Fornecedor({ id: id });
		await fornecedor.carregar();
		requisicao.fornecedor = fornecedor;
		proximo();
	} catch (error) {
		proximo(error);
	}
};

roteador.use("/:idFornecedor/produtos", verificarFornecedor, roteadorProdutos);

module.exports = roteador;