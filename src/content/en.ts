import type { LocaleCopy } from './types';

export const en: LocaleCopy = {
  role: 'NLP / LLM Engineer',
  headline: 'LLM training, interpretability research, and production NLP systems.',
  summary:
    'I have spent the past 4+ years building and training language models. I lead post-training for CEMIG’s in-house LLMs at CEIA/UFG and lead the NLP research team on Digital Humans II (AKCIT/EMBRAPII). My patches have been merged into official NVIDIA repositories (NeMo, Megatron, and Nemotron), and my research has been published at AACL, ICLR, ICML, and ACL. On the production side, I built legal search, agent pipelines, and MLOps at TCE-GO and TCM-GO, where our system delivered R$1.8M in reported savings.',
  ctaCv: 'Download CV',
  ctaWork: 'See the work',
  ctaContact: 'Contact',
  navExperience: 'Experience',
  navCases: 'Work',
  navPapers: 'Papers',
  navSkills: 'Skills',
  navContact: 'Contact',
  casesLabel: 'Selected work',
  caseContextLabel: 'Context',
  caseDecisionLabel: 'What I built',
  caseLeadershipLabel: 'My role',
  caseOutcomeLabel: 'Outcome',
  caseStackLabel: 'Stack',
  skillsLabel: 'Hard skills',
  pubsAcceptedLabel: 'Publications · accepted',
  pubsReviewLabel: 'Under review',
  builderLabel: 'Products',
  experienceLabel: 'Experience',
  educationLabel: 'Education',
  contactLabel: 'Contact',
  langLabel: 'Language',
  backpropLabel: 'Fire one backpropagation step',
  backpropHint: 'click · 1 step',
  nextTokenLabel: 'next token',
  replayLabel: 'generate again',
  tokens: [
    { t: '▁Episodic', p: 0.38, alt: [['▁Long', 0.24], ['▁Working', 0.13], ['▁Sparse', 0.07]] },
    { t: '▁memory', p: 0.88, alt: [['▁recall', 0.04], ['▁traces', 0.03], ['▁state', 0.02]] },
    { t: '▁starts', p: 0.41, alt: [['▁begins', 0.26], ['▁forms', 0.14], ['▁emerges', 0.09]] },
    { t: '▁where', p: 0.57, alt: [['▁when', 0.29], ['▁as', 0.06], ['▁at', 0.03]] },
    { t: '▁compression', p: 0.44, alt: [['▁reconstruction', 0.23], ['▁prediction', 0.12], ['▁attention', 0.08]] },
    { t: '▁fails', p: 0.72, alt: [['▁breaks', 0.11], ['▁ends', 0.06], ['▁drops', 0.04]] },
    { t: '<eos>', p: 0.93, alt: [['.', 0.04], ['▁and', 0.02], ['▁in', 0.01]] },
  ],
  stats: [
    { value: '4+', label: 'years of NLP' },
    { value: '4', label: 'accepted papers' },
    { value: 'B200', label: 'Blackwell · H100 · A100' },
    { value: 'R$1.8M', label: 'reported savings · TCM-GO' },
  ],
  skills: [
    {
      cluster: 'Languages / infra',
      items: ['Python', 'Go', 'C / C++', 'Java', 'R', 'JavaScript / TypeScript', 'PyTorch', 'CUDA', 'Docker', 'GCP'],
    },
    {
      cluster: 'LLM post-training',
      items: [
        'SFT',
        'LoRA / full FT',
        'DPO / GRPO',
        'Synthetic data',
        'Public + custom eval',
        'Qwen-3 / 3.5',
        'Gemma-4',
        'LLaMA 3.1 / 3.2',
        'Tucano',
        'Axolotl / Unsloth',
      ],
    },
    {
      cluster: 'Research / interpretability',
      items: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        'Persona alignment',
        'Episodic memory',
        'Inference acceleration',
      ],
    },
    {
      cluster: 'Retrieval / production',
      items: [
        'E5 / BGE-M3 / Qwen Embedding',
        'Triplet / contrastive loss',
        'Graph RAG',
        'Agent orchestration',
        'BM25 + metadata',
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
      title: 'In-house LLMs for the power sector',
      role: 'Technical lead · model training',
      subtitle: 'SFT, LoRA, DPO, and GRPO on Blackwell GPUs for Brazilian Portuguese and ANEEL regulations.',
      context:
        'CEMIG wanted its own models adapted to Brazilian Portuguese and the day-to-day operations of an electric utility, where answers have to follow technical terminology and ANEEL regulations without making up rules. Training ran on NVIDIA clusters with Blackwell B200, DGX H100, and A100 GPUs.',
      decision:
        'I designed the data and post-training pipeline: distilling synthetic data from larger models to cover long context and edge cases, running semantic deduplication and heuristic filters, and mixing that with internal documents. I ran SFT, LoRA, full fine-tuning, DPO, and GRPO across Qwen-3, Qwen-3.5, Gemma-4, LLaMA 3.1, LLaMA 3.2, and Tucano using NeMo, Megatron, Axolotl, and Unsloth. For preference tuning, I curated paired comparisons and reward filters aimed at cutting hallucinations and keeping outputs structured. Evaluation combined MT-Bench and Arena-Hard with our own test suite on ANEEL rules.',
      leadership:
        'As technical lead for model training, I planned the H100 and B200 experiment schedule, tracked convergence and hyperparameters, and connected the training work with the application team.',
      outcome:
        'In-house CEMIG models in a continuous training and domain-evaluation cycle. Along the way, fixes and improvements we made to NeMo, Megatron, and Nemotron were merged into official NVIDIA repositories.',
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
        { value: 'Lead', label: 'in-house model training' },
        { value: 'NVIDIA', label: 'accepted PRs · NeMo / Megatron' },
        { value: 'ANEEL', label: 'domain eval + MT-Bench' },
      ],
    },
    {
      id: 'digital-humans',
      index: '02',
      org: 'Digital Humans II · AKCIT / EMBRAPII',
      title: 'Interpretability and persona alignment',
      role: 'NLP Team Lead · research',
      subtitle: 'Sparse Autoencoders, activation steering, and episodic memory, published at AACL, ICLR, ICML, and ACL.',
      context:
        'An AKCIT research track focused on understanding and steering the internal behavior of LLMs: keeping a persona stable across long interactions, giving agents episodic memory, and adapting models without full retraining.',
      decision:
        'We worked with Sparse Autoencoders and steering vectors in latent space, combining representation control with LoRA adapters (Steering-Conditioned LoRA) and with prompting (ECHO). On the memory side, we used compression boundaries in latent representations to segment episodes for long-context agents. I also defined dataset generation, training objectives, and persona-consistency evaluations.',
      leadership:
        'I lead the project’s NLP team, guiding researchers from experiment design and model training through paper writing.',
      outcome:
        'Four papers accepted in 2026: AACL-IJCNLP main conference, an oral presentation at the ICLR MemAgents Workshop, a poster at ICML CoLoRAI, and a paper at ACL SemEval. A fifth paper, ECHO, is under review at ACL ARR for EACL.',
      stack: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        'Persona alignment',
        'Episodic memory',
        'Inference acceleration',
      ],
      metrics: [
        { value: '4', label: 'accepted papers' },
        { value: 'Main', label: 'AACL-IJCNLP' },
        { value: '1', label: 'under review · EACL' },
      ],
    },
    {
      id: 'courts',
      index: '03',
      org: 'TCE-GO and TCM-GO',
      title: 'Legal NLP in production',
      role: 'NLP Engineer',
      subtitle: 'Medallion data architecture, encoder fine-tuning, Graph RAG, and hybrid search at two courts of accounts.',
      context:
        'Rulings and case files at state and municipal audit courts mix long legal arguments with docket numbers, rapporteurs, and cross-references. Purely semantic search struggled whenever a query asked for an exact identifier or needed to connect two complementary documents, and the whole system had to run on each court’s own infrastructure.',
      decision:
        'At TCE-GO, I paired lexical search (BM25) with dense retrieval in a hybrid pipeline, adding regex extractors to pull metadata from user queries and filter the database before reranking. I fine-tuned E5, BGE-M3, and Qwen Embedding encoders with contrastive and triplet loss on legal pairs, and built a Graph RAG with specialized agents for multi-document questions. At TCM-GO, I organized the data in a Medallion architecture, handled on-prem MLOps, and fine-tuned models to draft and review specific sections of legal documents.',
      leadership:
        'I owned the delivery from encoder training and evaluation all the way to deployment and day-to-day maintenance of the chat, summarization, and QA services.',
      outcome:
        'At TCM-GO, the chat and document-analysis system went into production with R$1.8M in reported operational savings. At TCE-GO, the hybrid search and QA assistants are used daily by court auditors.',
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
        { value: 'R$1.8M', label: 'reported savings · TCM-GO' },
        { value: 'Hybrid', label: 'lexical + dense · TCE-GO' },
        { value: 'Production', label: 'chat · summarization · QA' },
      ],
    },
    {
      id: 'tron',
      index: '04',
      org: 'TRON · CEIA',
      title: 'Copilot inside legacy Delphi',
      role: 'Tech Lead & NLP Engineer',
      subtitle: 'Multi-agent Graph RAG, in-app actions in a legacy ERP, and BGE-M3 fine-tuning.',
      context:
        'TRON’s core product was a legacy Delphi ERP, and support agents spent too much time switching between screens and documentation. The copilot had to execute actions inside the Delphi application itself and also be available through a browser extension so support staff could get quick answers.',
      decision:
        'I built a Graph RAG pipeline with dedicated agents for query rewriting and passage reranking. I fine-tuned BGE-M3 with triplet loss and hard-negative mining on TRON’s domain vocabulary, which noticeably improved retrieval accuracy. Finally, I wired the agent into the Delphi client so user commands could trigger actions directly, and shipped the companion web extension for the support team.',
      leadership:
        'As tech lead for the CEIA and TRON partnership, I coordinated the graph architecture, encoder training, and integration with the legacy client.',
      outcome:
        'The copilot is live in the support workflow, executing actions inside Delphi and answering internal questions through the web extension backed by our fine-tuned BGE-M3.',
      stack: ['Graph RAG', 'Query rewrite', 'Rerank', 'Delphi', 'BGE-M3', 'Triplet loss', 'Hard-negative mining'],
      metrics: [
        { value: 'Lead', label: 'CEIA × TRON copilot' },
        { value: 'BGE-M3', label: 'SFT + hard negatives' },
        { value: 'Legacy', label: 'actions in Delphi' },
      ],
    },
  ],
  experience: [
    {
      title: 'NLP Team Lead · research',
      org: 'Digital Humans II · AKCIT / EMBRAPII',
      summary: 'Leading the NLP research team on interpretability, persona alignment, and episodic memory, with papers at AACL, ICLR, ICML, and ACL.',
      href: '#case-digital-humans',
    },
    {
      title: 'Technical lead · model training',
      org: 'CEMIG · CEIA / UFG',
      summary: 'Leading post-training for CEMIG’s in-house LLMs (SFT, LoRA, DPO, and GRPO on Blackwell GPUs), with upstream PRs accepted by NVIDIA.',
      href: '#case-cemig',
    },
    {
      title: 'Tech Lead & NLP Engineer',
      org: 'TRON · CEIA',
      summary: 'Tech lead for a Graph RAG copilot embedded in a legacy Delphi ERP, a support browser extension, and BGE-M3 fine-tuning.',
      href: '#case-tron',
    },
    {
      title: 'NLP Engineer',
      org: 'TCE-GO · Court of Accounts of Goiás',
      summary: 'Hybrid legal search, encoder fine-tuning, Graph RAG, and production QA systems.',
      href: '#case-courts',
    },
    {
      title: 'NLP Engineer',
      org: 'TCM-GO · Municipal Court of Accounts of Goiás',
      summary: 'Production chat and legal RAG built on a Medallion data architecture and on-prem MLOps, with R$1.8M in reported savings.',
      href: '#case-courts',
    },
    {
      title: 'CEO & Co-Founder',
      org: 'Pergunt.ai',
      period: '2023',
      summary: 'Edtech startup using generative AI to write original civil-service exam questions and recommend study topics from student performance.',
      href: '#ventures',
    },
  ],
  education: [
    {
      title: 'B.S. in Artificial Intelligence',
      org: 'Federal University of Goiás (UFG)',
      period: '2023 to 2027',
      note: 'First undergraduate Artificial Intelligence program in Latin America. In progress.',
    },
  ],
  publicationsAccepted: [
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'AACL-IJCNLP 2026 Main',
      note: 'Main-track conference paper showing how compression boundaries in latent space give rise to episodic memory.',
      url: 'https://openreview.net/forum?id=31kwKm65KV',
    },
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'ICLR 2026 · MemAgents Workshop (Oral)',
      note: 'Workshop version selected for an oral presentation on episodic memory in LLM-based agents.',
      url: 'https://openreview.net/forum?id=En9aRT4uz8',
    },
    {
      title: 'Steering-Conditioned LoRA via Sparse Autoencoders',
      venue: 'ICML 2026 · CoLoRAI Workshop (Poster)',
      note: 'Combines LoRA adapters with Sparse Autoencoder features to steer model behavior during post-training.',
      url: 'https://openreview.net/forum?id=8ovluzEutL',
    },
    {
      title:
        'AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval',
      venue: 'ACL 2026 · SemEval Workshop',
      note: 'Structured document chunking and query reformulation to improve retrieval across multi-turn conversations.',
    },
  ],
  publicationsReview: [
    {
      title: 'ECHO: A Latent Register Axis Composes with Prompting for Persona-Conditioned Generation',
      venue: 'ACL ARR 2026 August · EACL · under review',
      note: 'Shows how a latent register axis composes with prompting to keep persona behavior consistent during generation.',
      url: 'https://openreview.net/forum?id=Bv3PbQSjxU',
    },
  ],
  openSourceLabel: 'Open source · models and code',
  openSource: [
    {
      name: 'bge-m3-ft-corpus-pt',
      blurb: 'BGE-M3 fine-tuned for Portuguese semantic search, including an ONNX export for fast inference. Most downloaded model on my Hugging Face profile.',
      href: 'https://huggingface.co/davidoneil/bge-m3-ft-corpus-pt',
    },
    {
      name: 'decisoes-processos-tce-ft-gemma',
      blurb: 'Gemma-based embedding model trained on TCE-GO rulings and case files for legal retrieval.',
      href: 'https://huggingface.co/davidoneil/decisoes-processos-tce-ft-gemma',
    },
    {
      name: 'bge-full-tron',
      blurb: 'BGE-M3 trained with triplet loss and hard negatives on TRON’s domain vocabulary, powering the support copilot retriever.',
      href: 'https://huggingface.co/davidoneil/bge-full-tron',
    },
    {
      name: 'sae-llama32-3b',
      blurb: 'Public Sparse Autoencoder weights trained on LLaMA 3.2 3B, along with the per-layer SAEs used in our persona and steering experiments.',
      href: 'https://huggingface.co/davidoneil/sae-llama32-3b',
    },
    {
      name: 'dense-SAE-latent',
      blurb: 'PyTorch codebase for training and inspecting Sparse Autoencoders on internal LLM activations.',
      href: 'https://github.com/davidoneilai/dense-SAE-latent',
    },
    {
      name: 'residencia-tcc',
      blurb: 'Adaptive small-model inference on iPhone (MobileLLMBench) and tool-calling evaluation on the BFCL v4 benchmark.',
      href: 'https://github.com/davidoneilai/residencia-tcc',
    },
  ],
  ventures: [
    {
      name: 'Pergunt.ai',
      blurb: 'Study platform that generated original civil-service exam questions with AI and adapted the study plan to each student’s weak spots.',
    },
    {
      name: 'Validoo',
      blurb: 'Regulatory compliance SaaS for road freight, built to handle documentation workflows across carriers, brokers, and drivers.',
    },
    {
      name: 'PUMP',
      blurb: 'iOS photography app pairing on-device Core ML models with generative AI features.',
    },
  ],
};
