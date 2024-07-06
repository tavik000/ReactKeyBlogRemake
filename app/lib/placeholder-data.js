// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const post_tags = [
  {
    name: 'Other',
  },
  {
    name: 'UE',
  },
];

const comments = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64420',
    post_id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    author: 'trollguy87',
    author_img: '/viewers/trollguy87.png',
    author_email: 'trollguy87@gmail.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos possimus porro earum dolor sint fuga laborum velit laudantium distinctio quos sunt veritatis unde inventore, autem ad tenetur voluptatibus mollitia vel!',
    create_date: '2022-12-06',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64430',
    post_id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    author: 'trollguy87',
    author_img: '/viewers/trollguy87.png',
    author_email: 'trollguy87@gmail.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos possimus porro earum dolor sint fuga laborum velit laudantium distinctio quos sunt veritatis unde inventore, autem ad tenetur voluptatibus mollitia vel!',
    create_date: '2023-12-06',
  },
]

const posts_en = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    title: 'Example Post 1',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Key',
    comments: ['3958dc9e-712f-4377-85e9-fec4b6a64420', '3958dc9e-712f-4377-85e9-fec4b6a64430'],
    create_date: '2022-12-06',
  },
  {
    id: '86b93c2d-9d95-4c14-b05f-6e7e4e167c44',
    title: 'Example Post 2',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Key',
    comments: [],
    create_date: '2022-12-06',
  },
  {
    id: 'e4189b55-9232-4e56-97ec-3d67bf7351d5',
    title: 'Example Post 3',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Key',
    comments: [],
    create_date: '2022-12-06',
  },
  {
    id: 'a8e2fa8e-5a5c-4a3e-9a38-8b3a160f3e15',
    title: 'Example Post 4',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Key',
    comments: [],
    create_date: '2022-12-06',
  },
  {
    id: '4fca8134-1d33-4f97-b761-1089de3d3f13',
    title: 'Example Post 5',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Key',
    comments: [],
    create_date: '2022-12-06',
  },
  {
    id: 'c92bc4a3-4f34-45b1-b66f-e7c64fc8b39e',
    title: 'Example Post 31',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Key',
    comments: [],
    create_date: '2022-12-06',
  },
  {
    id: "f7a9e3b7-8fd4-4b3f-bd7a-79a712f5f1a1",
    title: "Diving into Machine Learning Algorithms",
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ["AI", "ML", "Tech"],
    content: "Machine learning algorithms are at the core of AI applications, allowing systems to learn from data and make predictions...",
    author: "Alex",
    comments: [],
    create_date: "2023-01-15"
  },
  {
    id: "9a2f4c51-7c2d-4b07-bd06-8fc6e6dbd1c9",
    title: "The Impact of Renewable Energy Technologies",
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ["Environment", "Energy", "Tech"],
    content: "Renewable energy technologies like solar and wind power are crucial in the transition to sustainable energy sources...",
    author: "Emma",
    comments: [],
    create_date: "2023-02-28"
  },
  {
    id: "b0f4a1a8-9b67-4820-9cf3-25d7bcb6b1f5",
    title: "The Evolution of Robotics in Manufacturing",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["Robotics", "Manufacturing", "Tech"],
    content: "Robotics technology is revolutionizing manufacturing processes, improving efficiency and precision...",
    author: "Sophia",
    comments: [],
    create_date: "2023-04-10"
  },
  {
    id: "a7d5e0f2-38ef-4d02-bc11-1d332f9b5b49",
    title: "Artificial Intelligence in Autonomous Vehicles",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["AI", "Autonomous Vehicles", "Tech"],
    content: "AI plays a crucial role in the development of autonomous vehicles, enhancing safety and navigation capabilities...",
    author: "Daniel",
    comments: [],
    create_date: "2023-05-05"
  },
  {
    id: "c3a7b1f9-cc8d-45b0-b7ac-9811e43c83b4",
    title: "The Promise of Quantum Computing",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["Quantum Computing", "Tech", "Future"],
    content: "Quantum computing holds immense potential to solve complex problems that are beyond the reach of classical computers...",
    author: "Olivia",
    comments: [],
    create_date: "2023-06-15"
  },
  {
    id: "e2c6f5a0-8744-4b21-bd4a-9f06a458b03f",
    title: "Exploring Cybersecurity in the Age of IoT",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["Cybersecurity", "IoT", "Tech"],
    content: "As IoT devices proliferate, cybersecurity becomes increasingly crucial to protect data and ensure privacy...",
    author: "Liam",
    comments: [],
    create_date: "2023-07-20"
  },
  {
    id: "d8f9e2c3-64e2-42aa-96d1-8e47245ac5ae",
    title: "Augmented Reality: Bridging the Physical and Digital Worlds",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["AR", "Tech", "Future"],
    content: "AR technology overlays digital information onto the physical world, transforming how we interact with our environment...",
    author: "Ava",
    comments: [],
    create_date: "2023-08-10"
  },
  {
    id: "f1d8c4b5-5ef8-4327-b2e3-6f0bf2a1d7a7",
    title: "The Role of Blockchain in Supply Chain Management",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["Blockchain", "Supply Chain", "Tech"],
    content: "Blockchain enhances transparency and traceability in supply chains, reducing fraud and improving efficiency...",
    author: "Noah",
    comments: [],
    create_date: "2023-09-05"
  },
  {
    id: "b6d5e8a3-ec75-4e7d-b62b-9e8e3c907a16",
    title: "The Future of 3D Printing Technology",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["3D Printing", "Tech", "Innovation"],
    content: "3D printing is revolutionizing manufacturing, healthcare, and even construction, enabling customized production...",
    author: "Ethan",
    comments: [],
    create_date: "2023-10-15"
  },
  {
    id: "a9b8c7d6-e5f4-4a3b-8c2d-1f0e9b0d0a1b",
    title: "Advancements in Biotechnology: CRISPR and Beyond",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["Biotechnology", "CRISPR", "Tech"],
    content: "CRISPR technology allows precise genetic editing, revolutionizing agriculture, medicine, and biotechnology...",
    author: "Isabella",
    comments: [],
    create_date: "2023-11-20"
  },
  {
    id: "f3e4d5c6-b7a8-4c9e-8d2f-0e1a2b3c4d5e",
    title: "Space Exploration: The Next Frontier",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["Space", "Tech", "Exploration"],
    content: "Advancements in space technology are enabling humanity to explore distant planets and understand the cosmos like never before...",
    author: "Mia",
    comments: [],
    create_date: "2023-12-10"
  },
  {
    id: "d2e3f4a5-c6b7-4d8e-9f1a-0b2c3d4e5f6a",
    title: "Ethical Considerations in AI Development",
    thumbnail_img: "/1920x1080_KirbyBday.png",
    tags: ["AI", "Ethics", "Tech"],
    content: "As AI advances, ethical questions about bias, privacy, and accountability become increasingly important...",
    author: "Jacob",
    comments: [],
    create_date: "2024-01-05"
  }

];

