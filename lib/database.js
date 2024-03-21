const { AsyncNedb } = require('nedb-async')
const {MessageTypes} = require("@open-wa/wa-automate")
const path = require('path')
const fs = require('fs-extra')
const moment = require("moment-timezone")
var db = {}
db.usuarios = new AsyncNedb({filename : './database/db/usuarios.db', autoload: true})
db.grupos = new AsyncNedb({filename : './database/db/grupos.db', autoload: true})
db.contador = new AsyncNedb({filename : './database/db/contador.db', autoload: true})


module.exports = {
    // ######################## FUNCOES USUARIO #####################
    obterUsuario : async (id_usuario) =>{
        let usuario = await db.usuarios.asyncFindOne({id_usuario : id_usuario})
        return usuario
    },
    obterUsuariosTipo : async (tipo) =>{
        let usuarios = await db.usuarios.asyncFind({tipo})
        return usuarios
    },
    verificarRegistro  : async (id_usuario) => {
        let resp = await db.usuarios.asyncFindOne({id_usuario})
        return (resp != null)
    },
    atualizarNome : async(id_usuario,nome) =>{
        await db.usuarios.asyncUpdate({id_usuario}, {$set:{nome}})
    },

    registrarUsuario: async(id_usuario, nome) =>{
        let {limite_diario} = JSON.parse(fs.readFileSync(path.resolve("database/json/bot.json")))
        var cadastro_usuario = {
            id_usuario,
            nome,
            comandos_total: 0,
            comandos_dia: 0,
            max_comandos_dia : limite_diario.limite_tipos.bronze,
            tipo: "bronze"
        }
        await db.usuarios.asyncInsert(cadastro_usuario)
    },
    registrarDono: async(id_usuario, nome)=>{
        var cadastro_usuario_dono = {
            id_usuario,
            nome,
            comandos_total: 0,
            comandos_dia: 0,
            max_comandos_dia : null,
            tipo: "dono"
        }
        await db.usuarios.asyncInsert(cadastro_usuario_dono)
    },

    verificarDonoAtual : async(id_usuario)=>{
        let {limite_diario} = JSON.parse(fs.readFileSync(path.resolve("database/json/bot.json")))
        var usuario = await db.usuarios.asyncFindOne({id_usuario, tipo: "dono"})
        if(!usuario){
            await db.usuarios.asyncUpdate({tipo: "dono"}, {$set:{tipo: "bronze",  max_comandos_dia : limite_diario.limite_tipos.bronze}}, {multi: true})
            await db.usuarios.asyncUpdate({id_usuario}, {$set: {tipo : "dono", max_comandos_dia: null}})
        }
    },

    alterarTipoUsuario: async(id_usuario, tipo)=>{
        let {limite_diario} = JSON.parse(fs.readFileSync(path.resolve("database/json/bot.json")))
        if(limite_diario.limite_tipos[tipo] || limite_diario.limite_tipos[tipo] == null){
            await db.usuarios.asyncUpdate({id_usuario}, {$set: {tipo, max_comandos_dia: limite_diario.limite_tipos[tipo]}})
            return true
        } else {
            return false
        }
    },

    limparTipo: async(tipo)=>{
        let {limite_diario} = JSON.parse(fs.readFileSync(path.resolve("database/json/bot.json")))
        if(limite_diario.limite_tipos[tipo] === undefined || tipo === "bronze") return false
        await db.usuarios.asyncUpdate({tipo}, {$set: {tipo: "bronze", max_comandos_dia: limite_diario.limite_tipos.bronze}}, {multi: true})
        return true
    },
    ultrapassouLimite: async(id_usuario)=>{
        let usuario =  await db.usuarios.asyncFindOne({id_usuario : id_usuario})
        if(usuario.max_comandos_dia == null) return false
        return (usuario.comandos_dia >= usuario.max_comandos_dia)
    },
    addContagemDiaria: async(id_usuario)=>{
        db.usuarios.asyncUpdate({id_usuario}, {$inc: {comandos_total: 1, comandos_dia: 1}})
    },
    addContagemTotal: async(id_usuario)=>{
        db.usuarios.asyncUpdate({id_usuario}, {$inc: {comandos_total: 1}})
    },
    definirLimite: async(tipo, limite)=>{
        db.usuarios.asyncUpdate({tipo}, {$set: {max_comandos_dia: limite}}, {multi: true})
    },
    resetarComandosDia: async() =>{
        db.usuarios.asyncUpdate({}, {$set:{comandos_dia : 0}}, {multi: true})
    },
    resetarComandosDiaUsuario: async(id_usuario) =>{
        db.usuarios.asyncUpdate({id_usuario}, {$set:{comandos_dia : 0}})
    },
    //###########################################################

    //##################### FUNCOES GRUPO #########################

    //### GERAL
    verificarGrupo: async(id_grupo) =>{
        let resp = await db.grupos.asyncFindOne({id_grupo})
        return (resp != null)
    },

    registrarGrupo: async(id_grupo, participantes)=>{
        let cadastro_grupo = {
            id_grupo,
            participantes,
            mutar: false,
            bemvindo: {status: false, msg: ""},
            antifake: {status: false, ddi_liberados:[]},
            antilink: {status: false, filtros:{youtube: false, whatsapp:false, facebook:false, twitter:false}},
            antitrava: {status: false, max_caracteres: 0},
            antiflood: false,
            antiporno: false,
            autosticker: false,
            voteban: {status: false, max: 5, usuario: "", votos:0, votou:[]},
            contador: {status:false, inicio: ''},
            enquete: {status: false, pergunta: "", opcoes: []},
            block_cmds: [],
            lista_negra: []
        }
        await db.grupos.asyncInsert(cadastro_grupo)
    },
    resetarGrupos: async()=>{
        db.grupos.asyncUpdate({}, 
        {$set: {
        mutar: false,
        bemvindo: {status: false, msg:""},
        antifake: {status: false, ddi_liberados:[]},
        antilink: {status: false, filtros:{youtube: false, whatsapp:false, facebook:false, twitter:false}},
        antitrava: {status: false, max_caracteres: 0},
        antiflood: false,
        antiporno: false,
        autosticker: false,
        voteban: {status: false, max: 5, usuario: "", votos:0, votou:[]},
        contador: {status:false, inicio: ''},
        enquete: {status: false, pergunta: "", opcoes: []},
        block_cmds: [],
        lista_negra: []
        }}, {multi: true})
    },
    obterGrupo: async(id_grupo)=>{
        let grupo_info = await db.grupos.asyncFindOne({id_grupo})
        return grupo_info
    },
    //###

    // ### PARTICIPANTES 
    obterParticipantesGrupo: async (id_grupo)=>{
        let grupo = await db.grupos.asyncFindOne({id_grupo})
        if(grupo == null) return false
        return grupo.participantes
    },
    atualizarParticipantes: async(id_grupo, participantes_array)=>{  
        await db.grupos.asyncUpdate({id_grupo}, {$set:{participantes: participantes_array}})
    },
    adicionarParticipante: async(id_grupo, participante)=>{ 
        await db.grupos.asyncUpdate({id_grupo}, {$push: { participantes: participante} })
    },
    removerParticipante: async(id_grupo, participante)=>{   
        await db.grupos.asyncUpdate({id_grupo}, { $pull: { participantes : participante } })
    },
    participanteExiste: async (id_grupo, id_usuario)=>{
        let grupo = await db.grupos.asyncFindOne({id_grupo})
        return (grupo != null && grupo.participantes.includes(id_usuario))
    },
    //###

    //### ALTERAR RECURSOS
    alterarBemVindo: async(id_grupo, status, msg = "")=>{
        await db.grupos.asyncUpdate({id_grupo}, {$set:{"bemvindo.status": status, "bemvindo.msg":msg}})
    },
    alterarAutoSticker: async(id_grupo, status = true)=>{
        await db.grupos.asyncUpdate({id_grupo}, {$set:{autosticker: status}})
    },

    alterarContador: async(id_grupo, status = true)=>{
        let data_atual = (status) ? moment(moment.now()).format("DD/MM HH:mm:ss") : ''
        await db.grupos.asyncUpdate({id_grupo}, {$set:{"contador.status":status, "contador.inicio":data_atual}})
    },

    alterarEnquete: async(id_grupo,status, pergunta= "", opcoes=[])=>{
        let opcoes_obj = []
        for(let i = 0 ; i < opcoes.length;i++){
            opcoes_obj.push({
                opcao: opcoes[i],
                digito: i+1,
                qtd_votos: 0,
                votos: []
            })
        }
        await db.grupos.asyncUpdate({id_grupo}, {$set:{"enquete.status":status, "enquete.pergunta":pergunta, "enquete.opcoes":opcoes_obj}})
    },

    //### LISTA NEGRA
    obterListaNegra : async (id_grupo)=>{
        let {lista_negra}= await db.grupos.asyncFindOne({id_grupo})
        return lista_negra
    },
    adicionarListaNegra: async(id_grupo, id_usuario)=>{
        await db.grupos.asyncUpdate({id_grupo}, {$push: { lista_negra: id_usuario } })
    },
    removerListaNegra: async(id_grupo, id_usuario)=>{
        await db.grupos.asyncUpdate({id_grupo}, {$pull: { lista_negra: id_usuario } } )
    },

    //### BLOQUEIO DE COMANDOS
    addBlockedCmd: async(id_grupo, cmds)=>{
        db.grupos.asyncUpdate({id_grupo}, {$push: { block_cmds: {$each: cmds} }})
    },
    removeBlockedCmd: async(id_grupo, cmds)=>{
        for(let cmd of cmds){
            await db.grupos.asyncUpdate({id_grupo}, {$pull:{block_cmds: cmd}})
        }
    },
    //###


    // ### ENQUETE
    addVotoEnquete: async(id_grupo,id_usuario, digito)=>{
        let g_info = await db.grupos.asyncFindOne({id_grupo})
        let opcoes = g_info.enquete.opcoes
        let index = digito - 1
        let opcao = opcoes[index]
        opcao.qtd_votos = opcao.qtd_votos + 1
        opcao.votos.push(id_usuario)
        opcoes[index] = opcao
        db.grupos.asyncUpdate({id_grupo}, {$set:{"enquete.opcoes":opcoes}})
    },
    //###
    
    //##################### FUNCOES CONTADOR #########################
    registrarContagemTodos: async(id_grupo,usuarios)=>{
        for(let usuario of usuarios){
            let id_unico = `${id_grupo}-${usuario.id}`
            await db.contador.asyncInsert({id_grupo,id_usuario: usuario.id, id_unico, msg:0,imagem:0,gravacao:0,audio:0,sticker:0,video:0,outro:0,texto:0})
        }
    },
    existeUsuarioContador: async(id_grupo,id_usuario)=>{
        let id_unico = `${id_grupo}-${id_usuario}`
        let contador = await db.contador.asyncFindOne({id_unico})
        if(contador == null) {
            db.contador.asyncInsert({id_grupo,id_usuario,id_unico,msg:0,imagem:0,gravacao:0,audio:0,sticker:0,video:0,outro:0,texto:0})
        }

    },
    registrarContagem: async(id_grupo,id_usuario)=>{
        let id_unico = `${id_grupo}-${id_usuario}`
        db.contador.asyncInsert({id_grupo,id_usuario,id_unico,msg:0,imagem:0,gravacao:0,audio:0,sticker:0,video:0,outro:0,texto:0})
    },
    addContagem: async(id_grupo,id_usuario,tipo_msg)=>{
        switch(tipo_msg){
            case MessageTypes.TEXT:
                db.contador.asyncUpdate({id_grupo,id_usuario}, {$inc:{msg: 1, texto: 1}})
                break
            case MessageTypes.IMAGE:
                db.contador.asyncUpdate({id_grupo,id_usuario}, {$inc:{msg: 1, imagem: 1}})
                break
            case MessageTypes.VIDEO:
                db.contador.asyncUpdate({id_grupo,id_usuario}, {$inc:{msg: 1, video: 1}})
                break
            case MessageTypes.STICKER:
                db.contador.asyncUpdate({id_grupo,id_usuario}, {$inc:{msg: 1, sticker: 1}})
                break
            case MessageTypes.VOICE:
                db.contador.asyncUpdate({id_grupo,id_usuario}, {$inc:{msg: 1, gravacao: 1}})
                break
            case MessageTypes.AUDIO:
                db.contador.asyncUpdate({id_grupo,id_usuario}, {$inc:{msg: 1, audio: 1}})
                break
            case MessageTypes.DOCUMENT:
                db.contador.asyncUpdate({id_grupo,id_usuario}, {$inc:{msg: 1, outro: 1}})
                break    
        }
    },
    obterAtividade: async(id_grupo,id_usuario)=>{
        let atividade = await db.contador.asyncFindOne({id_grupo,id_usuario})
        return atividade
    },
    alterarContagemUsuario: async(id_grupo,id_usuario,qtd)=>{
        let resto = parseInt(qtd % 6)
        let msgs_cada = parseInt((qtd - resto)/6)
        await db.contador.asyncUpdate({id_grupo,id_usuario}, {$set:{msg:parseInt(qtd), texto:msgs_cada, imagem:msgs_cada, video:msgs_cada, sticker:msgs_cada, gravacao: msgs_cada, audio:msgs_cada, outro: resto }})
    },
    obterUsuariosInativos: async(id_grupo,min)=>{
        min = parseInt(min)
        let usuarios_inativos = await db.contador.asyncFind({id_grupo, msg: {$lt: min}},[ ["sort", {msg:-1}]])
        return usuarios_inativos
    },
    obterUsuariosAtivos: async(id_grupo, limite) =>{
        let usuarios_ativos = await db.contador.asyncFind({id_grupo}, [ ["sort", {msg:-1}] , ['limit', limite] ] )
        return usuarios_ativos
    },
    obterTodasContagensGrupo: async(id_grupo)=>{
        let contagens = await db.contador.asyncFind({id_grupo})
        return contagens
    },
    removerContagem: async(id_grupo,id_usuario)=>{
        await db.contador.asyncRemove({id_grupo,id_usuario})
    },
    removerContagemGrupo: async(id_grupo)=>{
        await db.contador.asyncRemove({id_grupo}, {multi: true})
    },
    // ###

    // ######################################################################
}