import type { LocaleCopy } from './types';

export const zh: LocaleCopy = {
  role: 'NLP / LLM 工程师',
  headline: '我负责 LLM 训练、可解释性研究，以及生产级 NLP。',
  summary:
    'NLP/LLM 工程师，4+ 年经验。CEMIG（CEIA/UFG）自有模型训练技术负责人，Digital Humans II（AKCIT/EMBRAPII）NLP Team Lead。官方 NVIDIA 仓库已接受贡献（NeMo、Megatron、Nemotron）。论文见于 ICLR、ICML、ACL。生产侧：TCE-GO 与 TCM-GO 的混合 RAG、Graph RAG 与 MLOps——据报节省 R$180 万。',
  ctaCv: '下载简历',
  ctaWork: '查看作品',
  ctaContact: '联系',
  navExperience: '经历',
  navCases: '案例',
  navPapers: '论文',
  navSkills: '技能',
  navContact: '联系',
  casesLabel: '精选工作',
  caseContextLabel: '背景',
  caseDecisionLabel: '技术决策',
  caseLeadershipLabel: '我负责什么',
  caseOutcomeLabel: '结果',
  caseStackLabel: '技术栈',
  skillsLabel: '硬技能',
  pubsAcceptedLabel: '论文 · 已接收',
  pubsReviewLabel: '审稿中',
  builderLabel: '产品',
  experienceLabel: '经历',
  educationLabel: '教育',
  contactLabel: '联系',
  langLabel: '语言',
  stats: [
    { value: '4+', label: '年 NLP' },
    { value: '3', label: '已接收论文' },
    { value: 'B200', label: 'Blackwell · H100 · A100' },
    { value: 'R$180 万', label: '据报节省 · TCM-GO' },
  ],
  skills: [
    {
      cluster: 'LLM 后训练',
      items: [
        'SFT',
        'LoRA / full FT',
        'DPO / GRPO',
        '合成数据',
        '公开 + 自建评测',
        'Qwen-3 / 3.5',
        'Gemma-4',
        'LLaMA 3.1 / 3.2',
        'Tucano',
        'Axolotl / Unsloth',
      ],
    },
    {
      cluster: '研究 / 可解释性',
      items: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        '人设对齐',
        '情景记忆',
        '推理加速',
      ],
    },
    {
      cluster: '检索 / 生产',
      items: [
        'E5 / BGE-M3 / Qwen Embedding',
        'Triplet / 对比损失',
        'Graph RAG',
        '智能体编排',
        'BM25 + 元数据',
        'Medallion',
        'MLOps',
      ],
    },
    {
      cluster: 'NVIDIA / 算力',
      items: ['Blackwell B200', 'DGX H100', 'A100', 'NeMo', 'Megatron', 'Nemotron'],
    },
  ],
  cases: [
    {
      id: 'cemig',
      index: '01',
      org: 'CEMIG — CEIA / UFG',
      title: '面向电力行业的自有 LLM',
      role: '技术负责人 · 模型训练',
      subtitle: '在 Blackwell 上做 SFT、LoRA、DPO、GRPO——巴西葡萄牙语与 ANEEL 规范。',
      context:
        'CEMIG 需要自有模型，而不是通用聊天机器人。任务是把 LLM 适配到巴西葡萄牙语和电力行业场景：技术语言、监管规范（ANEEL），以及封闭领域的事实一致性。训练运行于 NVIDIA Blackwell——B200、DGX H100 与 A100。',
      decision:
        '由我决定训练配方：如何生成合成数据（含用更大模型蒸馏以覆盖长上下文与 edge cases）、如何使用内部数据，以及评测用公开基准（MT-Bench、Arena-Hard）还是自建标准——ANEEL 规范上的事实正确性、幻觉下降、结构化输出。对 Qwen-3、Qwen-3.5、Gemma-4、LLaMA 3.1、LLaMA 3.2 与 Tucano 执行 SFT、LoRA、全量微调、DPO 与 GRPO。偏好数据用成对比较与奖励过滤。数据流水线含语义去重与启发式质检。训练栈：NeMo、Megatron、Axolotl、Unsloth。',
      leadership:
        '训练技术负责人——不只是跑任务。协调 H100/B200 实验：超参、收敛指标与算力。覆盖模型、训练代码与上层应用。',
      outcome:
        '公司自有模型进入后训练循环，评测超出公开基准。官方 NVIDIA 仓库已接受 commit 与 PR（NeMo / Megatron / Nemotron）。',
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
        { value: 'Lead', label: '自有模型训练' },
        { value: 'NVIDIA', label: '已接受 PR · NeMo / Megatron' },
        { value: 'ANEEL', label: '领域评测 + MT-Bench' },
      ],
    },
    {
      id: 'digital-humans',
      index: '02',
      org: 'Digital Humans II — AKCIT / EMBRAPII',
      title: '可解释性与人设对齐',
      role: 'NLP Team Lead · 研究',
      subtitle: 'SAE、steering、情景记忆——论文见于 ICLR、ICML、ACL。',
      context:
        '基础研究任务，不是产品。NLP 团队需要带人的技术领导：模型训练、可解释性与发表。重点是人设对齐（教育与研究工作流）、智能体记忆与高效适配——不是功能工程。',
      decision:
        '方向：Sparse Autoencoders、steering、人设对齐、LLM 情景记忆、Steering-Conditioned LoRA；亦有推理加速与记忆控制。我设定训练目标、数据策展/生成，以及人设一致性评测——在对齐需要更强配方时超出 SFT。',
      leadership:
        'NLP 团队技术负责人，有下属。把研究→训练→论文闭环跑完：团队在可解释性、记忆与面向真实应用的高效微调上发表。',
      outcome:
        '三篇已接收：ICLR 2026 MemAgents（口头）、ICML 2026 CoLoRAI（海报）、ACL 2026 SemEval。两篇顶会审稿中（ACL ARR、AACL-IJCNLP）。',
      stack: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        'Persona alignment',
        'Episodic memory',
        'Inference acceleration',
      ],
      metrics: [
        { value: '3', label: '已接收论文' },
        { value: '口头', label: 'ICLR MemAgents' },
        { value: '2', label: '审稿中稿件' },
      ],
    },
    {
      id: 'courts',
      index: '03',
      org: 'TCE-GO 与 TCM-GO',
      title: '生产级法律 NLP',
      role: 'NLP Engineer',
      subtitle: 'Medallion、编码器 SFT、Graph RAG，以及审计法院数据上的混合 RAG。',
      context:
        '体量大、噪声高的审计法院语料。纯语义检索在互补法律文书上失败——案号、元数据与词汇引用必须与语义落在同一答案。产品必须跑在机构基础设施上，而不是 notebook。',
      decision:
        'TCE-GO：混合检索（词汇 + 稠密）处理需要交叉上下文的文书；语义不准时用正则抽查询元数据；对 E5、BGE-M3、Qwen Embedding 做 triplet/对比 SFT 并配合成数据；Graph RAG 与智能体混合 BM25、元数据与稠密检索。TCM-GO：Medallion、法院基础设施上的 MLOps、法律 RAG 与文书段落微调。',
      leadership:
        '负责到部署：生产聊天、摘要与问答，按评测选模型——不只是原型。TCM 的聊天/NLP 产品用运营节省衡量。',
      outcome:
        'TCM-GO：聊天/NLP 应用据报节省 R$180 万。TCE-GO：混合 RAG、正则元数据、聊天、摘要与问答进入运营环境。',
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
        { value: 'R$180 万', label: '据报节省 · TCM-GO' },
        { value: '混合', label: '词汇 + 稠密 · TCE-GO' },
        { value: '生产', label: '聊天 · 摘要 · 问答' },
      ],
    },
    {
      id: 'tron',
      index: '04',
      org: 'TRON — CEIA',
      title: '遗留 Delphi 中的副驾驶',
      role: 'Tech Lead & NLP Engineer',
      subtitle: '多智能体 Graph RAG、应用内动作，以及 BGE-M3 SFT。',
      context:
        'TRON 需要嵌在业务流程里的客服副驾驶，而不是另开标签页。关键系统是 Delphi 遗留：智能体必须在应用内执行动作，坐席需要 Web 扩展处理内部疑问且不打断流程。',
      decision:
        'Graph RAG 配专用节点——查询改写与重排——以提升精度与上下文。Delphi 中的智能体副驾驶按用户指令直接执行动作。Web 扩展让坐席与流水线对话。用 triplet loss 与难负例挖掘对 BGE-M3 做 SFT，提升语义检索。',
      leadership:
        'CEIA×TRON 项目技术负责人：架构、编码器训练与遗留集成。端到端协调对话环境。',
      outcome:
        '副驾驶进入客服流程：微调后的 BGE-M3 提升检索，Delphi 内可执行动作，并为人工团队提供 Web 工具。',
      stack: ['Graph RAG', 'Query rewrite', 'Rerank', 'Delphi', 'BGE-M3', 'Triplet loss', 'Hard-negative mining'],
      metrics: [
        { value: 'Lead', label: 'CEIA × TRON 副驾驶' },
        { value: 'BGE-M3', label: 'SFT + 难负例' },
        { value: '遗留', label: 'Delphi 内动作' },
      ],
    },
  ],
  experience: [
    {
      title: 'NLP Team Lead · 研究',
      org: 'Digital Humans II — AKCIT / EMBRAPII',
      summary: '带下属的 NLP 团队。可解释性、人设、情景记忆——论文见于 ICLR、ICML、ACL。',
      href: '#case-digital-humans',
    },
    {
      title: '技术负责人 · 模型训练',
      org: 'CEMIG — CEIA / UFG',
      summary: '自有 LLM 后训练负责人：Blackwell 上的 SFT、LoRA、DPO、GRPO。NVIDIA PR。',
      href: '#case-cemig',
    },
    {
      title: 'Tech Lead & NLP Engineer',
      org: 'TRON — CEIA',
      summary: '遗留 Delphi 中的 Graph RAG 副驾驶、坐席 Web 扩展、BGE-M3 SFT。',
      href: '#case-tron',
    },
    {
      title: 'NLP Engineer',
      org: 'TCE-GO — 戈亚斯州审计法院',
      summary: '混合法律 RAG、编码器 SFT、Graph RAG 与生产问答。',
      href: '#case-courts',
    },
    {
      title: 'NLP Engineer',
      org: 'TCM-GO — 戈亚斯州市审计法院',
      summary: '聊天/NLP 据报节省 R$180 万。Medallion、MLOps、法律 RAG。',
      href: '#case-courts',
    },
    {
      title: 'CEO & 联合创始人',
      org: 'Pergunt.ai',
      period: '2023',
      summary: '教育 GenAI：原创公考题，并对学情做推荐。',
      href: '#ventures',
    },
  ],
  education: [
    {
      title: '人工智能学士',
      org: '戈亚斯联邦大学（UFG）',
      period: '2023 — 2027',
      note: '拉丁美洲首个人工智能本科项目。在读。',
    },
  ],
  publicationsAccepted: [
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'ICLR 2026 · MemAgents Workshop（口头）',
      note: 'LLM 智能体中的情景记忆、压缩边界与潜在表示。',
    },
    {
      title: 'Steering-Conditioned LoRA via Sparse Autoencoders',
      venue: 'ICML 2026 · CoLoRAI Workshop（海报）',
      note: '将高效后训练（LoRA）与 sparse autoencoders 组合，用于条件化 steering。',
    },
    {
      title:
        'AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval',
      venue: 'ACL 2026 · SemEval Workshop',
      note: '面向多轮检索的结构化切分与查询改写。',
    },
  ],
  publicationsReview: [
    {
      title: 'ECHO: A Latent Register Axis Composes with Prompting for Persona-Conditioned Generation',
      venue: 'ACL ARR 2026 August · 审稿中',
      note: '潜在语域轴与 prompting 组合，用于人设条件生成。',
    },
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'AACL-IJCNLP 2026 · 审稿中',
      note: 'ICLR MemAgents 情景记忆工作的会议版本。',
    },
  ],
  ventures: [
    {
      name: 'Pergunt.ai',
      blurb: '面向公考个性化出题与学情洞察的教育 GenAI。',
    },
    {
      name: 'Validoo',
      blurb: '公路货运合规 SaaS——承运商、中介与司机的监管工作流。',
    },
    {
      name: 'PUMP',
      blurb: 'iOS 影像产品：端侧 Core ML 风格 + 生成式 AI，端到端自研。',
    },
  ],
};
