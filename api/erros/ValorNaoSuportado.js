module.exports = class ValorNaoSuportado extends Error {
  constructor (contentType) {
    super(`O tipo '${contentType}' não é suportado!`)
    this.name = 'ValorNaoSuportado'
    this.idErro = 3
  }
}
