import type { Locale, SteerCopy } from './types';

/**
 * Copy for the steering demo (ECHO-style register axis composed with a prompt).
 * `out` / `features` are indexed by axis anchor: [executive, neutral, researcher].
 */
export const steerByLocale: Record<Locale, SteerCopy> = {
  pt: {
    label: 'Inferência · steering',
    title: 'Faça steering do David',
    lede: 'Seu modelo já aprendeu quem é David. Agora rode inferência. O controle abaixo imita o que pesquiso no ECHO: um eixo latente de registro que se compõe com o prompt. Mesmo prompt, outro ponto no eixo, outra resposta.',
    promptLabel: 'prompt',
    axisLabel: 'eixo de registro',
    axis: ['executivo', 'neutro', 'pesquisador'],
    featuresLabel: 'latentes SAE mais ativos',
    generating: 'gerando…',
    tokensLabel: 'tokens',
    note: 'Demo: as respostas foram escritas previamente para cada ponto do eixo. O slider escolhe a resposta e interpola as ativações; ele não roda um modelo no seu navegador.',
    features: [
      [['impacto de negócio', 0.92], ['economia · ROI', 0.81], ['liderança', 0.66], ['produção', 0.58], ['jargão técnico', 0.08]],
      [['trajetória', 0.74], ['LLMs', 0.69], ['produção', 0.55], ['pesquisa', 0.52], ['impacto de negócio', 0.41]],
      [['otimização · loss', 0.9], ['interpretabilidade', 0.86], ['espaço latente', 0.77], ['avaliação', 0.6], ['impacto de negócio', 0.12]],
    ],
    prompts: [
      {
        q: "Quem é David O'Neil?",
        out: [
          'David é engenheiro de NLP e LLMs que transforma modelos de linguagem em resultado. Lidera o treino dos modelos próprios da CEMIG, coordena o time de NLP de um projeto nacional de pesquisa e já colocou em produção sistemas que geraram R$ 1,8 milhão em economia reportada no TCM-GO.',
          "David O'Neil é engenheiro de NLP e LLMs em Goiânia, com mais de 4 anos na área. Lidera o pós-treino dos LLMs próprios da CEMIG pelo CEIA/UFG e o time de NLP do Digital Humans II (AKCIT/EMBRAPII). Tem código aceito em repositórios oficiais da NVIDIA e quatro artigos aceitos em 2026.",
          'David trabalha nas entranhas dos modelos: pós-treino com SFT, DPO e GRPO em clusters B200 e H100, e interpretabilidade com Sparse Autoencoders e steering no espaço latente. Pesquisa memória episódica a partir de fronteiras de compressão (AACL main, oral no MemAgents do ICLR) e Steering-Conditioned LoRA (CoLoRAI do ICML).',
        ],
      },
      {
        q: 'O que ele faz com LLMs?',
        out: [
          'Ele pega um modelo genérico e o transforma num especialista do seu negócio: treina com dados do domínio, alinha o comportamento para reduzir alucinação e mede o resultado com avaliações próprias. Foi assim com as normas da ANEEL na CEMIG e com os documentos jurídicos dos tribunais de contas.',
          'Pós-treino e aplicação. Na CEMIG, roda ciclos de SFT, LoRA, DPO e GRPO com dados sintéticos e avaliação de domínio. Nos tribunais de contas e na TRON, construiu busca híbrida, Graph RAG com agentes e encoders afinados que estão em produção.',
          'Pipeline completo: dados sintéticos destilados de modelos maiores com deduplicação semântica; SFT, LoRA e full fine-tuning; preferências via DPO e GRPO com filtros de recompensa contra alucinação; avaliação em MT-Bench, Arena-Hard e uma bateria própria. Em retrieval: BGE-M3 com triplet loss e hard negatives, BM25 + denso e rerank. Em pesquisa: steering por SAE.',
        ],
      },
      {
        q: 'Por que trazer o David para o meu time?',
        out: [
          'Porque ele cobre o ciclo inteiro, da pesquisa ao deploy. Sabe liderar time, conversar com a área de negócio e entregar sistema funcionando, com histórico de economia mensurável e de modelos que viraram produto, não só demo.',
          'Ele junta três coisas que raramente aparecem juntas: treino de LLMs em escala, pesquisa publicada em interpretabilidade e experiência levando NLP para produção. Já liderou times técnicos, contribuiu para o NeMo e o Megatron e entregou sistemas usados no dia a dia de órgãos públicos.',
          'Porque ele entende o modelo por dentro. Quando a saída falha, ele olha para as ativações, não só para o prompt: SAEs, vetores de steering e análise de representação para diagnosticar e corrigir comportamento. E leva o rigor de quem publica no AACL, ICLR, ICML e ACL para o código que vai para produção.',
        ],
      },
    ],
  },
  en: {
    label: 'Inference · steering',
    title: 'Steer David',
    lede: 'Your model has learned who David is. Now run inference. The control below mirrors what I research in ECHO: a latent register axis that composes with the prompt. Same prompt, different point on the axis, different answer.',
    promptLabel: 'prompt',
    axisLabel: 'register axis',
    axis: ['executive', 'neutral', 'researcher'],
    featuresLabel: 'most active SAE latents',
    generating: 'generating…',
    tokensLabel: 'tokens',
    note: 'Demo: answers were written ahead of time for each point on the axis. The slider picks the answer and interpolates the activations; it does not run a model in your browser.',
    features: [
      [['business impact', 0.92], ['savings · ROI', 0.81], ['leadership', 0.66], ['production', 0.58], ['technical jargon', 0.08]],
      [['career trajectory', 0.74], ['LLMs', 0.69], ['production', 0.55], ['research', 0.52], ['business impact', 0.41]],
      [['optimization · loss', 0.9], ['interpretability', 0.86], ['latent space', 0.77], ['evaluation', 0.6], ['business impact', 0.12]],
    ],
    prompts: [
      {
        q: "Who is David O'Neil?",
        out: [
          'David is an NLP and LLM engineer who turns language models into business results. He leads training for CEMIG’s in-house models, runs the NLP team of a national research program, and has shipped systems that delivered R$1.8M in reported savings at TCM-GO.',
          "David O'Neil is an NLP/LLM engineer based in Goiânia, Brazil, with 4+ years in the field. He leads post-training for CEMIG’s in-house LLMs at CEIA/UFG and the NLP team on Digital Humans II (AKCIT/EMBRAPII). He has code merged into official NVIDIA repositories and four papers accepted in 2026.",
          'David works inside the models: post-training with SFT, DPO and GRPO on B200 and H100 clusters, and interpretability with Sparse Autoencoders and latent-space steering. His research covers episodic memory from compression boundaries (AACL main, oral at ICLR MemAgents) and Steering-Conditioned LoRA (ICML CoLoRAI).',
        ],
      },
      {
        q: 'What does he do with LLMs?',
        out: [
          'He takes a general-purpose model and turns it into a specialist for your domain: trains it on your data, aligns its behavior to cut hallucinations, and measures results with custom evaluations. He did exactly that with ANEEL regulations at CEMIG and with legal documents at Brazil’s audit courts.',
          'Post-training and applications. At CEMIG he runs SFT, LoRA, DPO and GRPO cycles with synthetic data and domain evaluation. At the audit courts and at TRON he built hybrid search, agentic Graph RAG and fine-tuned encoders that run in production.',
          'The full pipeline: synthetic data distilled from larger models with semantic dedup; SFT, LoRA and full fine-tuning; preference alignment via DPO and GRPO with reward filters against hallucination; evaluation on MT-Bench, Arena-Hard and an in-house suite. On retrieval: BGE-M3 with triplet loss and hard negatives, BM25 + dense and reranking. On research: SAE-based steering.',
        ],
      },
      {
        q: 'Why bring David onto my team?',
        out: [
          'Because he covers the whole cycle, from research to deployment. He leads teams, talks to the business side and ships working systems, with a track record of measurable savings and models that became products, not just demos.',
          'He combines three things that rarely come together: LLM training at scale, published interpretability research, and experience taking NLP to production. He has led technical teams, contributed to NeMo and Megatron, and delivered systems used daily by public institutions.',
          'Because he understands the model from the inside. When an output fails, he looks at the activations, not just the prompt: SAEs, steering vectors and representation analysis to diagnose and fix behavior. And he brings the rigor of someone publishing at AACL, ICLR, ICML and ACL to code that ships.',
        ],
      },
    ],
  },
  zh: {
    label: '推理 · steering',
    title: '对 David 做 steering',
    lede: '你的模型已经学会了 David 是谁。现在开始推理。下面的控件对应我在 ECHO 中研究的内容：一个能与 prompt 组合的潜在语域轴。同一个 prompt，轴上不同的位置，得到不同的回答。',
    promptLabel: 'prompt',
    axisLabel: '语域轴',
    axis: ['管理层', '中性', '研究者'],
    featuresLabel: '最活跃的 SAE 潜变量',
    generating: '生成中…',
    tokensLabel: 'tokens',
    note: '演示说明：每个轴位置的回答均为预先撰写。滑块只负责选择回答并插值激活，并不在你的浏览器中运行模型。',
    features: [
      [['业务影响', 0.92], ['节省 · ROI', 0.81], ['领导力', 0.66], ['生产', 0.58], ['技术术语', 0.08]],
      [['职业经历', 0.74], ['LLM', 0.69], ['生产', 0.55], ['研究', 0.52], ['业务影响', 0.41]],
      [['优化 · loss', 0.9], ['可解释性', 0.86], ['潜空间', 0.77], ['评测', 0.6], ['业务影响', 0.12]],
    ],
    prompts: [
      {
        q: "David O'Neil 是谁？",
        out: [
          'David 是一名 NLP 与 LLM 工程师，擅长把语言模型变成业务成果。他负责 CEMIG 自有模型的训练，带领一个国家级研究项目的 NLP 团队，并在 TCM-GO 交付了据报节省 R$180 万的系统。',
          "David O'Neil 是常驻巴西戈亚尼亚的 NLP/LLM 工程师，拥有 4 年以上经验。他在 CEIA/UFG 负责 CEMIG 自有 LLM 的后训练，并担任 Digital Humans II（AKCIT/EMBRAPII）NLP 团队负责人。他的代码已合并进 NVIDIA 官方仓库，2026 年有四篇论文被接收。",
          'David 的工作深入模型内部：在 B200 和 H100 集群上用 SFT、DPO、GRPO 做后训练，用 Sparse Autoencoders 和潜空间 steering 做可解释性研究。研究方向包括基于压缩边界的情景记忆（AACL 主会、ICLR MemAgents 口头报告）以及 Steering-Conditioned LoRA（ICML CoLoRAI）。',
        ],
      },
      {
        q: '他用 LLM 做什么？',
        out: [
          '他能把通用模型变成你所在领域的专家：用领域数据训练，对齐行为以减少幻觉，并用自建评测衡量效果。他在 CEMIG 针对 ANEEL 规范这样做过，在审计法院针对法律文书也这样做过。',
          '后训练与落地应用。在 CEMIG，他用合成数据和领域评测运行 SFT、LoRA、DPO、GRPO 训练循环。在审计法院和 TRON，他构建了混合检索、智能体 Graph RAG 和微调编码器，均已投入生产。',
          '完整流程：从更大模型蒸馏合成数据并做语义去重；SFT、LoRA 与全量微调；用 DPO 与 GRPO 加奖励过滤做偏好对齐以抑制幻觉；在 MT-Bench、Arena-Hard 和自建评测集上评估。检索方面：BGE-M3 配合 triplet loss 与难负例、BM25 + 稠密检索与重排。研究方面：基于 SAE 的 steering。',
        ],
      },
      {
        q: '为什么让 David 加入我的团队？',
        out: [
          '因为他覆盖从研究到部署的完整周期。他能带团队、能和业务方沟通，也能交付真正可用的系统；他有可量化的节省记录，做出的模型成了产品，而不只是演示。',
          '他同时具备三种很少同时出现的能力：大规模 LLM 训练、已发表的可解释性研究，以及把 NLP 推向生产的经验。他带过技术团队，为 NeMo 和 Megatron 贡献过代码，交付的系统每天被公共机构使用。',
          '因为他从内部理解模型。输出出错时，他看的是激活，而不只是 prompt：用 SAE、steering 向量和表示分析来诊断并修正行为。他还把在 AACL、ICLR、ICML、ACL 发表论文的严谨带进上线的代码里。',
        ],
      },
    ],
  },
};
