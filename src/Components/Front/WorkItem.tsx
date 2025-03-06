import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { WorkItemProps } from "../../types/types";

function WorkItem({
  workData,
  handler,
  visible,
}: {
  workData: WorkItemProps;
  handler: () => void;
  visible: boolean;
}) {
  // 解構資料，並提供默認值防止錯誤
  const { title, intro, video_url } = workData || {};
  const [active, setActive] = useState(false);
  useEffect(() => {
    // 當組件可見時設置 active 為 true
    if (visible) {
      setTimeout(() => {
        setActive(true);
      }, 100);
    } else {
      setActive(false);
    }
  }, [visible]);

  const handleClick = () => {
    setActive(false);
    setTimeout(() => {
      handler();
    }, 500);
  };

  return (
    <div className="absolute z-[999] w-full h-full">
      <div
        className={
          active
            ? "absolute top-0 left-0 bg-black/70 w-full h-full z-[-1] transition-opacity duration-200 opacity-100"
            : "absolute top-0 left-0 bg-black/70 w-full h-full z-[-1] transition-opacity duration-200 opacity-0"
        }
        onClick={handleClick}
      ></div>
      <div
        className={
          active
            ? "fixed top-1/2 left-1/2 z-2 w-[780px] bg-black text-white transition-all duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 opacity-100 flex flex-wrap border-[5px] border-[#3d3d3d]"
            : "fixed top-1/2 left-1/2 z-2 w-[780px] bg-black text-white transition-all duration-500 ease-in-out -translate-x-1/2 -translate-y-[40%] opacity-0 flex flex-wrap border-[5px] border-[#3d3d3d]"
        }
      >
        <div
          className="absolute w-[40px] h-[40px] top-[-20px] right-[-20px] z-10 bg-[#332f2fc9] text-white flex justify-center items-center rounded-full font-light font-[Arial,_sans-serif] cursor-pointer hover:bg-[#1a1a1a]"
          onClick={handleClick}
        >
          X
        </div>
        {video_url && (
          <div className="thumb player-wrapper relative pt-[56.25%] w-full h-full">
            <ReactPlayer
              className="react-player absolute top-0 left-0"
              url={video_url}
              width="100%"
              height="100%"
              controls={true}
              volume={0.4}
            />
          </div>
        )}
        <article className="p-[25px] box-border w-full">
          <div className="text-[16px] mb-[15px]">{title}</div>
          <div className="text-[12px] leading-[21px] text-[#ddd] max-h-[210px] overflow-y-auto whitespace-pre-line">
            {intro}
          </div>
        </article>
      </div>
    </div>
  );
}

export default WorkItem;
