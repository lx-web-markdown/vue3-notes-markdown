const easyWordList = [
  // 动物类
  { id: 1, text: 'cat', phonetic: 'kæt', meaning: '猫' },
  { id: 2, text: 'dog', phonetic: 'dɒɡ', meaning: '狗' },
  { id: 3, text: 'bird', phonetic: 'bɜːd', meaning: '鸟' },
  { id: 4, text: 'fish', phonetic: 'fɪʃ', meaning: '鱼' },
  { id: 5, text: 'rabbit', phonetic: 'ˈræbɪt', meaning: '兔子' },
  { id: 6, text: 'panda', phonetic: 'ˈpændə', meaning: '熊猫' },
  { id: 7, text: 'tiger', phonetic: 'ˈtaɪɡə', meaning: '老虎' },
  { id: 8, text: 'lion', phonetic: 'ˈlaɪən', meaning: '狮子' },
  { id: 9, text: 'elephant', phonetic: 'ˈelɪfənt', meaning: '大象' },
  { id: 10, text: 'monkey', phonetic: 'ˈmʌŋki', meaning: '猴子' },

  // 食物和饮料
  { id: 11, text: 'apple', phonetic: 'ˈæpl', meaning: '苹果' },
  { id: 12, text: 'banana', phonetic: 'bəˈnɑːnə', meaning: '香蕉' },
  { id: 13, text: 'orange', phonetic: 'ˈɒrɪndʒ', meaning: '橙子' },
  { id: 14, text: 'milk', phonetic: 'mɪlk', meaning: '牛奶' },
  { id: 15, text: 'water', phonetic: 'ˈwɔːtə', meaning: '水' },
  { id: 16, text: 'bread', phonetic: 'bred', meaning: '面包' },
  { id: 17, text: 'rice', phonetic: 'raɪs', meaning: '米饭' },
  { id: 18, text: 'egg', phonetic: 'eɡ', meaning: '鸡蛋' },
  { id: 19, text: 'meat', phonetic: 'miːt', meaning: '肉' },
  { id: 20, text: 'cake', phonetic: 'keɪk', meaning: '蛋糕' },

  // 颜色和形状
  { id: 21, text: 'red', phonetic: 'red', meaning: '红色' },
  { id: 22, text: 'blue', phonetic: 'bluː', meaning: '蓝色' },
  { id: 23, text: 'green', phonetic: 'ɡriːn', meaning: '绿色' },
  { id: 24, text: 'yellow', phonetic: 'ˈjeləʊ', meaning: '黄色' },
  { id: 25, text: 'black', phonetic: 'blæk', meaning: '黑色' },
  { id: 26, text: 'white', phonetic: 'waɪt', meaning: '白色' },
  { id: 27, text: 'circle', phonetic: 'ˈsɜːkl', meaning: '圆形' },
  { id: 28, text: 'square', phonetic: 'skweə', meaning: '正方形' },
  { id: 29, text: 'triangle', phonetic: 'ˈtraɪæŋɡl', meaning: '三角形' },
  { id: 30, text: 'star', phonetic: 'stɑː', meaning: '星星' },

  // 数字和时间
  { id: 31, text: 'one', phonetic: 'wʌn', meaning: '一' },
  { id: 32, text: 'two', phonetic: 'tuː', meaning: '二' },
  { id: 33, text: 'three', phonetic: 'θriː', meaning: '三' },
  { id: 34, text: 'Monday', phonetic: 'ˈmʌndeɪ', meaning: '星期一' },
  { id: 35, text: 'Tuesday', phonetic: 'ˈtjuːzdeɪ', meaning: '星期二' },
  { id: 36, text: 'morning', phonetic: 'ˈmɔːnɪŋ', meaning: '早上' },
  { id: 37, text: 'night', phonetic: 'naɪt', meaning: '晚上' },
  { id: 38, text: 'today', phonetic: 'təˈdeɪ', meaning: '今天' },
  { id: 39, text: 'tomorrow', phonetic: 'təˈmɒrəʊ', meaning: '明天' },
  { id: 40, text: 'year', phonetic: 'jɪə', meaning: '年' },

  // 家庭成员
  { id: 41, text: 'mother', phonetic: 'ˈmʌðə', meaning: '妈妈' },
  { id: 42, text: 'father', phonetic: 'ˈfɑːðə', meaning: '爸爸' },
  { id: 43, text: 'sister', phonetic: 'ˈsɪstə', meaning: '姐妹' },
  { id: 44, text: 'brother', phonetic: 'ˈbrʌðə', meaning: '兄弟' },
  { id: 45, text: 'grandma', phonetic: 'ˈɡrænmɑː', meaning: '奶奶/外婆' },
  { id: 46, text: 'grandpa', phonetic: 'ˈɡrænpɑː', meaning: '爷爷/外公' },
  { id: 47, text: 'uncle', phonetic: 'ˈʌŋkl', meaning: '叔叔/舅舅' },
  { id: 48, text: 'aunt', phonetic: 'ɑːnt', meaning: '阿姨/姑姑' },
  { id: 49, text: 'family', phonetic: 'ˈfæmɪli', meaning: '家庭' },
  { id: 50, text: 'baby', phonetic: 'ˈbeɪbi', meaning: '婴儿' },

  // 学校用品
  { id: 51, text: 'book', phonetic: 'bʊk', meaning: '书' },
  { id: 52, text: 'pen', phonetic: 'pen', meaning: '钢笔' },
  { id: 53, text: 'pencil', phonetic: 'ˈpensl', meaning: '铅笔' },
  { id: 54, text: 'ruler', phonetic: 'ˈruːlə', meaning: '尺子' },
  { id: 55, text: 'eraser', phonetic: 'ɪˈreɪzə', meaning: '橡皮' },
  { id: 56, text: 'bag', phonetic: 'bæɡ', meaning: '书包' },
  { id: 57, text: 'desk', phonetic: 'desk', meaning: '课桌' },
  { id: 58, text: 'chair', phonetic: 'tʃeə', meaning: '椅子' },
  { id: 59, text: 'notebook', phonetic: 'ˈnəʊtbʊk', meaning: '笔记本' },
  { id: 60, text: 'blackboard', phonetic: 'ˈblækbɔːd', meaning: '黑板' },

  // 自然和天气
  { id: 61, text: 'sun', phonetic: 'sʌn', meaning: '太阳' },
  { id: 62, text: 'moon', phonetic: 'muːn', meaning: '月亮' },
  { id: 63, text: 'rain', phonetic: 'reɪn', meaning: '雨' },
  { id: 64, text: 'snow', phonetic: 'snəʊ', meaning: '雪' },
  { id: 65, text: 'wind', phonetic: 'wɪnd', meaning: '风' },
  { id: 66, text: 'cloud', phonetic: 'klaʊd', meaning: '云' },
  { id: 67, text: 'tree', phonetic: 'triː', meaning: '树' },
  { id: 68, text: 'flower', phonetic: 'ˈflaʊə', meaning: '花' },
  { id: 69, text: 'grass', phonetic: 'ɡrɑːs', meaning: '草' },
  { id: 70, text: 'mountain', phonetic: 'ˈmaʊntɪn', meaning: '山' },

  // 身体部位
  { id: 71, text: 'head', phonetic: 'hed', meaning: '头' },
  { id: 72, text: 'eye', phonetic: 'aɪ', meaning: '眼睛' },
  { id: 73, text: 'nose', phonetic: 'nəʊz', meaning: '鼻子' },
  { id: 74, text: 'mouth', phonetic: 'maʊθ', meaning: '嘴' },
  { id: 75, text: 'ear', phonetic: 'ɪə', meaning: '耳朵' },
  { id: 76, text: 'hand', phonetic: 'hænd', meaning: '手' },
  { id: 77, text: 'foot', phonetic: 'fʊt', meaning: '脚' },
  { id: 78, text: 'leg', phonetic: 'leɡ', meaning: '腿' },
  { id: 79, text: 'arm', phonetic: 'ɑːm', meaning: '手臂' },
  { id: 80, text: 'finger', phonetic: 'ˈfɪŋɡə', meaning: '手指' },

  // 衣物
  { id: 81, text: 'shirt', phonetic: 'ʃɜːt', meaning: '衬衫' },
  { id: 82, text: 'pants', phonetic: 'pænts', meaning: '裤子' },
  { id: 83, text: 'shoes', phonetic: 'ʃuːz', meaning: '鞋子' },
  { id: 84, text: 'socks', phonetic: 'sɒks', meaning: '袜子' },
  { id: 85, text: 'hat', phonetic: 'hæt', meaning: '帽子' },
  { id: 86, text: 'dress', phonetic: 'dres', meaning: '连衣裙' },
  { id: 87, text: 'coat', phonetic: 'kəʊt', meaning: '外套' },
  { id: 88, text: 'skirt', phonetic: 'skɜːt', meaning: '裙子' },
  { id: 89, text: 'jacket', phonetic: 'ˈdʒækɪt', meaning: '夹克' },
  { id: 90, text: 'gloves', phonetic: 'ɡlʌvz', meaning: '手套' },

  // 运动和爱好
  { id: 91, text: 'football', phonetic: 'ˈfʊtbɔːl', meaning: '足球' },
  { id: 92, text: 'basketball', phonetic: 'ˈbɑːskɪtbɔːl', meaning: '篮球' },
  { id: 93, text: 'swimming', phonetic: 'ˈswɪmɪŋ', meaning: '游泳' },
  { id: 94, text: 'running', phonetic: 'ˈrʌnɪŋ', meaning: '跑步' },
  { id: 95, text: 'dancing', phonetic: 'ˈdɑːnsɪŋ', meaning: '跳舞' },
  { id: 96, text: 'singing', phonetic: 'ˈsɪŋɪŋ', meaning: '唱歌' },
  { id: 97, text: 'reading', phonetic: 'ˈriːdɪŋ', meaning: '阅读' },
  { id: 98, text: 'drawing', phonetic: 'ˈdrɔːɪŋ', meaning: '绘画' },
  { id: 99, text: 'music', phonetic: 'ˈmjuːzɪk', meaning: '音乐' },
  { id: 100, text: 'game', phonetic: 'ɡeɪm', meaning: '游戏' },

  // 交通工具
  { id: 101, text: 'car', phonetic: 'kɑː', meaning: '汽车' },
  { id: 102, text: 'bus', phonetic: 'bʌs', meaning: '公共汽车' },
  { id: 103, text: 'train', phonetic: 'treɪn', meaning: '火车' },
  { id: 104, text: 'plane', phonetic: 'pleɪn', meaning: '飞机' },
  { id: 105, text: 'bike', phonetic: 'baɪk', meaning: '自行车' },
  { id: 106, text: 'ship', phonetic: 'ʃɪp', meaning: '船' },
  { id: 107, text: 'taxi', phonetic: 'ˈtæksi', meaning: '出租车' },
  { id: 108, text: 'subway', phonetic: 'ˈsʌbweɪ', meaning: '地铁' },
  { id: 109, text: 'helicopter', phonetic: 'ˈhelɪkɒptə', meaning: '直升机' },
  { id: 110, text: 'boat', phonetic: 'bəʊt', meaning: '小船' },

  // 房间和家具
  { id: 111, text: 'room', phonetic: 'ruːm', meaning: '房间' },
  { id: 112, text: 'bed', phonetic: 'bed', meaning: '床' },
  { id: 113, text: 'table', phonetic: 'ˈteɪbl', meaning: '桌子' },
  { id: 114, text: 'chair', phonetic: 'tʃeə', meaning: '椅子' },
  { id: 115, text: 'door', phonetic: 'dɔː', meaning: '门' },
  { id: 116, text: 'window', phonetic: 'ˈwɪndəʊ', meaning: '窗户' },
  { id: 117, text: 'kitchen', phonetic: 'ˈkɪtʃɪn', meaning: '厨房' },
  { id: 118, text: 'bathroom', phonetic: 'ˈbɑːθruːm', meaning: '浴室' },
  { id: 119, text: 'sofa', phonetic: 'ˈsəʊfə', meaning: '沙发' },
  { id: 120, text: 'lamp', phonetic: 'læmp', meaning: '台灯' },

  // 形容词
  { id: 121, text: 'big', phonetic: 'bɪɡ', meaning: '大的' },
  { id: 122, text: 'small', phonetic: 'smɔːl', meaning: '小的' },
  { id: 123, text: 'hot', phonetic: 'hɒt', meaning: '热的' },
  { id: 124, text: 'cold', phonetic: 'kəʊld', meaning: '冷的' },
  { id: 125, text: 'happy', phonetic: 'ˈhæpi', meaning: '开心的' },
  { id: 126, text: 'sad', phonetic: 'sæd', meaning: '伤心的' },
  { id: 127, text: 'good', phonetic: 'ɡʊd', meaning: '好的' },
  { id: 128, text: 'bad', phonetic: 'bæd', meaning: '坏的' },
  { id: 129, text: 'new', phonetic: 'njuː', meaning: '新的' },
  { id: 130, text: 'old', phonetic: 'əʊld', meaning: '旧的' },

  // 常用动词
  { id: 131, text: 'eat', phonetic: 'iːt', meaning: '吃' },
  { id: 132, text: 'drink', phonetic: 'drɪŋk', meaning: '喝' },
  { id: 133, text: 'sleep', phonetic: 'sliːp', meaning: '睡觉' },
  { id: 134, text: 'run', phonetic: 'rʌn', meaning: '跑' },
  { id: 135, text: 'walk', phonetic: 'wɔːk', meaning: '走' },
  { id: 136, text: 'jump', phonetic: 'dʒʌmp', meaning: '跳' },
  { id: 137, text: 'read', phonetic: 'riːd', meaning: '读' },
  { id: 138, text: 'write', phonetic: 'raɪt', meaning: '写' },
  { id: 139, text: 'play', phonetic: 'pleɪ', meaning: '玩' },
  { id: 140, text: 'study', phonetic: 'ˈstʌdi', meaning: '学习' },

  // 日常用语
  { id: 141, text: 'hello', phonetic: 'həˈləʊ', meaning: '你好' },
  { id: 142, text: 'goodbye', phonetic: 'ˌɡʊdˈbaɪ', meaning: '再见' },
  { id: 143, text: 'thank you', phonetic: 'θæŋk juː', meaning: '谢谢' },
  { id: 144, text: 'please', phonetic: 'pliːz', meaning: '请' },
  { id: 145, text: 'sorry', phonetic: 'ˈsɒri', meaning: '对不起' },
  { id: 146, text: 'yes', phonetic: 'jes', meaning: '是' },
  { id: 147, text: 'no', phonetic: 'nəʊ', meaning: '不' },
  { id: 148, text: 'okay', phonetic: 'ˌəʊˈkeɪ', meaning: '好的' },
  { id: 149, text: 'welcome', phonetic: 'ˈwelkəm', meaning: '欢迎' },
  { id: 150, text: 'excuse me', phonetic: 'ɪkˈskjuːz miː', meaning: '对不起，打扰一下' },

  // 新增：更多动物
  { id: 151, text: 'duck', phonetic: 'dʌk', meaning: '鸭子' },
  { id: 152, text: 'chicken', phonetic: 'ˈtʃɪkɪn', meaning: '鸡' },
  { id: 153, text: 'pig', phonetic: 'pɪɡ', meaning: '猪' },
  { id: 154, text: 'cow', phonetic: 'kaʊ', meaning: '奶牛' },
  { id: 155, text: 'sheep', phonetic: 'ʃiːp', meaning: '羊' },

  // 新增：简单形容词
  { id: 156, text: 'tall', phonetic: 'tɔːl', meaning: '高的' },
  { id: 157, text: 'short', phonetic: 'ʃɔːt', meaning: '矮的' },
  { id: 158, text: 'fat', phonetic: 'fæt', meaning: '胖的' },
  { id: 159, text: 'thin', phonetic: 'θɪn', meaning: '瘦的' },
  { id: 160, text: 'fast', phonetic: 'fɑːst', meaning: '快的' },

  // 新增：简单动词
  { id: 161, text: 'look', phonetic: 'lʊk', meaning: '看' },
  { id: 162, text: 'listen', phonetic: 'ˈlɪsn', meaning: '听' },
  { id: 163, text: 'speak', phonetic: 'spiːk', meaning: '说' },
  { id: 164, text: 'smile', phonetic: 'smaɪl', meaning: '微笑' },
  { id: 165, text: 'cry', phonetic: 'kraɪ', meaning: '哭' },

  // 新增：学校用品
  { id: 166, text: 'crayon', phonetic: 'ˈkreɪən', meaning: '蜡笔' },
  { id: 167, text: 'marker', phonetic: 'ˈmɑːkə', meaning: '记号笔' },
  { id: 168, text: 'glue', phonetic: 'ɡluː', meaning: '胶水' },
  { id: 169, text: 'scissors', phonetic: 'ˈsɪzəz', meaning: '剪刀' },
  { id: 170, text: 'tape', phonetic: 'teɪp', meaning: '胶带' },

  // 新增：玩具
  { id: 171, text: 'doll', phonetic: 'dɒl', meaning: '洋娃娃' },
  { id: 172, text: 'ball', phonetic: 'bɔːl', meaning: '球' },
  { id: 173, text: 'toy', phonetic: 'tɔɪ', meaning: '玩具' },
  { id: 174, text: 'kite', phonetic: 'kaɪt', meaning: '风筝' },
  { id: 175, text: 'robot', phonetic: 'ˈrəʊbɒt', meaning: '机器人' },

  // 新增：水果和蔬菜
  { id: 176, text: 'grape', phonetic: 'ɡreɪp', meaning: '葡萄' },
  { id: 177, text: 'peach', phonetic: 'piːtʃ', meaning: '桃子' },
  { id: 178, text: 'carrot', phonetic: 'ˈkærət', meaning: '胡萝卜' },
  { id: 179, text: 'potato', phonetic: 'pəˈteɪtəʊ', meaning: '土豆' },
  { id: 180, text: 'tomato', phonetic: 'təˈmɑːtəʊ', meaning: '番茄' },

  // 新增：天气
  { id: 181, text: 'sunny', phonetic: 'ˈsʌni', meaning: '晴朗的' },
  { id: 182, text: 'rainy', phonetic: 'ˈreɪni', meaning: '下雨的' },
  { id: 183, text: 'windy', phonetic: 'ˈwɪndi', meaning: '有风的' },
  { id: 184, text: 'cloudy', phonetic: 'ˈklaʊdi', meaning: '多云的' },
  { id: 185, text: 'snowy', phonetic: 'ˈsnəʊi', meaning: '下雪的' },

  // 新增：数字（11-20）
  { id: 186, text: 'eleven', phonetic: 'ɪˈlevn', meaning: '十一' },
  { id: 187, text: 'twelve', phonetic: 'twelv', meaning: '十二' },
  { id: 188, text: 'thirteen', phonetic: 'ˌθɜːˈtiːn', meaning: '十三' },
  { id: 189, text: 'fourteen', phonetic: 'ˌfɔːˈtiːn', meaning: '十四' },
  { id: 190, text: 'fifteen', phonetic: 'ˌfɪfˈtiːn', meaning: '十五' },

  // 新增：家具
  { id: 191, text: 'clock', phonetic: 'klɒk', meaning: '钟' },
  { id: 192, text: 'mirror', phonetic: 'ˈmɪrə', meaning: '镜子' },
  { id: 193, text: 'picture', phonetic: 'ˈpɪktʃə', meaning: '图画' },
  { id: 194, text: 'shelf', phonetic: 'ʃelf', meaning: '架子' },
  { id: 195, text: 'carpet', phonetic: 'ˈkɑːpɪt', meaning: '地毯' },

  // 新增：基础动作
  { id: 196, text: 'stand', phonetic: 'stænd', meaning: '站立' },
  { id: 197, text: 'sit', phonetic: 'sɪt', meaning: '坐' },
  { id: 198, text: 'open', phonetic: 'ˈəʊpən', meaning: '打开' },
  { id: 199, text: 'close', phonetic: 'kləʊz', meaning: '关闭' },
  { id: 200, text: 'help', phonetic: 'help', meaning: '帮助' }
];

export default easyWordList;