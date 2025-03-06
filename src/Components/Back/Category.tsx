import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
function Category({
  categoryData,
  handleCreateCategory,
  handleDeleteCategory,
  handleUpdateCategory,
  handleUpdateCategorySortNum,
}: {
  categoryData: any;
  handleCreateCategory: any;
  handleDeleteCategory: any;
  handleUpdateCategory: any;
  handleUpdateCategorySortNum: any;
}) {
  const [switchUi, setSwitchUi] = useState({ data: "", uid: "" });
  const onDelete = (uid: string) => {
    confirmAlert({
      title: "確認刪除這筆資料",
      buttons: [
        {
          label: "確定",
          onClick: () => handleDeleteCategory(uid),
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
  const _handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    uid: string
  ) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      console.log(target.value);
      handleUpdateCategorySortNum(target.value, uid);
    }
  };

  return (
    <div className="flex">
      <div className="w-9/12">
        <h3>
          分類列表
          <button
            type="button"
            className="btn btn-primary standardBtn ms-2"
            onClick={() => {
              handleClick("create", "");
            }}
          >
            新增分類
          </button>
        </h3>
        <table className="table cmsWork table-hover ">
          <thead className="thead-color">
            <tr>
              <th scope="col">#id</th>
              <th scope="col">分類名稱-英文</th>
              <th scope="col">分類名稱</th>
              <th scope="col">編輯/刪除</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.length > 0 ? (
              categoryData.map((item: any, index: number) => {
                const { id, name, name_cht, uid, sort_num } = item;
                return (
                  <tr key={name + index}>
                    <td className="id">
                      ID:{id} <br />{" "}
                      <label htmlFor="">
                        Sort:
                        <input
                          type="text"
                          size={6}
                          defaultValue={sort_num}
                          // onChange={(e) => setValue(e.target.value)}
                          onKeyDown={(e) => _handleKeyDown(e, uid)}
                        />
                      </label>{" "}
                    </td>
                    <td className="title"> {name}</td>
                    <td className="title">{name_cht} </td>

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
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="w-3/12 h-screen overflow-y-auto bg-gray-100 text-gray-700 py-3 sticky top-0 right-0"
        style={{ minHeight: "100vh" }}
      >
        {(() => {
          switch (switchUi.data) {
            case "create":
              return (
                <AddCategory handleCreateCategory={handleCreateCategory} />
              );
            case "edit":
              return (
                <EditCategory
                  handleUpdateCategory={handleUpdateCategory}
                  uid={switchUi.uid}
                />
              );
            default:
              return (
                <AddCategory handleCreateCategory={handleCreateCategory} />
              );
          }
        })()}
      </div>
    </div>
  );
}

export default Category;
