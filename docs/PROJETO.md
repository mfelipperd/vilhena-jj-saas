# Documentação do Projeto — SaaS para Academia de Jiu-Jítsu (Equipe Vilhena)

Versão viva (com diagrama): https://claude.ai/artifact/CMpoN4hJSJnawiF52necgK · 01/11/2026

## Visão geral

SaaS de gestão para academia de jiu-jítsu: cadastro de alunos, graduação automática por frequência, cobrança via PIX com liberação de catraca e painéis gerenciais. Cliente de referência: unidade da [Equipe Vilhena](https://www.equipevilhenajj.com.br/) (há unidade em [Curitiba](https://www.instagram.com/ctvilhenacwb/)). Depois: vender acesso para outras academias.

**Problema.** O dono controla mensalidade, graduação e captação de forma manual ou com ferramentas soltas. Segundo o áudio, a equipe já paga cerca de R$ 600 por uma automação de mensagens de cobrança (valor/periodicidade a confirmar).

**Público.** Dono/gestor (painel gerencial), professores (chamada e graduação), alunos e pais (portal, avatar, pagamento).

**Origem.** Áudio "Rua Paraíba" (5 min) com o dono da academia.

## Escopo e funcionalidades

| Módulo | Requisitos (do áudio) | Fase |
| --- | --- | --- |
| Cadastro de alunos | Nome completo, nascimento, mãe/responsável, contato, início no jiu-jítsu, faixa e grau atuais, tamanho do kimono e da faixa, dia de vencimento, foto | MVP |
| Presença | Por aula (catraca, QR ou chamada do professor); histórico por aluno | MVP |
| Graduação | % mínimo de aulas por grau (1º–4º) configurável; aluno verde quando apto; duas janelas/ano (entrou em jan → gradua nov/dez; entrou jun/jul → meio do ano seguinte); conduta e técnica decididas pelo professor | MVP |
| Cobrança | WhatsApp automático 3 dias antes do vencimento com PIX; baixa automática via webhook | MVP |
| Catraca | Libera/bloqueia por status de pagamento; facial ("Block Next" no áudio, provavelmente Control iD iDBlock Next) | MVP |
| Aniversários | Lista do dia/mês e mensagem automática | MVP |
| Remarketing | Ex-alunos e campanhas de retorno | Fase 2+ |
| Gerencial | Entradas × saídas (churn), evasão, faturamento/mês, meses de maior captação, % homens/mulheres/crianças/juvenis, perfil e rentabilidade, onde investir | Fase 2+ |
| Captação | Formulário/página de aula experimental | Fase 2+ |
| Engajamento | Avatar estilo anime a partir da foto; vitrine de benefícios para pais (disciplina, hierarquia, coordenação, defesa pessoal) | Fase 2+ |

Fora do MVP: loja, campeonatos, painel multi-unidade (o modelo de dados já prevê).

Avatar: não imitar personagens protegidos (Gojo, Escanor); usar estilo anime genérico com arquétipos próprios.

## Arquitetura

- Usuários (dono, professor, aluno/pais) → App web/PWA (fork, React 19 + TS, DaisyUI tema Vilhena, pt-BR)
- App → API Cloudflare Workers (alunos, presença, graduação, cobrança, mensagens, catraca, gerencial) → banco (D1 hoje; avaliar Postgres no SaaS; isolado por academia_id)
- API → integrações a construir: Mercado Pago (PIX + webhook), WhatsApp (Cloud API oficial ou Evolution API), catraca Control iD (rede local: agente/túnel), IA de avatar (fase 5)
- Cron diário dispara avisos de vencimento e aniversário. Webhook do Mercado Pago marca a mensalidade como paga e libera a catraca.

## Modelo de dados inicial (todas as tabelas com academia_id)

| Entidade | Campos principais | No fork |
| --- | --- | --- |
| academia | nome, CNPJ, cores, logo, credenciais Mercado Pago, instância WhatsApp, catraca (IP, token) | Novo (substitui branches) |
| usuario | nome, e-mail, papel (dono, professor, aluno, responsável) | users |
| aluno | nome, nascimento, sexo, categoria (kids/juvenil/adulto/master), responsável, telefone, início no jiu-jítsu, tamanhos de kimono e faixa, foto, avatar, status (ativo/inativo/ex-aluno), origem do lead | students + campos |
| plano | nome, valor, dia de vencimento, recorrência | Novo |
| mensalidade | aluno, competência, valor, vencimento, status, PIX copia-e-cola, id Mercado Pago, pago em | payments + PIX |
| turma / aula | turma, professor, horário, data | classes |
| presenca | aluno, aula, origem (catraca, QR, professor), horário | attendance |
| regra_graduacao | faixa, grau, % mínimo, janela (1º/2º semestre) | Novo |
| graduacao | aluno, faixa, grau, data, professor, observação de conduta | student_belt_history |
| mensagem | aluno, tipo (vencimento, aniversário, remarketing), status | Novo (estende notifications) |
| acesso_catraca | aluno, data/hora, liberado/negado, motivo | Novo |

Aptidão ao grau: presenças na janela ÷ aulas dadas na janela ≥ % da regra → verde.

## Roadmap

0. Fork e marca: tema, fontes, logo, pt-BR padrão, campos novos do aluno
1. Graduação: regras de % por grau, janelas semestrais, aluno verde, histórico
2. Cobrança: PIX Mercado Pago, webhook, aviso WhatsApp 3 dias antes, aniversários
3. Catraca: cadastro facial, liberação/bloqueio por status, log de acessos
4. Gerencial e captação: churn, faturamento, perfil, leads, remarketing
5. Engajamento e SaaS: avatar anime, onboarding self-service, planos do SaaS

## Perguntas em aberto para o dono

- [ ] Quanto e com que frequência paga hoje pela automação de mensagens (os "600")?
- [ ] Modelo exato da catraca (iDBlock Next com leitor facial?) — já comprada?
- [ ] Percentuais mínimos de aula para 1º, 2º, 3º e 4º grau?
- [ ] Só a unidade dele ou toda a rede Vilhena (15 unidades)?
- [ ] Mercado Pago, Asaas ou outro para PIX?
- [ ] Logo em vetor e autorização de uso da marca?
- [ ] Quantos alunos ativos e valor da mensalidade?

## Referências

- Fork base: https://github.com/electrocicla/martial-arts-manager (MIT)
- Referências de UI/analytics: openshiporg/openfront-gym, Cleitonpirola/academia-jiu-jitsu, spaceman023/dojo (sem licença — não copiar código)
- Control iD iDBlock Next: https://www.controlid.com.br/docs/access-api-en/particularities-of-the-products/idblock-next/
- Mercado Pago webhooks: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
