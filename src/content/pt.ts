import type { LocaleCopy } from './types';

export const pt: LocaleCopy = {
  role: 'Engenheiro de NLP / LLM',
  headline: 'Lead de treino de LLMs, pesquisa de interpretabilidade e NLP em produção.',
  summary:
    'Engenheiro de NLP/LLM com 4+ anos. Lead técnico do treino dos modelos próprios da CEMIG (CEIA/UFG) e NLP Team Lead no Digital Humans II (AKCIT/EMBRAPII). Contribuidor aceito em repositórios oficiais da NVIDIA (NeMo, Megatron, Nemotron). Papers em ICLR, ICML e ACL. Em produção: RAG híbrido, Graph RAG e MLOps no TCE-GO e no TCM-GO — economia reportada de R$ 1,8 mi.',
  ctaCv: 'Baixar currículo',
  ctaWork: 'Ver o trabalho',
  ctaContact: 'Contato',
  navExperience: 'Experiência',
  navCases: 'Cases',
  navPapers: 'Papers',
  navSkills: 'Skills',
  navContact: 'Contato',
  casesLabel: 'Trabalho selecionado',
  caseContextLabel: 'Contexto',
  caseDecisionLabel: 'Decisão técnica',
  caseLeadershipLabel: 'O que eu liderei',
  caseOutcomeLabel: 'Resultado',
  caseStackLabel: 'Stack',
  skillsLabel: 'Hard skills',
  pubsAcceptedLabel: 'Publicações · aceitas',
  pubsReviewLabel: 'Em revisão',
  builderLabel: 'Produtos',
  experienceLabel: 'Experiência',
  educationLabel: 'Formação',
  contactLabel: 'Contato',
  langLabel: 'Idioma',
  stats: [
    { value: '4+', label: 'anos de NLP' },
    { value: '3', label: 'papers aceitos' },
    { value: 'B200', label: 'Blackwell · H100 · A100' },
    { value: 'R$ 1,8 mi', label: 'economia reportada · TCM-GO' },
  ],
  skills: [
    {
      cluster: 'Pós-treino de LLM',
      items: [
        'SFT',
        'LoRA / full FT',
        'DPO / GRPO',
        'Dados sintéticos',
        'Eval pública + própria',
        'Qwen-3 / 3.5',
        'Gemma-4',
        'LLaMA 3.1 / 3.2',
        'Tucano',
        'Axolotl / Unsloth',
      ],
    },
    {
      cluster: 'Pesquisa / interpretabilidade',
      items: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        'Alinhamento de persona',
        'Memória episódica',
        'Aceleração de inferência',
      ],
    },
    {
      cluster: 'Retrieval / produção',
      items: [
        'E5 / BGE-M3 / Qwen Embedding',
        'Triplet / contrastive loss',
        'Graph RAG',
        'Orquestração de agentes',
        'BM25 + metadados',
        'Medallion',
        'MLOps',
      ],
    },
    {
      cluster: 'NVIDIA / compute',
      items: ['Blackwell B200', 'DGX H100', 'A100', 'NeMo', 'Megatron', 'Nemotron'],
    },
  ],
  cases: [
    {
      id: 'cemig',
      index: '01',
      org: 'CEMIG — CEIA / UFG',
      title: 'LLMs próprios para o setor elétrico',
      role: 'Líder técnico · treino de modelos',
      subtitle: 'SFT, LoRA, DPO e GRPO em Blackwell — português brasileiro e normas ANEEL.',
      context:
        'A CEMIG precisava de modelos próprios, não de um chatbot genérico. O mandato era adaptar LLMs ao português brasileiro e aos casos de uso do setor elétrico: linguagem técnica, normas reguladoras (ANEEL) e consistência factual em domínio fechado. Treino e desenvolvimento rodavam em NVIDIA Blackwell — B200, DGX H100 e A100.',
      decision:
        'Eu definia a receita: como gerar dados sintéticos (incluindo destilação de modelos maiores para long-context e edge cases), como usar dados internos, e se a avaliação seria benchmark público (MT-Bench, Arena-Hard) ou critério nosso — exatidão factual em normas ANEEL, redução de alucinação, aderência a formato estruturado. Executei SFT, LoRA, full fine-tuning, DPO e GRPO em Qwen-3, Qwen-3.5, Gemma-4, LLaMA 3.1, LLaMA 3.2 e Tucano. Para preferência, curadoria de comparações pareadas e filtragem de recompensa. Pipelines de dados com deduplicação semântica e filtragem heurística. Stack de treino: NeMo, Megatron, Axolotl e Unsloth.',
      leadership:
        'Lead técnico do treino — não só executei o job. Coordenava experimentos em H100/B200: hiperparâmetros, métricas de convergência e uso de compute. O trabalho cobria os modelos, o código de treino e as aplicações em cima.',
      outcome:
        'Modelos próprios da empresa em ciclo de pós-treino, com eval de domínio além de benchmark público. Commits e pull requests aceitos em repositórios oficiais da NVIDIA (NeMo / Megatron / Nemotron).',
      stack: [
        'Qwen-3 / 3.5',
        'Gemma-4',
        'LLaMA 3.1 / 3.2',
        'Tucano',
        'SFT / LoRA / DPO / GRPO',
        'NeMo',
        'Megatron',
        'Nemotron',
        'Blackwell B200',
        'DGX H100',
        'A100',
      ],
      metrics: [
        { value: 'Lead', label: 'treino dos modelos próprios' },
        { value: 'NVIDIA', label: 'PRs aceitos · NeMo / Megatron' },
        { value: 'ANEEL', label: 'eval de domínio + MT-Bench' },
      ],
    },
    {
      id: 'digital-humans',
      index: '02',
      org: 'Digital Humans II — AKCIT / EMBRAPII',
      title: 'Interpretabilidade e alinhamento de persona',
      role: 'NLP Team Lead · pesquisa',
      subtitle: 'SAEs, steering, memória episódica — papers em ICLR, ICML e ACL.',
      context:
        'Mandato de pesquisa de base, não de produto. O time de NLP precisava de liderança técnica com gente reportando: treino de modelos, interpretabilidade e publicações. O foco era alinhamento de persona (educação e fluxos de pesquisa), memória em agentes e adaptação eficiente — não engenharia de feature.',
      decision:
        'Minha faixa: Sparse Autoencoders, steering, alinhamento de persona, memória episódica em LLMs e Steering-Conditioned LoRA. Também aceleração de inferência e controle de memória. Definia objetivos de treino, curadoria e geração de datasets, e evals para comportamento consistente com a persona — além de SFT quando o alinhamento pedia receita mais forte.',
      leadership:
        'Líder técnico do time de NLP, com pessoas abaixo de mim. Fechei o ciclo pesquisa → treino → paper: a equipe publicou em interpretabilidade, memória e fine-tuning eficiente para aplicação real.',
      outcome:
        'Três papers aceitos: ICLR 2026 MemAgents (oral), ICML 2026 CoLoRAI (pôster) e ACL 2026 SemEval. Dois manuscritos em revisão em venues top-tier (ACL ARR, AACL-IJCNLP).',
      stack: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        'Persona alignment',
        'Episodic memory',
        'Inference acceleration',
      ],
      metrics: [
        { value: '3', label: 'papers aceitos' },
        { value: 'Oral', label: 'ICLR MemAgents' },
        { value: '2', label: 'manuscritos em revisão' },
      ],
    },
    {
      id: 'courts',
      index: '03',
      org: 'TCE-GO e TCM-GO',
      title: 'NLP jurídico em produção',
      role: 'NLP Engineer',
      subtitle: 'Medallion, SFT de encoder, Graph RAG e RAG híbrido sobre bases de tribunais de contas.',
      context:
        'Bases extensas e ruidosas de tribunais de contas. A busca só semântica falhava em documento jurídico complementar — número de processo, metadado e citação lexical precisavam cair na mesma resposta que o sentido. O produto tinha de viver na infra institucional, não em notebook.',
      decision:
        'No TCE-GO: retriever híbrido (lexical + denso) para documentos que exigiam contexto cruzado; regex para metadados na query quando a busca semântica era imprecisa; SFT de encoders (E5, BGE-M3, Qwen Embedding) com triplet / contrastive loss e dados sintéticos; Graph RAG e agentes misturando BM25, metadados e recuperação densa. No TCM-GO: Medallion, MLOps na infra do tribunal, RAG jurídico e fine-tuning de seções de documento.',
      leadership:
        'Donos do ciclo até o deploy: chat, sumarização e QA em produção, seleção de modelos por eval — não só prototipação. No TCM, o chat/NLP foi medido em economia operacional.',
      outcome:
        'TCM-GO: aplicação de chat/NLP com economia reportada de R$ 1,8 mi. TCE-GO: RAG híbrido, metadados via regex, chat, sumarização e QA no ambiente operacional.',
      stack: [
        'E5',
        'BGE-M3',
        'Qwen Embedding',
        'Graph RAG',
        'BM25',
        'Medallion',
        'MLOps',
        'Triplet / contrastive',
      ],
      metrics: [
        { value: 'R$ 1,8 mi', label: 'economia reportada · TCM-GO' },
        { value: 'Híbrido', label: 'lexical + denso · TCE-GO' },
        { value: 'Produção', label: 'chat · sumarização · QA' },
      ],
    },
    {
      id: 'tron',
      index: '04',
      org: 'TRON — CEIA',
      title: 'Copilot em Delphi legado',
      role: 'Tech Lead & NLP Engineer',
      subtitle: 'Graph RAG multiagente, ações no app legado e SFT do BGE-M3.',
      context:
        'A TRON precisava de um copilot de atendimento que não ficasse numa aba à parte. O sistema crítico era Delphi legado: o agente tinha de executar ações dentro da aplicação, e os atendentes precisavam de uma extensão web para tirar dúvida interna sem quebrar o fluxo.',
      decision:
        'Graph RAG com nós especializados — query rewrite e rerank — para precisão e contexto. Copilot agêntico no Delphi para ações diretas a partir do comando do usuário. Extensão web para o atendente conversar com a pipeline. SFT do BGE-M3 com triplet loss e hard-negative mining para subir a recuperação semântica.',
      leadership:
        'Tech lead do projeto CEIA×TRON: arquitetura, treino do encoder e integração no legado. Coordenei o desenvolvimento do ambiente conversacional ponta a ponta.',
      outcome:
        'Copilot em produção no fluxo de atendimento: recuperação melhor com BGE-M3 afinado, ações no Delphi e ferramenta web para o time humano.',
      stack: ['Graph RAG', 'Query rewrite', 'Rerank', 'Delphi', 'BGE-M3', 'Triplet loss', 'Hard-negative mining'],
      metrics: [
        { value: 'Lead', label: 'copilot CEIA × TRON' },
        { value: 'BGE-M3', label: 'SFT + hard negatives' },
        { value: 'Legado', label: 'ações no Delphi' },
      ],
    },
  ],
  experience: [
    {
      title: 'NLP Team Lead · pesquisa',
      org: 'Digital Humans II — AKCIT / EMBRAPII',
      summary: 'Time de NLP com reports. Interpretabilidade, persona, memória episódica — papers em ICLR, ICML e ACL.',
      href: '#case-digital-humans',
    },
    {
      title: 'Líder técnico · treino de modelos',
      org: 'CEMIG — CEIA / UFG',
      summary: 'Lead do pós-treino dos LLMs próprios: SFT, LoRA, DPO, GRPO em Blackwell. PRs na NVIDIA.',
      href: '#case-cemig',
    },
    {
      title: 'Tech Lead & NLP Engineer',
      org: 'TRON — CEIA',
      summary: 'Copilot Graph RAG no Delphi legado, extensão web para atendentes, SFT do BGE-M3.',
      href: '#case-tron',
    },
    {
      title: 'NLP Engineer',
      org: 'TCE-GO — Tribunal de Contas do Estado de Goiás',
      summary: 'RAG híbrido jurídico, SFT de encoders, Graph RAG e QA em produção.',
      href: '#case-courts',
    },
    {
      title: 'NLP Engineer',
      org: 'TCM-GO — Tribunal de Contas dos Municípios de Goiás',
      summary: 'Chat/NLP com economia reportada de R$ 1,8 mi. Medallion, MLOps, RAG jurídico.',
      href: '#case-courts',
    },
    {
      title: 'CEO & Co-Founder',
      org: 'Pergunt.ai',
      period: '2023',
      summary: 'Edtech GenAI: questões inéditas de concurso e recomendação no desempenho do aluno.',
      href: '#ventures',
    },
  ],
  education: [
    {
      title: 'Bacharelado em Inteligência Artificial',
      org: 'Universidade Federal de Goiás (UFG)',
      period: '2023 — 2027',
      note: 'Primeiro curso de IA da América Latina. Cursando.',
    },
  ],
  publicationsAccepted: [
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'ICLR 2026 · MemAgents Workshop (Oral)',
      note: 'Memória episódica, limites de compressão e representação latente em agentes de LLM.',
    },
    {
      title: 'Steering-Conditioned LoRA via Sparse Autoencoders',
      venue: 'ICML 2026 · CoLoRAI Workshop (Pôster)',
      note: 'Pós-treino eficiente (LoRA) composto com sparse autoencoders para steering condicionado.',
    },
    {
      title:
        'AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval',
      venue: 'ACL 2026 · SemEval Workshop',
      note: 'Chunking estruturado e reformulação de query para recuperação multi-turno.',
    },
  ],
  publicationsReview: [
    {
      title: 'ECHO: A Latent Register Axis Composes with Prompting for Persona-Conditioned Generation',
      venue: 'ACL ARR 2026 August · em revisão',
      note: 'Eixo latente de registro composto com prompting para geração condicionada à persona.',
    },
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'AACL-IJCNLP 2026 · em revisão',
      note: 'Versão de conferência do trabalho de memória episódica apresentado no ICLR MemAgents.',
    },
  ],
  ventures: [
    {
      name: 'Pergunt.ai',
      blurb: 'Edtech GenAI para questões personalizadas de concursos e insights de aprendizado.',
    },
    {
      name: 'Validoo',
      blurb:
        'SaaS de conformidade para transporte rodoviário — fluxos regulatórios para transportadoras, despachantes e motoristas.',
    },
    {
      name: 'PUMP',
      blurb: 'Produto iOS de foto: looks Core ML on-device + IA generativa, construído ponta a ponta.',
    },
  ],
};
