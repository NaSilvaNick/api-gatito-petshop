const app = require('express')()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const { formatosAceitos, SerializadorError } = require('./Serializador')
const roteador2 = require('./rotas/fornecedores/index.v2')

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
  let formatoRequisitado = requisicao.header('Accept')

  if (formatoRequisitado === '*/*') { formatoRequisitado = 'application/json' }

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    resposta.status(406).end()
    return
  }

  resposta.setHeader('Content-Type', formatoRequisitado)
  proximo()
})

app.use((requisicao, resposta, proximo) => {
  resposta.set('Access-Control-Allow-Origin', '*')
  proximo()
})

app.use('/api/fornecedores', roteador)
app.use('/api/v2/fornecedores', roteador2)

app.use((error, requisicao, resposta) => {
  const serializador = new SerializadorError(resposta.getHeader('Content-Type'))
  let status = 500

  if (error instanceof NaoEncontrado) status = 404
  if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) status = 400
  if (error instanceof ValorNaoSuportado) status = 406

  resposta.status(status).send(
    serializador.serializar({
      message: error.message,
      id: error.idErro
    })
  )
})

app.listen(
  config.get('api.port'),
  () => console.log(`A API está funcionando na porta ${config.get('api.port')}`)
)

module.exports = app
