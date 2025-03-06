import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// component 常用元件
import AdminNav from "../Back/AdminNav";

//adminpage 管理頁面
import Work from "../Back/Work";
import Category from "../Back/Category";
import Lab from "../Back/Lab";
import ManagerHeader from "../Back/ManagerHeader";

//firebase 連線設定
import db from "../../firebaseConfig/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function DashboardLayout() {
  const [workData, setWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [latestSortNum, setLatestSortNum] = useState<number>(0);
  const storage = getStorage();

  //LAB CURD 方法
  const handleCreateLab = async (data: any) => {
    const collectionRef = collection(db, "labdata");
    await addDoc(collectionRef, data);
  };
  const handleDeleteLab = async (uid: string) => {
    const labDoc = doc(db, "labdata", uid);
    await deleteDoc(labDoc);
  };
  const handleUpdateLab = async (uid: string, currentData: any) => {
    const labDoc = doc(db, "labdata", uid);
    await updateDoc(labDoc, currentData);
  };

  //CATEGORY CURD
  const handleCreateCategory = async (data: any) => {
    const collectionRef = collection(db, "category");
    try {
      await addDoc(collectionRef, data);
      getCategory();
    } catch (error) {}
  };
  const handleDeleteCategory = async (uid: string) => {
    const categoryDoc = doc(db, "category", uid);
    try {
      await deleteDoc(categoryDoc);
      getCategory();
    } catch (error) {}
  };
  const handleUpdateCategory = async (uid: string, currentData: any) => {
    const categoryDoc = doc(db, "category", uid);
    try {
      await updateDoc(categoryDoc, currentData);
      getCategory();
    } catch (error) {}
  };
  const handleUpdateCategorySortNum = async (sortnum: string, uid: string) => {
    const categoryDoc = doc(db, "category", uid);
    var newField = { sort_num: sortnum };
    try {
      await updateDoc(categoryDoc, newField);
      getCategory();
    } catch (error) {}
  };

  //WORK CURD
  const handleCreateWork = async (data: any) => {
    const collectionRef = collection(db, "data");
    try {
      await addDoc(collectionRef, data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteWork = async (uid: string) => {
    const workDoc = doc(db, "data", uid);

    try {
      await deleteDoc(workDoc);
      getWorks();
    } catch (error) {}
  };
  const handleUpdateWork = async (uid: string, currentData: any) => {
    const workDoc = doc(db, "data", uid);

    try {
      await updateDoc(workDoc, currentData);
      getWorks();
    } catch (error) {}
  };
  const handleUpdateWorkDisplay = async (uid: string, display: string) => {
    const workDoc = doc(db, "data", uid);
    var newField = { display: "0" };
    if (display === "1") {
      newField.display = "0";
    } else {
      newField.display = "1";
    }
    try {
      await updateDoc(workDoc, newField);
      getWorks();
    } catch (error) {}
  };

  const handleUpdateWorkCatrgory = async (id: string, uid: string) => {
    const workDoc = doc(db, "data", uid);
    var newField = { category: id };
    try {
      console.log("start up");
      await updateDoc(workDoc, newField);
      console.log("success up");
      getWorks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateWorkSortNum = async (sortnum: string, uid: string) => {
    const workDoc = doc(db, "data", uid);
    var newField = { sort_num: sortnum };
    try {
      console.log("start up");
      await updateDoc(workDoc, newField);
      console.log("success up");
      getWorks();
    } catch (error) {
      console.log(error);
    }
  };

  //Header Update
  const handleUpdateHeader = async (uid: string, currentData: any) => {
    const headerDoc = doc(db, "header", uid);
    await updateDoc(headerDoc, currentData);
  };

  //處理作品檔案的圖片路徑
  const mapWorkData = async (data: any) => {
    //sort by sort_num

    let dataSorted = data.sort(function (a: any, b: any) {
      return b.sort_num - a.sort_num;
    });
    let latestSortNum = (parseInt(dataSorted[0].sort_num) + 1).toString();
    setLatestSortNum(parseInt(latestSortNum));
    console.log(dataSorted[0].sort_num);
    const twoarr = dataSorted.map(async (element: any) => {
      const imagesRef = ref(storage, `data/${element.img}`);
      const newimgurl = await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
          default:
            console.log("");
        }
      });
      return { ...element, imgpath: newimgurl, latestSortNum: latestSortNum };
    });
    if (twoarr.length > 0) {
      setWorkData((await Promise.all(twoarr)) as any);
    }
  };

  //處理LAB的圖片路徑
  const mapLabData = async (data: any) => {
    const twoarr = data.map(async (element: any) => {
      const imagesRef = ref(storage, `img_lab/${element.image}`);
      const newimgurl = await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
          default:
            console.log("");
        }
      });
      return { ...element, imgpath: newimgurl };
    });
    if (twoarr.length > 0) {
      setLabData((await Promise.all(twoarr)) as any);
    }
  };

  const mapCategoryData = async (data: any) => {
    let dataSorted = data.sort(function (a: any, b: any) {
      return b.sort_num - a.sort_num;
    });
    let latestSortNum = (parseInt(dataSorted[0].sort_num) + 1).toString();
    const twoarr = dataSorted.map(async (element: any) => {
      return { ...element, latestSortNum: latestSortNum };
    });
    if (twoarr.length > 0) {
      setCategoryData((await Promise.all(twoarr)) as any);
    }
  };

  const getWorks = async () => {
    const q = query(collection(db, "data"), orderBy("time_added", "asc"));
    const data = await getDocs(q);
    mapWorkData(
      data.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) as any
    );
  };

  const getCategory = async () => {
    const q = query(collection(db, "category"), orderBy("sort_num", "desc"));
    const data = await getDocs(q);
    mapCategoryData(
      data.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) as any
    );
    // setCategoryData(data.docs.map(doc=> ({...doc.data(),uid:doc.id})))
  };

  useEffect(() => {
    // const dataRef = collection(db, "data");

    // work
    getWorks();

    // category
    getCategory();

    //  labinfo
    // onSnapshot(collection(db,"labinfo"),(snapshot)=>{
    //   setLabinfoData(snapshot.docs.map(doc=> ({...doc.data(),uid:doc.id})))
    // })
    const getLabdata = async () => {
      const q = query(collection(db, "labdata"));
      const data = await getDocs(q);
      mapLabData(
        data.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) as any
      );
    };
    getLabdata();

    //header
    const getHeaderdata = async () => {
      const q = query(collection(db, "header"));
      const data = await getDocs(q);
      setHeaderData(
        data.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) as any
      );
    };
    getHeaderdata();
  }, []);

  return (
    <div className="bg-white w-[100vw] h-[100vh]">
      {/* 增加選單 管理作品  管理選單  管理介紹  管理分類 */}
      <div className="flex ">
        <AdminNav />
        <div
          className="main w-[100%] ms-sm-auto col-lg-10 px-md-4 mt-4 bg-white"
          style={{ minHeight: "100vh" }}
        >
          <Routes>
            <Route
              path="/work"
              element={
                <Work
                  handleCreateWork={handleCreateWork}
                  workData={workData}
                  categoryData={categoryData}
                  handleDeleteWork={handleDeleteWork}
                  handleUpdateWork={handleUpdateWork}
                  handleUpdateWorkDisplay={handleUpdateWorkDisplay}
                  handleUpdateWorkCatrgory={handleUpdateWorkCatrgory}
                  latestSortNum={latestSortNum}
                  handleUpdateWorkSortNum={handleUpdateWorkSortNum}
                />
              }
            />
            <Route
              path="/category"
              element={
                <Category
                  categoryData={categoryData}
                  handleCreateCategory={handleCreateCategory}
                  handleDeleteCategory={handleDeleteCategory}
                  handleUpdateCategory={handleUpdateCategory}
                  handleUpdateCategorySortNum={handleUpdateCategorySortNum}
                />
              }
            />
            <Route
              path="/lab"
              element={
                <Lab
                  labData={labData}
                  handleCreateLab={handleCreateLab}
                  handleDeleteLabData={handleDeleteLab}
                  handleUpdateLab={handleUpdateLab}
                />
              }
            />
            <Route
              path="/managerheader"
              element={
                <ManagerHeader
                  headerData={headerData}
                  handleUpdateHeader={handleUpdateHeader}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
