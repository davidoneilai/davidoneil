import type { LocaleCopy } from './types';

export const pt: LocaleCopy = {
  train: {
    intro:
      'Você não está lendo um currículo: está treinando um modelo. Cada seção é um batch. Role a página e acompanhe a loss cair até a sua rede saber quem é David.',
    title: 'treinando',
    knowledge: 'de David aprendido',
    layer: 'camada',
    reconstruction: 'reconstrução',
    idle: 'aguardando dados · role a página',
    learning: 'aprendendo…',
    restored: 'checkpoint restaurado',
    converged: 'convergiu ✓ agora você conhece David',
    fit: 'acelerar treino',
    weights: 'baixar pesos (CV)',
    retrain: 'retreinar',
    minimize: 'minimizar painel de treino',
    infer: 'rodar inferência',
    clusters: ['Pós-treino', 'Interpretabilidade', 'Retrieval & produção', 'Compute & infra', 'Papers & open source', 'Trajetória'],
  },
  role: 'Engenheiro de NLP / LLM',
  headline: 'Treino de LLMs, pesquisa em interpretabilidade e sistemas de NLP em produção.',
  summary:
    'Trabalho com NLP e modelos de linguagem há mais de 4 anos. Lidero o pós-treino dos LLMs próprios da CEMIG pelo CEIA/UFG e o time de NLP do Digital Humans II (AKCIT/EMBRAPII). Tenho código aceito nos repositórios oficiais da NVIDIA (NeMo, Megatron e Nemotron) e artigos publicados no AACL, ICLR, ICML e ACL. Em produção, construí sistemas de busca jurídica, agentes e MLOps no TCE-GO e no TCM-GO, onde o projeto gerou R$ 1,8 milhão em economia reportada.',
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
  caseDecisionLabel: 'O que construí',
  caseLeadershipLabel: 'Meu papel',
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
  nextTokenLabel: 'próximo token',
  replayLabel: 'gerar de novo',
  tokens: [
    { t: '▁Memória', p: 0.41, alt: [['▁Atenção', 0.22], ['▁A', 0.14], ['▁Toda', 0.08]] },
    { t: '▁episódica', p: 0.63, alt: [['▁longa', 0.12], ['▁de', 0.09], ['▁esparsa', 0.05]] },
    { t: '▁nasce', p: 0.38, alt: [['▁surge', 0.27], ['▁emerge', 0.17], ['▁começa', 0.08]] },
    { t: '▁quando', p: 0.71, alt: [['▁onde', 0.14], ['▁se', 0.06], ['▁da', 0.04]] },
    { t: '▁a', p: 0.82, alt: [['▁o', 0.07], ['▁uma', 0.04], ['▁tudo', 0.02]] },
    { t: '▁compressão', p: 0.47, alt: [['▁reconstrução', 0.21], ['▁atenção', 0.11], ['▁previsão', 0.09]] },
    { t: '▁falha', p: 0.69, alt: [['▁erra', 0.12], ['▁quebra', 0.08], ['▁cede', 0.05]] },
    { t: '<eos>', p: 0.91, alt: [['.', 0.05], ['▁e', 0.02], ['▁no', 0.01]] },
  ],
  stats: [
    { value: '4+', label: 'anos de NLP' },
    { value: '4', label: 'papers aceitos' },
    { value: '3', label: 'repos oficiais NVIDIA · código aceito' },
    { value: 'R$ 1,8 mi', label: 'economia reportada · TCM-GO' },
  ],
  skills: [
    {
      cluster: 'Linguagens / infra',
      items: ['Python', 'Go', 'C / C++', 'Java', 'R', 'JavaScript / TypeScript', 'PyTorch', 'CUDA', 'Docker', 'GCP'],
    },
    {
      cluster: 'Pós-treino de LLM',
      items: [
        'SFT',
        'LoRA / full FT',
        'DPO / GRPO',
        'Dados sintéticos',
        'Eval pública + própria',
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
      org: 'CEMIG · CEIA / UFG',
      title: 'LLMs próprios para o setor elétrico',
      role: 'Líder técnico · treino de modelos',
      subtitle: 'SFT, LoRA, DPO e GRPO em GPUs Blackwell para português brasileiro e normas da ANEEL.',
      context:
        'A CEMIG precisava de modelos próprios treinados para o português brasileiro e para a rotina do setor elétrico, onde o modelo tem que seguir linguagem técnica e normas da ANEEL sem inventar regra. Os treinos rodavam em clusters NVIDIA com Blackwell B200, DGX H100 e A100.',
      decision:
        'Desenhei o pipeline de dados e de pós-treino: geração de dados sintéticos por destilação de modelos maiores para cobrir contexto longo e casos raros, deduplicação semântica, filtros heurísticos e combinação com documentos internos. Rodei ciclos de SFT, LoRA, full fine-tuning, DPO e GRPO em Qwen-3, Qwen-3.5, Gemma-4, LLaMA 3.1, LLaMA 3.2 e Tucano, usando NeMo, Megatron, Axolotl e Unsloth. Para alinhamento de preferência, montei pares comparativos e filtros de recompensa focados em reduzir alucinação e manter saída estruturada. Na avaliação, juntei MT-Bench e Arena-Hard com uma bateria própria sobre normas da ANEEL.',
      leadership:
        'Como líder técnico da frente de treino, definia quais experimentos iam para H100 e B200, acompanhava convergência e hiperparâmetros e conectava o time de modelos ao de aplicação.',
      outcome:
        'Modelos próprios da CEMIG em ciclo contínuo de treino e avaliação de domínio. Ao longo do projeto, correções e melhorias que fizemos no NeMo, Megatron e Nemotron foram aceitas nos repositórios oficiais da NVIDIA.',
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
      org: 'Digital Humans II · AKCIT / EMBRAPII',
      title: 'Interpretabilidade e alinhamento de persona',
      role: 'NLP Team Lead · pesquisa',
      subtitle: 'Sparse Autoencoders, steering e memória episódica, com papers no AACL, ICLR, ICML e ACL.',
      context:
        'Frente de pesquisa do AKCIT dedicada a entender e controlar o comportamento interno de LLMs: manter uma persona estável ao longo da conversa, dar memória episódica a agentes e adaptar modelos sem retreinar tudo.',
      decision:
        'Trabalhamos com Sparse Autoencoders e vetores de steering no espaço latente, combinando controle de representação com LoRA (Steering-Conditioned LoRA) e com prompting (ECHO). Na frente de memória, usamos fronteiras de compressão na representação latente para segmentar episódios em agentes de longo contexto. Também cuidei da geração de datasets, dos objetivos de treino e das avaliações de consistência de persona.',
      leadership:
        'Lidero o time de NLP do projeto, orientando pesquisadores do desenho do experimento e treino até a escrita do artigo.',
      outcome:
        'Quatro artigos aceitos em 2026: trilha principal do AACL-IJCNLP, apresentação oral no workshop MemAgents do ICLR, pôster no CoLoRAI do ICML e paper no SemEval da ACL. Um quinto artigo, ECHO, está em revisão no ACL ARR para o EACL.',
      stack: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        'Persona alignment',
        'Episodic memory',
        'Inference acceleration',
      ],
      metrics: [
        { value: '4', label: 'papers aceitos' },
        { value: 'Main', label: 'AACL-IJCNLP' },
        { value: '1', label: 'em revisão · EACL' },
      ],
    },
    {
      id: 'courts',
      index: '03',
      org: 'TCE-GO e TCM-GO',
      title: 'NLP jurídico em produção',
      role: 'NLP Engineer',
      subtitle: 'Arquitetura Medallion, fine-tuning de encoders, Graph RAG e busca híbrida nos tribunais de contas.',
      context:
        'Os acórdãos e processos dos tribunais de contas misturam texto longo, número de processo, relator e citações cruzadas. Busca puramente semântica errava quando o usuário pedia um número exato ou precisava juntar dois documentos complementares, e tudo precisava rodar na infraestrutura própria de cada tribunal.',
      decision:
        'No TCE-GO, combinei busca lexical (BM25) e densa num retriever híbrido, com regras em regex para extrair metadados da pergunta e filtrar o banco antes do rerank. Afinei encoders (E5, BGE-M3 e Qwen Embedding) com perda contrastiva e triplet loss em pares jurídicos, e montei um Graph RAG com agentes para consultas que dependiam de vários documentos. No TCM-GO, estruturei os dados em arquitetura Medallion, cuidei do MLOps local e treinei modelos para redigir e analisar seções específicas de peças jurídicas.',
      leadership:
        'Toquei os projetos do treino e avaliação de modelos até o deploy e manutenção dos serviços de chat, sumarização e perguntas e respostas.',
      outcome:
        'No TCM-GO, o sistema de chat e análise documental entrou em produção com economia operacional reportada de R$ 1,8 milhão. No TCE-GO, a busca híbrida e os assistentes de sumarização e QA passaram a atender o corpo técnico no dia a dia.',
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
      org: 'TRON · CEIA',
      title: 'Copilot em Delphi legado',
      role: 'Tech Lead & NLP Engineer',
      subtitle: 'Graph RAG multiagente, execução de ações no sistema legado e fine-tuning do BGE-M3.',
      context:
        'O sistema principal da TRON era um ERP legado em Delphi, e o time de suporte perdia tempo alternando entre telas e manuais. O copilot precisava agir dentro do próprio Delphi e também ficar disponível numa extensão web para os atendentes tirarem dúvidas rápidas.',
      decision:
        'Estruturei um Graph RAG com agentes dedicados a reescrever a pergunta e reordenar os trechos recuperados. Fiz o fine-tuning do BGE-M3 com triplet loss e mineração de hard negatives no vocabulário do sistema, o que subiu bem a precisão da busca. Na ponta final, integrei o agente ao Delphi para disparar ações direto do comando do usuário e entreguei a extensão web para o time de atendimento.',
      leadership:
        'Como tech lead da parceria CEIA e TRON, coordenei a arquitetura do grafo, o treino do retriever e a integração com o software legado.',
      outcome:
        'Copilot em uso pela operação de suporte, executando ações no Delphi e respondendo dúvidas internas pela extensão com o BGE-M3 afinado.',
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
      org: 'Digital Humans II · AKCIT / EMBRAPII',
      summary: 'Lidero o time de NLP em pesquisa de interpretabilidade, alinhamento de persona e memória episódica, com papers aceitos no AACL, ICLR, ICML e ACL.',
      href: '#case-digital-humans',
    },
    {
      title: 'Líder técnico · treino de modelos',
      org: 'CEMIG · CEIA / UFG',
      summary: 'Responsável pelo pós-treino dos LLMs próprios da CEMIG (SFT, LoRA, DPO e GRPO em GPUs Blackwell) e autor de PRs aceitos na NVIDIA.',
      href: '#case-cemig',
    },
    {
      title: 'Tech Lead & NLP Engineer',
      org: 'TRON · CEIA',
      summary: 'Liderança técnica do copilot com Graph RAG integrado ao Delphi legado, extensão web para o suporte e fine-tuning do BGE-M3.',
      href: '#case-tron',
    },
    {
      title: 'NLP Engineer',
      org: 'TCE-GO · Tribunal de Contas do Estado de Goiás',
      summary: 'Busca híbrida sobre documentos jurídicos, fine-tuning de encoders, Graph RAG e sistemas de QA em produção.',
      href: '#case-courts',
    },
    {
      title: 'NLP Engineer',
      org: 'TCM-GO · Tribunal de Contas dos Municípios de Goiás',
      summary: 'Sistema de chat e RAG jurídico em produção, com arquitetura Medallion, MLOps e R$ 1,8 mi em economia reportada.',
      href: '#case-courts',
    },
    {
      title: 'Professor auxiliar · NLP',
      org: 'UFG · Prof. Arlindo Galvão',
      period: '2026/2',
      summary: 'Professor auxiliar na disciplina de Processamento de Linguagem Natural, com o professor Arlindo Galvão.',
    },
    {
      title: 'CEO & Co-Founder',
      org: 'Pergunt.ai',
      period: '2023',
      summary: 'Edtech que usava IA generativa para criar questões inéditas de concursos e recomendar estudo pelo desempenho do aluno.',
      href: '#ventures',
    },
  ],
  education: [
    {
      title: 'Bacharelado em Inteligência Artificial',
      org: 'Universidade Federal de Goiás (UFG)',
      period: '2023 a 2027',
      note: 'Primeira graduação em Inteligência Artificial da América Latina. Em andamento.',
    },
  ],
  publicationsAccepted: [
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'AACL-IJCNLP 2026 Main',
      note: 'Artigo completo na trilha principal da conferência sobre como fronteiras de compressão no espaço latente formam memória episódica.',
      url: 'https://openreview.net/forum?id=31kwKm65KV',
    },
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'ICLR 2026 · MemAgents Workshop (Oral)',
      note: 'Versão de workshop selecionada para apresentação oral sobre memória episódica em agentes baseados em LLMs.',
      url: 'https://openreview.net/forum?id=En9aRT4uz8',
    },
    {
      title: 'Steering-Conditioned LoRA via Sparse Autoencoders',
      venue: 'ICML 2026 · CoLoRAI Workshop (Pôster)',
      note: 'Combina adaptadores LoRA com features extraídas por Sparse Autoencoders para guiar o comportamento do modelo durante o pós-treino.',
      url: 'https://openreview.net/forum?id=8ovluzEutL',
    },
    {
      title:
        'AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval',
      venue: 'ACL 2026 · SemEval Workshop',
      note: 'Segmentação estruturada de documentos e reformulação de perguntas para melhorar a busca em diálogos de vários turnos.',
    },
  ],
  publicationsReview: [
    {
      title: 'ECHO: A Latent Register Axis Composes with Prompting for Persona-Conditioned Generation',
      venue: 'ACL ARR 2026 August · EACL · em revisão',
      note: 'Mostra como um eixo latente de registro se soma ao prompt para manter a persona estável na geração de texto.',
      url: 'https://openreview.net/forum?id=Bv3PbQSjxU',
    },
  ],
  openSourceLabel: 'Open source · modelos e código',
  openSource: [
    {
      name: 'bge-m3-ft-corpus-pt',
      blurb: 'BGE-M3 ajustado para busca semântica em português, com versão exportada em ONNX para inferência rápida. É o modelo mais baixado do meu Hugging Face.',
      href: 'https://huggingface.co/davidoneil/bge-m3-ft-corpus-pt',
    },
    {
      name: 'decisoes-processos-tce-ft-gemma',
      blurb: 'Modelo de embeddings baseado em Gemma e treinado sobre decisões e processos do TCE-GO para recuperação jurídica.',
      href: 'https://huggingface.co/davidoneil/decisoes-processos-tce-ft-gemma',
    },
    {
      name: 'bge-full-tron',
      blurb: 'BGE-M3 treinado com triplet loss e hard negatives para o vocabulário interno da TRON, usado como retriever do copilot de suporte.',
      href: 'https://huggingface.co/davidoneil/bge-full-tron',
    },
    {
      name: 'sae-llama32-3b',
      blurb: 'Pesos públicos de Sparse Autoencoders treinados no LLaMA 3.2 3B, acompanhados dos SAEs por camada usados nos experimentos de persona e steering.',
      href: 'https://huggingface.co/davidoneil/sae-llama32-3b',
    },
    {
      name: 'dense-SAE-latent',
      blurb: 'Código em PyTorch para treinar e inspecionar Sparse Autoencoders sobre ativações internas de LLMs.',
      href: 'https://github.com/davidoneilai/dense-SAE-latent',
    },
    {
      name: 'residencia-tcc',
      blurb: 'Inferência adaptativa de modelos pequenos no iPhone (MobileLLMBench) e avaliação de chamada de ferramentas no benchmark BFCL v4.',
      href: 'https://github.com/davidoneilai/residencia-tcc',
    },
  ],
  ventures: [
    {
      name: 'Pergunt.ai',
      blurb: 'Plataforma de estudo que gerava questões inéditas de concurso com IA e ajustava a trilha conforme os erros de cada aluno.',
    },
    {
      name: 'Validoo',
      blurb:
        'SaaS de conformidade regulatória no transporte rodoviário, feito para organizar documentos e exigências entre transportadoras, despachantes e motoristas.',
    },
    {
      name: 'PUMP',
      blurb: 'Aplicativo iOS de fotografia que combina modelos Core ML rodando no próprio aparelho com recursos de IA generativa.',
    },
  ],
};
