import { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import AddLab from "./AddLab";
import EditLab from "./EditLab";
import { LabDataProps } from "../../types/types";
import { Button } from "../ui/button";
function Lab({
  labData,
  handleDeleteLabData,
  handleCreateLab,
  handleUpdateLab,
}: {
  labData: LabDataProps[];
  handleDeleteLabData: (uid: string) => void;
  handleCreateLab: (data: any) => void;
  handleUpdateLab: (uid: string, data: any) => void;
}) {
  const [switchUi, setSwitchUi] = useState({ data: "", uid: "" });

  // 按下確定刪除
  const onDelete = (uid: string) => {
    confirmAlert({
      title: "確認刪除這筆資料",
      buttons: [
        {
          label: "確定",
          onClick: () => handleDeleteLabData(uid),
        },
        {
          label: "取消",
        },
      ],
    });
  };
  // 按下功能切換
  const handleClick = (data: string, uid: string) => {
    setSwitchUi({
      data,
      uid,
    });
    console.log(switchUi);
  };
  return (
    <div className="flex">
      <div className="w-9/12 px-4 py-2">
        <h1 className="text-2xl font-bold">LAB info</h1>
        <div className="labdata">
          <h3 className="flex items-center gap-2 my-2">
            Lab列表
            <Button
              onClick={() => {
                handleClick("create", "");
              }}
            >
              新增LAB
            </Button>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {labData.length > 0 ? (
              labData.map((item, index) => {
                const {
                  id,
                  name,
                  name_cht,
                  description_1,
                  description_1_cht,
                  description_2,
                  description_2_cht,
                  sitelink,
                  title_1,
                  title_1_cht,
                  title_2,
                  title_2_cht,
                  video,
                  uid,
                  imgpath,
                } = item;
                return (
                  <div className="w-full" key={id + index}>
                    <div className="card bg-gray-100">
                      <div className="flex flex-col gap-2 p-4">
                        <h5>#{id}</h5>
                        <div className="flex gap-2 items-center">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            英文名稱 / 中文名稱
                          </span>{" "}
                          {name} / {name_cht}
                        </div>

                        <div className="flex flex-col   justify-between items-start my-2">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            內文-1 英文
                          </span>
                          <br />
                          <div className="font-bold">{title_1}</div>
                          <div className="font-light">{description_1}</div>
                        </div>
                        <div className="flex flex-col   justify-between items-start my-2">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            內文-1 中文
                          </span>
                          <br />
                          <div className="font-bold">{title_1_cht}</div>
                          <div className="font-light">{description_1_cht}</div>
                        </div>
                        <div className="flex flex-col   justify-between items-start my-2">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            內文-2 英文
                          </span>
                          <br />
                          <div className="font-bold">{title_2}</div>
                          <div className="font-light">{description_2}</div>
                        </div>
                        <div className="flex flex-col   justify-between items-start my-2">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            內文-2 中文
                          </span>
                          <br />
                          <div className="font-bold">{title_2_cht}</div>
                          <div className="font-light">{description_2_cht}</div>
                        </div>

                        <div className="flex flex-col   justify-between items-start my-2">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            網站連結
                          </span>
                          <br />
                          <a href={sitelink} target="_blank" rel="noreferrer">
                            {sitelink}
                          </a>
                        </div>
                        <div className="flex flex-col   justify-between items-start my-2">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            影片連結
                          </span>
                          <br />
                          <a href={video} target="_blank" rel="noreferrer">
                            {video}
                          </a>
                        </div>
                        <div className="flex flex-col   justify-between items-start my-2">
                          <span className=" bg-gray-300 text-gray-700  p-2 rounded-md">
                            圖片
                          </span>
                          <br /> <img src={imgpath} className="w-[200px]" />
                        </div>
                        <div className="flex gap-2 items-center">
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
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="w-3/12 h-screen overflow-y-auto bg-gray-100 text-gray-700 py-3 sticky top-0 right-0"
        style={{ minHeight: "100vh" }}
      >
        {(() => {
          switch (switchUi.data) {
            case "create":
              return <AddLab handleCreateLab={handleCreateLab} />;
            case "edit":
              return (
                <EditLab
                  handleUpdateLab={handleUpdateLab}
                  labData={labData}
                  uid={switchUi.uid}
                />
              );
            default:
              return <AddLab handleCreateLab={handleCreateLab} />;
          }
        })()}
      </div>
    </div>
  );
}

export default Lab;
