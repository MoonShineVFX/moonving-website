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
      vimeo_id: "",
      youtube_id: "",
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
      vimeo_id: data.vimeo_id,
      youtube_id: data.youtube_id,
      img: imgFileName,
      year_of_work: data.year_of_work,
    };

    // 沒有換圖檔的JSON資料
    const currentDataWithoutFile = {
      title: data.title,
      intro: data.intro,
      vimeo_id: data.vimeo_id,
      youtube_id: data.youtube_id,
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
    <div>
      <h3>編輯作品</h3>
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
            id="year_of_work"
            {...register("year_of_work")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vimeo_id">vimeo 影片 ID (example: 594440744)</label>
          <input
            type="text"
            className="form-control"
            id="vimeo_id"
            {...register("vimeo_id")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vimeoid">YT 影片 URL</label>
          <input
            type="text"
            className="form-control"
            id="youtube_id"
            {...register("youtube_id")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file">圖片</label>
          <input
            type="file"
            className="form-control"
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
        <div className="mb-3">
          <label htmlFor="intro">簡介(credit)</label>
          <textarea
            className="form-control"
            id="intro"
            cols={25}
            rows={10}
            {...register("intro")}
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

export default EditWork;
