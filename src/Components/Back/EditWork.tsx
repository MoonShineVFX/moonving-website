/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
//檔案上傳方法
import { useStorage } from "../../Helper/useStorage";
import { FileProps, WorkItemProps } from "../../types/types";
function EditWork({
  handleUpdateWork,
  uid,
  workData,
}: {
  handleUpdateWork: any;
  uid: string;
  workData: any;
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      intro: "",
      video_url: "",
      year_of_work: "",
      file: undefined,
    },
  });
  const [file, setFile] = useState<FileProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const [singleData, setSingleData] = useState<WorkItemProps | null>(null);

  // 編輯資料
  const onSubmit = (data: any) => {
    let selectedFile = data.file[0];
    // 設定圖檔重新命名
    const imgFileName = Date.now() + ".jpg";

    // 有換圖檔的JSON資料
    const currentDataWithFile = {
      title: data.title,
      intro: data.intro,
      video_url: data.video_url,
      img: imgFileName,
      year_of_work: data.year_of_work,
    };

    // 沒有換圖檔的JSON資料
    const currentDataWithoutFile = {
      title: data.title,
      intro: data.intro,
      video_url: data.video_url,
      year_of_work: data.year_of_work,
    };
    // 如果有新圖檔 執行編輯資料(有圖檔) 沒有新圖檔 修改文字資料
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile({
          filename: imgFileName,
          file: selectedFile,
          folder: "data/",
        });
      } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
      }
      handleUpdateWork(uid, currentDataWithFile);
    } else {
      handleUpdateWork(uid, currentDataWithoutFile);
    }
  };

  // 顯示現在要編輯的資料
  const getADoc = async (uid: string) => {
    var findLike = workData.find(function (item: any) {
      return item.uid === uid;
    });
    reset(findLike);
    setSingleData(findLike);
  };
  useEffect(() => {
    getADoc(uid);
  }, [uid]);

  // Getting the progress and url from the hook
  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);
  return (
    <div className="p-4">
      <h3>編輯作品</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            名稱
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="yearofwork"
            className="block text-sm font-medium text-gray-700"
          >
            作品年分(2022)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="year_of_work"
            {...register("year_of_work")}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="video_url"
            className="block text-sm font-medium text-gray-700"
          >
            影片 URL
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="video_url"
            {...register("video_url")}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            圖片
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="file"
            {...register("file")}
          />

          {error && <p>{error}</p>}
          <div className="preview">
            {file && <p>{progress}% uploaded</p>}
            {url && (
              <p>
                <b>圖片位置: </b>
                <a href={url} className="text-break">
                  {url}
                </a>
              </p>
            )}
            {url ? (
              <img src={url} className="img-fluid" />
            ) : (
              <img
                src={singleData ? singleData.imgpath : ""}
                className="img-fluid"
              />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="intro"
            className="block text-sm font-medium text-gray-700"
          >
            簡介(credit)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="intro"
            cols={25}
            rows={10}
            {...register("intro")}
          ></textarea>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            儲存
          </button>
          <button
            type="reset"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            重設
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWork;
