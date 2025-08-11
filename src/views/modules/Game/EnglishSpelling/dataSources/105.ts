const graduateWordList = [
  // 研究方法论
  { id: 1, text: 'epistemological', phonetic: 'ɪˌpɪstɪməˈlɒdʒɪkl', meaning: '认识论的' },
  { id: 2, text: 'heuristic', phonetic: 'hjʊəˈrɪstɪk', meaning: '启发式的' },
  { id: 3, text: 'phenomenological', phonetic: 'fɪˌnɒmɪˈnɒlədʒɪkl', meaning: '现象学的' },
  { id: 4, text: 'dialectical', phonetic: 'ˌdaɪəˈlektɪkl', meaning: '辩证的' },
  { id: 5, text: 'hermeneutical', phonetic: 'ˌhɜːmɪˈnjuːtɪkl', meaning: '解释学的' },

  // 研究过程
  { id: 6, text: 'conceptualization', phonetic: 'kənˌseptʃuəlaɪˈzeɪʃn', meaning: '概念化' },
  { id: 7, text: 'operationalization', phonetic: 'ˌɒpəreɪʃənəlaɪˈzeɪʃn', meaning: '操作化' },
  { id: 8, text: 'triangulation', phonetic: 'traɪˌæŋɡjuˈleɪʃn', meaning: '三角验证' },
  { id: 9, text: 'replicability', phonetic: 'ˌreplɪkəˈbɪləti', meaning: '可重复性' },
  { id: 10, text: 'generalizability', phonetic: 'ˌdʒenrəlaɪzəˈbɪləti', meaning: '可推广性' },

  // 统计分析
  { id: 11, text: 'multicollinearity', phonetic: 'ˌmʌltɪkəˌlɪnɪˈærəti', meaning: '多重共线性' },
  { id: 12, text: 'heteroscedasticity', phonetic: 'ˌhetərəʊskədæsˈtɪsəti', meaning: '异方差性' },
  { id: 13, text: 'autocorrelation', phonetic: 'ˌɔːtəʊkɒrəˈleɪʃn', meaning: '自相关' },
  { id: 14, text: 'endogeneity', phonetic: 'ˌendəʊdʒəˈniːəti', meaning: '内生性' },
  { id: 15, text: 'stochastic', phonetic: 'stəˈkæstɪk', meaning: '随机的' },

  // 研究设计
  { id: 16, text: 'counterfactual', phonetic: 'ˌkaʊntəˈfæktʃuəl', meaning: '反事实的' },
  { id: 17, text: 'longitudinal', phonetic: 'ˌlɒndʒɪˈtjuːdɪnl', meaning: '纵向的' },
  { id: 18, text: 'cross-sectional', phonetic: 'krɒs ˈsekʃənl', meaning: '横截面的' },
  { id: 19, text: 'quasi-experimental', phonetic: 'ˌkweɪzaɪ ɪkˌsperɪˈmentl', meaning: '准实验的' },
  { id: 20, text: 'ethnographic', phonetic: 'ˌeθnəˈɡræfɪk', meaning: '民族志的' },

  // 理论框架
  { id: 21, text: 'constructivism', phonetic: 'kənˈstrʌktɪvɪzəm', meaning: '建构主义' },
  { id: 22, text: 'positivism', phonetic: 'ˈpɒzətɪvɪzəm', meaning: '实证主义' },
  { id: 23, text: 'structuralism', phonetic: 'ˈstrʌktʃərəlɪzəm', meaning: '结构主义' },
  { id: 24, text: 'functionalism', phonetic: 'ˈfʌŋkʃənəlɪzəm', meaning: '功能主义' },
  { id: 25, text: 'determinism', phonetic: 'dɪˈtɜːmɪnɪzəm', meaning: '决定论' },

  // 高级数学
  { id: 26, text: 'eigenvalue', phonetic: 'ˈaɪɡənvæljuː', meaning: '特征值' },
  { id: 27, text: 'orthogonal', phonetic: 'ɔːˈθɒɡənl', meaning: '正交的' },
  { id: 28, text: 'polynomial', phonetic: 'ˌpɒlɪˈnəʊmiəl', meaning: '多项式' },
  { id: 29, text: 'differential', phonetic: 'ˌdɪfəˈrenʃl', meaning: '微分的' },
  { id: 30, text: 'logarithmic', phonetic: 'ˌlɒɡəˈrɪðmɪk', meaning: '对数的' },

  // 高级物理
  { id: 31, text: 'entanglement', phonetic: 'ɪnˈtæŋɡlmənt', meaning: '量子纠缠' },
  { id: 32, text: 'supersymmetry', phonetic: 'ˌsuːpəˈsɪmətri', meaning: '超对称性' },
  { id: 33, text: 'perturbation', phonetic: 'ˌpɜːtəˈbeɪʃn', meaning: '微扰' },
  { id: 34, text: 'holographic', phonetic: 'ˌhɒləˈɡræfɪk', meaning: '全息的' },
  { id: 35, text: 'renormalization', phonetic: 'riːˌnɔːməlaɪˈzeɪʃn', meaning: '重整化' },

  // 高级化学
  { id: 36, text: 'stereochemistry', phonetic: 'ˌsteriəʊˈkemɪstri', meaning: '立体化学' },
  { id: 37, text: 'spectroscopy', phonetic: 'spekˈtrɒskəpi', meaning: '光谱学' },
  { id: 38, text: 'chromatography', phonetic: 'ˌkrəʊməˈtɒɡrəfi', meaning: '色谱法' },
  { id: 39, text: 'crystallography', phonetic: 'ˌkrɪstəˈlɒɡrəfi', meaning: '晶体学' },
  { id: 40, text: 'stoichiometry', phonetic: 'ˌstɔɪkiˈɒmətri', meaning: '化学计量学' },

  // 高级生物
  { id: 41, text: 'proteomics', phonetic: 'ˌprəʊtiˈɒmɪks', meaning: '蛋白质组学' },
  { id: 42, text: 'genomics', phonetic: 'dʒɪˈnəʊmɪks', meaning: '基因组学' },
  { id: 43, text: 'epigenetics', phonetic: 'ˌepɪdʒəˈnetɪks', meaning: '表观遗传学' },
  { id: 44, text: 'bioinformatics', phonetic: 'ˌbaɪəʊɪnfəˈmætɪks', meaning: '生物信息学' },
  { id: 45, text: 'metabolomics', phonetic: 'ˌmetəbəˈlɒmɪks', meaning: '代谢组学' },

  // 高级经济
  { id: 46, text: 'stochastic', phonetic: 'stəˈkæstɪk', meaning: '随机的' },
  { id: 47, text: 'heterogeneity', phonetic: 'ˌhetərədʒəˈniːəti', meaning: '异质性' },
  { id: 48, text: 'cointegration', phonetic: 'kəʊˌɪntɪˈɡreɪʃn', meaning: '协整' },
  { id: 49, text: 'endogenous', phonetic: 'enˈdɒdʒənəs', meaning: '内生的' },
  { id: 50, text: 'exogenous', phonetic: 'ekˈsɒdʒənəs', meaning: '外生的' },

  // 高级计算机
  { id: 51, text: 'parallelization', phonetic: 'ˌpærəlelaɪˈzeɪʃn', meaning: '并行化' },
  { id: 52, text: 'virtualization', phonetic: 'ˌvɜːtʃuəlaɪˈzeɪʃn', meaning: '虚拟化' },
  { id: 53, text: 'cryptography', phonetic: 'krɪpˈtɒɡrəfi', meaning: '密码学' },
  { id: 54, text: 'optimization', phonetic: 'ˌɒptɪmaɪˈzeɪʃn', meaning: '优化' },
  { id: 55, text: 'abstraction', phonetic: 'æbˈstrækʃn', meaning: '抽象化' },

  // 高级神经科学
  { id: 56, text: 'neuroplasticity', phonetic: 'ˌnjʊərəʊplæˈstɪsəti', meaning: '神经可塑性' },
  { id: 57, text: 'synaptogenesis', phonetic: 'sɪˌnæptəˈdʒenəsɪs', meaning: '突触形成' },
  { id: 58, text: 'neurodegeneration', phonetic: 'ˌnjʊərəʊdɪˌdʒenəˈreɪʃn', meaning: '神经退化' },
  { id: 59, text: 'neurotransmitter', phonetic: 'ˌnjʊərəʊtrænsˈmɪtə', meaning: '神经递质' },
  { id: 60, text: 'neurogenesis', phonetic: 'ˌnjʊərəʊˈdʒenəsɪs', meaning: '神经发生' },

  // 高级材料科学
  { id: 61, text: 'nanostructure', phonetic: 'ˈnænəʊstrʌktʃə', meaning: '纳米结构' },
  { id: 62, text: 'metamaterial', phonetic: 'ˌmetəməˈtɪəriəl', meaning: '超材料' },
  { id: 63, text: 'piezoelectric', phonetic: 'paɪˌiːzəʊɪˈlektrɪk', meaning: '压电的' },
  { id: 64, text: 'superconductivity', phonetic: 'ˌsuːpəkɒndʌkˈtɪvəti', meaning: '超导性' },
  { id: 65, text: 'biomimetic', phonetic: 'ˌbaɪəʊmɪˈmetɪk', meaning: '仿生的' },

  // 高级环境科学
  { id: 66, text: 'biogeochemistry', phonetic: 'ˌbaɪəʊdʒiːəʊˈkemɪstri', meaning: '生物地球化学' },
  { id: 67, text: 'ecotoxicology', phonetic: 'ˌiːkəʊtɒksɪˈkɒlədʒi', meaning: '生态毒理学' },
  { id: 68, text: 'bioaccumulation', phonetic: 'ˌbaɪəʊəˌkjuːmjʊˈleɪʃn', meaning: '生物积累' },
  { id: 69, text: 'eutrophication', phonetic: 'juːˌtrɒfɪˈkeɪʃn', meaning: '富营养化' },
  { id: 70, text: 'phytoremediation', phonetic: 'ˌfaɪtəʊrɪˌmiːdiˈeɪʃn', meaning: '植物修复' },

  // 高级天体物理
  { id: 71, text: 'cosmological', phonetic: 'ˌkɒzməˈlɒdʒɪkl', meaning: '宇宙学的' },
  { id: 72, text: 'gravitational', phonetic: 'ˌɡrævɪˈteɪʃənl', meaning: '引力的' },
  { id: 73, text: 'astrophysical', phonetic: 'ˌæstrəʊˈfɪzɪkl', meaning: '天体物理的' },
  { id: 74, text: 'interstellar', phonetic: 'ˌɪntəˈstelə', meaning: '星际的' },
  { id: 75, text: 'astronomical', phonetic: 'ˌæstrəˈnɒmɪkl', meaning: '天文的' },

  // 高级哲学
  { id: 76, text: 'metaphysical', phonetic: 'ˌmetəˈfɪzɪkl', meaning: '形而上学的' },
  { id: 77, text: 'ontological', phonetic: 'ˌɒntəˈlɒdʒɪkl', meaning: '本体论的' },
  { id: 78, text: 'existential', phonetic: 'ˌeɡzɪˈstenʃl', meaning: '存在主义的' },
  { id: 79, text: 'phenomenological', phonetic: 'fɪˌnɒmɪˈnɒlədʒɪkl', meaning: '现象学的' },
  { id: 80, text: 'epistemological', phonetic: 'ɪˌpɪstɪməˈlɒdʒɪkl', meaning: '认识论的' }
];

export default graduateWordList;