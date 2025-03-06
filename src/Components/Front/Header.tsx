import { HeaderItemProps, HeaderDataProps } from "../../types/types";

function Header({
  headerItem,
  currentLang,
  headerData,
}: {
  headerItem: HeaderItemProps;
  currentLang: string;
  headerData: HeaderDataProps[];
}) {
  const { engname, chtname } = headerItem;
  return (
    <div className="bg-[#222121] h-[320px] relative overflow-hidden">
      <div id="intro_bg_video" className="relative pb-[56.25%] h-0 opacity-50">
        {headerData.length > 0 && (
          <iframe
            title="video"
            src={`${headerData[0].video}?loop=1$title=0&background=1&muted=1&autoplay=1#t=3s`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div
        id="site-logo"
        className="w-[35%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-white animate__animated animate__fadeIn"
      >
        <img className="w-full" src={"./images/2022/svg-08.svg"} alt="" />
        <div className="mt-[15px]">
          {currentLang === "eng" ? engname : chtname}
        </div>
      </div>
    </div>
  );
}

export default Header;
