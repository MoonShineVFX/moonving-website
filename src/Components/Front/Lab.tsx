import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { LabDataProps, LabInfoDataProps } from "../../types/types";
function Lab({
  labData,
  currentLang,
  labInfoData,
}: {
  labData: LabDataProps[];
  currentLang: string;
  labInfoData: LabInfoDataProps;
}) {
  const [height, setHeight] = useState<number>(0);

  // 偵測滾動高度
  const onScroll = (e: any) => {
    setHeight(e.target.documentElement.scrollTop);
  };
  // 執行滾動替換影片
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-11/12 mx-auto  pt-[50px] text-white">
      <div className="animate__animated animate__fadeIn w-1/2">
        <h2 className="text-[18px] font-semibold tracking-[1px] relative mb-[25px] mt-[60px] after:content-[''] after:w-[1px] after:h-[20px] after:bg-white after:absolute after:ml-[19px] after:top-[2.5px]">
          {labInfoData
            ? currentLang === "eng"
              ? labInfoData.name
              : labInfoData.name_cht
            : ""}
        </h2>

        <div className="text-[15px] text-justify leading-[29px] font-light text-[#ddd]">
          {labInfoData
            ? currentLang === "eng"
              ? labInfoData.description
              : labInfoData.description_cht
            : ""}
        </div>
      </div>

      <div className="animate__animated animate__fadeIn">
        {labData ? (
          labData.map((item, index) => {
            const {
              id,
              name,
              name_cht,
              video,
              title_1,
              title_1_cht,
              description_1,
              description_1_cht,
              title_2,
              title_2_cht,
              description_2,
              description_2_cht,
              sitelink,
              imgpath,
            } = item;
            return (
              <div
                key={id + index}
                ref={(el) => {
                  if (!el) return;

                  if (
                    height >
                    el.offsetTop + el.getBoundingClientRect().height / 3.3
                  ) {
                    // 切換到視頻
                    const imageEl = el.querySelector(`#image${id}`);
                    const videoEl = el.querySelector(`#video${id}`);

                    imageEl?.classList.remove(
                      "opacity-100",
                      "z-10",
                      "absolute"
                    );
                    imageEl?.classList.add("opacity-0");

                    videoEl?.classList.remove("opacity-0");
                    videoEl?.classList.add("opacity-100", "z-10", "absolute");
                  } else {
                    // 切換到圖片
                    const imageEl = el.querySelector(`#image${id}`);
                    const videoEl = el.querySelector(`#video${id}`);

                    videoEl?.classList.remove(
                      "opacity-100",
                      "z-10",
                      "absolute"
                    );
                    videoEl?.classList.add("opacity-0");

                    imageEl?.classList.remove("opacity-0");
                    imageEl?.classList.add("opacity-100", "z-10", "absolute");
                  }
                }}
              >
                <h2 className="text-[18px] font-semibold tracking-[1px] relative mb-[25px] mt-[60px] after:content-[''] after:w-[1px] after:h-[20px] after:bg-white after:absolute after:ml-[19px] after:top-[2.5px]">
                  {currentLang === "eng" ? name : name_cht}
                </h2>
                <div className="stickyScroll flex">
                  <div className="flex-1">
                    <div className="h-[75vh] max-h-[50rem] flex items-center sticky top-[90px]">
                      <div
                        className="mr-[70px] transition-opacity duration-[2s]"
                        id={`image${id}`}
                      >
                        <img src={imgpath} alt="" className="w-full" />
                      </div>
                      <div
                        className="mr-[70px] transition-opacity duration-[2s]"
                        id={`video${id}`}
                      >
                        <ReactPlayer
                          url={video}
                          width={500}
                          height={300}
                          controls={true}
                          volume={0.2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-[75vh] max-h-[50rem] flex flex-col justify-center">
                      <div>
                        <h3 className="text-[18px] font-semibold tracking-[1px] relative mb-[25px] mt-[60px]">
                          {currentLang === "eng" ? title_1 : title_1_cht}
                        </h3>
                        <div className="content">
                          {currentLang === "eng"
                            ? description_1
                            : description_1_cht}
                        </div>
                      </div>
                    </div>
                    <div className="h-[75vh] max-h-[50rem] flex flex-col justify-center">
                      <div>
                        <h3 className="text-[18px] font-semibold tracking-[1px] relative mb-[25px] mt-[60px]">
                          {currentLang === "eng" ? title_2 : title_2_cht}
                        </h3>
                        <div className="content">
                          {currentLang === "eng"
                            ? description_2
                            : description_2_cht}
                          <p>
                            <a
                              href={sitelink}
                              rel="noreferrer"
                              target="_blank"
                              className="text-[#63f4d4] no-underline"
                            >
                              {currentLang === "eng"
                                ? "More About " + name
                                : "更多關於 " + name_cht}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Lab;
