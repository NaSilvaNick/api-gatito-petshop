import express from "express";
import bodyParser from "body-parser";
import config from "config";
import roteador from "./rotas/fornecedores/index.js";
import NaoEncontrado from "./erros/NaoEncontrado.js";
import CampoInvalido from "./erros/CampoInvalido.js";
import DadosNaoFornecidos from "./erros/DadosNaoFornecidos.js";
import ValorNaoSuportado from "./erros/ValorNaoSuportado.js";

const app = express();

app.use(bodyParser.json())

app.use("/api/fornecedores", roteador);

app.use((error, requisicao, resposta, proximo) => {
    let status = 500;
    
    if (error instanceof NaoEncontrado) status = 404;
    if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) status = 400;
    if (error instanceof ValorNaoSuportado) status = 406;

    resposta.status(status).send(JSON.stringify({message: error.message, id: error.idErro }));
});

app.listen(
    config.get("api.port"),
    () => console.log(`A API está funcionando na porta ${config.get("api.port")}`)
)

export default app;