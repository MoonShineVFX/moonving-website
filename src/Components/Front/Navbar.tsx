import { Link } from "react-router-dom";
import { NavitemDataProps, SocialitemDataProps } from "../../types/types";
function Navbar({
  currentLang,
  switchLang,
  navitemData,
  socialitemData,
  switchHeaderName,
}: {
  currentLang: string;
  switchLang: (data: string) => void;
  navitemData: NavitemDataProps[];
  socialitemData: SocialitemDataProps[];
  switchHeaderName: (id: string) => void;
}) {
  // const [currentLang, setCurrentLang] = useState("");

  const handleSwitch = (data: string) => {
    switchLang(data);
  };
  const handleNavItem = (id: string) => {
    switchHeaderName(id);
  };

  return (
    <ul className="list-none hidden md:flex  space-x-2 justify-end items-center absolute z-[99] w-full top-[14px] right-[14px]">
      {navitemData.length > 0 ? (
        navitemData.map((item) => {
          const { id, engname, chtname, path } = item;
          return (
            <li key={id} className="leading-[10px] text-[10pt] text-white">
              <Link
                to={"/" + path}
                onClick={() => handleNavItem(id.toString())}
                className="text-[10pt] px-2 text-white transition-opacity duration-200 opacity-60 no-underline hover:opacity-100"
              >
                {currentLang === "eng" ? engname : chtname}
              </Link>
            </li>
          );
        })
      ) : (
        <li className="leading-[10px] text-[10pt] text-white">
          <div className="text-placeholder"></div>
        </li>
      )}
      {socialitemData.length > 0 ? (
        socialitemData.map((item, index) => {
          const { id, img, link } = item;
          return (
            <li
              key={id + index}
              className="leading-[10px] text-[10pt] text-white"
            >
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-[10pt] px-2 text-white transition-opacity duration-200 opacity-60 no-underline hover:opacity-100"
              >
                <img
                  className="h-[14px] p-[1.5px]"
                  src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_icon/${img}`}
                  alt=""
                />
              </a>
            </li>
          );
        })
      ) : (
        <li className="leading-[10px] text-[10pt] text-white"></li>
      )}
      <li
        onClick={() => handleSwitch("eng")}
        className="leading-[10px] text-[10pt] text-white"
      >
        <span className="text-[10pt] px-2 text-white transition-opacity duration-200 opacity-60 cursor-pointer">
          English
        </span>
      </li>
      <li
        onClick={() => handleSwitch("cht")}
        className="leading-[10px] text-[10pt] text-white"
      >
        <span className="text-[10pt] px-2 text-white transition-opacity duration-200 opacity-60 cursor-pointer">
          中文
        </span>
      </li>
    </ul>
  );
}

export default Navbar;
