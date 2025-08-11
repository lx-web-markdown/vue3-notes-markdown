const highSchoolWordList = [
  // 学术词汇
  { id: 1, text: 'analyze', phonetic: 'ˈænəlaɪz', meaning: '分析' },
  { id: 2, text: 'research', phonetic: 'rɪˈsɜːtʃ', meaning: '研究' },
  { id: 3, text: 'experiment', phonetic: 'ɪkˈsperɪmənt', meaning: '实验' },
  { id: 4, text: 'theory', phonetic: 'ˈθɪəri', meaning: '理论' },
  { id: 5, text: 'hypothesis', phonetic: 'haɪˈpɒθəsɪs', meaning: '假设' },

  // 社会科学
  { id: 6, text: 'society', phonetic: 'səˈsaɪəti', meaning: '社会' },
  { id: 7, text: 'culture', phonetic: 'ˈkʌltʃə', meaning: '文化' },
  { id: 8, text: 'economy', phonetic: 'ɪˈkɒnəmi', meaning: '经济' },
  { id: 9, text: 'government', phonetic: 'ˈɡʌvənmənt', meaning: '政府' },
  { id: 10, text: 'population', phonetic: 'ˌpɒpjuˈleɪʃn', meaning: '人口' },

  // 新增：高中数学
  { id: 11, text: 'equation', phonetic: 'ɪˈkweɪʒn', meaning: '方程' },
  { id: 12, text: 'geometry', phonetic: 'dʒiˈɒmətri', meaning: '几何' },
  { id: 13, text: 'algebra', phonetic: 'ˈældʒɪbrə', meaning: '代数' },
  { id: 14, text: 'calculus', phonetic: 'ˈkælkjələs', meaning: '微积分' },
  { id: 15, text: 'probability', phonetic: 'ˌprɒbəˈbɪləti', meaning: '概率' },

  // 新增：高中物理
  { id: 16, text: 'velocity', phonetic: 'vəˈlɒsəti', meaning: '速度' },
  { id: 17, text: 'acceleration', phonetic: 'əkˌseləˈreɪʃn', meaning: '加速度' },
  { id: 18, text: 'gravity', phonetic: 'ˈɡrævəti', meaning: '重力' },
  { id: 19, text: 'momentum', phonetic: 'ˈməʊməntəm', meaning: '动量' },
  { id: 20, text: 'friction', phonetic: 'ˈfrɪkʃn', meaning: '摩擦力' },

  // 新增：高中化学
  { id: 21, text: 'element', phonetic: 'ˈelɪmənt', meaning: '元素' },
  { id: 22, text: 'compound', phonetic: 'ˈkɒmpaʊnd', meaning: '化合物' },
  { id: 23, text: 'reaction', phonetic: 'riˈækʃn', meaning: '反应' },
  { id: 24, text: 'solution', phonetic: 'səˈluːʃn', meaning: '溶液' },
  { id: 25, text: 'molecule', phonetic: 'ˈmɒlɪkjuːl', meaning: '分子' },

  // 新增：高中生物
  { id: 26, text: 'evolution', phonetic: 'ˌiːvəˈluːʃn', meaning: '进化' },
  { id: 27, text: 'genetics', phonetic: 'dʒəˈnetɪks', meaning: '遗传学' },
  { id: 28, text: 'organism', phonetic: 'ˈɔːɡənɪzəm', meaning: '生物' },
  { id: 29, text: 'ecosystem', phonetic: 'ˈiːkəʊsɪstəm', meaning: '生态系统' },
  { id: 30, text: 'photosynthesis', phonetic: 'ˌfəʊtəʊˈsɪnθəsɪs', meaning: '光合作用' },

  // 新增：文学术语
  { id: 31, text: 'metaphor', phonetic: 'ˈmetəfə', meaning: '隐喻' },
  { id: 32, text: 'symbolism', phonetic: 'ˈsɪmbəlɪzəm', meaning: '象征主义' },
  { id: 33, text: 'narrative', phonetic: 'ˈnærətɪv', meaning: '叙述' },
  { id: 34, text: 'character', phonetic: 'ˈkærəktə', meaning: '人物' },
  { id: 35, text: 'theme', phonetic: 'θiːm', meaning: '主题' },

  // 新增：历史术语
  { id: 36, text: 'revolution', phonetic: 'ˌrevəˈluːʃn', meaning: '革命' },
  { id: 37, text: 'civilization', phonetic: 'ˌsɪvəlaɪˈzeɪʃn', meaning: '文明' },
  { id: 38, text: 'democracy', phonetic: 'dɪˈmɒkrəsi', meaning: '民主' },
  { id: 39, text: 'empire', phonetic: 'ˈempaɪə', meaning: '帝国' },
  { id: 40, text: 'dynasty', phonetic: 'ˈdɪnəsti', meaning: '王朝' },

  // 新增：地理术语
  { id: 41, text: 'continent', phonetic: 'ˈkɒntɪnənt', meaning: '大陆' },
  { id: 42, text: 'climate', phonetic: 'ˈklaɪmət', meaning: '气候' },
  { id: 43, text: 'latitude', phonetic: 'ˈlætɪtjuːd', meaning: '纬度' },
  { id: 44, text: 'longitude', phonetic: 'ˈlɒŋɡɪtjuːd', meaning: '经度' },
  { id: 45, text: 'atmosphere', phonetic: 'ˈætməsfɪə', meaning: '大气' },

  // 新增：经济术语
  { id: 46, text: 'supply', phonetic: 'səˈplaɪ', meaning: '供给' },
  { id: 47, text: 'demand', phonetic: 'dɪˈmɑːnd', meaning: '需求' },
  { id: 48, text: 'market', phonetic: 'ˈmɑːkɪt', meaning: '市场' },
  { id: 49, text: 'trade', phonetic: 'treɪd', meaning: '贸易' },
  { id: 50, text: 'inflation', phonetic: 'ɪnˈfleɪʃn', meaning: '通货膨胀' },

  // 新增：计算机术语
  { id: 51, text: 'program', phonetic: 'ˈprəʊɡræm', meaning: '程序' },
  { id: 52, text: 'software', phonetic: 'ˈsɒftweə', meaning: '软件' },
  { id: 53, text: 'hardware', phonetic: 'ˈhɑːdweə', meaning: '硬件' },
  { id: 54, text: 'database', phonetic: 'ˈdeɪtəbeɪs', meaning: '数据库' },
  { id: 55, text: 'network', phonetic: 'ˈnetwɜːk', meaning: '网络' },

  // 新增：艺术术语
  { id: 56, text: 'composition', phonetic: 'ˌkɒmpəˈzɪʃn', meaning: '构图' },
  { id: 57, text: 'perspective', phonetic: 'pəˈspektɪv', meaning: '透视' },
  { id: 58, text: 'contrast', phonetic: 'ˈkɒntrɑːst', meaning: '对比' },
  { id: 59, text: 'harmony', phonetic: 'ˈhɑːməni', meaning: '和谐' },
  { id: 60, text: 'rhythm', phonetic: 'ˈrɪðəm', meaning: '节奏' },

  // 新增：心理学术语
  { id: 61, text: 'behavior', phonetic: 'bɪˈheɪvjə', meaning: '行为' },
  { id: 62, text: 'emotion', phonetic: 'ɪˈməʊʃn', meaning: '情感' },
  { id: 63, text: 'memory', phonetic: 'ˈmeməri', meaning: '记忆' },
  { id: 64, text: 'personality', phonetic: 'ˌpɜːsəˈnæləti', meaning: '性格' },
  { id: 65, text: 'motivation', phonetic: 'ˌməʊtɪˈveɪʃn', meaning: '动机' },

  // 新增：体育术语
  { id: 66, text: 'competition', phonetic: 'ˌkɒmpəˈtɪʃn', meaning: '比赛' },
  { id: 67, text: 'strategy', phonetic: 'ˈstrætədʒi', meaning: '策略' },
  { id: 68, text: 'teamwork', phonetic: 'ˈtiːmwɜːk', meaning: '团队合作' },
  { id: 69, text: 'athlete', phonetic: 'ˈæθliːt', meaning: '运动员' },
  { id: 70, text: 'championship', phonetic: 'ˈtʃæmpiənʃɪp', meaning: '冠军赛' },

  // 新增：医学术语
  { id: 71, text: 'symptom', phonetic: 'ˈsɪmptəm', meaning: '症状' },
  { id: 72, text: 'diagnosis', phonetic: 'ˌdaɪəɡˈnəʊsɪs', meaning: '诊断' },
  { id: 73, text: 'treatment', phonetic: 'ˈtriːtmənt', meaning: '治疗' },
  { id: 74, text: 'prevention', phonetic: 'prɪˈvenʃn', meaning: '预防' },
  { id: 75, text: 'medicine', phonetic: 'ˈmedsɪn', meaning: '药物' },

  // 新增：环境科学
  { id: 76, text: 'pollution', phonetic: 'pəˈluːʃn', meaning: '污染' },
  { id: 77, text: 'conservation', phonetic: 'ˌkɒnsəˈveɪʃn', meaning: '保护' },
  { id: 78, text: 'renewable', phonetic: 'rɪˈnjuːəbl', meaning: '可再生的' },
  { id: 79, text: 'sustainable', phonetic: 'səˈsteɪnəbl', meaning: '可持续的' },
  { id: 80, text: 'biodiversity', phonetic: 'ˌbaɪəʊdaɪˈvɜːsəti', meaning: '生物多样性' }
];

export default highSchoolWordList;
