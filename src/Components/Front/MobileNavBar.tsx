import { Link } from "react-router-dom";
import { NavitemDataProps, SocialitemDataProps } from "../../types/types";

function MobileNavBar({
  isToggled,
  currentLang,
  switchLang,
  navitemData,
  socialitemData,
  switchHeaderName,
}: {
  isToggled: boolean;
  currentLang: string;
  switchLang: (data: string) => void;
  navitemData: NavitemDataProps[];
  socialitemData: SocialitemDataProps[];
  switchHeaderName: (id: string) => void;
}) {
  const handleSwitch = (data: string) => {
    switchLang(data);
  };
  const handleNavItem = (id: string) => {
    switchHeaderName(id);
  };
  return (
    <ul
      className={`block fixed left-0 py-[70px_0_20px_0] w-full list-none bg-black z-20 transition-all duration-500 overflow-hidden text-white ${
        isToggled ? "top-0" : "top-[-1000px]"
      }`}
      id="mobile-menu"
    >
      {navitemData.length > 0 ? (
        navitemData.map((item) => {
          const { id, engname, chtname, path } = item;
          return (
            <li key={id}>
              <Link
                to={"/" + path}
                onClick={() => handleNavItem(id.toString())}
                className="block py-[15px] px-[35px] text-white no-underline"
              >
                {currentLang === "eng" ? engname : chtname}
              </Link>
            </li>
          );
        })
      ) : (
        <li>
          <div className="text-placeholder"></div>
        </li>
      )}
      <li className="pl-[35px] pb-[15px] pt-[15px]">
        <span onClick={() => handleSwitch("eng")} className="mr-[15px]">
          English
        </span>
        <span onClick={() => handleSwitch("cht")} className="mr-[15px]">
          中文
        </span>
      </li>

      <li>
        <ul className="flex list-none p-0 m-0">
          {socialitemData.length > 0 ? (
            socialitemData.map((item) => {
              const { id, img, link } = item;
              return (
                <li key={id} className="w-[20%] flex justify-center">
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="block py-[15px] px-[35px] text-white no-underline"
                  >
                    <img src={"./images/" + img} alt="" className="h-[14px]" />
                  </a>
                </li>
              );
            })
          ) : (
            <li></li>
          )}
        </ul>
      </li>
    </ul>
  );
}

export default MobileNavBar;
