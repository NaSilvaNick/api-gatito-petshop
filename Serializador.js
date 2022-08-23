const ValorNaoSuportado = require("./erros/ValorNaoSuportado.js")
const jsontoxml = require("jsontoxml")

class Serializador {
	json(dado) {
		return JSON.stringify(dado);
	}

	xml(dados) {
		let tag = this.tagSingular;

		if (Array.isArray(dados)) {
			tag = this.tagPlural;
			dados = dados.map(dado => {
				return {
					[this.tagSingular]: dado
				}
			});
		}

		return jsontoxml({ [tag]: dados })
	}

	serializar(dados) {
		const dado = this.filtrar(dados)

		if (this.contentType === "application/json")
			return this.json(dado);

		switch (this.contentType) {
			case "application/json":
				return this.json(dado);
			case "application/xml":
				return this.xml(dado);
			default:
				throw new ValorNaoSuportado(this.contentType);
		}
	}

	filtrarObjetos(dados) {
		const novoObjeto = {};

		this.camposPublicos.forEach(campo => {
			if (dados.hasOwnProperty(campo))
				novoObjeto[campo] = dados[campo];
		});

		return novoObjeto;
	}

	filtrar(dados) {
		if (Array.isArray(dados))
			dados = dados.map(fornecedor => this.filtrarObjetos(fornecedor));
		else {
			dados = this.filtrarObjetos(dados);
		}
		return dados;
	}
}

class SerializadorFornecedor extends Serializador {
	constructor(contentType, camposExtras) {
		super();
		this.contentType = contentType;
		this.camposPublicos = ['id', 'categoria'].concat(camposExtras || []);
		this.tagSingular = "fornecedor";
		this.tagPlural = "fornecedores";
	}
}

class SerializadorError extends Serializador {
	constructor(contentType, camposExtras) {
		super();
		this.contentType = contentType;
		this.camposPublicos = ['id', 'message'].concat(camposExtras || []);
		this.tagSingular = "error";
		this.tagPlural = "errors";
	}
}

class SerializadorProduto extends Serializador {
	constructor(contentType, camposExtras) {
		super();
		this.contentType = contentType;
		this.camposPublicos = ['id', 'titulo'].concat(camposExtras || []);
		this.tagSingular = "produto";
		this.tagPlural = "produtos";
	}
}

const formatosAceitos = ['application/json', 'application/xml'];

module.exports = {
	Serializador,
	SerializadorFornecedor,
	SerializadorError,
	SerializadorProduto,
	formatosAceitos
}