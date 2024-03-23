//REQUERINDO MÓDULOS
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const msgs_texto = require('../lib/msgs')
const {criarTexto, erroComandoMsg, obterNomeAleatorio, removerNegritoComando} = require("../lib/util")
const path = require('path')
const api = require("../lib/api")
const menu = require('../lib/menu')

module.exports = utilidades = async(client,message) => {
    try{
        const { type, id, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, body} = message
        const commands = caption || body || ''
        var command = commands.toLowerCase().split(' ')[0] || ''
        command = removerNegritoComando(command)
        const args =  commands.split(' ')
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'

        switch(command){                      
            case "!ddd":
                var DDD = null
                if(quotedMsg){
                    let DDI = quotedMsgObj.author.slice(0,2)
                    if(DDI != "55") return client.reply(chatId, msgs_texto.utilidades.ddd.somente_br ,id)
                    DDD = quotedMsgObj.author.slice(2,4)
                } else if(args.length > 1 && args[1].length == 2){
                    if(args[1].length != 2) return client.reply(chatId, msgs_texto.utilidades.ddd.erro_ddd ,id)
                    DDD = args[1]
                } else {
                    return client.reply(chatId, erroComandoMsg(command), id)
                }
                try{
                    var resposta = await api.obterInfoDDD(DDD)
                    client.reply(chatId,resposta,id)
                } catch(err){
                    client.reply(chatId, err.message, id)
                }
                break

            case "!clima":
                if(args.length === 1) return client.reply(chatId, erroComandoMsg(command),id)
                try{
                    var usuarioTexto = body.slice(7).trim(), clima = await api.obterClima(usuarioTexto)
                    var respostaClimaTexto = criarTexto(msgs_texto.utilidades.clima.resposta, clima.texto), respostaClimaFoto = clima.foto_clima
                    client.sendFileFromUrl(chatId, respostaClimaFoto,`${body.slice(7)}.png`, respostaClimaTexto, id)
                } catch(err){
                    client.reply(chatId, err.message, id)
                }
                break

            case "!moeda":
                if(args.length !== 3) return client.reply(chatId, erroComandoMsg(command), id)
                try{
                    var usuarioMoedaInserida = args[1], usuarioValorInserido = args[2], conversaoMoeda = await api.obterConversaoMoeda(usuarioMoedaInserida, usuarioValorInserido)
                    var itens = ''
                    for(var c of  conversaoMoeda.conversao) itens += criarTexto(msgs_texto.utilidades.moeda.resposta_item, c.conversao, c.valor_convertido_formatado, c.tipo, c.atualizacao)
                    var respostaFinal = criarTexto(msgs_texto.utilidades.moeda.resposta_completa, conversaoMoeda.valor_inserido, conversaoMoeda.moeda_inserida, itens)
                    await client.reply(chatId, respostaFinal ,id)
                } catch(err){
                    await client.reply(chatId, err.message , id)
                }
                break

            case "!pesquisa":
                if (args.length === 1) return client.reply(chatId, erroComandoMsg(command) , id)
                try{
                    var usuarioTexto = body.slice(10).trim(), pesquisaResultados = await api.obterPesquisaWeb(usuarioTexto)
                    var pesquisaResposta = criarTexto(msgs_texto.utilidades.pesquisa.resposta_titulo, usuarioTexto)
                    for(let resultado of pesquisaResultados){
                        pesquisaResposta += "═════════════════\n"
                        pesquisaResposta += criarTexto(msgs_texto.utilidades.pesquisa.resposta_itens, resultado.titulo, resultado.link, resultado.descricao)
                    }
                    client.reply(chatId, pesquisaResposta, id)
                } catch(err){
                    client.reply(chatId, err.message, id)
                }
                break

            case '!rastreio':
                if (args.length === 1) return client.reply(chatId, erroComandoMsg(command), id)
                try{
                    var usuarioCodigoRastreio = body.slice(10).trim(), rastreioDados = await api.obterRastreioCorreios(usuarioCodigoRastreio)
                    var rastreioResposta = msgs_texto.utilidades.rastreio.resposta_titulo
                    for(let dado of rastreioDados){
                        var local = (dado.local != undefined) ?  `Local : ${dado.local}` : `Origem : ${dado.origem}\nDestino : ${dado.destino}`
                        rastreioResposta += criarTexto(msgs_texto.utilidades.rastreio.resposta_itens, dado.status, dado.data, dado.hora, local)
                        rastreioResposta += "-----------------------------------------\n"
                    }
                    await client.reply(chatId, rastreioResposta, id)
                } catch(err){
                    await client.reply(chatId, err.message ,id)
                }
                break

                case '!consultarcep':
                    if (args.length === 1) return client.reply(chatId, erroComandoMsg(command), id);
                    try {
                        var consulta = args[1];
                        var resposta;
                        
                        // Consulta o CEP
                        var cepDados = await api.consultarCEP(consulta);
                        resposta = `CEP: ${cepDados.cep}\n`;
                        resposta += `Logradouro: ${cepDados.logradouro}\n`;
                        resposta += `Bairro: ${cepDados.bairro}\n`;
                        resposta += `Cidade: ${cepDados.localidade}\n`;
                        resposta += `Estado: ${cepDados.uf}\n`;
                        
                        await client.reply(chatId, resposta, id);
                    } catch (err) {
                        await client.reply(chatId, err.message, id);
                    }
                    break;               

                case '!consultarcnpj':
                    if (args.length === 1) return client.reply(chatId, erroComandoMsg(command), id);
                    try {
                        var consulta = args[1];
                        var resposta = '';
                        
                        // Verifica se a consulta é um CNPJ válido
                        if (!/^\d{14}$/.test(consulta)) {
                            throw new Error("CNPJ inválido, digite apenas os números.");
                        }
                        
                        // Consulta o CNPJ
                        var cnpjDados = await api.consultarCNPJ(consulta);
                        
                        // Adiciona apenas as informações disponíveis na resposta
                        for (const [chave, valor] of Object.entries(cnpjDados)) {
                            // Verifica se o valor é uma string antes de adicioná-lo à resposta
                            if (typeof valor === 'string' && valor.trim() !== '') {
                                resposta += `${chave.charAt(0).toUpperCase() + chave.slice(1)}: ${valor}\n`;
                            }
                        }
                        
                        // Verifica se a resposta está vazia
                        if (resposta === '') {
                            throw new Error("Não há informações disponíveis para este CNPJ");
                        }
                        
                        await client.reply(chatId, resposta, id);
                    } catch (err) {
                        await client.reply(chatId, err.message, id);
                    }
                    break;

                    case '!consultarferiado':
                        try {
                            let anoConsulta = new Date().getFullYear(); // Ano atual por padrão
                            if (args.length > 1) {
                                anoConsulta = parseInt(args[1]);
                                if (isNaN(anoConsulta)) {
                                    throw new Error("Ano inválido. Por favor, insira um ano válido.");
                                }
                            }
                            
                            const feriados = await api.consultarFeriados(anoConsulta);
                            
                            if (!feriados) {
                                throw new Error("Não foi possível obter os feriados");
                            }
                            
                            let resposta = `Feriados para o ano ${anoConsulta}:\n`;
                            feriados.forEach(feriado => {
                                resposta += `${feriado.date}: ${feriado.name}\n`;
                            });
                            
                            await client.reply(chatId, resposta, id);
                        } catch (err) {
                            await client.reply(chatId, err.message, id);
                        }
                        break;
            
                                         
            case "!traduz":
                var usuarioTexto = "", idiomaTraducao = 'pt'
                if(quotedMsg  && quotedMsg.type == "chat"){
                    if(args.length === 1) return client.reply(chatId, erroComandoMsg(command) ,id)
                    idiomaTraducao = args[1]
                    usuarioTexto = quotedMsg.body
                } else if(!quotedMsg && type == "chat" ){
                    if(args.length < 3) return client.reply(chatId, erroComandoMsg(command) ,id)
                    idiomaTraducao = args[1]
                    usuarioTexto = args.slice(2).join(" ")
                } else {
                    return client.reply(chatId, erroComandoMsg(command) ,id)
                }
                try{
                    var respostaTraducao = await api.obterTraducao(usuarioTexto, idiomaTraducao)
                    client.reply(chatId, respostaTraducao, id)
                } catch(err){
                    client.reply(chatId, err.message, id)
                }
                break  
            
            case '!voz':
                var usuarioTexto = '', idMensagem = id
                if (args.length === 1) {
                    return client.reply(chatId, erroComandoMsg(command) ,id)
                } else if(quotedMsg  && quotedMsg.type == 'chat'){
                    usuarioTexto = (args.length == 2) ? quotedMsg.body : body.slice(8).trim()
                } else {
                    usuarioTexto = body.slice(8).trim()
                }
                if (!usuarioTexto) return client.reply(chatId, msgs_texto.utilidades.voz.texto_vazio , id)
                if (usuarioTexto.length > 200) return client.reply(chatId, msgs_texto.utilidades.voz.texto_longo, id)
                if(quotedMsg) idMensagem = quotedMsgObj.id
                var idioma = body.slice(5, 7).toLowerCase()
                try{
                    var respostaAudio = await api.textoParaVoz(idioma, usuarioTexto)
                    client.sendPtt(chatId, respostaAudio, idMensagem)
                } catch(err){
                    client.reply(chatId, err.message, id)
                }
                break

            case '!noticias':
                try{
                    var listaNoticias = await api.obterNoticias()
                    var respostaNoticias = msgs_texto.utilidades.noticia.resposta_titulo
                    for(let noticia of listaNoticias){
                        respostaNoticias += criarTexto(msgs_texto.utilidades.noticia.resposta_itens, noticia.titulo, noticia.descricao || "Sem descrição", noticia.url)
                    }
                    await client.reply(chatId, respostaNoticias, id)
                } catch(err){
                    await client.reply(chatId, err.message, id)
                }
                break;

                case '!fipe':
                try{
                    var listaNoticias = await api.obterFipe()
                    var respostaNoticias = msgs_texto.utilidades.noticia.resposta_titulo
                    for(let noticia of listaNoticias){
                        respostaNoticias += criarTexto(msgs_texto.utilidades.noticia.resposta_itens, noticia.titulo, noticia.descricao || "Sem descrição", noticia.url)
                    }
                    await client.reply(chatId, respostaNoticias, id)
                } catch(err){
                    await client.reply(chatId, err.message, id)
                }
                break;

            case '!calc':
                if(args.length === 1) return client.reply(chatId, erroComandoMsg(command) ,id)
                var usuarioExpressaoMatematica = body.slice(6).trim()
                try{
                    var resultadoCalculo = await api.obterCalculo(usuarioExpressaoMatematica)
                    var respostaCalc = criarTexto(msgs_texto.utilidades.calc.resposta, resultadoCalculo)
                    client.reply(chatId, respostaCalc, id)
                } catch(err){
                    client.reply(chatId, err.message, id)
                }
                break
            
                case "!regrasgrupo":
                    try{
                        var respostaFrase = await menu.regrasGrupo()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break
                
                case "!linkg1":
                    try{
                        var respostaFrase = await menu.linkg1()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!linkg2":
                    try{
                        var respostaFrase = await menu.linkg2()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!grupoaluguel":
                    try{
                        var respostaFrase = await menu.grupoaluguel()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!grupoempregos":
                    try{
                        var respostaFrase = await menu.grupoempregos()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!linktelegram":
                    try{
                        var respostaFrase = await menu.linktelegram()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!linkredes":
                    try{
                        var respostaFrase = await menu.linkredes()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!ubsfcomasa":
                    try{
                        var respostaFrase = await menu.ubsfcomasa()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!ubsfvila":
                    try{
                        var respostaFrase = await menu.ubsfvila()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!crascomasa":
                    try{
                        var respostaFrase = await menu.crascomasa()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!telefonesuteis":
                    try{
                        var respostaFrase = await menu.telefonesuteis()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!telefonesemergencias":
                    try{
                        var respostaFrase = await menu.telefonesemergencias()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!subprefeitura":
                    try{
                        var respostaFrase = await menu.subprefeitura()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!segundaviacelesc":
                    try{
                        var respostaFrase = await menu.segundaviacelesc()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!segundaviaaguas":
                    try{
                        var respostaFrase = await menu.segundaviaaguas()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!segundaviacpf":
                    try{
                        var respostaFrase = await menu.segundaviacpf()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!segundaviacpfcrianca":
                    try{
                        var respostaFrase = await menu.segundaviacpfcrianca()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!segundaviarg":
                    try{
                        var respostaFrase = await menu.segundaviarg()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!joinvillefacil":
                    try{
                        var respostaFrase = await menu.joinvillefacil()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!receitafederal":
                    try{
                        var respostaFrase = await menu.receitafederal()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!consultarcpf":
                    try{
                        var respostaFrase = await menu.consultarcpf()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!denunciardengue":
                    try{
                        var respostaFrase = await menu.denunciardengue()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!desativardownload":
                    try{
                        var respostaFrase = await menu.desativardownload()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!legendabombeiros":
                    try{
                        var respostaFrase = await menu.legendabombeiros()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!patrolamento":
                    try{
                        var respostaFrase = await menu.patrolamento()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!bocadelobo":
                    try{
                        var respostaFrase = await menu.bocadelobo()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!posteluzqueimada":
                    try{
                        var respostaFrase = await menu.posteluzqueimada()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!placadanificada":
                    try{
                        var respostaFrase = await menu.placadanificada()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!valoresareceber":
                    try{
                        var respostaFrase = await menu.valoresareceber()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!agendarconsulta":
                    try{
                        var respostaFrase = await menu.agendarconsulta()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!infobrs":
                    try{
                        var respostaFrase = await menu.infobrs()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!infobombeiros":
                    try{
                        var respostaFrase = await menu.infobombeiros()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!grupofacebook":
                    try{
                        var respostaFrase = await menu.grupofacebook()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!registrarbo":
                    try{
                        var respostaFrase = await menu.registrarbo()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!pmsccidadao":
                    try{
                        var respostaFrase = await menu.pmsccidadao()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break

                case "!ban":
                    try{
                        var respostaFrase = await menu.ban()
                        await client.reply(chatId, respostaFrase, id)
                    } catch(err){
                        await client.reply(chatId, err.message, id)
                    }
                break
        }
    } catch(err){
        throw err
    }
    

}