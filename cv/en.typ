#import "template.typ": cv

#cv(
  name: "David O'Neil",
  role: "NLP / LLM Engineer  ·  Technical Lead",
  contacts: (
    "Goiânia, Brazil",
    "davidoneil33@gmail.com",
    "+55 62 98135-8075",
    "linkedin.com/in/davidoneilai",
    "github.com/davidoneilai",
  ),
  summary: [
    NLP/LLM engineer with 4+ years. Technical lead for training CEMIG's in-house LLMs (CEIA/UFG) and NLP Team Lead on Digital Humans II (AKCIT/EMBRAPII). Accepted contributor to official NVIDIA repositories (NeMo, Megatron, Nemotron). Papers at ICLR, ICML, and ACL. Production NLP at TCE-GO and TCM-GO — hybrid RAG, Graph RAG, MLOps; reported R\$1.8M in savings at TCM-GO.
  ],
  experience: (
    (
      title: "NLP Team Lead · Research",
      org: "Digital Humans II — AKCIT / EMBRAPII",
      period: "",
      bullets: (
        [Led the NLP team (direct reports). Mandate: base research and publications — interpretability, persona alignment, episodic memory — not product engineering.],
        [Research on Sparse Autoencoders, steering, Steering-Conditioned LoRA, persona alignment, episodic memory, and inference acceleration.],
        [Three accepted workshop papers (ICLR MemAgents oral, ICML CoLoRAI, ACL SemEval); two manuscripts under review at top-tier venues.],
      ),
    ),
    (
      title: "Technical Lead · Model Training",
      org: "CEMIG — CEIA / UFG",
      period: "",
      bullets: (
        [Technical lead for CEMIG's in-house LLMs: synthetic-data strategy, internal data use, and eval (public benchmarks vs. domain criteria such as ANEEL factual accuracy).],
        [Ran SFT, LoRA, full fine-tuning, DPO, and GRPO on Qwen-3/3.5, Gemma-4, LLaMA 3.1/3.2, and Tucano on NVIDIA Blackwell B200, DGX H100, and A100 (NeMo, Megatron, Axolotl, Unsloth).],
        [Accepted commits/PRs in official NVIDIA repositories (NeMo / Megatron / Nemotron).],
      ),
    ),
    (
      title: "Tech Lead & NLP Engineer",
      org: "TRON — CEIA",
      period: "",
      bullets: (
        [Tech lead for CEIA×TRON copilot: Graph RAG with specialized agents (query rewrite, rerank) and actions inside a legacy Delphi app, plus a web extension for human agents.],
        [Supervised fine-tuning of BGE-M3 with triplet loss and hard-negative mining to raise retrieval quality.],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCE-GO — Court of Accounts of Goiás",
      period: "",
      bullets: (
        [Hybrid RAG (lexical + dense) over complementary legal documents; regex/metadata routing when semantic search was insufficient.],
        [Encoder SFT (E5, BGE-M3, Qwen Embedding) with contrastive/triplet loss; Graph RAG and agent orchestration; production chat, summarization, and QA including deploy.],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCM-GO — Municipal Court of Accounts of Goiás",
      period: "",
      bullets: (
        [NLP chat product with reported R\$1.8M in operational savings; legal RAG and fine-tuning for document sections.],
        [Medallion data architecture, MLOps on institutional infra, encoder training/eval, and agent pipelines over TCM databases.],
      ),
    ),
    (
      title: "CEO & Co-Founder",
      org: "Pergunt.ai",
      period: "2023",
      bullets: (
        [Edtech GenAI: original public-exam questions and a recommendation layer on student performance.],
      ),
    ),
  ),
  education: (
    (
      title: "B.S. in Artificial Intelligence",
      org: "Federal University of Goiás (UFG)",
      period: "2023 — 2027",
      note: "First AI undergraduate program in Latin America. In progress.",
    ),
  ),
  publications: (
    (
      title: "Episodic Memory from Compression Boundaries in Latent Representation Space",
      venue: "ICLR 2026 · MemAgents Workshop (Oral)",
    ),
    (
      title: "Steering-Conditioned LoRA via Sparse Autoencoders",
      venue: "ICML 2026 · CoLoRAI Workshop (Poster)",
    ),
    (
      title: "AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval",
      venue: "ACL 2026 · SemEval Workshop",
    ),
  ),
  skills: (
    (
      cluster: "LLM post-training",
      items: ("SFT", "LoRA / full FT", "DPO / GRPO", "Synthetic data", "Public + custom eval", "Qwen-3/3.5", "Gemma-4", "LLaMA 3.1/3.2", "Tucano", "Axolotl / Unsloth"),
    ),
    (
      cluster: "Research / interpretability",
      items: ("Sparse Autoencoders", "Steering", "Steering-Conditioned LoRA", "Persona alignment", "Episodic memory", "Inference acceleration"),
    ),
    (
      cluster: "Retrieval / production",
      items: ("E5 / BGE-M3 / Qwen Embedding", "Triplet / contrastive", "Graph RAG", "Agent orchestration", "BM25 + metadata", "Medallion", "MLOps"),
    ),
    (
      cluster: "NVIDIA / compute",
      items: ("Blackwell B200", "DGX H100", "A100", "NeMo", "Megatron", "Nemotron"),
    ),
  ),
)
