import {
  AboutInfoDataProps,
  AboutStatsDataProps,
  AboutStrengthDataProps,
} from "../../types/types";

function About({
  aboutStatsData,
  currentLang,
  aboutInfoData,
  aboutStrengthData,
}: {
  aboutStatsData: AboutStatsDataProps[];
  currentLang: string;
  aboutInfoData: AboutInfoDataProps;
  aboutStrengthData: AboutStrengthDataProps[];
}) {
  return (
    <div className="w-10/12 mx-auto pt-[50px] text-white">
      <div className="mt-[30px] animate__animated animate__fadeIn">
        <img
          src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_about/office.jpg`}
          alt=""
          className="w-full"
        />
      </div>

      <div className="flex justify-between items-inherit mt-[25px] animate__animated animate__fadeIn">
        {aboutStatsData ? (
          aboutStatsData.map((item, index) => {
            const {
              id,
              left,
              left_cht,
              center,
              center_cht,
              right,
              right_cht,
              link,
            } = item;
            return (
              <div key={left + index + id} className="statsContent">
                <div className="text-center text-[18px]">
                  {currentLang === "eng" ? left : left_cht}
                </div>
                <div className="text-[57px]">
                  {currentLang === "eng" ? center : center_cht}
                </div>
                <div className="text-center">
                  {link.length > 0 ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#879595] transition-all duration-700 hover:text-[#d8b414]"
                    >
                      {currentLang === "eng" ? right : right_cht}
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <div>目前還沒有</div>
        )}
      </div>

      <div className="animate__animated animate__fadeIn">
        <h2 className="text-[18px] font-semibold tracking-[1px] relative mb-[25px] mt-[60px] after:content-[''] after:w-[1px] after:h-[20px] after:bg-white after:absolute after:ml-[19px] after:top-[2.5px]">
          {aboutInfoData
            ? currentLang === "eng"
              ? aboutInfoData.title_1
              : aboutInfoData.title_1_cht
            : ""}
        </h2>
        <div className="text-[15px] text-justify leading-[29px] font-light whitespace-pre-line">
          {aboutInfoData
            ? currentLang === "eng"
              ? aboutInfoData.description_1
              : aboutInfoData.description_1_cht
            : ""}
        </div>
        <h2 className="text-[18px] font-semibold tracking-[1px] relative mb-[25px] mt-[60px] after:content-[''] after:w-[1px] after:h-[20px] after:bg-white after:absolute after:ml-[19px] after:top-[2.5px]">
          {aboutInfoData
            ? currentLang === "eng"
              ? aboutInfoData.title_2
              : aboutInfoData.title_2_cht
            : ""}
        </h2>
        <div className="text-[15px] text-justify leading-[29px] font-light whitespace-pre-line">
          {aboutInfoData
            ? currentLang === "eng"
              ? aboutInfoData.description_2
              : aboutInfoData.description_2_cht
            : ""}
        </div>
      </div>

      <div className="flex justify-between items-start flex-wrap mt-[80px]">
        {aboutStrengthData.length > 0 ? (
          aboutStrengthData.map((item, index) => {
            const {
              id,
              title,
              title_cht,
              description,
              description_cht,
              image,
            } = item;
            return (
              <div key={title + index + id} className="w-[42%] mb-[50px]">
                <div className="pb-[10px] border-b border-[#999]">
                  {currentLang === "eng" ? title : title_cht}
                </div>
                <div className="mt-[20px] mb-[25px]">
                  {currentLang === "eng" ? description : description_cht}
                </div>
                <div>
                  <img
                    src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_about/${image}`}
                    alt=""
                    className="w-full"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>目前還沒有</div>
        )}
      </div>
    </div>
  );
}

export default About;
