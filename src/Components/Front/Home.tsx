import { Film } from "lucide-react";
import { useState } from "react";
import { CategoryDataProps, WorkItemProps } from "../../types/types";

type HomeProps = {
  workData: WorkItemProps[];
  handler: (dataId: string) => void;
  categoryData: CategoryDataProps[];
  currentLang: string;
  switchCategory: (id: string) => void;
};

function Home({
  workData,
  handler,
  categoryData,
  currentLang,
  switchCategory,
}: HomeProps) {
  const [active, setActive] = useState("0");

  // 點擊作品
  const handleClick = (dataId: string) => {
    handler(dataId);
  };

  // 選擇分類
  const handleCategorySwitch = (id: string) => {
    setActive(id);
    switchCategory(id);
  };

  return (
    <div className="home">
      <div className="catrgories">
        <ul className="flex bg-black justify-center items-center box-border relative m-0">
          {categoryData ? (
            categoryData.map((item, index) => {
              const { id, name, name_cht } = item;
              return (
                <li
                  key={name + index}
                  onClick={() => handleCategorySwitch(id)}
                  className={
                    active === id
                      ? "animate__animated animate__fadeIn text-white text-[14px] transition-all duration-300 py-[20px] px-[20px] h-[98%] cursor-pointer hover:border-b hover:border-white hover:text-white"
                      : "animate__animated animate__fadeIn text-white/75 text-[14px] transition-all duration-300 py-[20px] px-[20px] h-[98%] cursor-pointer hover:border-b hover:border-white hover:text-white"
                  }
                >
                  {currentLang === "eng" ? name : name_cht}
                </li>
              );
            })
          ) : (
            <li>目前還沒有</li>
          )}
        </ul>
      </div>

      <div className="bg-black pl-[0.25vw]">
        <ul className="flex flex-wrap pl-0">
          {workData ? (
            workData.map((item, index) => {
              const { id, title, imgpath, display, video_url } = item;

              return display === "1" ? (
                <li
                  key={title + index}
                  className="work animate__animated animate__fadeIn w-[19.5vw] h-[20vw] m-[0.25vw_0.25vw_0_0] overflow-hidden relative opacity-80 transition-all duration-500 hover:opacity-100 group"
                  onClick={() => handleClick(id)}
                >
                  <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat transition-all duration-500 text-[10pt] group-hover:scale-[1.2]"
                    style={{ backgroundImage: `url(${imgpath})` }}
                  ></div>

                  {video_url && (
                    <div className="absolute top-2 right-2 text-white/80 group-hover:text-white">
                      <Film size={16} />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 p-[10px] text-[8pt] text-white">
                    {title}
                  </div>
                </li>
              ) : (
                ""
              );
            })
          ) : (
            <li>目前還沒有</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
