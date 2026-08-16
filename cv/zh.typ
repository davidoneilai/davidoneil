#import "template.typ": cv

#cv(
  name: "David O'Neil",
  role: "NLP / LLM 工程师  ·  技术负责人",
  contacts: (
    "巴西戈亚尼亚",
    "davidoneil33@gmail.com",
    "+55 62 98135-8075",
    "linkedin.com/in/davidoneilai",
    "github.com/davidoneilai",
  ),
  summary: [
    NLP/LLM 工程师，4+ 年经验。CEMIG（CEIA/UFG）自有模型训练技术负责人，Digital Humans II（AKCIT/EMBRAPII）NLP Team Lead。官方 NVIDIA 仓库已接受贡献（NeMo、Megatron、Nemotron）。论文见于 ICLR、ICML、ACL。在 TCE-GO 与 TCM-GO 交付生产 NLP：混合 RAG、Graph RAG、MLOps；TCM-GO 据报节省 R\$180 万。
  ],
  experience: (
    (
      title: "NLP Team Lead · 研究",
      org: "Digital Humans II — AKCIT / EMBRAPII",
      period: "",
      bullets: (
        [领导 NLP 团队（有直接下属）。任务是基础研究与发表——可解释性、人设对齐、情景记忆——不是产品工程。],
        [研究方向：Sparse Autoencoders、steering、Steering-Conditioned LoRA、人设对齐、情景记忆与推理加速。],
        [三篇已接收研讨会论文（ICLR MemAgents 口头、ICML CoLoRAI、ACL SemEval）；两篇顶会审稿中。],
      ),
    ),
    (
      title: "技术负责人 · 模型训练",
      org: "CEMIG — CEIA / UFG",
      period: "",
      bullets: (
        [CEMIG 自有 LLM 训练技术负责人：决定合成数据策略、内部数据用法，以及评测（公开基准 vs. 领域标准，如 ANEEL 事实正确性）。],
        [在 NVIDIA Blackwell B200、DGX H100、A100 上对 Qwen-3/3.5、Gemma-4、LLaMA 3.1/3.2、Tucano 执行 SFT、LoRA、全量微调、DPO、GRPO（NeMo、Megatron、Axolotl、Unsloth）。],
        [官方 NVIDIA 仓库已接受 commit/PR（NeMo / Megatron / Nemotron）。],
      ),
    ),
    (
      title: "Tech Lead & NLP Engineer",
      org: "TRON — CEIA",
      period: "",
      bullets: (
        [CEIA×TRON 副驾驶技术负责人：带专用智能体（查询改写、重排）的 Graph RAG，可在 Delphi 遗留应用中执行动作，另有客服侧 Web 扩展。],
        [用 triplet loss 与难负例挖掘对 BGE-M3 做监督微调，提升检索质量。],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCE-GO — 戈亚斯州审计法院",
      period: "",
      bullets: (
        [面向互补法律文书的混合 RAG（词汇 + 稠密）；语义检索不足时用正则/元数据路由。],
        [对 E5、BGE-M3、Qwen Embedding 做对比/triplet SFT；Graph RAG 与智能体编排；生产聊天、摘要与问答，含部署。],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCM-GO — 戈亚斯州市审计法院",
      period: "",
      bullets: (
        [NLP 聊天产品据报节省 R\$180 万；法律 RAG 与文书段落微调。],
        [Medallion 数据架构、机构基础设施上的 MLOps、编码器训练/评测，以及 TCM 库上的智能体流水线。],
      ),
    ),
    (
      title: "CEO & 联合创始人",
      org: "Pergunt.ai",
      period: "2023",
      bullets: (
        [教育 GenAI：原创公考题，并对学情做推荐。],
      ),
    ),
  ),
  education: (
    (
      title: "人工智能学士",
      org: "戈亚斯联邦大学（UFG）",
      period: "2023 — 2027",
      note: "拉丁美洲首个人工智能本科项目。在读。",
    ),
  ),
  publications: (
    (
      title: "Episodic Memory from Compression Boundaries in Latent Representation Space",
      venue: "ICLR 2026 · MemAgents Workshop（口头）",
    ),
    (
      title: "Steering-Conditioned LoRA via Sparse Autoencoders",
      venue: "ICML 2026 · CoLoRAI Workshop（海报）",
    ),
    (
      title: "AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval",
      venue: "ACL 2026 · SemEval Workshop",
    ),
  ),
  skills: (
    (
      cluster: "LLM 后训练",
      items: ("SFT", "LoRA / full FT", "DPO / GRPO", "合成数据", "公开 + 自建评测", "Qwen-3/3.5", "Gemma-4", "LLaMA 3.1/3.2", "Tucano", "Axolotl / Unsloth"),
    ),
    (
      cluster: "研究 / 可解释性",
      items: ("Sparse Autoencoders", "Steering", "Steering-Conditioned LoRA", "人设对齐", "情景记忆", "推理加速"),
    ),
    (
      cluster: "检索 / 生产",
      items: ("E5 / BGE-M3 / Qwen Embedding", "Triplet / 对比", "Graph RAG", "智能体编排", "BM25 + 元数据", "Medallion", "MLOps"),
    ),
    (
      cluster: "NVIDIA / 算力",
      items: ("Blackwell B200", "DGX H100", "A100", "NeMo", "Megatron", "Nemotron"),
    ),
  ),
  labels: (
    experience: "经历",
    education: "教育",
    publications: "论文",
    skills: "技能",
  ),
  font-cjk: "Songti SC",
  lang: "zh",
)
