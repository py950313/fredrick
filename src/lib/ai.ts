import type { Member } from "./members";
import type { WeatherData } from "./weather";

export interface DailyReport {
  encouragement: string;
  restaurant: {
    name: string;
    area: string;
    cuisine: string;
    reason: string;
  };
}

const ENCOURAGEMENTS: Record<string, string[]> = {
  牛仔褲阿佛: [
    "人生就像我的牛仔褲，越穿越合身，越舊越有味道。今天也要活出自己的風格！",
    "有錢沒錢都要開心，反正我請客！今天遇到任何困難，記得身邊有阿佛挺你。",
    "大哥說：努力工作，偶爾享受，這就是生活的平衡。你今天做得很好了！",
    "財富可以失去，但快樂要自己守護。今天也要笑著面對每一件事！",
  ],
  棕熊阿佛: [
    "我從動物園逃出來就是為了體驗更大的世界！你今天也要勇敢踏出舒適圈！",
    "剛來阿佛世界的時候好多不懂，但慢慢來就好。你也是，不用急，一步一步來。",
    "熊熊告訴你：新環境很可怕，但也很好玩。今天遇到新事物，勇敢去嘗試吧！",
    "不管昨天怎麼樣，今天都是全新的開始。就像我每天都在適應新生活一樣！",
  ],
  大便阿佛: [
    "外表不重要，內心善良才是真的美。今天也要溫柔對待身邊每一個人喔！",
    "曾經被嘲笑過，所以更懂得珍惜善意。你的好，大家都有感受到，加油！",
    "低潮的時候記得找我！不過今天天氣這麼好，應該不需要吧？繼續開心！",
    "善良不是軟弱，是這個世界最需要的力量。你今天一定也讓別人感到溫暖了！",
  ],
  睡衣阿佛: [
    "（剛從洞穴爬出來）……今天……也要……加油……（打哈欠）你比我努力多了！",
    "我穿著睡衣出門都能活得好好的，你盛裝打扮一定更棒！今天必勝！",
    "睡眠是最好的充電。如果今天累了，記得好好休息，明天繼續！",
    "我的扣子雖然少了一個，但我還是最可愛的。不完美沒關係，你就是最好的自己！",
  ],
  灰阿佛: [
    "我灰阿佛未來的高雄市長說：今天也要以三民區為核心，散發正能量！",
    "政見第一條：每個阿佛都要快樂。所以你今天必須要開心，這是市長的命令！",
    "高雄的未來需要每一個人的努力。你今天的付出，就是讓這座城市更好！",
    "從凹子底到三民區，改變需要時間。但只要堅持，每一步都算數！",
  ],
  變色龍阿佛: [
    "今天的我是變色龍版！不管環境怎麼變，適應力強才是最厲害的能力！",
    "有人叫我鸚鵡頭，但我就是我，獨一無二的變色龍阿佛！做自己最重要！",
    "每天換一個造型，每天都是新的自己。今天你也可以嘗試一個新的可能！",
    "Cosplay 教會我：換個角度看世界，什麼都會變得有趣。今天換個心情試試！",
  ],
  紅阿佛: [
    "雖然我是實驗出來的紅色，但現在我是大家的打卡景點！逆境也能變亮點！",
    "大家都喜歡跟我拍照，因為我夠特別！你也有屬於你的獨特之處，要相信自己！",
    "Dr.阿佛把我變紅，但我活得比誰都精彩。今天也要活得閃閃發亮！",
    "成為景點的秘訣就是：接受自己的與眾不同，然後驕傲地展示它！",
  ],
  "Dr.阿佛": [
    "根據我的研究數據，今天只要保持微笑，快樂指數將提升 87.3%，請務必執行！",
    "實驗偶爾會失敗，但失敗是成功的養分。今天遇到困難，當作收集數據就好！",
    "躲在家裡研發新藥的日子告訴我：專注做好一件事，終究會有成果的！",
    "科學說：正面思考能改變大腦結構。所以今天請強制開啟快樂模式，這是醫囑！",
  ],
  瞇瞇眼阿佛: [
    "我眼睛小小的，但我看見的快樂比誰都多！今天你也要找找生活裡的小確幸！",
    "表哥灰阿佛說三民區很棒，我住在這裡證明他說得對！今天也要為自己所在的地方驕傲！",
    "好奇心是最好的老師。今天也要像我一樣，對每件事都充滿好奇！",
    "別人以為我沒在聽，其實我什麼都知道。今天也要用心感受每一個細節！",
  ],
  小阿佛: [
    "個子小沒關係，步伐小但走得快！今天的你也是，一小步一小步，就能到達終點！",
    "我總是第一個發現新鮮事，因為我眼睛永遠睜得大大的！今天也要保持好奇！",
    "小小的身體藏著大大的能量！不要小看自己，你能做到的比想像中更多！",
    "腳步雖短，但只要不停下來，就一定能走到想去的地方！繼續前進！",
  ],
  發霉阿佛: [
    "有人說我發霉了，我說這叫做獨特的藝術！今天也要欣賞自己的與眾不同！",
    "住在最潮濕的角落，但我活得最獨特。環境不能定義你，你才能定義自己！",
    "花紋是我的勳章，不完美是我的風格。今天也要驕傲地做自己！",
    "就算長在角落，也能開出自己的花。今天的你，也是獨一無二的存在！",
  ],
  阿佛的朋友: [
    "從隔壁城市來到阿佛世界，交到好多新朋友！今天也要對身邊的人多一點友善！",
    "我們雖然品種不同，但在阿佛世界裡都是一家人。今天要珍惜身邊的每個人！",
    "勤勞是我們的本色，友善是我們的個性。今天也要用行動證明！",
    "出門旅行讓我看見更大的世界。今天也要抬頭看看，世界比你想的還要美好！",
  ],
};

