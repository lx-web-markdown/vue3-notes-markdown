const middleWordList = [
  // 学术词汇
  { id: 1, text: 'analyze', phonetic: 'ˈænəlaɪz', meaning: '分析' },
  { id: 2, text: 'research', phonetic: 'rɪˈsɜːtʃ', meaning: '研究' },
  { id: 3, text: 'experiment', phonetic: 'ɪkˈsperɪmənt', meaning: '实验' },
  { id: 4, text: 'theory', phonetic: 'ˈθɪəri', meaning: '理论' },
  { id: 5, text: 'hypothesis', phonetic: 'haɪˈpɒθəsɪs', meaning: '假设' },
  { id: 6, text: 'conclusion', phonetic: 'kənˈkluːʒn', meaning: '结论' },
  { id: 7, text: 'evidence', phonetic: 'ˈevɪdəns', meaning: '证据' },
  { id: 8, text: 'method', phonetic: 'ˈmeθəd', meaning: '方法' },
  { id: 9, text: 'process', phonetic: 'ˈprəʊses', meaning: '过程' },
  { id: 10, text: 'data', phonetic: 'ˈdeɪtə', meaning: '数据' },

  // 社会科学
  { id: 11, text: 'society', phonetic: 'səˈsaɪəti', meaning: '社会' },
  { id: 12, text: 'culture', phonetic: 'ˈkʌltʃə', meaning: '文化' },
  { id: 13, text: 'economy', phonetic: 'ɪˈkɒnəmi', meaning: '经济' },
  { id: 14, text: 'government', phonetic: 'ˈɡʌvənmənt', meaning: '政府' },
  { id: 15, text: 'population', phonetic: 'ˌpɒpjuˈleɪʃn', meaning: '人口' },
  { id: 16, text: 'environment', phonetic: 'ɪnˈvaɪrənmənt', meaning: '环境' },
  { id: 17, text: 'development', phonetic: 'dɪˈveləpmənt', meaning: '发展' },
  { id: 18, text: 'education', phonetic: 'ˌedʒuˈkeɪʃn', meaning: '教育' },
  { id: 19, text: 'technology', phonetic: 'tekˈnɒlədʒi', meaning: '技术' },
  { id: 20, text: 'industry', phonetic: 'ˈɪndəstri', meaning: '工业' },

  // 抽象概念
  { id: 21, text: 'freedom', phonetic: 'ˈfriːdəm', meaning: '自由' },
  { id: 22, text: 'justice', phonetic: 'ˈdʒʌstɪs', meaning: '正义' },
  { id: 23, text: 'equality', phonetic: 'ɪˈkwɒləti', meaning: '平等' },
  { id: 24, text: 'responsibility', phonetic: 'rɪˌspɒnsəˈbɪləti', meaning: '责任' },
  { id: 25, text: 'opportunity', phonetic: 'ˌɒpəˈtjuːnəti', meaning: '机会' },
  { id: 26, text: 'success', phonetic: 'səkˈses', meaning: '成功' },
  { id: 27, text: 'challenge', phonetic: 'ˈtʃælɪndʒ', meaning: '挑战' },
  { id: 28, text: 'achievement', phonetic: 'əˈtʃiːvmənt', meaning: '成就' },
  { id: 29, text: 'progress', phonetic: 'ˈprəʊɡres', meaning: '进步' },
  { id: 30, text: 'influence', phonetic: 'ˈɪnfluəns', meaning: '影响' },

  // 心理情感
  { id: 31, text: 'anxiety', phonetic: 'æŋˈzaɪəti', meaning: '焦虑' },
  { id: 32, text: 'confidence', phonetic: 'ˈkɒnfɪdəns', meaning: '信心' },
  { id: 33, text: 'depression', phonetic: 'dɪˈpreʃn', meaning: '抑郁' },
  { id: 34, text: 'enthusiasm', phonetic: 'ɪnˈθjuːziæzəm', meaning: '热情' },
  { id: 35, text: 'motivation', phonetic: 'ˌməʊtɪˈveɪʃn', meaning: '动力' },
  { id: 36, text: 'personality', phonetic: 'ˌpɜːsəˈnæləti', meaning: '性格' },
  { id: 37, text: 'attitude', phonetic: 'ˈætɪtjuːd', meaning: '态度' },
  { id: 38, text: 'emotion', phonetic: 'ɪˈməʊʃn', meaning: '情感' },
  { id: 39, text: 'stress', phonetic: 'stres', meaning: '压力' },
  { id: 40, text: 'mood', phonetic: 'muːd', meaning: '心情' },

  // 商业经济
  { id: 41, text: 'investment', phonetic: 'ɪnˈvestmənt', meaning: '投资' },
  { id: 42, text: 'management', phonetic: 'ˈmænɪdʒmənt', meaning: '管理' },
  { id: 43, text: 'competition', phonetic: 'ˌkɒmpəˈtɪʃn', meaning: '竞争' },
  { id: 44, text: 'corporation', phonetic: 'ˌkɔːpəˈreɪʃn', meaning: '公司' },
  { id: 45, text: 'marketing', phonetic: 'ˈmɑːkɪtɪŋ', meaning: '市场营销' },
  { id: 46, text: 'finance', phonetic: 'ˈfaɪnæns', meaning: '金融' },
  { id: 47, text: 'budget', phonetic: 'ˈbʌdʒɪt', meaning: '预算' },
  { id: 48, text: 'profit', phonetic: 'ˈprɒfɪt', meaning: '利润' },
  { id: 49, text: 'strategy', phonetic: 'ˈstrætədʒi', meaning: '策略' },
  { id: 50, text: 'resource', phonetic: 'rɪˈsɔːs', meaning: '资源' },

  // 科技创新
  { id: 51, text: 'innovation', phonetic: 'ˌɪnəˈveɪʃn', meaning: '创新' },
  { id: 52, text: 'artificial', phonetic: 'ˌɑːtɪˈfɪʃl', meaning: '人工的' },
  { id: 53, text: 'digital', phonetic: 'ˈdɪdʒɪtl', meaning: '数字的' },
  { id: 54, text: 'software', phonetic: 'ˈsɒftweə', meaning: '软件' },
  { id: 55, text: 'network', phonetic: 'ˈnetwɜːk', meaning: '网络' },
  { id: 56, text: 'database', phonetic: 'ˈdeɪtəbeɪs', meaning: '数据库' },
  { id: 57, text: 'algorithm', phonetic: 'ˈælɡərɪðəm', meaning: '算法' },
  { id: 58, text: 'virtual', phonetic: 'ˈvɜːtʃuəl', meaning: '虚拟的' },
  { id: 59, text: 'interface', phonetic: 'ˈɪntəfeɪs', meaning: '接口' },
  { id: 60, text: 'cybersecurity', phonetic: 'ˌsaɪbəsɪˈkjʊərəti', meaning: '网络安全' },

  // 环境与生态
  { id: 61, text: 'sustainable', phonetic: 'səˈsteɪnəbl', meaning: '可持续的' },
  { id: 62, text: 'pollution', phonetic: 'pəˈluːʃn', meaning: '污染' },
  { id: 63, text: 'biodiversity', phonetic: 'ˌbaɪəʊdaɪˈvɜːsəti', meaning: '生物多样性' },
  { id: 64, text: 'ecosystem', phonetic: 'ˈiːkəʊsɪstəm', meaning: '生态系统' },
  { id: 65, text: 'renewable', phonetic: 'rɪˈnjuːəbl', meaning: '可再生的' },
  { id: 66, text: 'conservation', phonetic: 'ˌkɒnsəˈveɪʃn', meaning: '保护' },
  { id: 67, text: 'climate', phonetic: 'ˈklaɪmət', meaning: '气候' },
  { id: 68, text: 'greenhouse', phonetic: 'ˈɡriːnhaʊs', meaning: '温室' },
  { id: 69, text: 'extinction', phonetic: 'ɪkˈstɪŋkʃn', meaning: '灭绝' },
  { id: 70, text: 'deforestation', phonetic: 'diːˌfɒrɪˈsteɪʃn', meaning: '森林砍伐' },

  // 医学健康
  { id: 71, text: 'diagnosis', phonetic: 'ˌdaɪəɡˈnəʊsɪs', meaning: '诊断' },
  { id: 72, text: 'treatment', phonetic: 'ˈtriːtmənt', meaning: '治疗' },
  { id: 73, text: 'symptom', phonetic: 'ˈsɪmptəm', meaning: '症状' },
  { id: 74, text: 'infection', phonetic: 'ɪnˈfekʃn', meaning: '感染' },
  { id: 75, text: 'immunity', phonetic: 'ɪˈmjuːnəti', meaning: '免疫力' },
  { id: 76, text: 'prescription', phonetic: 'prɪˈskrɪpʃn', meaning: '处方' },
  { id: 77, text: 'vaccination', phonetic: 'ˌvæksɪˈneɪʃn', meaning: '疫苗接种' },
  { id: 78, text: 'nutrition', phonetic: 'njuːˈtrɪʃn', meaning: '营养' },
  { id: 79, text: 'metabolism', phonetic: 'məˈtæbəlɪzəm', meaning: '新陈代谢' },
  { id: 80, text: 'rehabilitation', phonetic: 'ˌriːəˌbɪlɪˈteɪʃn', meaning: '康复' },

  // 文学艺术
  { id: 81, text: 'literature', phonetic: 'ˈlɪtrətʃə', meaning: '文学' },
  { id: 82, text: 'poetry', phonetic: 'ˈpəʊətri', meaning: '诗歌' },
  { id: 83, text: 'composition', phonetic: 'ˌkɒmpəˈzɪʃn', meaning: '作文' },
  { id: 84, text: 'imagination', phonetic: 'ɪˌmædʒɪˈneɪʃn', meaning: '想象力' },
  { id: 85, text: 'creativity', phonetic: 'ˌkriːeɪˈtɪvəti', meaning: '创造力' },
  { id: 86, text: 'perspective', phonetic: 'pəˈspektɪv', meaning: '观点' },
  { id: 87, text: 'interpretation', phonetic: 'ɪnˌtɜːprəˈteɪʃn', meaning: '解释' },
  { id: 88, text: 'metaphor', phonetic: 'ˈmetəfə', meaning: '隐喻' },
  { id: 89, text: 'symbolism', phonetic: 'ˈsɪmbəlɪzəm', meaning: '象征主义' },
  { id: 90, text: 'aesthetic', phonetic: 'iːsˈθetɪk', meaning: '美学的' },

  // 高级动词
  { id: 91, text: 'accomplish', phonetic: 'əˈkʌmplɪʃ', meaning: '完成' },
  { id: 92, text: 'demonstrate', phonetic: 'ˈdemənstreɪt', meaning: '证明' },
  { id: 93, text: 'investigate', phonetic: 'ɪnˈvestɪɡeɪt', meaning: '调查' },
  { id: 94, text: 'contribute', phonetic: 'kənˈtrɪbjuːt', meaning: '贡献' },
  { id: 95, text: 'negotiate', phonetic: 'nɪˈɡəʊʃieɪt', meaning: '谈判' },
  { id: 96, text: 'implement', phonetic: 'ˈɪmplɪment', meaning: '实施' },
  { id: 97, text: 'coordinate', phonetic: 'kəʊˈɔːdɪneɪt', meaning: '协调' },
  { id: 98, text: 'evaluate', phonetic: 'ɪˈvæljueɪt', meaning: '评估' },
  { id: 99, text: 'integrate', phonetic: 'ˈɪntɪɡreɪt', meaning: '整合' },
  { id: 100, text: 'facilitate', phonetic: 'fəˈsɪlɪteɪt', meaning: '促进' },

  // 新增：科目相关
  { id: 101, text: 'mathematics', phonetic: 'ˌmæθəˈmætɪks', meaning: '数学' },
  { id: 102, text: 'physics', phonetic: 'ˈfɪzɪks', meaning: '物理' },
  { id: 103, text: 'chemistry', phonetic: 'ˈkemɪstri', meaning: '化学' },
  { id: 104, text: 'biology', phonetic: 'baɪˈɒlədʒi', meaning: '生物' },
  { id: 105, text: 'geography', phonetic: 'dʒiˈɒɡrəfi', meaning: '地理' },

  // 新增：学习用语
  { id: 106, text: 'homework', phonetic: 'ˈhəʊmwɜːk', meaning: '家庭作业' },
  { id: 107, text: 'examination', phonetic: 'ɪɡˌzæmɪˈneɪʃn', meaning: '考试' },
  { id: 108, text: 'dictionary', phonetic: 'ˈdɪkʃənri', meaning: '字典' },
  { id: 109, text: 'knowledge', phonetic: 'ˈnɒlɪdʒ', meaning: '知识' },
  { id: 110, text: 'practice', phonetic: 'ˈpræktɪs', meaning: '练习' },

  // 新增：情感表达
  { id: 111, text: 'excited', phonetic: 'ɪkˈsaɪtɪd', meaning: '兴奋的' },
  { id: 112, text: 'worried', phonetic: 'ˈwʌrid', meaning: '担心的' },
  { id: 113, text: 'nervous', phonetic: 'ˈnɜːvəs', meaning: '紧张的' },
  { id: 114, text: 'proud', phonetic: 'praʊd', meaning: '自豪的' },
  { id: 115, text: 'disappointed', phonetic: 'ˌdɪsəˈpɔɪntɪd', meaning: '失望的' },

  // 新增：日常活动
  { id: 116, text: 'exercise', phonetic: 'ˈeksəsaɪz', meaning: '锻炼' },
  { id: 117, text: 'shopping', phonetic: 'ˈʃɒpɪŋ', meaning: '购物' },
  { id: 118, text: 'travel', phonetic: 'ˈtrævl', meaning: '旅行' },
  { id: 119, text: 'celebrate', phonetic: 'ˈselɪbreɪt', meaning: '庆祝' },
  { id: 120, text: 'communicate', phonetic: 'kəˈmjuːnɪkeɪt', meaning: '交流' },

  // 新增：社交媒体
  { id: 121, text: 'internet', phonetic: 'ˈɪntənet', meaning: '互联网' },
  { id: 122, text: 'message', phonetic: 'ˈmesɪdʒ', meaning: '消息' },
  { id: 123, text: 'website', phonetic: 'ˈwebsaɪt', meaning: '网站' },
  { id: 124, text: 'download', phonetic: 'ˌdaʊnˈləʊd', meaning: '下载' },
  { id: 125, text: 'upload', phonetic: 'ˌʌpˈləʊd', meaning: '上传' },

  // 新增：职业
  { id: 126, text: 'teacher', phonetic: 'ˈtiːtʃə', meaning: '教师' },
  { id: 127, text: 'doctor', phonetic: 'ˈdɒktə', meaning: '医生' },
  { id: 128, text: 'engineer', phonetic: 'ˌendʒɪˈnɪə', meaning: '工程师' },
  { id: 129, text: 'scientist', phonetic: 'ˈsaɪəntɪst', meaning: '科学家' },
  { id: 130, text: 'artist', phonetic: 'ˈɑːtɪst', meaning: '艺术家' },

  // 新增：环境保护
  { id: 131, text: 'environment', phonetic: 'ɪnˈvaɪrənmənt', meaning: '环境' },
  { id: 132, text: 'pollution', phonetic: 'pəˈluːʃn', meaning: '污染' },
  { id: 133, text: 'recycle', phonetic: 'riːˈsaɪkl', meaning: '回收' },
  { id: 134, text: 'energy', phonetic: 'ˈenədʒi', meaning: '能源' },
  { id: 135, text: 'protect', phonetic: 'prəˈtekt', meaning: '保护' },

  // 新增：运动项目
  { id: 136, text: 'volleyball', phonetic: 'ˈvɒlibɔːl', meaning: '排球' },
  { id: 137, text: 'tennis', phonetic: 'ˈtenɪs', meaning: '网球' },
  { id: 138, text: 'badminton', phonetic: 'ˈbædmɪntən', meaning: '羽毛球' },
  { id: 139, text: 'baseball', phonetic: 'ˈbeɪsbɔːl', meaning: '棒球' },
  { id: 140, text: 'gymnastics', phonetic: 'dʒɪmˈnæstɪks', meaning: '体操' },

  // 新增：餐饮场所
  { id: 141, text: 'restaurant', phonetic: 'ˈrestrɒnt', meaning: '餐厅' },
  { id: 142, text: 'cafeteria', phonetic: 'ˌkæfəˈtɪəriə', meaning: '自助餐厅' },
  { id: 143, text: 'supermarket', phonetic: 'ˈsuːpəmɑːkɪt', meaning: '超市' },
  { id: 144, text: 'bookstore', phonetic: 'ˈbʊkstɔː', meaning: '书店' },
  { id: 145, text: 'library', phonetic: 'ˈlaɪbrəri', meaning: '图书馆' },

  // 新增：交通工具
  { id: 146, text: 'motorcycle', phonetic: 'ˈməʊtəsaɪkl', meaning: '摩托车' },
  { id: 147, text: 'ambulance', phonetic: 'ˈæmbjʊləns', meaning: '救护车' },
  { id: 148, text: 'helicopter', phonetic: 'ˈhelɪkɒptə', meaning: '直升机' },
  { id: 149, text: 'submarine', phonetic: 'ˌsʌbməˈriːn', meaning: '潜水艇' },
  { id: 150, text: 'spacecraft', phonetic: 'ˈspeɪskrɑːft', meaning: '航天器' },

  // 新增：自然现象
  { id: 151, text: 'rainbow', phonetic: 'ˈreɪnbəʊ', meaning: '彩虹' },
  { id: 152, text: 'thunder', phonetic: 'ˈθʌndə', meaning: '雷' },
  { id: 153, text: 'lightning', phonetic: 'ˈlaɪtnɪŋ', meaning: '闪电' },
  { id: 154, text: 'earthquake', phonetic: 'ˈɜːθkweɪk', meaning: '地震' },
  { id: 155, text: 'volcano', phonetic: 'vɒlˈkeɪnəʊ', meaning: '火山' },

  // 新增：时间表达
  { id: 156, text: 'century', phonetic: 'ˈsentʃəri', meaning: '世纪' },
  { id: 157, text: 'decade', phonetic: 'ˈdekeɪd', meaning: '十年' },
  { id: 158, text: 'season', phonetic: 'ˈsiːzn', meaning: '季节' },
  { id: 159, text: 'schedule', phonetic: 'ˈʃedjuːl', meaning: '时间表' },
  { id: 160, text: 'calendar', phonetic: 'ˈkælɪndə', meaning: '日历' }
];

export default middleWordList;
