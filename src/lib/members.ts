export interface Member {
  id: string;
  name: string;
  photo: string;
  description: string;
  personality: string;
}

export const members: Member[] = [
  {
    id: "牛仔褲阿佛",
    name: "牛仔褲阿佛",
    photo: "/members/牛仔褲阿佛.jpg",
    description:
      "阿佛界的富豪，身上穿著超貴的牛仔褲，負責大家的生活起居，是一位溫暖的大哥，有時候還會不定期捐款給阿佛基金會幫助老鼠們改善生活。",
    personality: "豪爽大方、溫暖體貼",
  },
  {
    id: "棕熊阿佛",
    name: "棕熊阿佛",
    photo: "/members/棕熊阿佛.jpg",
    description:
      "慢慢還在適應阿佛世界的小姑娘，從動物園逃進阿佛的生活圈裡面，原本生活在野生動物區，原本為了生存扮成棕熊的老鼠。",
    personality: "可愛、正在適應新環境",
  },
  {
    id: "大便阿佛",
    name: "大便阿佛",
    photo: "/members/大便阿佛.jpg",
    description:
      "是阿佛世界裡最善良的人，因為小時候曾經因為外表被排擠，所以長大勵志成為溫暖的人，負責安慰每個低潮的阿佛開導大家。但因為外型黝黑被大家嘲笑叫大便阿佛。",
    personality: "善良溫暖、心靈導師",
  },
  {
    id: "睡衣阿佛",
    name: "睡衣阿佛",
    photo: "/members/睡衣阿佛.jpg",
    description:
      "在阿佛世界裡不常出現因為都在睡覺，生活在阿佛世界裡的洞穴裡，生活裡有15個小時都在睡覺。他就連出門買東西吃都是穿著他最愛的睡衣出門，但因為他有一個扣子被其他阿佛偷了所以只剩一個扣子。",
    personality: "慵懶愛睡、洞穴居民",
  },
  {
    id: "灰阿佛",
    name: "灰阿佛",
    photo: "/members/灰阿佛.jpg",
    description:
      "阿佛世界裡的主要核心人物，最近要參選高雄市長，所以會不定期到高雄各個角落發競選周邊，也會很常在路上看到他的標誌。立志要把高雄的核心區域從凹子底轉移到三民區改變阿佛們的生活。",
    personality: "有抱負、政治家風範",
  },
  {
    id: "變色龍阿佛",
    name: "變色龍阿佛",
    photo: "/members/變色龍阿佛.jpg",
    description:
      "是阿佛世界裡最喜歡裝扮的人，興趣是cosplay成不同種動物，最近迷上變色龍所以扮成變色龍但一直被誤會成鸚鵡頭阿佛。",
    personality: "愛打扮、多變創意",
  },
  {
    id: "紅阿佛",
    name: "紅阿佛",
    photo: "/members/紅阿佛.jpg",
    description:
      "曾經被當作阿佛界裡的實驗品，為了研發新的藥物喝下Dr阿佛研發的新藥品就變成紅色的，大家看到他都會很熱情的跟他拍照，也是阿佛世界裡的一個打卡景點。",
    personality: "人氣王、打卡景點",
  },
  {
    id: "Dr.阿佛",
    name: "Dr.阿佛",
    photo: "/members/Dr.阿佛.jpg",
    description:
      "阿佛世界裡最聰明的人，立志開一間自己的醫院跟治療好鼠疫，研發許多新的藥物也成功治療很多阿佛。但也曾經做實驗失敗，像是不小心把紅阿佛變成紅色，所以他最近只敢躲在家裡自己研發新藥物。",
    personality: "聰明博學、宅在家的科學家",
  },
  {
    id: "瞇瞇眼阿佛",
    name: "瞇瞇眼阿佛",
    photo: "/members/瞇瞇眼阿佛.jpg",
    description:
      "灰阿佛（市長）的表妹，住在三民區，是阿佛世界裡的小妹，對這個世界充滿好奇。眼睛很小，跟她說話有時候會以為她沒在認真聽。",
    personality: "充滿好奇、活潑小妹",
  },
  {
    id: "小阿佛",
    name: "小阿佛",
    photo: "/members/小阿佛.jpg",
    description:
      "阿佛世界裡最迷你的成員，雖然個子小小的，但充滿大大的能量！走路特別快因為腳步短，總是第一個發現新鮮事的阿佛。",
    personality: "迷你充滿活力",
  },
  {
    id: "發霉阿佛",
    name: "發霉阿佛",
    photo: "/members/發霉阿佛.jpg",
    description:
      "住在阿佛世界裡最潮濕角落的阿佛，不知道什麼時候開始身上長出了一些特別的花紋，有人說那是藝術，有人說那是發霉。反正發霉阿佛自己覺得很獨特就好。",
    personality: "獨特不羈、自我風格",
  },
  {
    id: "阿佛的朋友",
    name: "阿佛的朋友",
    photo: "/members/阿佛的朋友.jpg",
    description:
      "從隔壁城市來的不同品種的老鼠，非常喜歡來阿佛的世界認識新朋友。他們跟阿佛相比，比較勤勞跟友善。",
    personality: "友善勤勞、交友廣泛",
  },
];

export function getDailyMember(date: Date = new Date()): Member {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return members[dayOfYear % members.length];
}