const KAOHSIUNG_RESTAURANTS = [
  { name: "興隆居", area: "左營區", cuisine: "早餐／燒餅", reason: "高雄人氣第一早餐，豆漿燒餅油條，排隊也值得！" },
  { name: "鹽埕埔蚵仔煎", area: "鹽埕區", cuisine: "台灣小吃", reason: "在地人才知道的老店，蚵仔新鮮、醬料獨特！" },
  { name: "老江紅茶牛奶", area: "新興區", cuisine: "飲料", reason: "高雄最經典的紅茶牛奶，甜蜜滋味超過半世紀！" },
  { name: "六合夜市", area: "新興區", cuisine: "夜市小吃", reason: "高雄必訪夜市，木瓜牛奶、海產粥，一次吃遍！" },
  { name: "瑞豐夜市", area: "左營區", cuisine: "夜市小吃", reason: "高雄在地人最愛的夜市，只有週末開，要把握！" },
  { name: "三和市場麵攤", area: "三民區", cuisine: "台式麵食", reason: "藏在市場裡的古早味，乾麵加貢丸湯，暖心又暖胃！" },
  { name: "大港橋旁海鮮", area: "鹽埕區", cuisine: "海鮮", reason: "靠近港邊，食材超新鮮，邊吃邊看輪船超愜意！" },
  { name: "棧貳庫韓式料理", area: "鹽埕區", cuisine: "韓式料理", reason: "在老倉庫吃韓式炸雞，網美打卡同時滿足口腹之慾！" },
  { name: "苓雅市場排骨飯", area: "苓雅區", cuisine: "便當", reason: "銅板美食首選，排骨酥脆、便當份量超紮實！" },
  { name: "光華夜市串燒", area: "三民區", cuisine: "串燒烤肉", reason: "高雄在地烤串聖地，醬料香氣撲鼻，配啤酒超搭！" },
  { name: "旗津海產街", area: "旗津區", cuisine: "海鮮", reason: "搭渡輪過去，吃現撈海鮮，超值又有度假感！" },
  { name: "美濃粄條", area: "美濃區", cuisine: "客家料理", reason: "道地客家粄條，湯頭清甜，配上炸豬皮絕配！" },
  { name: "內惟李家圓仔湯", area: "鼓山區", cuisine: "甜點", reason: "傳承多代的古早味，紅豆湯圓暖到心坎裡！" },
  { name: "鳳山肉圓", area: "鳳山區", cuisine: "台灣小吃", reason: "高雄南部肉圓代表，皮薄餡豐，醬料微辣超下飯！" },
  { name: "前金廟口蝦仁飯", area: "前金區", cuisine: "台式料理", reason: "台南蝦仁飯的高雄版本，簡單美味，銅板價超值！" },
  { name: "哈瑪星茶葉蛋", area: "鼓山區", cuisine: "小吃", reason: "等渡輪時必買，滷得入味，剝殼就能吃，超方便！" },
  { name: "凹子底日式拉麵", area: "左營區", cuisine: "日式拉麵", reason: "近捷運凹子底站，豚骨湯頭濃郁，麵條有嚼勁！" },
  { name: "草衙道美食街", area: "前鎮區", cuisine: "複合式餐廳", reason: "近大魯閣草衙道，多種選擇，吃飽還能逛街！" },
  { name: "新堀江韓式炸雞", area: "新興區", cuisine: "韓式料理", reason: "年輕人聚集的商圈，炸雞外酥內嫩，醬料超豐富！" },
  { name: "橋頭糖廠冰品", area: "橋頭區", cuisine: "冰品甜點", reason: "百年老糖廠，吃著冰淇淋逛日式宿舍，超有文青感！" },
];

