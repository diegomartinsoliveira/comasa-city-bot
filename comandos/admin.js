//REQUERINDO MODULOS
const { decryptMedia } = require('@open-wa/wa-decrypt')
const menu = require('../lib/menu')
const moment = require("moment-timezone")
const { version } = require('../package.json');
const msgs_texto = require('../lib/msgs')
const {criarTexto,erroComandoMsg, removerNegritoComando, timestampParaData} = require('../lib/util')
const {desbloquearComandosGlobal, bloquearComandosGlobal} = require("../lib/bloqueioComandos")
const cadastrarGrupo = require("../lib/cadastrarGrupo")
const db = require('../lib/database')
const fs = require("fs-extra")
const path = require("path")
const {botAlterarLimitador, botInfo, botAlterarLimiteDiario, botQtdLimiteDiario, botAlterarLimitarMensagensPv, botAlterarAutoSticker, botAlterarAntitrava, botAlterarPvLiberado} = require('../lib/bot')

module.exports = admin = async(client,message) => {
    try{
        const {id, chatId, sender, isGroupMsg, t, chat, caption, type, mimetype, isMedia, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const commands = caption || body || ''
        var command = commands.toLowerCase().split(' ')[0] || ''
        command = removerNegritoComando(command)
        const args =  commands.split(' ')
        const botNumber = await client.getHostNumber()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const ownerNumber = process.env.NUMERO_DONO.trim()
        const isOwner = ownerNumber == sender.id.replace(/@c.us/g, '')
        if (!isOwner) return client.reply(chatId, msgs_texto.permissao.apenas_dono_bot, id)

        switch(command){
            case "!admin":
                await client.sendText(chatId, menu.menuAdmin())
                break

            case "!infocompleta":
                var fotoBot = await client.getProfilePicFromServer(botNumber+'@c.us')
                var infoBot = JSON.parse(fs.readFileSync(path.resolve("database/json/bot.json")))
                var expiracaoLimiteDiario = timestampParaData(infoBot.limite_diario.expiracao * 1000)
                var botInicializacaoData = timestampParaData(infoBot.iniciado)
                var resposta = criarTexto(msgs_texto.admin.infocompleta.resposta_superior, infoBot.criador, infoBot.nome, botInicializacaoData, version)
                // AUTO-STICKER
                resposta += (infoBot.autosticker) ? msgs_texto.admin.infocompleta.resposta_variavel.autosticker.on: msgs_texto.admin.infocompleta.resposta_variavel.autosticker.off
                // PV LIBERADO
                resposta += (infoBot.pvliberado) ? msgs_texto.admin.infocompleta.resposta_variavel.pvliberado.on: msgs_texto.admin.infocompleta.resposta_variavel.pvliberado.off
                // LIMITE COMANDOS DIARIO
                resposta += (infoBot.limite_diario.status) ? criarTexto(msgs_texto.admin.infocompleta.resposta_variavel.limite_diario.on,  expiracaoLimiteDiario) : msgs_texto.admin.infocompleta.resposta_variavel.limite_diario.off
                // LIMITE COMANDOS POR MINUTO
                resposta += (infoBot.limitecomandos.status) ? criarTexto(msgs_texto.admin.infocompleta.resposta_variavel.taxa_comandos.on, infoBot.limitecomandos.cmds_minuto_max, infoBot.limitecomandos.tempo_bloqueio) : msgs_texto.admin.infocompleta.resposta_variavel.taxa_comandos.off
                // LIMITE MENSAGENS PV
                resposta += (infoBot.limitarmensagens.status) ? criarTexto(msgs_texto.admin.infocompleta.resposta_variavel.limitarmsgs.on, infoBot.limitarmensagens.max, infoBot.limitarmensagens.intervalo) : msgs_texto.admin.infocompleta.resposta_variavel.limitarmsgs.off
                // BLOQUEIO DE COMANDOS
                resposta += (infoBot.bloqueio_cmds.length != 0) ? criarTexto(msgs_texto.admin.infocompleta.resposta_variavel.bloqueiocmds.on, infoBot.bloqueio_cmds.toString()) : msgs_texto.admin.infocompleta.resposta_variavel.bloqueiocmds.off
                resposta += criarTexto(msgs_texto.admin.infocompleta.resposta_inferior, blockNumber.length, infoBot.cmds_executados, ownerNumber)
                if(fotoBot && fotoBot != "ERROR: 404") await client.sendFileFromUrl(chatId, fotoBot, "foto.jpg", resposta, id)
                else await client.reply(chatId, resposta, id)
                break
            
            case "!bcmdglobal":
                if(args.length === 1) return await client.reply(chatId, erroComandoMsg(command) ,id)
                var usuarioComandos = body.slice(12).split(" "), respostaBloqueio = await bloquearComandosGlobal(usuarioComandos)
                await client.reply(chatId, respostaBloqueio, id)
                break
            
            case "!dcmdglobal":
                if(args.length === 1) return await client.reply(chatId,erroComandoMsg(command),id)
                var usuarioComandos = body.slice(12).split(" "), respostaDesbloqueio = await desbloquearComandosGlobal(usuarioComandos)
                await client.reply(chatId, respostaDesbloqueio, id)
                break
                
            case '!rconfig':
                await db.resetarGrupos()
                await client.reply(chatId,msgs_texto.admin.rconfig.reset_sucesso,id)
                break

            case "!autostickerpv":
                var novoEstado = !botInfo().autosticker
                if(novoEstado){
                    botAlterarAutoSticker(true)
                    await client.reply(chatId, msgs_texto.admin.autostickerpv.ativado,id)
                } else {
                    botAlterarAutoSticker(false)
                    await client.reply(chatId, msgs_texto.admin.autostickerpv.desativado,id)
                } 
                break

            case "!pvliberado":
                var novoEstado = !botInfo().pvliberado
                if(novoEstado){
                    botAlterarPvLiberado(true)
                    await client.reply(chatId, msgs_texto.admin.pvliberado.ativado,id)
                } else {
                    botAlterarPvLiberado(false)
                    await client.reply(chatId, msgs_texto.admin.pvliberado.desativado,id)
                } 
                break

            case "!usuarios":
                if(args.length === 1) return await client.reply(chatId, erroComandoMsg(command), id)
                var tipo = args[1].toLowerCase()
                var usuarios = await db.obterUsuariosTipo(tipo)
                if(usuarios.length == 0) return await client.reply(chatId, msgs_texto.admin.usuarios.nao_encontrado, id)
                var respostaItens = ''
                for (var usuario of usuarios) respostaItens += criarTexto(msgs_texto.admin.usuarios.resposta_item, usuario.nome, usuario.id_usuario.replace("@c.us", ""), usuario.comandos_total)
                var resposta = criarTexto(msgs_texto.admin.usuarios.resposta_titulo, tipo.toUpperCase(), usuarios.length, respostaItens)
                await client.sendTextWithMentions(chatId, resposta)
                break

            case "!limpartipo":
                if(args.length === 1) return await client.reply(chatId, erroComandoMsg(command), id)
                var tipo = args[1].toLowerCase()
                var limpou = await db.limparTipo(tipo)
                if(!limpou) return await client.reply(chatId, msgs_texto.admin.limpartipo.erro, id)
                await client.reply(chatId, criarTexto(msgs_texto.admin.limpartipo.sucesso, tipo.toUpperCase()), id)
                break

            case "!alterartipo":
                if(args.length === 1) return await client.reply(chatId, erroComandoMsg(command), id)
                var usuario_tipo = ""
                if(quotedMsg) usuario_tipo = quotedMsgObj.author
                else if(mentionedJidList.length === 1) usuario_tipo = mentionedJidList[0]
                else if(args.length > 2) usuario_tipo = args.slice(2).join("").replace(/\W+/g,"")+"@c.us"
                else return await client.reply(chatId, erroComandoMsg(command),id)
                if(ownerNumber == usuario_tipo.replace("@c.us","")) return await client.reply(chatId, msgs_texto.admin.alterartipo.tipo_dono,id)
                let c_registrado = await db.verificarRegistro(usuario_tipo)
                if(c_registrado){
                    var alterou = await db.alterarTipoUsuario(usuario_tipo, args[1])
                    if(!alterou) return await client.reply(msgs_texto.admin.alterartipo.tipo_invalido, id)
                    await client.reply(chatId, criarTexto(msgs_texto.admin.alterartipo.sucesso, args[1].toUpperCase()),id)
                } else {
                    await client.reply(chatId, msgs_texto.admin.alterartipo.nao_registrado,id)
                }
                break
        
            case "!tipos":
                var tipos = botInfo().limite_diario.limite_tipos, respostaTipos = ''
                for (var tipo in tipos) respostaTipos += criarTexto(msgs_texto.admin.tipos.item_tipo, msgs_texto.tipos[tipo], tipos[tipo] || "∞")
                await client.reply(chatId, criarTexto(msgs_texto.admin.tipos.resposta, respostaTipos), id)
                break
            
            case "!rtodos":
                if(!botInfo().limite_diario.status) return await client.reply(chatId, msgs_texto.admin.rtodos.erro_limite_diario,id)
                await db.resetarComandosDia()
                await client.reply(chatId, msgs_texto.admin.rtodos.sucesso,id)
                break

            case "!r":
                if(!botInfo().limite_diario.status) return await client.reply(chatId, msgs_texto.admin.r.erro_limite_diario,id)
                if(quotedMsg){
                    let r_registrado = await db.verificarRegistro(quotedMsgObj.author)
                    if(r_registrado){
                        await db.resetarComandosDiaUsuario(quotedMsgObj.author)
                        await client.reply(chatId, msgs_texto.admin.r.sucesso,id)
                    } else {
                        return await client.reply(chatId, msgs_texto.admin.r.nao_registrado,id)
                    }
                } else if (mentionedJidList.length === 1){
                    let r_registrado = await db.verificarRegistro(mentionedJidList[0])
                    if(r_registrado){
                        await db.resetarComandosDiaUsuario(mentionedJidList[0])
                        await client.reply(chatId, msgs_texto.admin.r.sucesso,id)
                    } else {
                        return await client.reply(chatId, msgs_texto.admin.r.nao_registrado,id)
                    }
                } else if(args.length >= 1){
                    let r_numero_usuario = ""
                    for (let i = 1; i < args.length; i++){
                        r_numero_usuario += args[i]
                    }
                    r_numero_usuario = r_numero_usuario.replace(/\W+/g,"")
                    let r_registrado = await db.verificarRegistro(r_numero_usuario+"@c.us")
                    if(r_registrado){
                        await db.resetarComandosDiaUsuario(r_numero_usuario+"@c.us")
                        await client.reply(chatId, msgs_texto.admin.r.sucesso,id)
                    } else {
                        return await client.reply(chatId, msgs_texto.admin.r.nao_registrado,id)
                    }
                } else {
                    return await client.reply(chatId, erroComandoMsg(command),id)
                }
                break  
                
            case "!verdados":
                var idUsuario = "", dadosUsuario = {}
                if(quotedMsg) idUsuario = quotedMsgObj.author
                else if(mentionedJidList.length === 1) idUsuario = mentionedJidList[0]
                else if(args.length >= 1) idUsuario =  args.slice(1).join("").replace(/\W+/g,"")+"@c.us"
                else return await client.reply(chatId, erroComandoMsg(command),id)
                var usuarioRegistrado = await db.verificarRegistro(idUsuario)
                if(usuarioRegistrado) dadosUsuario = await db.obterUsuario(idUsuario)
                else return await client.reply(chatId,msgs_texto.admin.verdados.nao_registrado,id)
                var maxComandosDia = dadosUsuario.max_comandos_dia || "Sem limite"
                var tipoUsuario = msgs_texto.tipos[dadosUsuario.tipo]
                var nomeUsuario =  dadosUsuario.nome || "Ainda não obtido"
                var resposta = criarTexto(msgs_texto.admin.verdados.resposta_superior, nomeUsuario, tipoUsuario, dadosUsuario.id_usuario.replace("@c.us",""))
                if(botInfo().limite_diario.status) resposta += criarTexto(msgs_texto.admin.verdados.resposta_variavel.limite_diario.on, dadosUsuario.comandos_dia, maxComandosDia, maxComandosDia)
                resposta += criarTexto(msgs_texto.admin.verdados.resposta_inferior, dadosUsuario.comandos_total)
                await client.reply(chatId, resposta, id)
                break

            case '!bctodos':
                if(args.length === 1) return await client.reply(chatId, erroComandoMsg(command), id)
                var mensagem = body.slice(9).trim(), chats = await client.getAllChats(), bloqueados = await client.getBlockedIds()
                await client.reply(chatId, criarTexto(msgs_texto.admin.bctodos.espera, chats.length, chats.length), id)
                for (let chat of chats) {
                    if(chat.isGroup && !chat.isReadOnly && !chat.isAnnounceGrpRestrict){
                        await new Promise((resolve)=>{
                            setTimeout(async ()=>{
                                resolve(await client.sendText(chat.id, criarTexto(msgs_texto.admin.bctodos.anuncio, mensagem)))
                            }, 1000)
                        })
                    } else {
                        if(!bloqueados.includes(chat.id)) {
                            await new Promise((resolve)=>{
                                setTimeout(async ()=>{
                                    resolve(await client.sendText(chat.id, criarTexto(msgs_texto.admin.bctodos.anuncio, mensagem)))
                                }, 1000)
                            })
                        }
                    }
                }
                await client.reply(chatId, msgs_texto.admin.bctodos.bc_sucesso , id)
                break

            case '!bccontatos':
                if(args.length === 1) return client.reply(chatId, erroComandoMsg(command), id)
                var mensagem = body.slice(12).trim(), chats = await client.getAllChats(), grupos = await client.getAllGroups(), bloqueados = await client.getBlockedIds(), qtdChatContatos = chats.length - grupos.length
                await client.reply(chatId, criarTexto(msgs_texto.admin.bccontatos.espera, qtdChatContatos, qtdChatContatos), id)
                for (let chat of chats) {
                    if(!chat.isGroup && !bloqueados.includes(chat.id)) {
                        await new Promise((resolve)=>{
                            setTimeout(async ()=>{
                                resolve(await client.sendText(chat.id, criarTexto(msgs_texto.admin.bccontatos.anuncio, mensagem)))
                            }, 1000)
                        })
                    }
                }
                await client.reply(chatId, msgs_texto.admin.bccontatos.bc_sucesso , id)
                break
            
            case '!bcgrupos':
                if(args.length === 1) return client.reply(chatId, erroComandoMsg(command), id)
                var mensagem = body.slice(10).trim(), grupos = await client.getAllGroups()
                await client.reply(chatId, criarTexto(msgs_texto.admin.bcgrupos.espera, grupos.length, grupos.length) , id)
                for (var grupo of grupos) {
                    if (!grupo.isReadOnly && !grupo.isAnnounceGrpRestrict) {
                        await new Promise((resolve)=>{
                            setTimeout(async ()=>{
                                resolve(await client.sendText(grupo.id, criarTexto(msgs_texto.admin.bcgrupos.anuncio, mensagem)))
                            }, 1000)
                        })
                    }
                }
                await client.reply(chatId, msgs_texto.admin.bcgrupos.bc_sucesso , id)
                break
            
            case "!grupos":
                var grupos = await client.getAllGroups(), resposta = criarTexto(msgs_texto.admin.grupos.resposta_titulo, grupos.length)
                for (var grupo of grupos){
                    var adminsGrupo = await client.getGroupAdmins(grupo.id)
                    var botAdmin = adminsGrupo.includes(botNumber + '@c.us')
                    var linkGrupo = "Não Disponível"
                    if(botAdmin) linkGrupo = await client.getGroupInviteLink(grupo.id)
                    resposta += criarTexto(msgs_texto.admin.grupos.resposta_itens, grupo.formattedTitle, grupo.groupMetadata.participants.length, botAdmin ? "Sim" : "Não", linkGrupo)
                }
                await client.reply(chatId, resposta, id)
                break

            case '!print':
                let print = await client.getSnapshot()
                await client.sendFile(chatId,print,"print.png",'Captura de Tela',id)
                break

            case '!estado':
                if(args.length != 2)  return client.reply(chatId,erroComandoMsg(command),id)
                switch(args[1]){
                    case 'online':
                        await client.setMyStatus("< 🟢 Online />")
                        await client.reply(chatId,msgs_texto.admin.estado.sucesso,id)
                        break
                    case 'offline':
                        await client.setMyStatus("< 🔴 Offline />")
                        await client.reply(chatId,msgs_texto.admin.estado.sucesso,id)
                        break    
                    case 'manutencao':
                        await client.setMyStatus("< 🟡 Manutenção />")
                        await client.reply(chatId,msgs_texto.admin.estado.sucesso,id)
                        break
                    default:
                        await client.reply(chatId, erroComandoMsg(command), id)
                }
                break

            case '!desligar':
                await client.reply(chatId, msgs_texto.admin.desligar.sucesso, id)
                await client.kill()
                break
            
            case "!ping":
                var os = require('os')
                var tempoResposta = (moment.now()/1000) - t
                var memoriaTotal = os.totalmem()/1024000000, memoriaUsada = (os.totalmem() - os.freemem())/1024000000
                var chats = await client.getAllChatIds()
                var sistemaOperacional = `${os.type()} ${os.release()}`
                var nomeProcessador = os.cpus()[0].model
                var mensagensCarregadas = await client.getAmountOfLoadedMessages()
                var chatContatos = await client.getAllContacts(), chatGrupos = await client.getAllGroups()
                await client.reply(chatId, criarTexto(
                msgs_texto.admin.ping.resposta, 
                sistemaOperacional, 
                nomeProcessador, 
                memoriaUsada.toFixed(2), 
                memoriaTotal.toFixed(2), 
                tempoResposta.toFixed(3),
                chats.length,
                mensagensCarregadas,
                chatContatos.length,
                chatGrupos.length,
                timestampParaData(botInfo().iniciado)), id)
                break
        }
    } catch(err){
        throw err
    }
    
}