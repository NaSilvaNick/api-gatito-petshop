const Fornecedor = require("../../../api/rotas/fornecedores/Fornecedor");

describe("classe Fornecedor", () => {
  test("O método validar() retorna true", () => {
    const fornecedor = new Fornecedor({
      empresa: "Gatito",
      email: "contato@gatito.com.br",
      categoria: "brinquedos"
    });
    fornecedor.validar();

    expect(fornecedor.validar()).toBe(true);
  });
});