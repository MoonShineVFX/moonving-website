import { FooterProps, SocialitemDataProps } from "../../types/types";

function Footer({
  currentLang,
  footerData,
  socialitemData,
}: {
  currentLang: string;
  footerData: FooterProps;
  socialitemData: SocialitemDataProps[];
}) {
  const { footer } = footerData;
  return (
    <div className=" text-white border-t border-white mx-[25px] mt-[45px] mb-0 text-[13px] pb-[25px]">
      <div className="mt-[30px]">
        <p className="my-[5px]">
          {currentLang === "eng" ? footer.tel : footer.tel_cht}
        </p>
        <p className="my-[5px]">
          {currentLang === "eng" ? footer.email : footer.email_cht}
        </p>
        <p className="my-[5px]">
          {currentLang === "eng" ? footer.address : footer.address_cht}
        </p>
      </div>

      <div className="leading-[57px] border-b border-white pb-[15px] flex flex-wrap">
        {socialitemData.length > 0 ? (
          socialitemData.map((item, index) => {
            const { id, img, link } = item;
            return (
              <div key={id + index} className="mr-[5px]">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-80 transition-opacity duration-200 hover:opacity-100"
                >
                  <img
                    src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_icon/${img}`}
                    alt=""
                    className="h-[15px] align-bottom transition-all duration-200"
                  />
                </a>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
        <div className="ml-auto">
          <img
            src={"./images/2022/svg-08.svg"}
            alt=""
            className="w-[137px] align-bottom"
          />
        </div>
      </div>

      <div className="text-[12px] text-right mt-[10px]">
        {currentLang === "eng" ? footer.copyright : footer.copyright_cht}
      </div>
    </div>
  );
}

export default Footer;