export interface ScenicSpot {
  name: string;
  emoji: string;
  description: string;
  county: string;
}

const TAIWAN_SPOTS: ScenicSpot[] = [
  { name: "台北101", emoji: "🏙️", description: "世界第一高樓，夜景超美，跨年煙火必去聖地！", county: "台北市" },
  { name: "九份老街", emoji: "🏮", description: "紅燈籠、石階、芋圓，宮崎駿電影的靈感來源", county: "新北市" },
  { name: "太魯閣國家公園", emoji: "🏔️", description: "壯觀峽谷、清澈溪水，台灣最壯麗的自然奇景", county: "花蓮縣" },
  { name: "日月潭", emoji: "🌊", description: "台灣最大湖泊，日出薄霧如夢似幻", county: "南投縣" },
  { name: "阿里山", emoji: "🌅", description: "雲海、日出、神木、小火車，四大絕景一次滿足", county: "嘉義縣" },
  { name: "墾丁國家公園", emoji: "🏖️", description: "南台灣的海灘天堂，浮潛、衝浪、夜市通通有", county: "屏東縣" },
  { name: "野柳地質公園", emoji: "🗿", description: "女王頭、蘑菇石，大自然的神奇雕塑作品", county: "新北市" },
  { name: "平溪天燈", emoji: "🏮", description: "放天燈許願，漫天燈火如繁星，浪漫指數破表", county: "新北市" },
  { name: "花蓮七星潭", emoji: "🌊", description: "礫石海灘、清澈海水，中央山脈環抱的祕境", county: "花蓮縣" },
  { name: "清境農場", emoji: "🐑", description: "雲端上的牧場，歐洲風情在台灣！", county: "南投縣" },
  { name: "澎湖藍洞", emoji: "🌀", description: "夢幻藍色海蝕洞，浮潛看見台灣最藍的海", county: "澎湖縣" },
  { name: "綠島", emoji: "🐢", description: "全球少數可以夜間賞海龜的神奇小島", county: "台東縣" },
  { name: "蘭嶼", emoji: "🛶", description: "達悟族文化、拼板舟、飛魚季，台灣最後祕境", county: "台東縣" },
  { name: "台南安平古堡", emoji: "🏯", description: "荷蘭人建造的台灣第一座城堡，必訪歷史古蹟", county: "台南市" },
  { name: "高雄西子灣", emoji: "🌇", description: "夕陽最美的地方，柴山、海港、餘暉三重奏", county: "高雄市" },
  { name: "宜蘭礁溪溫泉", emoji: "♨️", description: "離台北最近的溫泉鄉，泡完湯吃蔥油餅超幸福", county: "宜蘭縣" },
  { name: "金瓜石黃金博物館", emoji: "🪙", description: "礦業小鎮改建，可以親手抱金塊的博物館", county: "新北市" },
  { name: "台東伯朗大道", emoji: "🌾", description: "金城武坐過的茄苳樹，綠色稻田無邊無際", county: "台東縣" },
  { name: "嘉義奮起湖", emoji: "🚂", description: "阿里山小火車停靠站，便當超好吃的山城小鎮", county: "嘉義縣" },
  { name: "台中彩虹眷村", emoji: "🎨", description: "黃爺爺一個人畫出的彩虹天地，色彩繽紛超療癒", county: "台中市" },
];

export function generateDailyReport(
  member: Member,
  weather: WeatherData
): DailyReport {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const lines = ENCOURAGEMENTS[member.name] ?? ENCOURAGEMENTS["阿佛的朋友"];
  const encouragement = lines[seed % lines.length];

  const restaurant = KAOHSIUNG_RESTAURANTS[seed % KAOHSIUNG_RESTAURANTS.length];

  const weatherBonus: Record<string, string> = {
    晴空萬里: "天氣這麼好，",
    大致晴朗: "天氣不錯，",
    多雲: "天空多雲，",
    小雨: "外面下雨，",
    中雨: "記得帶傘，",
    大雨: "今天大雨，",
    雷雨: "雷雨天要小心，",
  };
  const prefix =
    Object.entries(weatherBonus).find(([k]) => weather.description.includes(k))?.[1] ?? "";

  return {
    encouragement: prefix + encouragement,
    restaurant,
  };
}

export function getDailySpot(date: Date = new Date()): ScenicSpot {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return TAIWAN_SPOTS[seed % TAIWAN_SPOTS.length];
}
