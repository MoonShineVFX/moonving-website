import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// 新增修改作品頁面
import AddWork from "./AddWork";
import EditWork from "./EditWork";
import { Button } from "../ui/button";
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
    <div className="flex ">
      <div className="w-9/12 px-4">
        <h3 className="flex items-center gap-2 my-2">
          作品列表
          <Button
            onClick={() => {
              handleClick("create", "");
            }}
          >
            新增作品
          </Button>
        </h3>
        <table className=" text-[15px]  border-collapse border border-gray-400">
          <thead className="bg-[#e6eaee] text-[#242424]">
            <tr>
              <th scope="col" className="p-2">
                作品縮圖
              </th>
              <th scope="col" className="p-2">
                作品名稱
              </th>
              <th scope="col" className="p-2">
                分類項目(擇一)
              </th>
              <th scope="col" className="p-2">
                是否可見
              </th>
              <th scope="col" className="p-2">
                編輯/刪除
              </th>
            </tr>
          </thead>
          <tbody className="text-[15px]">
            {workData.length > 0 ? (
              workData.map((item: any, index: number) => {
                const {
                  uid,
                  id,
                  title,
                  display,
                  imgpath,
                  category,
                  year_of_work,
                  sort_num,
                  video_url,
                } = item;
                return (
                  <tr
                    key={title + index}
                    className="text-[15px] border-b border-[#ccc] "
                  >
                    <td className="p-2">
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
                    <td className="w-[25%]">
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
                        影片位置{" "}
                        <a
                          href={`${video_url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {video_url}
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
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => {
                            handleClick("edit", uid);
                          }}
                        >
                          編輯
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            onDelete(uid);
                          }}
                        >
                          刪除
                        </Button>
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
