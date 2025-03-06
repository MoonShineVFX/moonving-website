// workitem
// {
//   "img": "1720773878992.jpg",
//   "id": "lyig7d0v",
//   "sort_num": "2026",
//   "intro": "",
//   "sub_category": "vfx01",
//   "article_text": "",
//   "year_of_work": "2022",
//   "video_url": "https://vimeo.com/890207780?share=copy",
//   "img_list": [
//       {
//           "isCover": false,
//           "img": "https://xx.com/01.jpg"
//       }
//   ],
//   "time_added": "2024-07-12 16:40:53",
//   "category": "4",
//   "article": false,
//   "title": "MOVIE：The Bridge Curse 2｜電影：女鬼橋 2 怨鬼樓",
//   "display": "1"
// }
export interface WorkItemProps {
  img: string;
  id: string;
  sort_num: string;
  intro: string;
  sub_category: string;
  article_text: string;
  year_of_work: string;
  video_url: string;
  img_list: {
    isCover: boolean;
    img: string;
  }[];
  time_added: string;
  category: string;
  article: boolean;
  title: string;
  display: string;
  imgpath: string;
}

//CategoryDataProps
// {
//   "name_cht": "角色",
//   "sort_num": "10",
//   "img": "14614938522439.jpg",
//   "id": "2",
//   "name": "Animation",
//   "sub_category": [
//       {
//           "title": "realistic",
//           "id": "sc01",
//           "display": "1"
//       },
//       {
//           "title": "stylish",
//           "id": "sc02",
//           "display": "1"
//       },
//       {
//           "id": "sc03",
//           "title": "toon",
//           "display": "1"
//       }
//   ],
//   "video_url": "https://moonshine.b-cdn.net/msweb/for_global/img_category/page_animation.mp4",
//   "video_poster": "home_animation_cover.png",
//   "cover_video": "https://r2.web.moonshine.tw/msweb/for_global/img_category/home_animation_w.mp4",
//   "slug": "animation",
//   "display": "1"
// }
export interface CategoryDataProps {
  id: string;
  name: string;
  name_cht: string;
  sort_num: string;
  img: string;
  sub_category: SubCategoryProps[];
  video_url: string;
  video_poster: string;
  cover_video: string;
}

//SubCategoryProps
export interface SubCategoryProps {
  title: string;
  id: string;
  display: string;
}

//LabDataProps
// {
//   "image": "4drec01.jpg",
//   "title_1": "Capturing Images and Creating 3D Motions in Real-time",
//   "description_1": "4D REC is a volumetric capture technology developed by MoonShine Animation, capturing motions markeless, and stream animations in real-time.",
//   "name": "4D REC",
//   "description_2": "Using synchronized, high-end video cameras, we acquire terabytes of photorealistic human motion. The data is used for MV, VFX, games and AR / VR.",
//   "description_2_cht": "使用高等攝影機同步捕捉寫實的人物動態，並可應用在 MV、特效、遊戲及 AR / VR 領域等。",
//   "sitelink": "https://www.4drec.com/",
//   "title_2_cht": "用於特效、MV 與電影",
//   "id": "1",
//   "name_cht": "4D REC",
//   "video": "https://player.vimeo.com/video/435638545",
//   "title_1_cht": "捕捉動態，快速創造 3D動態影像",
//   "description_1_cht": "夢想動畫開發的 4D REC 是台灣少數的容積捕捉系統 (Volumetric Capture)，可在不穿戴任何裝備的情況下，即時掃描物體並產出動態影像。",
//   "title_2": "Used in VFX, MV and Movies"
// }
export interface LabDataProps {
  image: string;
  title_1: string;
  description_1: string;
  name: string;
  description_2: string;
  description_1_cht: string;
  description_2_cht: string;
  sitelink: string;
  title_2_cht: string;
  id: string;
  name_cht: string;
  video: string;
  title_1_cht: string;
  title_2: string;
  imgpath: string;
  uid: string;
}

//LabInfoDataProps{
//   "description_cht": "夢想動畫持續探索科技的邊界以實現我們的想像；我們致力於研發各種創新技術，讓影像流程更效率。",
//   "name_cht": "Lab",
//   "name": "Lab",
//   "description": "MoonShine Animation keeps pushing the boundaries of technology to realize our imagination. We strive to offer creative and innovative solutions, making the creative pipeline more efficient.",
//   "id": "1"
// }
export interface LabInfoDataProps {
  description_cht: string;
  name_cht: string;
  name: string;
  description: string;
  id: string;
}

//NavitemDataProps
// {
//   "path": "",
//   "id": 1,
//   "engname": "Work",
//   "chtname": "作品"
// }
export interface NavitemDataProps {
  path: string;
  id: number;
  engname: string;
  chtname: string;
}

//SocialitemDataProps
// {
//   "id": "1",
//   "name": "Facebook",
//   "link": "https://www.facebook.com/moonshineanimation",
//   "img": "facebook.svg"
// }
export interface SocialitemDataProps {
  id: string;
  name: string;
  link: string;
  img: string;
}

//AboutStatsDataProps
// {
//   "center": "150+",
//   "right": "Know More",
//   "id": "1",
//   "left": "Employees",
//   "center_cht": "150+",
//   "right_cht": "瞭解更多",
//   "left_cht": "員工",
//   "link": "https://medium.com/moonshinevfx"
// }
export interface AboutStatsDataProps {
  center: string;
  right: string;
  id: string;
  left: string;
  center_cht: string;
  right_cht: string;
  left_cht: string;
  link: string;
}

