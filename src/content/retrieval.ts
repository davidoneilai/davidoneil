import type { Locale } from './types';
import type { PassageKind } from './passages';

export interface RetrievalCopy {
  label: string;
  title: string;
  lede: string;
  placeholder: string;
  submit: string;
  suggestions: string[];
  modeLexical: string;
  modeHybrid: string;
  loadDense: string;
  loading: string;
  denseError: string;
  noResults: string;
  mapLabel: string;
  queryLabel: string;
  note: string;
  kinds: Record<PassageKind, string>;
}

export const retrievalByLocale: Record<Locale, RetrievalCopy> = {
  pt: {
    label: 'Retrieval · RAG',
    title: 'Pergunte ao meu currículo',
    lede: 'Busca híbrida com a mesma arquitetura que coloquei em produção no TCE-GO: BM25 lexical + recuperação densa, fundidas por Reciprocal Rank Fusion. O mapa ao lado é um UMAP das embeddings reais de cada trecho do currículo.',
    placeholder: 'ex.: quem já trabalhou com Sparse Autoencoders?',
    submit: 'buscar',
    suggestions: ['experiência com GPUs Blackwell', 'busca jurídica em produção', 'memória episódica em agentes', 'quanto de economia gerou?'],
    modeLexical: 'modo lexical · BM25',
    modeHybrid: 'modo híbrido · BM25 + denso (RRF)',
    loadDense: 'ativar busca densa · multilingual-e5-small (118 MB)',
    loading: 'baixando o modelo… {p}%',
    denseError: 'não foi possível carregar o modelo; seguindo só com BM25',
    noResults: 'nenhum trecho relevante. Tente outras palavras.',
    mapLabel: 'mapa latente · UMAP das embeddings',
    queryLabel: 'sua pergunta',
    note: 'As embeddings dos trechos foram geradas no build com o multilingual-e5-small e projetadas com UMAP. Na busca densa, a sua pergunta é embedada no seu navegador (WebAssembly); nada é enviado a um servidor.',
    kinds: {
      profile: 'perfil',
      experience: 'experiência',
      case: 'case',
      paper: 'paper',
      oss: 'open source',
      venture: 'produto',
      education: 'formação',
      skills: 'skills',
    },
  },
  en: {
    label: 'Retrieval · RAG',
    title: 'Ask my résumé',
    lede: 'Hybrid search with the same architecture I shipped at TCE-GO: lexical BM25 + dense retrieval, fused with Reciprocal Rank Fusion. The map is a UMAP of the real embeddings of every passage in this résumé.',
    placeholder: 'e.g. who has worked with Sparse Autoencoders?',
    submit: 'search',
    suggestions: ['experience with Blackwell GPUs', 'legal search in production', 'episodic memory for agents', 'how much did it save?'],
    modeLexical: 'lexical mode · BM25',
    modeHybrid: 'hybrid mode · BM25 + dense (RRF)',
    loadDense: 'enable dense search · multilingual-e5-small (118 MB)',
    loading: 'downloading the model… {p}%',
    denseError: 'could not load the model; continuing with BM25 only',
    noResults: 'no relevant passage. Try other words.',
    mapLabel: 'latent map · UMAP of the embeddings',
    queryLabel: 'your query',
    note: 'Passage embeddings were computed at build time with multilingual-e5-small and projected with UMAP. With dense search on, your query is embedded in your browser (WebAssembly); nothing is sent to a server.',
    kinds: {
      profile: 'profile',
      experience: 'experience',
      case: 'case',
      paper: 'paper',
      oss: 'open source',
      venture: 'product',
      education: 'education',
      skills: 'skills',
    },
  },
  zh: {
    label: '检索 · RAG',
    title: '向我的简历提问',
    lede: '混合检索，与我在 TCE-GO 投入生产的架构相同：词汇 BM25 + 稠密检索，再用 Reciprocal Rank Fusion 融合。右侧地图是本简历每个段落真实嵌入的 UMAP 投影。',
    placeholder: '例如：谁做过 Sparse Autoencoders？',
    submit: '搜索',
    suggestions: ['Blackwell GPU 经验', '生产环境中的法律检索', '智能体的情景记忆', '节省了多少成本？'],
    modeLexical: '词汇模式 · BM25',
    modeHybrid: '混合模式 · BM25 + 稠密 (RRF)',
    loadDense: '启用稠密检索 · multilingual-e5-small (118 MB)',
    loading: '正在下载模型… {p}%',
    denseError: '模型加载失败，继续仅使用 BM25',
    noResults: '没有相关段落，换个说法试试。',
    mapLabel: '潜空间地图 · 嵌入的 UMAP',
    queryLabel: '你的问题',
    note: '段落嵌入在构建时由 multilingual-e5-small 生成并用 UMAP 投影。启用稠密检索后，你的问题在浏览器中（WebAssembly）完成嵌入，不会发送到任何服务器。',
    kinds: {
      profile: '简介',
      experience: '经历',
      case: '案例',
      paper: '论文',
      oss: '开源',
      venture: '产品',
      education: '教育',
      skills: '技能',
    },
  },
};
