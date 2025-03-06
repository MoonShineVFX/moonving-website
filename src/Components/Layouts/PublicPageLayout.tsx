import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//type
import {
  CategoryDataProps,
  LabDataProps,
  LabInfoDataProps,
  WorkItemProps,
  NavitemDataProps,
  SocialitemDataProps,
  AboutStatsDataProps,
  AboutInfoDataProps,
  AboutStrengthDataProps,
  ContactDataProps,
  HeaderDataProps,
  HeaderItemProps,
} from "../../types/types";

// component 頁面常用元件
import Header from "../Front/Header";
import Navbar from "../Front/Navbar";
import Footer from "../Front/Footer";
import MobileNavBtn from "../Front/MobileNavBtn";
import MobileNavBar from "../Front/MobileNavBar";

// Front 前台頁面
import Home from "../Front/Home";
import Lab from "../Front/Lab";
import WorkItem from "../Front/WorkItem";
import About from "../Front/About";
import Blog from "../Front/Blog";
import Contact from "../Front/Contact";

// firebase 資料庫連線
import db from "../../firebaseConfig/firebase";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// 本地json資料
import footerData from "../Json/footer.json";

function PublicPageLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const [workData, setWorkData] = useState<WorkItemProps[]>([]);
  const [filteredWorkData, setFilteredWorkData] = useState<WorkItemProps[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataProps[]>([]);
  const [labData, setLabData] = useState<LabDataProps[]>([]);
  const [labInfoData, setLabInfoData] = useState<LabInfoDataProps[]>([]);
  const [aboutStatsData, setAboutStatsData] = useState<AboutStatsDataProps[]>(
    []
  );
  const [aboutInfoData, setAboutInfoData] = useState<AboutInfoDataProps[]>([]);
  const [aboutStrengthData, setAboutStrengthData] = useState<
    AboutStrengthDataProps[]
  >([]);
  const [contactData, setContactData] = useState<ContactDataProps[]>([]);
  const [searchResults, setSearchResults] = useState<WorkItemProps | null>(
    null
  );
  const [currentLang, setCurrentLang] = useState<string>("cht");
  const [navitemData, setNavitemData] = useState<NavitemDataProps[]>([]);
  const [socialitemData, setSocialitemData] = useState<SocialitemDataProps[]>(
    []
  );
  const [headerItem, setHeaderItem] = useState<HeaderItemProps | null>(null);
  const [headerData, setHeaderData] = useState<HeaderDataProps[]>([]);
  const storage = getStorage();
  const toggleTrueFalse = () => setToggled(!isToggled);
  // 開啟單作品
  const handleAddClick = (dataId: string) => {
    const results = workData.find((d: any) => {
      return d.id === dataId;
    });
    if (results) {
      setSearchResults(results);
      setIsOpen(!isOpen);
    }
  };
  // 開啟作品modal
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  // 切換語系
  const switchLang = (data: string) => {
    // setLang(data)
    localStorage.setItem("lang", data);
    const lang = localStorage.getItem("lang");
    if (lang) {
      setCurrentLang(lang);
    }
  };

  // 切換 Headr 頁面名稱
  const switchHeaderName = (id: string) => {
    const result = navitemData.find((d: any) => {
      return d.id === id;
    });
    if (result) {
      setHeaderItem(result);
      setToggled(false);
    }
  };
  // 切換分類
  const switchCategory = (id: string) => {
    if (!id) {
      setFilteredWorkData(workData);
    } else if (id === "1") {
      setFilteredWorkData(workData);
    } else {
      var filter = workData.filter((item: WorkItemProps) => {
        return item.category === id;
      });
      setFilteredWorkData(filter);
    }
  };
  // 處理作品的圖片路徑
  const mapWorkData = async (data: WorkItemProps[]) => {
    let dataSorted = data.sort((a, b) => {
      return Number(b.sort_num) - Number(a.sort_num);
    });
    const twoarr = dataSorted.map(async (element: WorkItemProps) => {
      const imagesRef = ref(storage, `data/${element.img}`);
      const newimgurl = await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            break;
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            console.log("");
        }
      });
      return { ...element, imgpath: newimgurl };
    });
    if (twoarr) {
      setWorkData((await Promise.all(twoarr)) as WorkItemProps[]);
      setFilteredWorkData((await Promise.all(twoarr)) as WorkItemProps[]);
    }
  };
  // 處理LAB的圖片路徑
  const mapLabData = async (data: LabDataProps[]) => {
    const twoarr = data.map(async (element: LabDataProps) => {
      const imagesRef = ref(storage, `img_lab/${element.image}`);
      const newimgurl = await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            break;
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            console.log("");
        }
      });
      return { ...element, imgpath: newimgurl };
    });
    setLabData((await Promise.all(twoarr)) as LabDataProps[]);
  };

  //執行撈資料
  useEffect(() => {
    /**
     * 到 firebase 撈作品資料表
     * 資料先傳到 mapWorkData 處理過圖片路徑再回傳 setWorkData 給網頁用
     * **/
    const getWorks = async () => {
      const q = query(collection(db, "data"), orderBy("time_added", "desc"));
      const data = await getDocs(q);
      mapWorkData(data.docs.map((doc) => doc.data() as WorkItemProps));
    };
    getWorks();

    /**
     * 到 firebase 撈分類資料表
     * 不用處理圖片路徑的 直接 set
     * **/
    const getCategory = async () => {
      const q = query(collection(db, "category"), where("display", "==", "1"));
      const data = await getDocs(q);

      setCategoryData(data.docs.map((doc) => doc.data() as CategoryDataProps));
    };
    getCategory();

    /**
     * 到 firebase 撈選單資料表
     * **/
    // setNavitemData()
    const getNavitem = async () => {
      const q = query(collection(db, "navitem"));
      const data = await getDocs(q);
      setNavitemData(data.docs.map((doc) => doc.data() as NavitemDataProps));
    };
    const getSocialitem = async () => {
      const q = query(collection(db, "socialitem"), orderBy("id", "desc"));
      const data = await getDocs(q);

      setSocialitemData(
        data.docs.map((doc) => doc.data() as SocialitemDataProps)
      );
    };
    getNavitem();
    getSocialitem();

    /**
     * 到 firebase 撈 Lab 資料表
     * 先傳到 mapLabData 處理過圖片路徑再回傳 setLabData 給網頁用
     * **/
    const getLabdata = async () => {
      const q = query(collection(db, "labdata"));
      const data = await getDocs(q);

      mapLabData(data.docs.map((doc) => doc.data() as LabDataProps));
    };
    const getLabinfo = async () => {
      const q = query(collection(db, "labinfo"));
      const data = await getDocs(q);
      setLabInfoData(data.docs.map((doc) => doc.data() as LabInfoDataProps));
    };
    getLabdata();
    getLabinfo();

    /**
     * 到 firebase 撈關於公司介紹資料表
     * **/
    // setAbout
    const getAboutstats = async () => {
      const q = query(collection(db, "aboutstats"));
      const data = await getDocs(q);

      setAboutStatsData(
        data.docs.map((doc) => doc.data() as AboutStatsDataProps)
      );
    };
    const getAboutinfo = async () => {
      const q = query(collection(db, "aboutinfo"));
      const data = await getDocs(q);

      setAboutInfoData(
        data.docs.map((doc) => doc.data() as AboutInfoDataProps)
      );
    };
    const getAboutstrength = async () => {
      const q = query(collection(db, "aboutstrength"));
      const data = await getDocs(q);

      setAboutStrengthData(
        data.docs.map((doc) => doc.data() as AboutStrengthDataProps)
      );
    };
    const getContact = async () => {
      const q = query(collection(db, "contact"));
      const data = await getDocs(q);

      setContactData(data.docs.map((doc) => doc.data() as ContactDataProps));
    };
    const getHeader = async () => {
      const q = query(collection(db, "header"));
      const data = await getDocs(q);

      setHeaderData(data.docs.map((doc) => doc.data() as HeaderDataProps));
    };
    getAboutstats();
    getAboutinfo();
    getAboutstrength();
    getContact();
    getHeader();

    /**
     *  如果 localStorage 沒有預設就顯示英文
     * **/
    const lang = localStorage.getItem("lang");
    if (lang) {
      setCurrentLang(lang);
    } else {
      setCurrentLang("eng");
    }
  }, []);
  return (
    <React.Fragment>
      {isOpen ? (
        <WorkItem
          workData={searchResults as WorkItemProps}
          handler={handleOpen}
          visible={isOpen}
        />
      ) : null}
      <Navbar
        currentLang={currentLang}
        switchLang={switchLang}
        navitemData={navitemData}
        socialitemData={socialitemData}
        switchHeaderName={switchHeaderName}
      />
      <MobileNavBtn toggleTrueFalse={toggleTrueFalse} />
      <MobileNavBar
        isToggled={isToggled}
        currentLang={currentLang}
        switchLang={switchLang}
        navitemData={navitemData}
        socialitemData={socialitemData}
        switchHeaderName={switchHeaderName}
      />
      <Header
        currentLang={currentLang}
        headerItem={headerItem ?? { engname: "", chtname: "" }}
        headerData={headerData ? headerData : []}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              workData={filteredWorkData}
              categoryData={categoryData}
              handler={handleAddClick}
              currentLang={currentLang}
              switchCategory={switchCategory}
            />
          }
        />
        <Route
          path="/lab"
          element={
            <Lab
              currentLang={currentLang}
              labData={labData}
              labInfoData={labInfoData[0]}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              currentLang={currentLang}
              aboutStatsData={aboutStatsData}
              aboutInfoData={aboutInfoData[0]}
              aboutStrengthData={aboutStrengthData}
            />
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/contact"
          element={
            <Contact currentLang={currentLang} contactData={contactData} />
          }
        />
      </Routes>
      <Footer
        currentLang={currentLang}
        footerData={footerData}
        socialitemData={socialitemData}
      />
    </React.Fragment>
  );
}

export default PublicPageLayout;
