module.exports = {
  listar() {
    return [];
  },

  inserir() {
    return {
      id: 500,
      data_criacao: "22/08/2022",
      data_atualizacao: "22/08/2022",
      versao: 90
    }
  },

  async pegarPorId(id) {
    return {
      id: 500,
      data_criacao: "22/08/2022",
      data_atualizacao: "22/08/2022",
      versao: 90
    }
  },

  async atualizar(id, dadosParaAtualizar) { },

  async remover(id) { }
};