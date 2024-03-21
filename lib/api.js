//REQUERINDO MODULOS
const axios = require('axios')
const cheerio = require('cheerio');
const path = require('path')
const msgs_texto = require('./msgs')
const {prettyNum} = require('pretty-num')
const  googleIt = require('google-it')
const gis = require("g-i-s")
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs-extra')
const { consoleErro, obterNomeAleatorio, imagemUpload } = require('./util');
const {criarTexto} = require("./util");
const duration = require("format-duration-time").default;
const acrcloud = require("acrcloud");
const { rastrearEncomendas } = require('correios-brasil')
const translate = require('@vitalets/google-translate-api')
const Genius = require("genius-lyrics");
const Client = new Genius.Client();


module.exports = {
    textoParaVoz: async (idioma, texto)=>{
        return new Promise((resolve,reject)=>{
            const ttsEn = require('node-gtts')('en')
            const ttsPt = require('node-gtts')('pt')
            const ttsJp = require('node-gtts')('ja')
            const ttsEs = require('node-gtts')('es')
            const ttsIt = require('node-gtts')('it')
            const ttsRu = require('node-gtts')('ru')
            const ttsKo = require('node-gtts')('ko')
            const ttsSv = require('node-gtts')('sv')
            
            if (idioma == 'pt') {
                ttsPt.save(path.resolve('media/tts/resPt.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resPt.mp3'))
                })
            } else if (idioma == 'en') {
                ttsEn.save(path.resolve('media/tts/resEn.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resEn.mp3'))
                })
            } else if (idioma == 'jp') {
                ttsJp.save(path.resolve('media/tts/resJp.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resJp.mp3'))
                })
            } 
            else if (idioma == 'es') {
                ttsEs.save(path.resolve('media/tts/resEs.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resEs.mp3'))
                })
            } else if (idioma == 'it') {
                ttsIt.save(path.resolve('media/tts/resIt.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resIt.mp3'))
                })
            } else if (idioma == 'ru') {
                ttsRu.save(path.resolve('media/tts/resRu.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resRu.mp3'))
                })
            } else if (idioma == 'ko') {
                ttsKo.save(path.resolve('media/tts/resKo.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resKo.mp3'))
                })
            } else if (idioma == 'sv') {
                ttsSv.save(path.resolve('media/tts/resSv.mp3'), texto, function () {
                    resolve(path.resolve('media/tts/resSv.mp3'))
                })
            } 
            else {
                reject(new Error(msgs_texto.utilidades.voz.nao_suportado))
            }
        }).catch(err =>{
            var errors = [msgs_texto.utilidades.voz.nao_suportado]
            if(!errors.includes(err.message)){
                consoleErro(err.message, "API textoParaVoz")
                throw new Error(msgs_texto.utilidades.voz.erro_audio)
            } else {
                throw err
            }
        })
    },

    obterAudioModificado: (caminhoAudio, tipoEdicao) =>{
        return new Promise((resolve,reject)=>{
            let saidaAudio = path.resolve(`media/audios/${obterNomeAleatorio(".mp3")}`)
            let ffmpegOpcoes = []
            switch(tipoEdicao){
                case "estourar":
                    ffmpegOpcoes = ["-y", "-filter_complex", "acrusher=level_in=3:level_out=5:bits=10:mode=log:aa=1"] 
                    break
                case "reverso":
                    ffmpegOpcoes = ["-y", "-filter_complex", "areverse"]
                    break
                case "grave":
                    ffmpegOpcoes = ["-y", "-af", "asetrate=44100*0.8"]
                    break
                case "agudo":
                    ffmpegOpcoes = ["-y", "-af", "asetrate=44100*1.4"]
                    break
                case "x2":
                    ffmpegOpcoes = ["-y", "-filter:a", "atempo=2.0", "-vn"]
                    break
                case "volume":
                    ffmpegOpcoes = ["-y", "-filter:a", "volume=4.0"]
                    break
                default:
                    reject()
            }
           
            ffmpeg(caminhoAudio)
            .outputOptions(ffmpegOpcoes)
            .save(saidaAudio)
            .on('end', async () => {
                resolve(saidaAudio)
            })
            .on("error", ()=>{
                reject()
            });
        }).catch(err =>{
            consoleErro(err.message, "API obterAudioModificado")
            throw new Error(msgs_texto.utilidades.audio.erro_conversao)
        })
        
    },

    obterCalculo : async expressao =>{
        try{
            expressao = expressao.replace(/[Xx\xD7]/g, "*")
            expressao = expressao.replace(/\xF7/g, "/")
            expressao = expressao.replace(/,/g,".")
            expressao = expressao.replace("em","in")
            let res = await axios.post(`https://api.mathjs.org/v4/`,{expr: expressao})
            let resultado = res.data.result
            if(resultado == "NaN" || resultado == "Infinity") throw new Error(msgs_texto.utilidades.calc.divisao_zero)
            resultado = resultado.split(" ")
            resultado[0] = (resultado[0].includes("e")) ? prettyNum(resultado[0]) : resultado[0]
            return resultado.join(" ")
        } catch(err){
            var errors = [msgs_texto.utilidades.calc.divisao_zero]
            if(!errors.includes(err.message)){
                consoleErro(err.message, "API obterCalculo")
                throw new Error(msgs_texto.utilidades.calc.erro_calculo)
            } else {
                throw err
            }
        }
    },

    obterNoticias : async ()=>{
        try {
            let res = await axios.get(`http://newsapi.org/v2/top-headlines?country=br&apiKey=${process.env.API_NEWS_ORG.trim()}`), resposta = []
            for(var noticia of res.data.articles){
                resposta.push({
                    titulo : noticia.title,
                    descricao : noticia.description,
                    url : noticia.url
                })
            }
            return resposta
        } catch(err){
            consoleErro(msgs_texto.api.newsapi, "API obterNoticias")
            throw new Error(msgs_texto.utilidades.noticia.indisponivel)
        }
    },

    obterTraducao : async (texto, idioma)=>{
        try {
            var idiomasSuportados = ["pt", "es", "en", "ja", "it", "ru", "ko"]
            if(!idiomasSuportados.includes(idioma)) throw new Error(msgs_texto.utilidades.traduz.nao_suportado)
            let res = await translate(texto , {to: idioma})
            return criarTexto(msgs_texto.utilidades.traduz.resposta, texto, res.text)
        } catch(err){
            var errors = [msgs_texto.utilidades.traduz.nao_suportado]
            if(!errors.includes(err.message)){
                consoleErro(err.message, "API obterTraducao")
                throw new Error(msgs_texto.utilidades.traduz.erro_servidor)
            } else {
                throw err
            }
        }
    },

    obterRastreioCorreios : async codigoRastreio =>{
        try{
            if(codigoRastreio.length != 13) throw new Error(msgs_texto.utilidades.rastreio.codigo_invalido)
            let res = await rastrearEncomendas([codigoRastreio])
            if(res[0].length < 1) throw new Error(msgs_texto.utilidades.rastreio.nao_postado)
            return res[0]
        } catch(err){
            var errors = [msgs_texto.utilidades.rastreio.codigo_invalido, msgs_texto.utilidades.rastreio.nao_postado]
            if(!errors.includes(err.message)){
                consoleErro(err.message, "API obterRastreioCorreios")
                throw new Error(msgs_texto.utilidades.rastreio.erro_servidor)
            } else {
                throw err
            }
        }  
    },

    obterPesquisaWeb : async pesquisaTexto =>{
        try{
            let resultados = await googleIt({"disableConsole": true ,'query': pesquisaTexto}), resposta = []
            if(resultados.length == 0) throw new Error(msgs_texto.utilidades.pesquisa.sem_resultados)
            resultados = resultados.slice(0,5)
            for(let resultado of resultados){
                resposta.push({
                    titulo: resultado.title,
                    link: resultado.link,
                    descricao : resultado.snippet
                })
            }
            return resposta
        } catch(err) {
            var errors = [msgs_texto.utilidades.pesquisa.sem_resultados]
            if(!errors.includes(err.message)){
                consoleErro(err.message, "API obterPesquisaWeb")
                throw new Error(msgs_texto.utilidades.pesquisa.erro_servidor)
            } else {
                throw err
            }
        }
    },

    obterClima: async local =>{
        try{
            local = local.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            const climaFotoURL = `https://r2.easyimg.io/kcgocm6et/previsao-tempo-marataizes-1-1024x576-1_(1)_(1).jpg`
            const climaTextoURL = `http://pt.wttr.in/${local}?format=Local%20=%20%l+\nClima atual%20=%20%C+%c+\nTemperatura%20=%20%t+\nUmidade%20=%20%h\nVento%20=%20%w\nLua%20agora%20=%20%m\nNascer%20do%20Sol%20=%20%S\nPor%20do%20Sol%20=%20%s`
            let respostaTexto = await axios.get(climaTextoURL)
            await axios.get(climaFotoURL)
            return {
                foto_clima: climaFotoURL,
                texto: respostaTexto.data
            }
        } catch(err){
            consoleErro(err.message, "API obterClima")
            throw new Error(msgs_texto.utilidades.clima.erro_resultado)
        }
    },

    obterConversaoMoeda: async (moeda, valor)=>{
        try {
            const moedasSuportadas = ['dolar','euro', 'real']
            moeda = moeda.toLowerCase()
            valor = valor.toString().replace(",",".")
            if(!moedasSuportadas.includes(moeda)) throw new Error(msgs_texto.utilidades.moeda.nao_suportado)
            if(isNaN(valor)) throw new Error(msgs_texto.utilidades.moeda.valor_invalido)
            if(valor > 1000000000000000) throw new Error (msgs_texto.utilidades.moeda.valor_limite)
            let params = ''
            switch(moeda){
                case 'dolar':
                    moeda = (valor > 1) ? "Dólares" : "Dólar"
                    params = "USD-BRL,USD-EUR,USD-JPY"
                    break
                case 'euro':
                    moeda = (valor > 1) ? "Euros" : "Euro"
                    params = "EUR-BRL,EUR-USD,EUR-JPY"
                    break
                case 'iene':
                    moeda = (valor > 1) ? "Ienes" : "Iene"
                    params= "JPY-BRL,JPY-USD,JPY-EUR"
                    break 
                case 'real':
                    moeda = (valor > 1) ? "Reais" : "Real"
                    params= "BRL-USD,BRL-EUR,BRL-JPY"
                    break                  
            }
            let {data} = await axios.get(`https://economia.awesomeapi.com.br/json/last/${params}`)
            var resposta = {
                valor_inserido : valor,
                moeda_inserida: moeda,
                conversao : []
            }
            for (var conversao in data){
                var nomeMoeda = '', tipoMoeda = '', simbolo = ''
                switch(data[conversao].codein){
                    case "BRL":
                        tipoMoeda = "Real/Reais"
                        nomeMoeda = "real"
                        simbolo = "R$"
                        break
                    case "EUR":
                        tipoMoeda = "Euro/Euros"
                        nomeMoeda = "euro"
                        simbolo = "Є"
                        break
                    case "USD":
                        tipoMoeda = "Dólar/Dólares"
                        nomeMoeda = "dolar"
                        simbolo = "$"
                        break
                    case "JPY":
                        tipoMoeda = "Iene/Ienes"
                        nomeMoeda = 'iene'
                        simbolo = "¥"
                        break
                }
                var dataHoraAtualizacao = data[conversao].create_date.split(" ")
                var dataAtualizacao = dataHoraAtualizacao[0].split("-"), horaAtualizacao = dataHoraAtualizacao[1]
                resposta.conversao.push({
                    tipo: tipoMoeda,
                    conversao : data[conversao].name,
                    valor_convertido : (data[conversao].bid * valor).toFixed(2),
                    valor_convertido_formatado : `${simbolo} ${(data[conversao].bid * valor).toFixed(2)}`,
                    atualizacao: `${dataAtualizacao[2]}/${dataAtualizacao[1]}/${dataAtualizacao[0]} às ${horaAtualizacao}`
                })
            }
            return resposta
        } catch(err){
            var errors = [msgs_texto.utilidades.moeda.nao_suportado, msgs_texto.utilidades.moeda.valor_invalido, msgs_texto.utilidades.moeda.valor_limite]
            if(!errors.includes(err.message)){
                consoleErro(err.message, "API obterConversaoMoeda")
                throw new Error(msgs_texto.utilidades.moeda.erro_servidor)    
            } else {
                throw err
            }
        }
    },

    obterInfoDDD: async(DDD)=>{
        try {
            const githubGistDDD= await axios.get("https://gist.githubusercontent.com/victorsouzaleal/ea89a42a9f912c988bbc12c1f3c2d110/raw/af37319b023503be780bb1b6a02c92bcba9e50cc/ddd.json")
            const estados = githubGistDDD.data.estados
            const indexDDD = estados.findIndex(estado => estado.ddd.includes(DDD))
            if(indexDDD != -1){
                var resposta = criarTexto(msgs_texto.utilidades.ddd.resposta, estados[indexDDD].nome, estados[indexDDD].regiao)
                return resposta
            } else {
                throw new Error(msgs_texto.utilidades.ddd.nao_encontrado)
            }
        } catch(err){
            var errors = [msgs_texto.utilidades.ddd.nao_encontrado]
            if(!errors.includes(err.message)){
                consoleErro(err.message, "API obterInfoDDD")
                throw new Error(msgs_texto.utilidades.ddd.erro_servidor)
            } else {
                throw err
            }
        }
    },
}
