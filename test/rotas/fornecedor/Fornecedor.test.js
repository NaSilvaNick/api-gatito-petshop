jest.mock('../../../api/rotas/fornecedores/TabelaFornecedor')
const Fornecedor = require('../../../api/rotas/fornecedores/Fornecedor')

describe('Classe Fornecedor', () => {
  test('O método validar() retorna true', () => {
    const fornecedor = new Fornecedor({
      empresa: 'Gatito',
      email: 'contato@gatito.com.br',
      categoria: 'brinquedos'
    })
    fornecedor.validar()

    expect(fornecedor.validar()).toBe(true)
  })

  test('O método criar() foi executado com sucesso', async () => {
    const fornecedor = new Fornecedor({
      empresa: 'Gatito',
      email: 'contato@gatito.com.br',
      categoria: 'brinquedos'
    })

    await fornecedor.criar()

    expect(fornecedor.id).toBe(500)
    expect(fornecedor.data_criacao).toBe("22/08/2022")
    expect(fornecedor.data_atualizacao).toBe("22/08/2022")
    expect(fornecedor.versao).toBe(90)
  })
})
