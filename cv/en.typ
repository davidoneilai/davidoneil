#import "template.typ": cv

#cv(
  name: "David O'Neil",
  role: "AI Engineer · LLM / NLP  ·  Technical Lead",
  contacts: (
    "Goiânia, Brazil",
    link("mailto:davidoneil33@gmail.com")[davidoneil33\@gmail.com],
    "+55 62 98135-8075",
  ),
  links: (
    link("https://linkedin.com/in/davidoneilai")[linkedin.com/in/davidoneilai],
    link("https://github.com/davidoneilai")[github.com/davidoneilai],
    link("https://huggingface.co/davidoneil")[huggingface.co/davidoneil],
    link("https://davidoneilai.github.io/davidoneil/en/")[davidoneilai.github.io/davidoneil],
  ),
  summary: [
    NLP and LLM engineer with 4+ years building and training language models. I lead post-training for CEMIG's in-house LLMs on NVIDIA B200 and H100 GPUs (SFT, LoRA, DPO, and GRPO) and lead the NLP research team on Digital Humans II. My patches have been merged into official NVIDIA repositories (NeMo, Megatron, and Nemotron), and my papers have been accepted at AACL, ICLR, ICML, and ACL. In production, I built hybrid search, Graph RAG, agent pipelines, and MLOps at TCE-GO and TCM-GO, with R\$1.8M in reported savings.
  ],
  experience: (
    (
      title: "Technical Lead · Model Training",
      org: "CEMIG · CEIA / UFG",
      period: "",
      bullets: (
        [Leading post-training for CEMIG's in-house LLMs for Brazilian Portuguese and the power sector, defining synthetic-data distillation, internal corpus curation, and evaluation design.],
        [Running SFT, LoRA, full fine-tuning, DPO, and GRPO across Qwen-3/3.5, Gemma-4, LLaMA 3.1/3.2, and Tucano on NVIDIA Blackwell B200, DGX H100, and A100 clusters with NeMo, Megatron, Axolotl, and Unsloth.],
        [Building data pipelines with semantic deduplication, heuristic filters, preference pairs, and reward filtering to cut hallucinations and keep outputs structured.],
        [Evaluating models on public benchmarks (MT-Bench and Arena-Hard) paired with custom factual-accuracy suites on ANEEL regulations.],
        [Authored commits and pull requests merged into official NVIDIA repositories (NeMo, Megatron, and Nemotron).],
      ),
    ),
    (
      title: "NLP Team Lead · Research",
      org: "Digital Humans II · AKCIT / EMBRAPII",
      period: "",
      bullets: (
        [Leading the NLP research team, setting training objectives, dataset generation pipelines, and persona-consistency evaluations.],
        [Researching Sparse Autoencoders, activation steering, Steering-Conditioned LoRA, persona alignment, and episodic memory, resulting in four accepted papers and one under review.],
      ),
    ),
    (
      title: "Tech Lead & NLP Engineer",
      org: "TRON · CEIA",
      period: "",
      bullets: (
        [Tech lead for the TRON support copilot: a multi-agent Graph RAG (query rewrite and rerank) wired into a legacy Delphi ERP to execute in-app actions, plus a browser extension for support staff.],
        [Fine-tuned the BGE-M3 encoder with triplet loss and hard-negative mining on domain data.],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCM-GO · Municipal Court of Accounts of Goiás",
      period: "",
      bullets: (
        [Built and shipped a production chat and document-analysis system with R\$1.8M in reported operational savings.],
        [Designed the Medallion data architecture, on-prem MLOps, legal RAG, and model fine-tuning for drafting specific sections of legal rulings.],
      ),
    ),
    (
      title: "NLP Engineer",
      org: "TCE-GO · Court of Accounts of Goiás",
      period: "",
      bullets: (
        [Built hybrid search (BM25 + dense embeddings) over court rulings, using regex metadata extraction to route exact-match queries.],
        [Fine-tuned E5, BGE-M3, and Qwen Embedding encoders with contrastive and triplet loss, built Graph RAG agent pipelines, and deployed production chat, summarization, and QA services.],
      ),
    ),
    (
      title: "Founder · AI Products",
      org: "Pergunt.ai (CEO & Co-Founder, 2023) · Validoo · PUMP",
      period: "",
      bullets: (
        [Pergunt.ai: study platform that generated original civil-service exam questions with AI and adapted study plans to student performance.],
        [Validoo: regulatory-compliance SaaS for road freight. PUMP: iOS photo app combining on-device Core ML models with generative AI.],
      ),
    ),
  ),
  education: (
    (
      title: "B.S. in Artificial Intelligence",
      org: "Federal University of Goiás (UFG)",
      period: "2023 to 2027",
      note: "First undergraduate Artificial Intelligence program in Latin America. In progress.",
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
      venue: "ICML 2026 · CoLoRAI Workshop (Poster)",
    ),
    (
      title: "AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval",
      venue: "ACL 2026 · SemEval Workshop",
    ),
    (
      title: "ECHO: A Latent Register Axis Composes with Prompting for Persona-Conditioned Generation",
      url: "https://openreview.net/forum?id=Bv3PbQSjxU",
      venue: "ACL ARR 2026 August · EACL · under review",
    ),
  ),
  skills: (
    (
      cluster: "Languages / infra",
      items: ("Python", "Go", "C / C++", "Java", "R", "JavaScript / TypeScript", "PyTorch", "CUDA", "Docker", "GCP"),
    ),
    (
      cluster: "Open source",
      items: ("13 models on Hugging Face", "BGE-M3 fine-tuned for PT (+ ONNX)", "Gemma embeddings (TCE-GO)", "SAEs on LLaMA 3.2"),
    ),
    (
      cluster: "LLM post-training",
      items: ("SFT", "LoRA / full FT", "DPO / GRPO", "Synthetic data", "LLM evaluation", "NeMo / Megatron", "Axolotl / Unsloth"),
    ),
    (
      cluster: "RAG, agents & production",
      items: ("Graph RAG", "Hybrid RAG", "Agent orchestration", "Embeddings (E5, BGE-M3)", "Medallion", "MLOps"),
    ),
  ),
)
