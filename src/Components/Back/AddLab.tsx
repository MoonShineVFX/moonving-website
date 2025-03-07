import { useState } from "react";
import { useForm } from "react-hook-form";

// 檔案上傳方法
import { useStorage } from "../../Helper/useStorage";
import { FileProps } from "../../types/types";
function AddLab({ handleCreateLab }: { handleCreateLab: any }) {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState<FileProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  // 新增資料
  const onSubmit = (data: any) => {
    console.log(data);
    let selectedFile = data.file[0];

    // 設定圖檔重新命名
    const imgFileName = Date.now() + ".jpg";

    // 表單資料成為 JSON 資料
    const currentData = {
      id: Date.now().toString(36),
      time_added: new Date().toISOString(),
      name: data.name,
      name_cht: data.name_cht,
      title_1: data.title_1,
      title_1_cht: data.title_1_cht,
      description_1: data.description_1,
      description_1_cht: data.description_1_cht,
      title_2: data.title_2,
      title_2_cht: data.title_2_cht,
      description_2: data.description_2,
      description_2_cht: data.description_2_cht,
      video: data.video,
      sitelink: data.sitelink,
      image: imgFileName,
      sort_num: "0",
      display: "1",
    };

    /**
     * 如果有圖檔存在 執行新增資料 否則不執行
     * "filename": 檔案名撐
     * "file":s 檔案本身
     * "folder": 對應storage上的資料夾名稱
     *
     * **/
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile({
          filename: imgFileName,
          file: selectedFile,
          folder: "img_lab/",
        });
      } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
      }
    }
    handleCreateLab(currentData);
  };

  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);
  return (
    <div className="p-4">
      <h3>新增LAB</h3>
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
            id="name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="name_cht"
            className="block text-sm font-medium text-gray-700"
          >
            中文名稱
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="name_cht"
            {...register("name_cht", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="sitelink"
            className="block text-sm font-medium text-gray-700"
          >
            網站連結
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="sitelink"
            {...register("sitelink")}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="video"
            className="block text-sm font-medium text-gray-700"
          >
            vimeo 影片位置(https://player.vimeo.com/video/435638545)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="video"
            {...register("video", { required: true })}
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
            {...register("file", { required: true })}
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
            {url && <img src={url} className="img-fluid" />}
          </div>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-light border  ">
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="title_1"
                className="block text-sm font-medium text-gray-700"
              >
                介紹1 - 英文標題
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="title_1"
                {...register("title_1", { required: true })}
              />
            </div>
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="description_1"
                className="block text-sm font-medium text-gray-700"
              >
                介紹1 - 英文
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="description_1"
                {...register("description_1", { required: true })}
              ></textarea>
            </div>
          </div>
          <div className="p-2 bg-light border ">
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="title_1_cht"
                className="block text-sm font-medium text-gray-700"
              >
                介紹1 - 中文標題
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="title_1_cht"
                {...register("title_1_cht", { required: true })}
              />
            </div>
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="description_1_cht"
                className="block text-sm font-medium text-gray-700"
              >
                介紹1 - 中文
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="description_1_cht"
                {...register("description_1_cht", { required: true })}
              ></textarea>
            </div>
          </div>
          <div className="p-2 bg-light border ">
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="title_1"
                className="block text-sm font-medium text-gray-700"
              >
                介紹2 - 英文標題
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="title_1"
                {...register("title_1", { required: true })}
              />
            </div>
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="description_1"
                className="block text-sm font-medium text-gray-700"
              >
                介紹2 - 英文
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="description_1"
                {...register("description_1", { required: true })}
              ></textarea>
            </div>
          </div>
          <div className="p-2 bg-light border ">
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="title_1_cht"
                className="block text-sm font-medium text-gray-700"
              >
                介紹2 - 中文標題
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="title_1_cht"
                {...register("title_1_cht", { required: true })}
              />
            </div>
            <div className="mb-3 input-group-sm">
              <label
                htmlFor="description_1_cht"
                className="block text-sm font-medium text-gray-700"
              >
                介紹2 - 中文
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="description_1_cht"
                {...register("description_1_cht", { required: true })}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            新增
          </button>
          <button
            type="reset"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            重設
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLab;