//AboutInfoDataProps
// {
//   "name_cht": "關於",
//   "description_2": "MoonShine is a team consisted of diverse artists: directors, project managers, animators, compositors, research developers and designers.\n\nWe offer 360-degree service from concept to screen. Being an integrated company, we are able to execute a project from script writing to concept art, from story board to animatic, from shoot to post-production.",
//   "name": "About",
//   "description_2_cht": "夢想動畫的團隊包含導演、專案經理、概念設計師、動畫師、合成師、 特效師、研發⼯程師、互動設計師等。夢想的能⼒觸⾓相當廣泛，並且提供影像的全⽅位服務；從前期創意發想到概念美術；從靜態腳本到動態腳本；從拍攝到後期製作，都可以在夢想內部獨立產製。",
//   "title_2": "Our Strength",
//   "title_1": "About MoonShine Animation",
//   "id": "1",
//   "title_2_cht": "夢想的優勢",
//   "description_1": "MoonShine Animation is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.\n\nFounded in 2012, MoonShine Animation has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.",
//   "title_1_cht": "關於夢想",
//   "description_1_cht": "夢想動畫是一間以藝術創作者為核心的公司，整合了導演、設計師、動畫師與研發人才，致力於廣告、影像與虛擬內容產製。\n\n創立於 2012 年，夢想經歷了許多挑戰，並且與所有夢想的藝術家一起完成了各種創作。我們相信透明與平等的價值，並且持續為這世界帶來好作品。"
// }
export interface AboutInfoDataProps {
  name_cht: string;
  description_2: string;
  name: string;
  description_2_cht: string;
  title_2: string;
  title_1: string;
  id: string;
  title_2_cht: string;
  description_1: string;
  title_1_cht: string;
  description_1_cht: string;
}

//AboutStrengthDataProps
// {
//   "title_cht": "完整的製作流程",
//   "image": "about-s01.png",
//   "description_cht": "從製作前期、製作到後製，每個階段均有成熟的流程",
//   "description": "From pre-production to post production, MoonShine has developed a mature production process.",
//   "title": "SOLID PIPELINE",
//   "id": "1"
// }
export interface AboutStrengthDataProps {
  title_cht: string;
  image: string;
  description_cht: string;
  description: string;
  title: string;
  id: string;
}

//ContactDataProps
// {
//   "subcribe_title_cht": "訂閱夢想的消息",
//   "tel_content": "02-2785-7037",
//   "address_content": "3F, No.481, Sec. 6, Zhongxiao E. Rd., Nangang Dist., Taipei City 115, Taiwan (R.O.C.)",
//   "email_content": "info@moonshine.tw",
//   "email_title_cht": "Email",
//   "address_title_cht": "地址",
//   "subcribe_content_cht": "留下你的 email，我們將會不定時分享夢想的課程、講座、影像好文給你。",
//   "lat": 25.051027,
//   "address_title": "Address",
//   "lng": 121.59486,
//   "subcribe_title": "Subscribe To Our Newsletter",
//   "tel_title": "Tel",
//   "id": "1",
//   "tel_title_cht": "電話",
//   "subcribe_content": "Subscribe to our newsletter and stay updated on the latest lectures, forums and articles.",
//   "address_content_cht": "115 台北市南港區忠孝東路六段481號3樓",
//   "email_title": "Email"
// }
export interface ContactDataProps {
  subcribe_title_cht: string;
  tel_content: string;
  address_content: string;
  email_content: string;
  email_title_cht: string;
  address_title_cht: string;
  subcribe_content_cht: string;
  lat: number;
  address_title: string;
  lng: number;
  subcribe_title: string;
  tel_title: string;
  id: string;
  tel_title_cht: string;
  subcribe_content: string;
  address_content_cht: string;
  email_title: string;
}

//HeaderDataProps
// {
//   "type": "video",
//   "video": "https://player.vimeo.com/video/342892008",
//   "img": "msWebLogo.svg",
//   "id": "1",
//   "pages": "home"
// }
export interface HeaderDataProps {
  type: string;
  video: string;
  img: string;
  id: string;
  pages: string;
}

//header HeaderItemProps
// {
//   engname, chtname
// }
export interface HeaderItemProps {
  engname: string;
  chtname: string;
}

//FooterDataProps
// "footer"{
//     "tel":"Tel | 02-2785-7037",
//     "email":"Email | info@moonshine.tw",
//     "address":"Address | 3F, No.481, Sec. 6, Zhongxiao E. Rd., Nangang Dist., Taipei City 115, Taiwan (R.O.C.)",
//     "copyright":"Copyright ⓒ 2021 MoonShine Animation",
//     "tel_cht":"電話 | 02-2785-7037",
//     "email_cht":"Email | info@moonshine.tw",
//     "address_cht":"地址 | 115 台北市南港區忠孝東路六段481號3樓",
//     "copyright_cht":"Copyright ⓒ 2021 夢想動畫有限公司",
//     "image":"logo.svg"
// }
export interface FooterProps {
  footer: FooterDataProps;
}

export interface FooterDataProps {
  tel: string;
  email: string;
  address: string;
  copyright: string;
  tel_cht: string;
  email_cht: string;
  address_cht: string;
  copyright_cht: string;
  image: string;
}

// FileProps
// "filename":imgFileName,
// "file":selectedFile,
// "folder":'data/'
export interface FileProps {
  filename: string;
  file: File;
  folder: string;
}
