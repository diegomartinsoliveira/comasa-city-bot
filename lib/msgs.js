const msgs_texto = {
    inicio:{
        arquivos_criados: "✓ Seus arquivos necessários foram criados, inicie o bot novamente.",
        dados_bot: "✓ Obteve dados do BOT",
        cadastro_grupos: "✓ Sucesso no cadastro de grupos",
        participantes_atualizados: "✓ Participantes dos grupos atualizados",
        lista_negra: "✓ Lista negra verificada",
        contagem_recarregada: "✓ Todas as contagens foram recarregadas e novos membros foram adicionados/removidos.",
    },
    geral: {
        espera : "[AGUARDE] Em andamento ⏳ espere por favor.",
        min_membros: "O grupo precisa de no mínimo {p1} para o bot ser convidado.`",
        entrada_grupo: "Saudações *{p1}* , se tiverem alguma dúvida só digitar *!menu*",
        sem_ligacoes: "[❗] Não posso receber ligações, você sera bloqueado. Se ligou por acidente fale com o dono do bot.",
        comando_invalido: "[❗] Parece que você não digitou corretamente o comando ou não sabe como usá-los, digite o comando *!menu* para mais informações.",
        cmd_erro: "[❗] Ops, parece que você usou o comando *{p1}* incorretamente. Quer aprender a usar?\n\n Digite :\n  - Ex: *{p2} guia* para ver o guia.",
        resposta_ban : "🤖✅ @{p1} banido com sucesso\n\n"+
        "Motivo : {p2}\n"+
        "Quem baniu : {p3}"
    },
    info: {
        ajuda:{
            resposta_comum: "Olá, *{p1}*\n"+
            "Tipo de Usuário : *{p2}*\n",
            resposta_limite_diario: "Olá, *{p1}*\n"+
            "Limite : *{p2}/{p3}*\n"+
            "Tipo de Usuário : *{p4}*\n"
        },
        info:{
            resposta: "*Criador do Bot* : {p1}\n"+
            "*Nome do bot* : {p2}\n"+
            "*Online desde* : {p3}\n"+
            "*Comandos executados* : {p4}\n"+
            "*Contato do criador* : wa.me/{p5}\n"+
            "*Versão atual* : {p6}\n"
        },
        meusdados:{
            resposta_geral: "[🤖 *SEUS DADOS DE USO* 🤖]\n\n"+
            "Tipo de usuário : *{p1}*\n"+
            "Nome : *{p2}*\n"+
            "Total de comandos usados : *{p3}* comandos\n",
            resposta_limite_diario: "Comandos usados hoje : *{p1}/{p2}*\n"+
            "Limite diário : *{p3}*\n",
            resposta_grupo: "Mensagens neste grupo : *{p1}* mensagens\n"
        },
        reportar:{
            sucesso: `✅ Obrigado, seu problema foi reportado com sucesso e será analisado pelo dono.`,
            resposta: "[ 🤖 REPORTAR ⚙️]\n\n"+
            "*Usuário* : {p1}\n"+
            "*Contato* : http://wa.me/{p2}\n"+
            "*Problema* : {p3}\n"
        }
    },
    figurinhas: {
        sticker:{
            erro_sgif : '[❗] O Whatsapp tem um limite de 1MB por sticker, dimunua seu video ou escolha algum outro.\n\n'+
            '*Obs*:Se o erro persistir o servidor de criação de stickers deve estar em manutenção.',
            erro_s: "[❗] Houve um problema no processamento de stickers, tente novamente mais tarde.\n\n"+
            "*Obs*:Se o erro persistir o servidor de criação de stickers deve estar em manutenção.",
            erro_conversao: "[❗] Houve um problema de conversão de mídia, ou esta mídia não pode ser convertida.",
            link_invalido : '[❗] O link que você enviou não é válido.',
            ssf_imagem: `[❗] Este comando é válido apenas para imagens.`,
            video_invalido : '[❗] Envie um video/gif com no máximo 10 segundos.',
            erro_remover: '[❗] Houve um erro ao remover fundo, verifique se a imagem é compatível.',
            indisponivel: '[❗] Este comando está indisponível no momento, tente novamente mais tarde.'
        },
        tps:{
            erro_conversao: "[❗] Houve algum erro na conversao do *!tps*, verifique se não há emojis no seu texto.",
            texto_longo : "[❗] Texto é muito longo, no máximo 40 caracteres. ",
            espera: "⏳ Em andamento , estou transformando seu texto em sticker."
        },
        atps:{
            erro_conversao: "[❗] Houve algum erro na conversao do *!atps*, verifique se não há emojis no seu texto.",
            texto_longo : "[❗] Texto é muito longo, no máximo 40 caracteres. ",
            espera: "⏳ Em andamento , estou transformando seu texto em sticker animado."
        },
    },
    utilidades:{
        rastreio:{
            codigo_invalido : '[❗] Código de rastreio deve ter 13 digitos!',
            nao_postado : '[❗] *Parece que este objeto ainda não foi postado*',
            erro_servidor : '[❗] *Houve um erro na API dos Correios*',
            resposta_titulo: "📦📦*RASTREIO*📦📦\n\n",
            resposta_itens: "Status : {p1}\n"+
            "Data : {p2}\n"+
            "Hora : {p3}\n"+
            "{p4}\n"
        },
        voz : {
            texto_vazio : '[❗] Texto vazio! Digite alguma frase.',
            texto_longo: '[❗] Texto muito longo!',
            erro_audio: "[❗] Houve um erro na criação do áudio",
            nao_suportado: "[❗] Sem dados do idioma ou idioma não suportado! Atualmente suportamos :\n\n"+
            "- 🇧🇷 Português (pt)\n"+
            "- 🇺🇸 Inglês (en)\n"+
            "- 🇯🇵 Japonês (jp)\n"+
            "- 🇮🇹 Italiano (it)\n"+
            "- 🇪🇸 Espanhol (es)\n"+
            "- 🇷🇺 Russo (ru)\n"+
            "- 🇰🇷 Coreano (ko)\n"+
            "- 🇸🇪 Sueco (sv)\n",
        },
        traduz: {
            erro_servidor: '[❗] Houve um erro de resposta do servidor de tradução.',
            nao_suportado: "[❗] Sem dados do idioma ou idioma não suportado! Atualmente suportamos :\n\n"+
            "- 🇧🇷 Português (pt)\n"+
            "- 🇺🇸 Inglês (en)\n"+
            "- 🇯🇵 Japonês (ja)\n"+
            "- 🇮🇹 Italiano (it)\n"+
            "- 🇪🇸 Espanhol (es)\n"+
            "- 🇷🇺 Russo (ru)\n"+
            "- 🇰🇷 Coreano (ko)\n",
            resposta: "🔠 *Resposta - Tradução* 🔠 :\n\n"+
            "*Texto*: {p1}\n\n"+
            "*Tradução* : {p2}"
        },
        noticia:{
            indisponivel: "[❗] Este comando está indisponível no momento.",
            erro_servidor: '[❗] Houve um erro na API de notícias, verifique se a chave API está configurada corretamente.',
            resposta_titulo: "〘🗞️ ULTIMAS NOTÍCIAS 〙\n\n",
            resposta_itens: "➥ 📰 *{p1}* \n"+
            "*Descrição* : {p2}\n"+
            "*Link* : {p3}\n\n"
        },
        ddd:{
            somente_br: "[❗] Esse comando só é aceito com números brasileiros.",
            nao_encontrado: "[❗] Este DDD não foi encontrado, certifique-se que ele é válido.",
            erro_servidor: "[❗] Houve um erro para obter dados sobre este DDD, tente novamente mais tarde.",
            resposta: "📱 Estado : *{p1}* / Região : *{p2}*"
        },
        clima:{
            erro_resultado : "[❗] Local não encontrado ou houve um erro na API.\n\n"+
            "Dica: *Digite cidade e estado completos para maior chance de ser encontrado.*",
            resposta: "☀️ CONSULTA DE CLIMA ☀️\n\n"+
            "{p1}"
        },
        letra:{
            erro_servidor: "[❗] Houve um erro na API de pesquisa de letras, tente novamente mais tarde.",
            sem_resultados: "[❗] Não foram encontrados resultados para esta música.",
            resposta : "🎼 LETRA DE MÚSICA 🎼\n\n"+
            "Música : *{p1}*\n"+
            "Artista : *{p2}*\n\n"+
            "{p3}"
        },
        moeda:{
            nao_suportado: "[❗] Moeda não suportada, atualmente existe suporte para : real|dolar|euro",
            valor_invalido: "[❗] O valor não é um número válido",
            valor_limite: "[❗] Quantidade muito alta, você provavelmente não tem todo esse dinheiro.",
            erro_servidor: "[❗] Houve um erro na API de conversão de moedas",
            resposta_completa: "💵 Conversão - *{p1} {p2}*\n"+
            "{p3}",
            resposta_item:"----------------------------\n"+ 
            "*Conversão* : {p1}\n"+
            "*Valor convertido* : *{p2}* {p3}\n"+
            "*Última atualização* : {p4}\n\n"
        },
        pesquisa: {
            erro_servidor: "[❗] Houve um erro na API de pesquisa",
            sem_resultados: "[❗] Não foi encontrado resultados para esta pesquisa.",
            resposta_titulo: "🔎 Resultados da pesquisa de : *{p1}*🔎\n\n",
            resposta_itens: "🔎 {p1}\n"+
            "*Link* : {p2}\n\n"+
            "*Descrição* : {p3}\n\n"
        },
        calc:{
            carac_invalidos: "[❗] Seu cálculo tem caracteres inválidos.",
            divisao_zero: "🧮 Para de ficar tentando dividir por 0 , seu mongol.",
            erro_calculo: "[❗] Houve um erro no cálculo",
            resposta: "🧮 O resultado é *{p1}* "
        }
    },
    grupo: {
        regras:{
            sem_descrição: "[❗] O grupo ainda não tem uma descrição."
        },
        bemvindo:{
            ligado: "✅ O recurso de boas vindas foi ativado com sucesso",
            desligado: "✅ O recurso de boas vindas foi desativado com sucesso",
            mensagem: "👋 Olá, @{p1}, sou um robô virtual! \n\n"+
            "Seja bem vindo(a) ao grupo *{p2}*, e não esqueça de ler as regras! \n\n"+
            "{p3}"+
            "Caso precise de alguma informação, digite *!menu* para ver os comandos, com exclamação no inicio.\n\n"+
            "*REGRAS DO GRUPO COMASA CITY*\n"+
            "\n"+
            "_Antes de iniciar qualquer comunicação no grupo, leia as regras atentamente afins de evitar uma remoção por falta de atenção._\n"+
            "\n"+
            "1 - ❌ PROIBIDO EXCESSO DE IMAGENS/VIDEOS (MAX 5 MÍDIAS)\n"+
            "2 - ❌ PROIBIDO EXCESSO DE PUBLICAÇÕES REPETIDAS\n"+
            "3 - ❌ PROIBIDO DIFAMAR O COMÉRCIO LOCAL\n"+
            "4 - ❌ PROIBIDO VENDAS ILEGAIS DE ANIMAIS\n"+
            "5 - ❌ PROIBIDO CALÚNIA, DIFAMAÇÃO, INJÚRIA A ALGUÉM\n"+
            "6 - ❌ PROIBIDO DIVULGAR BLITZ\n"+
            "7 - ❌ PROIBIDO POLÍTICA\n"+
            "8 - ❌ PROIBIDO LINKS DE ORIGEM DUVIDOSA\n"+
            "9 - ❌ PROIBIDO COMENTÁRIOS DESNECESSÁRIOS\n"+
            "10 - ❌ PROIBIDO INVADIR A PRIVACIDADE DE OUTRO MEMBRO NO PRIVADO SEM PERMISSÃO\n"+
            "11 - ❌ PROIBIDO A DIVULGAÇÃO DE JOGOS DE AZAR NO GERAL\n"+
            "12 - ❌ PROIBIDO DIVULGAR LINKS DE GRUPOS SEM CONTEXTO COM A REGIÃO OU MOTIVAÇÃO\n"+
            "13 - ❌ PROIBIDO ENVIAR MENSAGENS COMERCIAIS NO PRIVADO DOS MEMBROS SEM PERMISSÃO, CASO NÃO SEJA SEU CLIENTE\n"+
            "14 - ❌ PROIBIDO RIVALIDADE DE COMÉRCIOS, SE AMBOS VENDEM A MESMA COISA, RESPEITEM UNS AOS OUTROS, CASO HOUVER DESRESPEITO AMBOS SERÃO REMOVIDOS.\n"+
            "15 - ❌ PROIBIDO POSTAR CONTEÚDO OFENSIVO/SENSÍVEL\n"+
            "16 - ❌ PROIBIDO DAR SUA OPINIÃO NA PUBLICAÇÃO DOS OUTROS, DÚVIDAS, PERGUNTAS, SUGESTÕES VÁ NO PRIVADO.\n"+
            "\n"+
            "_Regras que devem ser seguidas, caso não sejam cumpridas estão sujeitos a advertência e remoção!_\n"+
            "\n"+
            "⚠️ COLOQUE TODAS INFORMAÇÕES NECESSÁRIAS PARA EVITAR COMENTÁRIOS DESNECESSÁRIOS NA PUBLICAÇÃO.\n"+
            "⚠️ ENVIAR O MÍNIMO DE FOTOS OU VIDEOS  POSSÍVEIS, MAXIMO PERMITIDO SÃO 5 FOTOS OU VIDEOS. SEJA OBJETIVO!\n"+
            "⚠️ NÃO FAÇA NENHUM PAGAMENTO ANTECIPADO DURANTE NEGOCIAÇÕES SEM AO MENOS VER O PRODUTO OU TER CONTATO COM O REAL VENDEDOR.\n"+
            "⚠️ AO ANUNCIAR UM IMÓVEL ALÉM DE TODOS DETALHES, COLOQUE PRINCIPALMENTE SE É PERMITIDO CRIANÇAS E PETS.\n"+
            "⚠️ ADMINS NÃO SÃO RESPONSÁVEIS PELAS PUBLICAÇÕES, SEJA PRUDENTE E RESPEITE AS REGRAS!\n"+
            "\n"+
            "O excesso de imagens além de deixar o grupo poluído acaba atrapalhando os demais membros, tenha bom senso ao publicar.\n"+
            "⚠️ Demais publicações como vagas de empregos, doações, algo beneficente, eventos, coisas que não sejam vendas de produtos, não há limite de fotos.\n"+
            "O intuito deste grupo é o compartilhamento de informações sobre o bairro Comasa e região leste de Joinville, o grupo é destinado a informar acontecimentos no bairro, notícias em geral, doações, objetos, documentos e animais perdidos, para tirar suas dúvidas referente a qualquer coisa, e você comerciante poderá divulgar seu trabalho, produto ou comércio!\n"+
            "💡Regras básicas para mantermos o grupo organizado e para podermos trocar ideias, noticiar acontecimentos e ocorrências, avisos, soluções de problemas no bairro, contribuir para os comerciantes publicar seus produtos ou comércios e ajudar a quem precisa.\n"+
            "\n"+
            "*Caso o membro persista em descumprir com as regras será imediatamente removido.*"
        },
        status:{
            resposta_titulo: "[ 🤖 STATUS DO GRUPO 🤖 ]\n\n",
            resposta_variavel: {
                bemvindo:{
                    on: "- Recurso Boas Vindas : ✅\n",
                    off: "- Recurso Boas Vindas : ❌\n"
                },
                contador:{
                    on: "- Recurso Contador : ✅\n"+
                    "   - {p1}\n",
                    off: "- Recurso Contador : ❌\n"
                },
                bloqueiocmds:{
                    on: "- Bloqueio de comandos : ✅\n"+
                    "   - *{p1}*\n",
                    off: "- Bloqueio de comandos : ❌\n"
                },
                listanegra: "- Lista Negra : *{p1}*\n"
            }
        },
        blista: {
            sucesso: "✅ O número desse usuário foi adicionado á lista negra.",
            numero_vazio: "[❗] O número do usuário está vazio.",
            ja_listado: "[❗] Este usuário já está na lista negra.",
        },
        dlista: {
            sucesso: "✅ O número desse usuário foi removido da lista negra.",
            numero_vazio: "[❗] O número do usuário está vazio.",
            nao_listado: "[❗] Este usuário não está na lista negra.",
        },
        listanegra: {
            motivo: "Banido por estar na LISTA NEGRA",
            lista_vazia: "🤖 Não existe usuários na lista negra deste grupo.",
            resposta_titulo: "╔══✪〘❌ Lista Negra 〙✪══\n",
            resposta_itens: "╠➥ @{p1}\n"
        },
        add:{
            add_erro: "[❗] O número +{p1} não pode ser adicionado.",
            saiu_recente: "[❗] O número +{p1} não pode ser adicionado, ele saiu recentemente do grupo.",
            nao_contato : "[❗] O número +{p1} não pode ser adicionado, o BOT nunca teve contato com este usuário antes.",
            grupo_cheio: "[❗] O número +{p1} não pode ser adicionado, provavelmente o grupo está cheio.",
            membro_grupo: "[❗] O número +{p1} não pode ser adicionado, ele já está no grupo.",
            com_privacidade: "[❗] O número +{p1} não pode ser adicionado, ele está com privacidade ativada apenas para contatos."
        },
        promover:{
            erro_bot: "[❗] O BOT não pode ser promovido por ele mesmo.",
            sucesso_usuario: "➥ @{p1} virou *ADMINISTRADOR*.\n",
            erro_usuario: "➥ @{p1} já é um *ADMINISTRADOR*.\n",
            resposta: "[👤 PROMOVER MEMBROS 👤]\n\n"+
            "{p1}"
        },
        rebaixar:{
            erro_bot: "[❗] O BOT não pode ser rebaixado por ele mesmo.",
            sucesso_usuario: "➥ @{p1} virou *MEMBRO*.\n",
            erro_usuario: "➥ @{p1} já é um *MEMBRO*.\n",
            resposta: "[👤 REBAIXAR MEMBROS 👤]\n\n"+
            "{p1}"
        },
        contador:{
            ligado: "✅ O recurso de CONTADOR foi ligado com sucesso",
            desligado: "✅ O recurso de CONTADOR foi desligado com sucesso",
            recarregar_contagem: "✓ Todas as contagens foram recarregadas e novos membros foram adicionados/removidos.",
            grupo_nao_registrado: "O grupo {p1} ainda não está registrado"
        },
        alterarcont:{
            num_invalido: "[❗] Quantidade de mensagens é inválida.",
            erro_contador: "[❗] Este comando só funciona quando o contador está ativado.",
            fora_grupo: "[❗] Não é possível alterar a contagem de quem não está no grupo.",
            sucesso: "✅ A contagem do usuário foi definida com sucesso"
        },
        atividade:{
            erro_contador: "[❗] Este comando só funciona quando o contador está ativado.",
            bot_erro: "[❗] Não é possível ver a atividade do bot.",
            fora_grupo: "[❗] Não é possível ver a atividade de quem não está no grupo.",
            resposta: "🤖 *Atividade do usuário* 🤖\n\n"+
            "📱 *Total de mensagens* : {p1}\n"+
            "═════════════════\n"+
            "🔤 Textos enviados : {p2}\n"+
            "📸 Imagens enviadas : {p3}\n"+
            "🎥 Videos enviados : {p4}\n"+
            "🖼️ Figurinhas enviadas : {p5}\n"+
            "🎙️ Gravaçôes enviadas : {p6}\n"+
            "🎧 Arquivo de aúdio enviados : {p7}\n"+
            "🧩 Outros : {p8}\n"
        },
        minativos:{
            erro_qtd: "[❗] A quantidade mínima de mensagens não é um número válido.",
            limite_qtd: "[❗] A quantidade mínima de mensagens deve ser entre [1-50]",
            erro_contador: "[❗] Este comando só funciona quando o contador está ativado.",
            sem_inativo: "✅ Não existe membros inativos neste grupo.",
            resposta_titulo: "╔══✪〘🤖 Marcando todos que tem menos de {p1} mensagens〙\n\n"+
            "👤 *Membros inativos* : {p2}\n",
            resposta_itens: "╠➥ @{p1} - *{p2}* Msgs\n"
        },
        binativos:{
            erro_qtd: "[❗] A quantidade mínima de mensagens não é um número válido.",
            limite_qtd: "[❗] A quantidade mínima de mensagens deve ser entre 1 e 50",
            erro_contador: "[❗] Este comando só funciona quando o contador está ativado.",
            sucesso: "🤖✅ {p1} Membros com menos de {p2} mensagens foram banidos.",
            sem_inativo: "✅ Não existe membros inativos neste grupo."
        },
        topativos:{
            erro_qtd: "[❗] A quantidade de pessoas não é um número válido.",
            limite_qtd: "[❗] A quantidade de pessoas deve ser entre 1 e 50",
            erro_contador: "[❗] Este comando só funciona quando o contador está ativado.",
            resposta_titulo: "╔══✪〘🏆 TOP {p1} ATIVOS 🏆 〙\n╠\n",
            resposta_itens: "╠➥ {p1} {p2}° Lugar @{p3} - *{p4}* Msgs\n"
        },
        enquete:{
            min_opcao: "[❗] A enquete precisa de no mínimo 2 opçôes",
            aberta: "✅ A enquete foi aberta com sucesso, digite *!verenquete* para vê-la",
            ja_fechada: "[❗] Não existe enquete aberta no grupo para ser encerrada.",
            fechada: "✅ A enquete foi encerrada com sucesso, obtendo os resultados.",
            resultado_titulo: "[ 📋 RESULTADO DA ENQUETE 📋]\n\n"+
            "❔ Pergunta : *{p1}* \n\n",
            resultado_itens: "▫️ Opção {p1} -> {p2} - *{p3}* Votos \n\n"
        },
        verenquete:{
            sem_enquete: "[❗]  Não existe enquete aberta no grupo para ser votada.",
            resposta_titulo: "[📋 ENQUETE ATUAL 📋]\n\n"+
            "❔ Pergunta : *{p1}* \n\n",
            resposta_itens: "▫️ !votarenquete *{p1}* --> {p2} \n\n",
            resposta_inferior: "Para votar digite *!votarenquete numero-opcao*\n"+
            "Para encerrar a enquete digite *!enquete*"
        },
        votarenquete:{
            sem_enquete: "[❗]  Não existe enquete aberta no grupo para ser votada.",
            opcao_erro: "[❗] A opção escolhida não é um número válido",
            ja_votou: "[❗] Você já votou! Não é possível votar novamente!",
            opcao_invalida: "[❗] A opção que você escolheu não existe",
            sucesso: "✅ Seu voto foi contabilizado com sucesso."
        },
        bcmd:{
            resposta_titulo: "[🤖 *Bloquear comandos* 🤖]\n\n",
            resposta_variavel: {
                ja_bloqueado: "- Comando *{p1}* já está bloqueado.\n",
                bloqueado_sucesso: "- Comando *{p1}* bloqueado com sucesso.\n",
                erro : "- Comando *{p1}* não pode ser bloqueado.\n",
                nao_existe: "- Comando *{p1}* não existe.\n"
            },
            resposta_cmd_bloqueado : "[❗] O comando *{p1}* está temporariamente bloqueado neste grupo pelo administrador."
        },
        dcmd:{
            resposta_titulo: "[🤖 *Desbloquear Comandos* 🤖]\n\n",
            resposta_variavel: {
                desbloqueado_sucesso: "- Comando *{p1}* foi desbloqueado.\n",
                ja_desbloqueado: "- Comando *{p1}* já esta desbloqueado ou nunca foi bloqueado.\n"
            }
        },
        link:{
            resposta: "\nLink do grupo : *{p1}*"
        },
        adms:{
            resposta_titulo: "🤖 Lista de administradores :\n\n",
            resposta_itens: "➸ @{p1}\n"
        },
        mt:{
            resposta_titulo_comum: "╔══✪〘🤖 Marcando Todos 〙\n",
            resposta_titulo_variavel: "╔══✪〘{p1}〙\n",
            resposta_itens: "╠➥ @{p1}\n"
        },
        mm:{
            sem_membros: "[❗] Não existem membros para serem marcados.",
            resposta_titulo_comum: "╔══✪〘🤖 Marcando Membros 〙\n",
            resposta_titulo_variavel: "╔══✪〘{p1}〙\n",
            resposta_itens: "╠➥ @{p1}\n"
        },
        dono:{
            resposta: "🤖 O Dono do grupo é : @{p1}",
            sem_dono: "🤖 O Dono do grupo teve o número banido ou cancelado."
        },
        apagar:{
            minha_msg: "[❗] Erro! O bot não pode apagar mensagem de outros membros.",
            nao_recente: "[❗] A mensagem que você quer apagar não é recente"
        },
        rlink:{
            erro: "[❗] Houve um erro na redefinição de link",
            sucesso : "✅ Link foi redefinido com sucesso"
        }
    },
    diversao: {
        viadometro: {
            respostas: [' 0%\n\n - ESSE É MACHO ',
           '██                 20% \n\n - HMMMMM ',
           '████             40%\n\n - JÁ MAMOU O PRIMO',
           '██████         60%\n\n - EITA MAMOU O BONDE',
           '████████     80%\n\n - JÁ SENTOU EM ALGUEM',
           '██████████ 100%\n\n - BIXONA ALERTA VERMELHO CUIDADO COM SEUS ORGÃOS SEXUAIS'],
            apenas_um: "[❗] Erro! Apenas um membro por vez deve ser mencionado.",
            resposta: "🧩 *VIADÔMETRO* - {p1}"
        },
        gadometro:{
            respostas : [' 0%\n\n - ESSE NÃO É GADO ',
            '🐃 20% \n\n - GADO APRENDIZ, TÁ NO CAMINHO ',
            '🐃🐃 40%\n\n - GADO INTERMEDIÁRIO, JÁ INVADE PV DE UMAS E PENSA EM PAGAR PACK DE PEZINHO',
            '🐃🐃🐃 60%\n\n - CUIDADO! GADO EXPERIENTE, INVADE PV E FALA LINDA EM TODAS FOTOS',
            '🐃🐃🐃🐃 80%\n\n - ALERTA! GADO MASTER, SÓ APARECE COM MULHER ON',
            '🐃🐃🐃🐃🐃 100%\n\n - PERIGO! GADO MEGA BLASTER ULTRA PAGA BOLETO DE MULHER QUE TEM NAMORADO'],
            apenas_um: "[❗] Erro! Apenas um membro por vez deve ser mencionado.",
            resposta: "🧩 *GADÔMETRO* - {p1}"
        },
        bafometro:{
            respostas : [' 0%\n\n - ESTÁ SÓBRIO ',
            '🍺  20% \n\n - TOMOU UM GORÓZINHO ',
            '🍺🍺  40%\n\n - JÁ TÁ FICANDO MEIO CHAPADO E FALANDO BOSTA',
            '🍺🍺🍺  60%\n\n - TÁ MAMADO E COMEÇANDO A FAZER MERDA',
            '🍺🍺🍺🍺  80%\n\n - TÁ LOUCÃO NEM CONSEGUE DIFERENCIAR MULHER E HOMEM',
            '🍺🍺🍺🍺🍺  100%\n\n - ALERTA! ESTÁ FORA DE SI , BEIJANDO MENDIGO E CACHORRO DE RUA'],
            apenas_um: "[❗] Erro! Apenas um membro por vez deve ser mencionado.",
            resposta: "🧩 *BAFÔMETRO* - {p1}"
        },
        chance:{
            resposta: "🧩 *CHANCE* - Você tem *{p1}%* de chance {p2}"
        },
        detector: {
            espera: "⏳ Calibrando a máquina da verdade"
        },
        caracoroa:{
            espera: "🤜🪙 Lançando a moeda..",
            resposta: "🪙 O resultado é *{p1}*"
        },
        ppt:{
            opcao_erro: "[❗] Você deve escolher entre *pedra*, *papel*  ou *tesoura*",
            resposta : {
                vitoria: "🧩 Você venceu! Você escolheu {p1} e o bot escolheu {p2}",
                derrota: "🧩 Você perdeu! Você escolheu {p1} e o bot escolheu {p2}",
                empate: "🧩 Um empate! Você escolheu {p1} e o bot escolheu {p2}"
            }
        },
        roletarussa:{
            sem_membros: "[❗] Não existe membros válidos para participarem da roleta.",
            espera: "🎲 Sorteando uma vítima 🎲",
            motivo: "Selecionado pela roleta",
            resposta: "🔫 O @{p1} morreu, próximo!"
        },
        mamar:{
            sem_membros: "[❗] Não existe membros válidos para participarem da roleta.",
            espera: "🤤 Sorteando quem vai mamar",
            motivo: "Selecionado pelo mamar",
            resposta: "O @{p1} foi o escolhido para mamar o grupo todo, pode começar! 🤤😋"
        },
        benga:{
            sem_membros: "[❗] Não existe membros válidos para participarem do sorteio.",
            espera: "🚗 Vamos ver quem é o cara que mais toma benga no grupo...",
            motivo: "Selecionado pela roleta",
            resposta: "O @{p1}, é o cara do grupo que mais toma benga da galera! 🚗"
        },
        viado:{
            sem_membros: "[❗] Não existe membros válidos para participarem do sorteio.",
            espera: "🤔 Vamos ver quem é o mais baitola do grupo...",
            motivo: "Selecionado pela roleta",
            resposta: "Tiramos a conclusão que o @{p1}, é o mais viadão do grupo! 🏳️‍🌈"
        },
        sortear:{
            sem_membros: "[❗] Não existe membros válidos para participarem do sorteio.",
            espera: "⌛ Sorteando um membro do grupo...",
            motivo: "Selecionado pelo sorteio",
            resposta: "O membro sorteado foi @{p1} 🎉"
        },
        casal:{
            minimo: "[❗] Este comando precisa de no mínimo 2 membros no grupo.",
            resposta: "👩‍❤️‍👨 Está rolando um clima entre @{p1} e @{p2}"
        },
        top5:{
            erro_membros: "[❗] O grupo deve ter no mínimo 5 membros para usar este comando.",
            resposta_titulo: "╔══✪〘🏆 TOP 5 {p1} 🏆 〙\n╠\n",
            resposta_itens: "╠➥ {p1} {p2}° Lugar @{p3}\n"
        },
        fch:{
            resposta: "🧩〘*FRASES CONTRA A HUMANIDADE*〙\n\n - {p1}",
            erro_servidor: "[❗] Houve um erro para obter as frases do servidor."
        },
        par:{
            respostas: [' *0%*\n - NÃO COMBINAM ',
            '❤️ *20%* \n - HMMM TALVEZ ',
            '❤️❤️ *40%*\n - PODE ROLAR ALGO SÉRIO', 
            '❤️❤️❤️ *60%*\n - UIA ESSES DOIS TEM FUTURO',
            '❤️❤️❤️❤️ *80%*\n - ESSES DOIS TEM QUÍMICA, TALVEZ UM CASAMENTO EM BREVE', 
            '❤️❤️❤️❤️❤️ *100%*\n - CASAL PERFEITO! PREPAREM-SE PARA VIVER ATÉ A VELHICE JUNTOS',
            ],
            resposta: "👩‍❤️‍👨 PAR - @{p1} & @{p2}\n\n{p3}"
        }
    },
    admin: {
        entrar_grupo:{
            chave_invalida: "[❗] Sua chave é inválida, peça ao dono do BOT uma chave válida!",
            link_invalido: "[❗] Isso não é um link válido! 👊🤬",
            maximo_grupos: "[❗] O bot já está com o número máximo de grupos!",
            entrar_sucesso: "🤖✅ Entendido, entrarei em breve no grupo."
        },
        infocompleta:{
            resposta_superior:"*Criador do Bot* : {p1}\n"+
            "*Nome do bot* : {p2}\n"+
            "*Online desde* : {p3}\n"+
            "*Versão* : {p4}\n"+
            "-------------------\n",
            resposta_variavel:{
                limite_diario: {
                    on: "*Limite diário* : ✅\n"+
                    "- Reseta em : *{p1}*\n"+
                    "-------------------\n",
                    off: "*Limite diário* : ❌\n"+
                    "-------------------\n"
                },
                pvliberado: {
                    on: "*PV Liberado* : ✅\n"+
                    "-------------------\n",
                    off: "*PV Liberado* : ❌\n"+
                    "-------------------\n",
                },
                taxa_comandos:{
                    on: "*Taxa comandos/minuto* : ✅\n "+
                    "- *{p1}* Cmds/minuto por usuário\n"+
                    "- Bloqueio : *{p2}* s\n"+
                    "-------------------\n",
                    off: "*Taxa comandos/minuto* : ❌\n"+
                    "-------------------\n"
                },
                limitarmsgs:{
                    on: "*Taxa mensagens privadas* : ✅\n"+
                    "- *{p1}* Msgs a cada *{p2}* s por usuário\n"+
                    "-------------------\n",
                    off: "*Taxa mensagens privadas* : ❌\n"+
                    "-------------------\n",
                },
                bloqueiocmds:{
                    on: "*Bloqueio de comandos* : ✅ *{p1}*\n"+
                    "-------------------\n",
                    off: "*Bloqueio de comandos* : ❌\n"+
                    "-------------------\n"
                }
            },
            resposta_inferior:"*Pessoas bloqueadas* : *{p1}* pessoas\n"+
            "*Comandos executados* : *{p2}*\n"+
            "*Contato do criador* : wa.me/{p3}\n"
        },
        bloquear:{
            erro_dono: "[❗] O Usuário @{p1} é dono do BOT, não foi possivel bloquear.",
            ja_bloqueado: "[❗] O Usuário @{p1} já está *bloqueado*.",
            erro: "[❗] Não foi possível bloquear o usuário (+{p1}), verifique se o número está correto e se o bot já teve contato com este usuário.",
            sucesso: "✅ O Usuário @{p1} foi *bloqueado* com sucesso"
        },
        desbloquear:{
            ja_desbloqueado: "[❗] O Usuário @{p1} já está *desbloqueado*.",
            sucesso: "✅ O Usuário @{p1} foi *desbloqueado* com sucesso"
        },
        desligar:{
            sucesso: "🤖✅ Entendido, o BOT será desligado"
        },
        bctodos:{
            anuncio: `[🤖 ${process.env.NOME_BOT} ® - Mensagem para todos]\n\n`+
            "{p1}",
            espera: "⏳ Em andamento , estou enviando sua mensagem para {p1} contatos/grupos.\n\n"+
            "Tempo estimado : *{p2}* segundos",
            bc_sucesso: "🤖✅ Anúncio feito com sucesso."
        },
        usuarios: {
            nao_encontrado: "[❗] Não existem usuários com esse tipo ou você digitou um tipo inválido, confira os tipos disponíveis em *!tipos*",
            resposta_titulo: "🤖 USUÁRIOS - {p1} ({p2})\n\n"+"{p3}",
            resposta_item: "-> {p1}  @{p2} - {p3} cmds\n"
        },
        limpartipo:{
            erro: "[❗] O tipo de usuário que você inseriu é inválido, verifique os tipos disponíveis em *!tipos*",
            sucesso: "✅Todos os usuários do tipo *{p1}* foram convertidos para *BRONZE*"
        },
        mudarlimite: {
            invalido: "[❗] O número para definir o limite de comandos é inválido",
            tipo_invalido: "[❗] O tipo de usuário que você inseriu é inválido, verifique os tipos disponíveis em *!tipos*",
            erro_limite_diario: "[❗] Este comando só pode ser usado com o *!limitediario* ativado.",
            sucesso: "✅ O limite diário dos usuários do tipo *{p1}* foi definido para *{p2}* comandos/dia "
        },
        alterartipo: {
            tipo_dono: "[❗] Não é possivel alterar cargo do dono",
            tipo_invalido: "[❗] O tipo de usuário que você inseriu é inválido, verifique os tipos disponíveis em *!tipos*",
            nao_registrado: "[❗] Este usuário ainda não está registrado",
            sucesso: "✅ O tipo desse usuário foi definido para {p1}"
        },
        bcmdglobal:{
            resposta_titulo: "[🤖 *Bloquear comandos - Global* 🤖]\n\n",
            resposta_variavel: {
                ja_bloqueado: "- Comando *{p1}* já está bloqueado.\n",
                bloqueado_sucesso: "- Comando *{p1}* bloqueado com sucesso.\n",
                erro: "- Comando *{p1}* não pode ser bloqueado.\n",
                nao_existe: "- Comando *{p1}* não existe.\n"
            },
            resposta_cmd_bloqueado : "[❗] O comando *{p1}* está indisponível no momento, tente novamente mais tarde."
        },
        dcmdglobal:{
            resposta_titulo: "[🤖 *Desbloquear Comandos - Global* 🤖]\n\n",
            resposta_variavel: {
                desbloqueado_sucesso: "- Comando *{p1}* foi desbloqueado.\n",
                ja_desbloqueado: "- Comando *{p1}* já esta desbloqueado ou nunca foi bloqueado.\n"
            }
        },
        limitecomandos:{
            qtd_invalida: "[❗] A quantidade máxima de mensagens por minuto está inválida",
            tempo_invalido: "[❗] O tempo de bloqueio de mensagens está inválido",
            ativado: "✅ O Limitador de comandos por minuto foi ativado com sucesso",
            desativado: "✅ O Limitador de comandos por minuto foi desativado com sucesso",
            resposta_usuario_limitado: "[❗] Você está impossibilitado de mandar comandos por *{p1}* segundos, pega leve cara."
        },
        limitarmsgs:{
            qtd_invalida: "[❗] A quantidade máxima de mensagens privadas está inválida",
            tempo_invalido: "[❗] O intervalo de mensagens está inválido",
            ativado: "✅ O Limitador de mensagens privadas foi ativado com sucesso",
            desativado: "✅ O Limitador de mensagens privadas foi desativado com sucesso",
            resposta_usuario_bloqueado: "[❗]  *Você foi bloqueado devido ao excesso de mensagens, fale com o dono se houve algum engano.*"
        },
        r: {
            sucesso: "✅ Os comandos diários desse usuário foram resetados",
            nao_registrado: "[❗] Este usuário ainda não está registrado",
            erro_limite_diario: "[❗] Este comando só pode ser usado com o *!limitediario* ativado."
        },
        rtodos:{
            sucesso: "✅ Os comandos diários de todos os usuários foram resetados",
            erro_limite_diario: "[❗] Este comando só pode ser usado com o *!limitediario* ativado."
        },
        verdados:{
            nao_registrado: "[❗] Este usuário ainda não está registrado",
            resposta_superior: "[🤖*VER DADOS DE USO*🤖]\n\n"+
            "Nome : *{p1}*\n"+
            "Tipo de usuário : *{p2}*\n"+
            "Numero Usuário : *{p3}*\n",
            resposta_variavel: {
                limite_diario: {
                    on:"Comandos usados hoje : *{p1}/{p2}*\n"+
                    "Limite diário : *{p3}*\n",
                    off: ""
                }
            },
            resposta_inferior: "Total de comandos usados : *{p1}* comandos\n"
        },
        tipos: {
            resposta: "🤖 TIPOS DE USUÁRIOS :\n\n"+
            "{p1}",
            item_tipo: "{p1} - *{p2}* cmds/dia\n"
        },
        rconfig:{
            reset_sucesso: "🤖✅ As configurações dos grupos foram resetadas com sucesso"
        },
        bcgrupos:{
            anuncio: `[🤖${process.env.NOME_BOT} ® - Mensagem para os grupos]\n\n`+
            "{p1}",
            espera: "⏳ Em andamento , estou enviando sua mensagem para {p1} grupos.\n\n"+
            "Tempo estimado : *{p2}* segundos",
            bc_sucesso: "🤖✅ Anúncio feito com sucesso."
        },
        bccontatos:{
            anuncio: `[🤖${process.env.NOME_BOT} ® - Mensagem para os contatos]\n\n`+
            "{p1}",
            espera: "⏳ Em andamento , estou enviando sua mensagem para {p1} contatos.\n\n"+
            "Tempo estimado : *{p2}* segundos",
            bc_sucesso: "🤖✅ Anúncio feito com sucesso."
        },
        grupos: {
            resposta_titulo: "🤖 GRUPOS ATUAIS ({p1})\n",
            resposta_itens: "----------------------------\n"+
            "*Nome* : {p1}\n"+
            "*Membros* : {p2}/257\n"+
            "*Bot é admin?* {p3}\n"+
            "*Link* : {p4}\n\n"
        },
        sair:{
            sair_sucesso: "🤖✅ FLW VLW.",
        },
        sairtodos:{
            resposta: "🤖✅ Saí de todos os grupos com sucesso, total de grupos : {p1}"
        },
        limpar:{
            limpar_sucesso : "🤖✅ Todos os chats foram limpos.",
        },
        estado:{
            sucesso: "🤖✅ Seu estado foi alterado com sucesso."
        },
        ping: {
            resposta: "🖥️ INFORMAÇÃO GERAL 🖥️\n\n"+
            "*OS*: {p1}\n"+
            "*CPU*: {p2}\n"+
            "*RAM*: {p3}GB/{p4}GB\n"+
            "*Resposta*: {p5}s\n"+
            "*Chats carregados*: {p6}\n"+
            "*Mensagens carregadas*: {p7}\n"+
            "*Contatos*: {p8}\n"+
            "*Grupos*: {p9}\n"+
            "*Online desde*: {p10}"
        }
    },
    permissao: {
        grupo: '[❗] Este comando só pode ser usado em grupos',
        bot_admin: '[❗] Permita que o BOT tenha permissões administrativas.',
        banir_admin : '[❗] O Bot não tem permissão para banir um administrador',
        apenas_admin : '[❗] Apenas administradores podem usar este comando.',
        apenas_dono_bot: '[❗] Apenas o dono do BOT pode usar este comando.',
        apenas_dono_grupo: '[❗] Apenas o dono do GRUPO pode usar este comando.',
    },
    tipos: {
        dono: "💻 Dono",
        bronze : "🥉 Bronze",
        prata: "🥈 Prata",
        ouro: "🥇 Ouro",
        vip: "🎖️ VIP"
    },
    api: {
        newsapi: "Houve um erro na API de Notícias, confira se o limite gratuito da chave excedeu ou se ela está configurada."
    }
}


module.exports = msgs_texto
