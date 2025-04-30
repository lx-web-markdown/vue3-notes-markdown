const collegeWordList = [
  // 学术研究
  { id: 1, text: 'dissertation', phonetic: 'ˌdɪsəˈteɪʃn', meaning: '论文' },
  { id: 2, text: 'methodology', phonetic: 'ˌmeθəˈdɒlədʒi', meaning: '方法论' },
  { id: 3, text: 'paradigm', phonetic: 'ˈpærədaɪm', meaning: '范式' },
  { id: 4, text: 'empirical', phonetic: 'ɪmˈpɪrɪkl', meaning: '实证的' },
  { id: 5, text: 'hypothesis', phonetic: 'haɪˈpɒθəsɪs', meaning: '假设' },

  // 哲学思维
  { id: 6, text: 'metaphysics', phonetic: 'ˌmetəˈfɪzɪks', meaning: '形而上学' },
  { id: 7, text: 'epistemology', phonetic: 'ɪˌpɪstɪˈmɒlədʒi', meaning: '认识论' },
  { id: 8, text: 'ontology', phonetic: 'ɒnˈtɒlədʒi', meaning: '本体论' },
  { id: 9, text: 'phenomenology', phonetic: 'fɪˌnɒmɪˈnɒlədʒi', meaning: '现象学' },
  { id: 10, text: 'hermeneutics', phonetic: 'ˌhɜːmɪˈnjuːtɪks', meaning: '解释学' },

  // 社会科学
  { id: 11, text: 'anthropology', phonetic: 'ˌænθrəˈpɒlədʒi', meaning: '人类学' },
  { id: 12, text: 'sociology', phonetic: 'ˌsəʊsiˈɒlədʒi', meaning: '社会学' },
  { id: 13, text: 'psychology', phonetic: 'saɪˈkɒlədʒi', meaning: '心理学' },
  { id: 14, text: 'linguistics', phonetic: 'lɪŋˈɡwɪstɪks', meaning: '语言学' },
  { id: 15, text: 'archaeology', phonetic: 'ˌɑːkiˈɒlədʒi', meaning: '考古学' },

  // 经济金融
  { id: 16, text: 'macroeconomics', phonetic: 'ˌmækrəʊˌiːkəˈnɒmɪks', meaning: '宏观经济学' },
  { id: 17, text: 'microeconomics', phonetic: 'ˌmaɪkrəʊˌiːkəˈnɒmɪks', meaning: '微观经济学' },
  { id: 18, text: 'econometrics', phonetic: 'ˌiːkəʊˈmetrɪks', meaning: '计量经济学' },
  { id: 19, text: 'derivatives', phonetic: 'dɪˈrɪvətɪvz', meaning: '衍生品' },
  { id: 20, text: 'portfolio', phonetic: 'pɔːtˈfəʊliəʊ', meaning: '投资组合' },

  // 政治法律
  { id: 21, text: 'jurisprudence', phonetic: 'ˌdʒʊərɪsˈpruːdns', meaning: '法理学' },
  { id: 22, text: 'constitution', phonetic: 'ˌkɒnstɪˈtjuːʃn', meaning: '宪法' },
  { id: 23, text: 'legislation', phonetic: 'ˌledʒɪsˈleɪʃn', meaning: '立法' },
  { id: 24, text: 'sovereignty', phonetic: 'ˈsɒvrənti', meaning: '主权' },
  { id: 25, text: 'diplomacy', phonetic: 'dɪˈpləʊməsi', meaning: '外交' },

  // 医学术语
  { id: 26, text: 'pathology', phonetic: 'pəˈθɒlədʒi', meaning: '病理学' },
  { id: 27, text: 'epidemiology', phonetic: 'ˌepɪˌdiːmiˈɒlədʒi', meaning: '流行病学' },
  { id: 28, text: 'immunology', phonetic: 'ˌɪmjuˈnɒlədʒi', meaning: '免疫学' },
  { id: 29, text: 'pharmacology', phonetic: 'ˌfɑːməˈkɒlədʒi', meaning: '药理学' },
  { id: 30, text: 'neurology', phonetic: 'njʊˈrɒlədʒi', meaning: '神经学' },

  // 工程技术
  { id: 31, text: 'algorithm', phonetic: 'ˈælɡərɪðəm', meaning: '算法' },
  { id: 32, text: 'cybernetics', phonetic: 'ˌsaɪbəˈnetɪks', meaning: '控制论' },
  { id: 33, text: 'robotics', phonetic: 'rəʊˈbɒtɪks', meaning: '机器人学' },
  { id: 34, text: 'nanotechnology', phonetic: 'ˌnænəʊtekˈnɒlədʒi', meaning: '纳米技术' },
  { id: 35, text: 'biotechnology', phonetic: 'ˌbaɪəʊtekˈnɒlədʒi', meaning: '生物技术' },

  // 环境科学
  { id: 36, text: 'sustainability', phonetic: 'səˌsteɪnəˈbɪləti', meaning: '可持续性' },
  { id: 37, text: 'biodegradable', phonetic: 'ˌbaɪəʊdɪˈɡreɪdəbl', meaning: '可生物降解的' },
  { id: 38, text: 'ecosystem', phonetic: 'ˈiːkəʊsɪstəm', meaning: '生态系统' },
  { id: 39, text: 'biodiversity', phonetic: 'ˌbaɪəʊdaɪˈvɜːsəti', meaning: '生物多样性' },
  { id: 40, text: 'conservation', phonetic: 'ˌkɒnsəˈveɪʃn', meaning: '环境保护' },

  // 商业管理
  { id: 41, text: 'entrepreneurship', phonetic: 'ˌɒntrəprəˈnɜːʃɪp', meaning: '创业精神' },
  { id: 42, text: 'management', phonetic: 'ˈmænɪdʒmənt', meaning: '管理' },
  { id: 43, text: 'marketing', phonetic: 'ˈmɑːkɪtɪŋ', meaning: '市场营销' },
  { id: 44, text: 'logistics', phonetic: 'ləˈdʒɪstɪks', meaning: '物流' },
  { id: 45, text: 'procurement', phonetic: 'prəˈkjʊəmənt', meaning: '采购' },

  // 数学统计
  { id: 46, text: 'statistics', phonetic: 'stəˈtɪstɪks', meaning: '统计学' },
  { id: 47, text: 'probability', phonetic: 'ˌprɒbəˈbɪləti', meaning: '概率' },
  { id: 48, text: 'calculus', phonetic: 'ˈkælkjələs', meaning: '微积分' },
  { id: 49, text: 'algebra', phonetic: 'ˈældʒɪbrə', meaning: '代数' },
  { id: 50, text: 'geometry', phonetic: 'dʒiˈɒmətri', meaning: '几何' },

  // 艺术设计
  { id: 51, text: 'aesthetics', phonetic: 'iːsˈθetɪks', meaning: '美学' },
  { id: 52, text: 'composition', phonetic: 'ˌkɒmpəˈzɪʃn', meaning: '构图' },
  { id: 53, text: 'architecture', phonetic: 'ˈɑːkɪtektʃə', meaning: '建筑学' },
  { id: 54, text: 'typography', phonetic: 'taɪˈpɒɡrəfi', meaning: '字体设计' },
  { id: 55, text: 'multimedia', phonetic: 'ˌmʌltiˈmiːdiə', meaning: '多媒体' },

  // 心理学术语
  { id: 56, text: 'cognition', phonetic: 'kɒɡˈnɪʃn', meaning: '认知' },
  { id: 57, text: 'perception', phonetic: 'pəˈsepʃn', meaning: '知觉' },
  { id: 58, text: 'consciousness', phonetic: 'ˈkɒnʃəsnəs', meaning: '意识' },
  { id: 59, text: 'behaviorism', phonetic: 'bɪˈheɪvjərɪzəm', meaning: '行为主义' },
  { id: 60, text: 'psychoanalysis', phonetic: 'ˌsaɪkəʊəˈnæləsɪs', meaning: '精神分析' },

  // 地球科学
  { id: 61, text: 'geology', phonetic: 'dʒiˈɒlədʒi', meaning: '地质学' },
  { id: 62, text: 'meteorology', phonetic: 'ˌmiːtiəˈrɒlədʒi', meaning: '气象学' },
  { id: 63, text: 'oceanography', phonetic: 'ˌəʊʃiˈɒɡrəfi', meaning: '海洋学' },
  { id: 64, text: 'seismology', phonetic: 'saɪzˈmɒlədʒi', meaning: '地震学' },
  { id: 65, text: 'mineralogy', phonetic: 'ˌmɪnəˈrælədʒi', meaning: '矿物学' },

  // 化学术语
  { id: 66, text: 'catalyst', phonetic: 'ˈkætəlɪst', meaning: '催化剂' },
  { id: 67, text: 'polymer', phonetic: 'ˈpɒlɪmə', meaning: '聚合物' },
  { id: 68, text: 'isotope', phonetic: 'ˈaɪsətəʊp', meaning: '同位素' },
  { id: 69, text: 'molecule', phonetic: 'ˈmɒlɪkjuːl', meaning: '分子' },
  { id: 70, text: 'compound', phonetic: 'ˈkɒmpaʊnd', meaning: '化合物' },

  // 物理学术语
  { id: 71, text: 'quantum', phonetic: 'ˈkwɒntəm', meaning: '量子' },
  { id: 72, text: 'relativity', phonetic: 'ˌreləˈtɪvəti', meaning: '相对论' },
  { id: 73, text: 'thermodynamics', phonetic: 'ˌθɜːməʊdaɪˈnæmɪks', meaning: '热力学' },
  { id: 74, text: 'mechanics', phonetic: 'mɪˈkænɪks', meaning: '力学' },
  { id: 75, text: 'electromagnetism', phonetic: 'ɪˌlektrəʊˈmæɡnətɪzəm', meaning: '电磁学' },

  // 生物学术语
  { id: 76, text: 'genetics', phonetic: 'dʒəˈnetɪks', meaning: '遗传学' },
  { id: 77, text: 'evolution', phonetic: 'ˌiːvəˈluːʃn', meaning: '进化' },
  { id: 78, text: 'metabolism', phonetic: 'məˈtæbəlɪzəm', meaning: '新陈代谢' },
  { id: 79, text: 'chromosome', phonetic: 'ˈkrəʊməsəʊm', meaning: '染色体' },
  { id: 80, text: 'photosynthesis', phonetic: 'ˌfəʊtəʊˈsɪnθəsɪs', meaning: '光合作用' }
];

export default collegeWordList; 