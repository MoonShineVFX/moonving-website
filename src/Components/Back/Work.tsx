import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// 新增修改作品頁面
import AddWork from "./AddWork";
import EditWork from "./EditWork";
function Work({
  handleCreateWork,
  workData,
  categoryData,
  handleDeleteWork,
  handleUpdateWork,
  handleUpdateWorkDisplay,
  handleUpdateWorkCatrgory,
  latestSortNum,
  handleUpdateWorkSortNum,
}: {
  handleCreateWork: any;
  workData: any;
  categoryData: any;
  handleDeleteWork: any;
  handleUpdateWork: any;
  handleUpdateWorkDisplay: any;
  handleUpdateWorkCatrgory: any;
  latestSortNum: any;
  handleUpdateWorkSortNum: any;
}) {
  // const [isChecked, setIsChecked] = useState(false);
  const [switchUi, setSwitchUi] = useState({ data: "create", uid: "" });
  // const [value, setValue] = useState("");

  const onDelete = (uid: string) => {
    confirmAlert({
      title: "確認刪除這筆資料",
      buttons: [
        {
          label: "確定",
          onClick: () => handleDeleteWork(uid),
        },
        {
          label: "取消",
        },
      ],
    });
  };

  const handleChange = (uid: string, display: string) => {
    handleUpdateWorkDisplay(uid, display);
    // console.log( e.target.defaultChecked)
    // e.target.defaultChecked = false
  };
  const handleCategoryId = (id: string, uid: string) => {
    handleUpdateWorkCatrgory(id, uid);
  };

  // 按下功能切換
  const handleClick = (data: string, uid: string) => {
    setSwitchUi({
      data,
      uid,
    });
    console.log(switchUi);
  };
  const _handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    uid: string
  ) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      handleUpdateWorkSortNum(target.value, uid);
    }
  };

  return (
    <div className="flex">
      <div className="w-9/12">
        <h3>
          作品列表
          <button
            type="button"
            className="btn btn-primary standardBtn ms-2"
            onClick={() => {
              handleClick("create", "");
            }}
          >
            新增作品
          </button>
        </h3>
        <table className="font-[arial] text-[15px] border border-[#ccc]">
          <thead className="bg-[#e6eaee] text-[#242424]">
            <tr>
              <th scope="col">作品縮圖</th>
              <th scope="col">作品名稱</th>
              <th scope="col">分類項目(擇一)</th>
              <th scope="col">是否可見</th>
              <th scope="col">編輯/刪除</th>
            </tr>
          </thead>
          <tbody>
            {workData.length > 0 ? (
              workData.map((item: any, index: number) => {
                const {
                  uid,
                  id,
                  title,
                  vimeo_id,
                  display,
                  imgpath,
                  category,
                  year_of_work,
                  sort_num,
                  youtube_id,
                } = item;
                return (
                  <tr key={title + index}>
                    <td>
                      {" "}
                      <img
                        src={
                          imgpath
                            ? imgpath
                            : "https://via.placeholder.com/150?text=Process"
                        }
                        alt=""
                        className="w-[100px]"
                      />
                    </td>
                    <td className="w-[23%]">
                      <span className="text-[12px]">
                        id #{id} /{" "}
                        <label htmlFor="">
                          Sort:
                          <input
                            type="text"
                            size={6}
                            defaultValue={sort_num}
                            // onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => _handleKeyDown(e, uid)}
                          />
                        </label>
                      </span>
                      <p className="font-bold mb-[1px]">{title}</p>
                      <span className="text-[12px]">
                        VIMEO{" "}
                        <a
                          href={`https://vimeo.com/${vimeo_id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {vimeo_id}
                        </a>
                      </span>{" "}
                      <br />
                      <span className="text-[12px]">
                        YT{" "}
                        <a
                          href={`https://www.youtube.com/watch?v=${youtube_id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {youtube_id}
                        </a>
                      </span>{" "}
                      <br />
                      <span className="text-[12px]">
                        {year_of_work ? `Year ${year_of_work}` : ""}
                      </span>
                    </td>
                    <td>
                      <ul className="p-0 m-0 list-none flex flex-col">
                        {categoryData
                          ? categoryData.map((item: any, index: number) => {
                              const { id, name } = item;
                              return (
                                <li
                                  key={name + index}
                                  className={
                                    id === category
                                      ? "font-bold text-brown"
                                      : "mr-[6px] cursor-pointer text-black/70 hover:font-bold hover:text-brown"
                                  }
                                  onClick={() => {
                                    handleCategoryId(id, uid);
                                  }}
                                >
                                  {name}
                                </li>
                              );
                            })
                          : "資料讀取中..."}
                      </ul>
                    </td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          checked={display === "1" ? true : false}
                          onChange={() => {
                            handleChange(uid, display);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-grid gap-2 d-md-block">
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            handleClick("edit", uid);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          onClick={() => {
                            onDelete(uid);
                          }}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="d-flex justify-content-center">
                <td>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="w-3/12 h-screen overflow-y-auto bg-gray-100 text-gray-700 py-3 sticky top-0 right-0"
        style={{ maxHeight: "100vh" }}
      >
        {(() => {
          switch (switchUi.data) {
            case "create":
              return (
                <AddWork
                  handleCreateWork={handleCreateWork}
                  latestSortNum={latestSortNum}
                />
              );
            case "edit":
              return (
                <EditWork
                  handleUpdateWork={handleUpdateWork}
                  uid={switchUi.uid}
                  workData={workData}
                />
              );
            default:
              return (
                <AddWork
                  handleCreateWork={handleCreateWork}
                  latestSortNum={latestSortNum}
                />
              );
          }
        })()}
      </div>
    </div>
  );
}

export default Work;
