import { useState } from "react";
import { useForm } from "react-hook-form";

//檔案上傳方法
import { useStorage } from "../../Helper/useStorage";
import { FileProps } from "../../types/types";

function AddWrok({
  handleCreateWork,
  latestSortNum,
}: {
  handleCreateWork: any;
  latestSortNum: any;
}) {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState<FileProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  // 新增資料
  const onSubmit = (data: any) => {
    let selectedFile = data.file[0];

    // 設定圖檔重新命名
    const imgFileName = Date.now() + ".jpg";

    // 表單資料成為 JSON 資料
    const currentData = {
      id: Date.now().toString(36),
      time_added: new Date().toISOString(),
      title: data.title,
      intro: data.description,
      video_url: data.video_url,
      img: imgFileName,
      sort_num: latestSortNum,
      display: "1",
      year_of_work: data.yearofwork,
    };
    // 如果有圖檔存在 執行新增資料 否則不執行
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
    }
    handleCreateWork(currentData);
  };

  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);
  return (
    <div className="p-4">
      <h3>新增作品</h3>
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
            id="yearofwork"
            {...register("yearofwork")}
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
            {...register("file", { required: true })}
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="mt-2">
            {file && (
              <p className="text-sm text-gray-600">{progress}% uploaded</p>
            )}
            {url && (
              <p className="text-sm">
                <b>圖片位置: </b>
                <a
                  href={url}
                  className="text-blue-500 hover:underline break-all"
                >
                  Image Url(open)
                </a>
              </p>
            )}
            {url && (
              <img src={url} className="mt-2 max-w-full h-auto rounded-md" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            簡介(credit)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="description"
            rows={6}
            {...register("description")}
          ></textarea>
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            儲存
          </button>
          <button
            type="reset"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            重設
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWrok;
