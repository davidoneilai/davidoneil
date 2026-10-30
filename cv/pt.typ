#import "template.typ": cv

#cv(
  name: "David O'Neil",
  role: "Engenheiro de IA · LLM / NLP  ·  Líder Técnico",
  contacts: (
    "Goiânia, GO",
    link("mailto:davidoneil33@gmail.com")[davidoneil33\@gmail.com],
    "+55 62 98135-8075",
  ),
  links: (
    link("https://linkedin.com/in/davidoneilai")[linkedin.com/in/davidoneilai],
    link("https://github.com/davidoneilai")[github.com/davidoneilai],
    link("https://huggingface.co/davidoneil")[huggingface.co/davidoneil],
    link("https://davidoneilai.github.io/davidoneil/pt/")[davidoneilai.github.io/davidoneil],
  ),
  summary: [
    Engenheiro de NLP e LLMs com mais de 4 anos construindo e treinando modelos de linguagem. Lidero o pós-treino dos modelos próprios da CEMIG em GPUs NVIDIA B200 e H100 (SFT, LoRA, DPO e GRPO) e o time de pesquisa em NLP do Digital Humans II. Tenho código aceito nos repositórios oficiais da NVIDIA (NeMo, Megatron e Nemotron) e artigos publicados no AACL, ICLR, ICML e ACL. Em produção, implantei sistemas de busca híbrida, Graph RAG, agentes e MLOps no TCE-GO e no TCM-GO, com R\$ 1,8 milhão em economia reportada.
  ],
  experience: (
    (
      title: "Líder Técnico · Treino de Modelos",
      org: "CEMIG · CEIA / UFG",
      period: "",
      bullets: (
        [Responsável pelo pós-treino dos LLMs próprios da CEMIG para o português brasileiro e o setor elétrico, definindo geração de dados sintéticos por destilação, curadoria de bases internas e critérios de avaliação.],
        [Execução de SFT, LoRA, full fine-tuning, DPO e GRPO em Qwen-3/3.5, Gemma-4, LLaMA 3.1/3.2 e Tucano em clusters NVIDIA Blackwell B200, DGX H100 e A100 com NeMo, Megatron, Axolotl e Unsloth.],
        [Construção de pipelines de dados com deduplicação semântica, filtros heurísticos, pares de preferência e filtragem de recompensa para reduzir alucinações e manter saídas estruturadas.],
        [Avaliação em benchmarks públicos (MT-Bench e Arena-Hard) combinada a testes próprios de precisão factual sobre normas da ANEEL.],
        [Autor de commits e pull requests aceitos nos repositórios oficiais da NVIDIA (NeMo, Megatron e Nemotron).],
      ),
    ),
    (
      title: "NLP Team Lead · Pesquisa",
      org: "Digital Humans II · AKCIT / EMBRAPII",
      period: "",
      bullets: (
        [Liderança técnica da equipe de NLP, definindo objetivos de treino, geração de datasets e avaliações de consistência de persona.],
        [Pesquisa em Sparse Autoencoders, steering de ativações, Steering-Conditioned LoRA, alinhamento de persona e memória episódica, resultando em quatro artigos aceitos e um em revisão.],
      ),
    ),
    (
      title: "Tech Lead & NLP Engineer",
      org: "TRON · CEIA",
      period: "",
      bullets: (
        [Liderança técnica do copilot de suporte da TRON: Graph RAG com agentes de reescrita e rerank integrado a um ERP legado em Delphi para executar ações direto na aplicação, além de extensão web para os atendentes.],
        [Fine-tuning do encoder BGE-M3 com triplet loss e mineração de hard negatives no vocabulário do sistema.],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCM-GO · Tribunal de Contas dos Municípios de Goiás",
      period: "",
      bullets: (
        [Desenvolvimento e colocação em produção do sistema de chat e análise documental do tribunal, com economia operacional reportada de R\$ 1,8 milhão.],
        [Estruturação de dados em arquitetura Medallion, MLOps na infraestrutura local, RAG jurídico e fine-tuning de modelos para redigir seções de peças jurídicas.],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCE-GO · Tribunal de Contas do Estado de Goiás",
      period: "",
      bullets: (
        [Busca híbrida (BM25 + embeddings) sobre acórdãos e processos, usando extração de metadados via regex para filtrar consultas exatas.],
        [Fine-tuning de encoders (E5, BGE-M3 e Qwen Embedding) com perda contrastiva e triplet loss, Graph RAG com agentes e deploy de serviços de chat, sumarização e QA.],
      ),
    ),
    (
      title: "Fundador · Produtos de IA",
      org: "Pergunt.ai (CEO & Co-Founder, 2023) · Validoo · PUMP",
      period: "",
      bullets: (
        [Pergunt.ai: plataforma de estudo que gerava questões inéditas de concursos com IA e ajustava recomendações pelo desempenho do aluno.],
        [Validoo: SaaS de conformidade regulatória para transporte rodoviário. PUMP: app iOS de fotografia com modelos Core ML on-device e IA generativa.],
      ),
    ),
  ),
  education: (
    (
      title: "Bacharelado em Inteligência Artificial",
      org: "Universidade Federal de Goiás (UFG)",
      period: "2023 a 2027",
      note: "Primeira graduação em Inteligência Artificial da América Latina. Em andamento.",
    ),
  ),
  publications: (
    (
      title: "Episodic Memory from Compression Boundaries in Latent Representation Space",
      url: "https://openreview.net/forum?id=31kwKm65KV",
      venue: [#link("https://openreview.net/forum?id=31kwKm65KV")[AACL-IJCNLP 2026 (Main Conference)]  ·  #link("https://openreview.net/forum?id=En9aRT4uz8")[ICLR 2026 MemAgents Workshop (Oral)]],
    ),
    (
      title: "Steering-Conditioned LoRA via Sparse Autoencoders",
      url: "https://openreview.net/forum?id=8ovluzEutL",
      venue: "ICML 2026 · CoLoRAI Workshop (Pôster)",
    ),
    (
      title: "AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval",
      venue: "ACL 2026 · SemEval Workshop",
    ),
    (
      title: "ECHO: A Latent Register Axis Composes with Prompting for Persona-Conditioned Generation",
      url: "https://openreview.net/forum?id=Bv3PbQSjxU",
      venue: "ACL ARR 2026 (agosto) · EACL · em revisão",
    ),
  ),
  skills: (
    (
      cluster: "Linguagens / infra",
      items: ("Python", "Go", "C / C++", "Java", "R", "JavaScript / TypeScript", "PyTorch", "CUDA", "Docker", "GCP"),
    ),
    (
      cluster: "Open source",
      items: ("13 modelos no Hugging Face", "BGE-M3 afinado para PT (+ ONNX)", "Embeddings Gemma (TCE-GO)", "SAEs em LLaMA 3.2"),
    ),
    (
      cluster: "Pós-treino de LLM",
      items: ("SFT", "LoRA / full FT", "DPO / GRPO", "Dados sintéticos", "Avaliação de LLMs", "NeMo / Megatron", "Axolotl / Unsloth"),
    ),
    (
      cluster: "RAG, agentes e produção",
      items: ("Graph RAG", "RAG híbrido", "Orquestração de agentes", "Embeddings (E5, BGE-M3)", "Medallion", "MLOps"),
    ),
  ),
  labels: (
    experience: "Experiência",
    education: "Formação",
    publications: "Publicações",
    skills: "Competências técnicas",
  ),
  lang: "pt",
)
