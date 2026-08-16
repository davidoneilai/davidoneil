import type { LocaleCopy } from './types';

export const en: LocaleCopy = {
  role: 'NLP / LLM Engineer',
  headline: 'I lead LLM training, interpretability research, and production NLP.',
  summary:
    'NLP/LLM engineer with 4+ years. Technical lead for training CEMIG’s in-house models (CEIA/UFG) and NLP Team Lead on Digital Humans II (AKCIT/EMBRAPII). Accepted contributor to official NVIDIA repositories (NeMo, Megatron, Nemotron). Papers at ICLR, ICML, and ACL. In production: hybrid RAG, Graph RAG, and MLOps at TCE-GO and TCM-GO — reported R$1.8M in savings.',
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
  caseDecisionLabel: 'Technical decision',
  caseLeadershipLabel: 'What I led',
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
  stats: [
    { value: '4+', label: 'years of NLP' },
    { value: '3', label: 'accepted papers' },
    { value: 'B200', label: 'Blackwell · H100 · A100' },
    { value: 'R$1.8M', label: 'reported savings · TCM-GO' },
  ],
  skills: [
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
      org: 'CEMIG — CEIA / UFG',
      title: 'In-house LLMs for the electric sector',
      role: 'Technical lead · model training',
      subtitle: 'SFT, LoRA, DPO, and GRPO on Blackwell — Brazilian Portuguese and ANEEL norms.',
      context:
        'CEMIG needed its own models, not a generic chatbot. The mandate was to adapt LLMs to Brazilian Portuguese and electric-sector use cases: technical language, regulatory norms (ANEEL), and factual consistency in a closed domain. Training ran on NVIDIA Blackwell — B200, DGX H100, and A100.',
      decision:
        'I set the recipe: how to generate synthetic data (including distillation from larger models for long-context and edge cases), how to use internal data, and whether eval would be a public benchmark (MT-Bench, Arena-Hard) or ours — factual accuracy on ANEEL norms, hallucination reduction, structured-output adherence. I ran SFT, LoRA, full fine-tuning, DPO, and GRPO on Qwen-3, Qwen-3.5, Gemma-4, LLaMA 3.1, LLaMA 3.2, and Tucano. For preference, paired-comparison datasets and reward filtering. Data pipelines with semantic dedup and heuristic quality filters. Training stack: NeMo, Megatron, Axolotl, and Unsloth.',
      leadership:
        'Technical lead for training — I did not only run the job. I coordinated H100/B200 experiments: hyperparameters, convergence metrics, and compute. The work covered the models, the training code, and the applications on top.',
      outcome:
        'Company-owned models in a post-training loop, with domain eval beyond public benchmarks. Commits and pull requests accepted in official NVIDIA repositories (NeMo / Megatron / Nemotron).',
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
      org: 'Digital Humans II — AKCIT / EMBRAPII',
      title: 'Interpretability and persona alignment',
      role: 'NLP Team Lead · research',
      subtitle: 'SAEs, steering, episodic memory — papers at ICLR, ICML, and ACL.',
      context:
        'Base-research mandate, not product. The NLP team needed technical leadership with people reporting in: model training, interpretability, and publications. The focus was persona alignment (education and research workflows), memory in agents, and efficient adaptation — not feature engineering.',
      decision:
        'My lane: Sparse Autoencoders, steering, persona alignment, episodic memory in LLMs, and Steering-Conditioned LoRA. Also inference acceleration and memory control. I set training objectives, dataset curation/generation, and evals for persona-consistent behavior — going beyond SFT when alignment required a stronger recipe.',
      leadership:
        'Technical lead of the NLP team, with researchers reporting to me. I closed the loop from research to training to paper: the team published on interpretability, memory, and efficient fine-tuning for real applications.',
      outcome:
        'Three accepted papers: ICLR 2026 MemAgents (oral), ICML 2026 CoLoRAI (poster), and ACL 2026 SemEval. Two manuscripts under review at top-tier venues (ACL ARR, AACL-IJCNLP).',
      stack: [
        'Sparse Autoencoders',
        'Steering',
        'Steering-Conditioned LoRA',
        'Persona alignment',
        'Episodic memory',
        'Inference acceleration',
      ],
      metrics: [
        { value: '3', label: 'accepted papers' },
        { value: 'Oral', label: 'ICLR MemAgents' },
        { value: '2', label: 'manuscripts under review' },
      ],
    },
    {
      id: 'courts',
      index: '03',
      org: 'TCE-GO and TCM-GO',
      title: 'Legal NLP in production',
      role: 'NLP Engineer',
      subtitle: 'Medallion, encoder SFT, Graph RAG, and hybrid RAG over courts-of-accounts data.',
      context:
        'Large, noisy courts-of-accounts corpora. Purely semantic search failed on complementary legal documents — docket numbers, metadata, and lexical citations had to land in the same answer as meaning. The product had to live on institutional infra, not in a notebook.',
      decision:
        'At TCE-GO: a hybrid retriever (lexical + dense) for documents that needed cross-context; regex for query metadata when semantic search was imprecise; encoder SFT (E5, BGE-M3, Qwen Embedding) with triplet / contrastive loss and synthetic data; Graph RAG and agents mixing BM25, metadata, and dense retrieval. At TCM-GO: Medallion, MLOps on tribunal infra, legal RAG, and fine-tuning of document sections.',
      leadership:
        'Owned the loop through deploy: production chat, summarization, and QA, with model selection by eval — not only prototypes. At TCM, the chat/NLP product was measured in operational savings.',
      outcome:
        'TCM-GO: chat/NLP application with reported R$1.8M in savings. TCE-GO: hybrid RAG, regex metadata, chat, summarization, and QA in the operational environment.',
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
      org: 'TRON — CEIA',
      title: 'Copilot inside legacy Delphi',
      role: 'Tech Lead & NLP Engineer',
      subtitle: 'Multi-agent Graph RAG, in-app actions, and BGE-M3 SFT.',
      context:
        'TRON needed a support copilot that did not live in a separate tab. The critical system was legacy Delphi: the agent had to execute actions inside the application, and human agents needed a web extension for internal questions without breaking the flow.',
      decision:
        'Graph RAG with specialized nodes — query rewrite and rerank — for precision and context. An agentic copilot in Delphi for direct actions from user commands. A web extension so attendants could talk to the pipeline. BGE-M3 SFT with triplet loss and hard-negative mining to raise semantic retrieval.',
      leadership:
        'Tech lead for the CEIA×TRON project: architecture, encoder training, and legacy integration. I coordinated the conversational environment end to end.',
      outcome:
        'Copilot in the support flow: better retrieval from a tuned BGE-M3, actions in Delphi, and a web tool for the human team.',
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
      org: 'Digital Humans II — AKCIT / EMBRAPII',
      summary: 'NLP team with reports. Interpretability, persona, episodic memory — papers at ICLR, ICML, and ACL.',
      href: '#case-digital-humans',
    },
    {
      title: 'Technical lead · model training',
      org: 'CEMIG — CEIA / UFG',
      summary: 'Lead for in-house LLM post-training: SFT, LoRA, DPO, GRPO on Blackwell. NVIDIA PRs.',
      href: '#case-cemig',
    },
    {
      title: 'Tech Lead & NLP Engineer',
      org: 'TRON — CEIA',
      summary: 'Graph RAG copilot in legacy Delphi, web extension for attendants, BGE-M3 SFT.',
      href: '#case-tron',
    },
    {
      title: 'NLP Engineer',
      org: 'TCE-GO — Court of Accounts of Goiás',
      summary: 'Hybrid legal RAG, encoder SFT, Graph RAG, and production QA.',
      href: '#case-courts',
    },
    {
      title: 'NLP Engineer',
      org: 'TCM-GO — Municipal Court of Accounts of Goiás',
      summary: 'Chat/NLP with reported R$1.8M savings. Medallion, MLOps, legal RAG.',
      href: '#case-courts',
    },
    {
      title: 'CEO & Co-Founder',
      org: 'Pergunt.ai',
      period: '2023',
      summary: 'Edtech GenAI: original public-exam questions and a recommendation layer on student performance.',
      href: '#ventures',
    },
  ],
  education: [
    {
      title: 'B.S. in Artificial Intelligence',
      org: 'Federal University of Goiás (UFG)',
      period: '2023 — 2027',
      note: 'First AI undergraduate program in Latin America. In progress.',
    },
  ],
  publicationsAccepted: [
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'ICLR 2026 · MemAgents Workshop (Oral)',
      note: 'Episodic memory, compression boundaries, and latent representation in LLM agents.',
    },
    {
      title: 'Steering-Conditioned LoRA via Sparse Autoencoders',
      venue: 'ICML 2026 · CoLoRAI Workshop (Poster)',
      note: 'Efficient post-training (LoRA) composed with sparse autoencoders for conditioned steering.',
    },
    {
      title:
        'AKCIT-UFG at SemEval-2026 Task 8: Structured Chunking and Optimized Query Reformulation for Efficient Multi-Turn Retrieval',
      venue: 'ACL 2026 · SemEval Workshop',
      note: 'Structured chunking and query reformulation for multi-turn retrieval.',
    },
  ],
  publicationsReview: [
    {
      title: 'ECHO: A Latent Register Axis Composes with Prompting for Persona-Conditioned Generation',
      venue: 'ACL ARR 2026 August · under review',
      note: 'A latent register axis composed with prompting for persona-conditioned generation.',
    },
    {
      title: 'Episodic Memory from Compression Boundaries in Latent Representation Space',
      venue: 'AACL-IJCNLP 2026 · under review',
      note: 'Conference version of the episodic-memory work presented at ICLR MemAgents.',
    },
  ],
  ventures: [
    {
      name: 'Pergunt.ai',
      blurb: 'Edtech GenAI for personalized public-exam question generation and learning insights.',
    },
    {
      name: 'Validoo',
      blurb: 'Compliance SaaS for road freight — regulatory workflows for carriers, brokers, and drivers.',
    },
    {
      name: 'PUMP',
      blurb: 'iOS photo product: on-device Core ML looks + generative AI features, built end-to-end.',
    },
  ],
};