const posts_ja = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    title: '例の記事',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: '記事例文ですけど、芸フ都当切模不ネキウ製数あふそ由特べと名行めこも材誓コソ歳古ヱヤ奨読ラ援覧ヤヲク下文中ッしじ集和5割ぼようみ浜発文ルこせリ要順ーげつで。年エニ見7山ー中権ヤヒキ幌事防キル能場ぐふイ用臨キ社被ぱ奪三カケヱク込法ぶほ望阪ニト氏問クカラ中感投と。特に芸展び源速レコマワ調溶秀ち多兵くぞ付選ふちせご樫2間ぐおスし期住53横し応長つ術卒筋げまぜほ。8鳴あ予井くぱっう語説のすば予伴マカハフ遺飯どう渡記おら氷鳥げか総毎紀セ越問後迫ば特8禁ヌチヲル座電ヲメ情仁ふーげ。表エキヤ質一ク市亡ヤサチ票乳32民ぶルくへ融収イサ分室ラし楽貴ン勢地界ソノチミ監地っ供旅りくこで葬氷ゆほてゃ利化ロ北明列み覧化ソルモツ見並レヒセ害行披暑棚くどりえ。 暴る起芸お防位メマ質哀ろぼまを携死ワ効住べそぱ安購ご育覚ド相小ソロト欧放ニ聞課オクミノ航案スエセチ給際入色種さリや。97金審ヤサヘ柔2悪くぱひ放求好ユオ消査ヘクネ極傷ヤ闘旨能そみ山屋早崎ド。71竹テロイ無縮禁げすど売対ネマ能行こ七色年ぶ健事クリ館情おべ状7舞布益陣市ちも。 協げひざ域指クいず真経せにば調線ルカ況者ヲル風式ヒカ信揚布たがレ海7月メソニフ質念更ち点9人やねよ殊載ロヱハエ当関芸ふ豪児きのわ属王太ぱの片嘉塁塾ッなわ。第ふばやご始時ツアヨ田民のだも展体えむく出定べゆ栄場ツ遂違ヲ世本名ニヌキケ壊必テ前光チキ佐三ちフぽ亀報ネニ能投32園ぞぼおル役射窃ぱッび。 年だ士抵ゅドラ週済ニイフヘ樹民ふざレ組更シヲ保営ッ討鉄ヘ掲島森さにた展際ろばぽク金不ナ響述クナヒ注情こ小映傷込体左ゃをしま。善くあ県変を月派路高じなでッ安米ル入町ごたぎな予森ルセ入戦しな文罪ミホニ竹独ヘマオ真重海決取いだ。読かまン解道38勢土工幅7第モチ工都エチ済石ラ仕連じ結4警をじこあ女9日マ図索りぞ面事ざトにぼ著主レイヲネ壇信立がーどト。 絞ネヤラフ宮聞ツムクハ気今テニ平調ハケリソ統新4必はぐクら常展けぽせ久幕のごろな理初ちもむほ質鉄コ上職架津ひる要禁ぞゃルさ編明ネオモ職今ざク木天浩簡様志おじ。2選ルツレク拙記ヘオ雪転味ぽぎざ喜容いへ横写ヤミヘ界果や社東なち憶説東てえフ資護枠ど。際ねむ衛真さおはま気両ハシラ北署モ離授タ月似とレ浜航わおず館愛亡39動請ヘエム古禁ヨ神伊どッけ。 量ニネ代応ノ佑頭らのゅ弘活中ワモハ堀治っ策皇ン厳2思ぴさッ逆護め詳腰どず号造エイウカ宮4免在稼エコヤ携物をもあ束央ぶせべよ残治フリユサ新本ちよけ本玲講芝伯ばはよ。修カニ成佐ワハミチ載少サユ比法あな周将ふやむ案料辺ヲト都96歳持脱71来もしー二金療しべで記生想トエヌフ同強ヤヱケ弔禁れ作着のへさゃ城傑レぜひぎ。 果キクセ代方ヲ吉差ぐかい反購レヒ降行6綸土つうばん上沢かんラる万県っ紙84能ふ住置ドてまク年謙ウレヒ医報育んと牡禁くらへこ所少ルラ会白象留れこ。旅すせもク半堀ヨ梨負ヨキ与時ヤワミ競点あだせわ我雄らで程新サ看夜り択室岸クのまも木野けらを年者ラ館長ナヘサヲ具五肉う東備ヘノ法今部モ政法視劣嘆せ。 務オソ締会9感波ハサヨ日続うげルが品啓さま第月追レ聞知ヒロ平意コヌ足50判せよぼ占聞ゆ際起1能コシ行成ざ送断社ぞ。拝ご球住除ウ日選ぼへでも僕倉ロエモツ阜用に後上ちぶっづ層7最ワヒセハ青8得びをレ読気ぽ聴注岡きろし。言サキセコ金夏べめ間害ケル目断経キ訳経止クぎす普効えに題京両シハス故倒つづ著謙ナ町涯ヱホ氏割けへ高城要ぴぞか国民むす表干悟栽桂ぼ。 扱シキヤワ読動は禁合す貴辺ば百人ぎべゅで真記ツサテケ氏事イ馬後オム見残要3電ひくだ交版トせク回8断イほひ土諭ウニトセ版著ヤネ辺企ゃぞく勝校フ載調敷俸をつら。態ワウモフ地更ゃレ団委お演実ナラ復励宮カロホ込首だ渇3姿ゅめち景出著禁7込ッあぐ索回触ふ載役総ら。開ヲ新国ヘ亡載ヌヱ図本アルテ買京べりッ氏目ド載図回タ水毎ぎぜ梨学9患くた吉円ろ。',
    author: 'Key',
    comments: ['3958dc9e-712f-4377-85e9-fec4b6a64420', '3958dc9e-712f-4377-85e9-fec4b6a64430'],
    create_date: '2022-12-06',
  },
];

const posts_kr = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    title: '요청하신 페이지가 존재하지 않습니다.',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: '문의 사항이 있을경우 헬프데스크로 문의해 주세요. 감사합니다',
    author: 'Key',
    comments: ['3958dc9e-712f-4377-85e9-fec4b6a64420', '3958dc9e-712f-4377-85e9-fec4b6a64430'],
    create_date: '2022-12-06',
  },
];

const posts_zh = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    title: '雄又平呀爪科根花秋怎綠',
    thumbnail_img: '/1920x1080_KirbyBday.png',
    tags: ['UE', 'Other'],
    content: '夏青乙士根升支星海草抓活甲洋位跳。圓西後象世，我錯告內了泉行直司「良向西皮白方音」各友訴頭羊哪青收那讀：種走七八尾，真親木文經吧親嗎牛金燈旁常流京河金或合：少朱借立夕信朱邊定。',
    author: 'Key',
    comments: ['3958dc9e-712f-4377-85e9-fec4b6a64420', '3958dc9e-712f-4377-85e9-fec4b6a64430'],
    create_date: '2022-12-06',
  },
];

module.exports = {
  users,
  post_tags,
  posts_en,
  posts_ja,
  posts_kr,
  posts_zh,
  comments
};
