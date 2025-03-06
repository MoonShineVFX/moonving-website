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
      vimeo_id: data.vimeoid,
      youtube_id: data.yturl,
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
    <div>
      <h3>新增作品</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title">名稱</label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vimeoid">作品年分(2022)</label>
          <input
            type="text"
            className="form-control"
            id="yearofwork"
            {...register("yearofwork")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vimeoid">vimeo 影片 ID (example: 594440744)</label>
          <input
            type="text"
            className="form-control"
            id="vimeoid"
            {...register("vimeoid")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vimeoid">YT 影片 URL</label>
          <input
            type="text"
            className="form-control"
            id="yturl"
            {...register("yturl")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file">圖片</label>
          <input
            type="file"
            className="form-control"
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
                  Image Url(open)
                </a>
              </p>
            )}
            {url && <img src={url} className="img-fluid" />}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description">簡介(credit)</label>
          <textarea
            className="form-control"
            id="description"
            cols={25}
            rows={10}
            {...register("description")}
          ></textarea>
        </div>
        <div className="d-grid gap-2 d-md-block">
          <button type="submit" className="btn btn-primary">
            儲存
          </button>
          <button type="reset" className="btn btn-light">
            重設
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWrok;
