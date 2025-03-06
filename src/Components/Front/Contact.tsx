import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
function Contact({
  currentLang,
  contactData,
}: {
  currentLang: string;
  contactData: any;
}) {
  const containerStyle = {
    width: "100%",
    height: "320px",
  };
  // 地圖樣式
  const styles = [
    {
      stylers: [
        {
          hue: "#ff1a00",
        },
        {
          invert_lightness: true,
        },
        {
          saturation: -100,
        },
        {
          lightness: 33,
        },
        {
          gamma: 0.5,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#2D333C",
        },
      ],
    },
  ];

  const center = {
    lat: 25.051027,
    lng: 121.59486,
  };
  return (
    <div className="w-10/12 mx-auto pt-[50px] text-white">
      <div id="map" className="w-full h-[320px] mb-[50px]">
        <LoadScript googleMapsApiKey="AIzaSyDRfhAtI3G5SF7qP4XDv2aHMv0yzc2SwJE">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            options={{
              disableDefaultUI: true,
              styles: styles,
            }}
          >
            <Marker
              position={{
                lat: 25.051027,
                lng: 121.59486,
              }}
              icon={"./images/2022/MS_landmark.svg"}
            />
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="text-white border-b border-white pb-[31px] mb-[65px]">
        <div className="mb-[30px]">
          <img src="./img/info.svg" alt="" className="w-[35px]" />
        </div>
        <div className="infoArea">
          <div className="inline-block box-border text-[15px] relative w-[20%] after:content-[''] after:absolute after:bg-white after:w-[1px] after:h-full after:right-[35px] after:top-0">
            <p>
              {currentLang === "eng"
                ? contactData.tel_title
                : contactData.tel_title_cht}
            </p>
            <p>{contactData.tel_content}</p>
          </div>
          <div className="inline-block box-border text-[15px] relative w-[20%] after:content-[''] after:absolute after:bg-white after:w-[1px] after:h-full after:right-[35px] after:top-0">
            <p>
              {currentLang === "eng"
                ? contactData.email_title
                : contactData.email_title_cht}
            </p>
            <p>{contactData.email_content}</p>
          </div>
          <div className="inline-block box-border text-[15px] relative w-[60%]">
            <p>
              {currentLang === "eng"
                ? contactData.address_title
                : contactData.address_title_cht}
            </p>
            <p>
              {currentLang === "eng"
                ? contactData.address_content
                : contactData.address_content_cht}
            </p>
          </div>
        </div>
      </div>

      <div className="cForm">
        <div className="formContent">
          <div className="text-[18px] leading-[32px]">
            {currentLang === "eng"
              ? contactData.subcribe_title
              : contactData.subcribe_title_cht}
          </div>
          <div className="text-[13px] opacity-70">
            {currentLang === "eng"
              ? contactData.subcribe_content
              : contactData.subcribe_content_cht}
          </div>
        </div>
        <div className="formIcon">
          <span id="formMessages"></span>
        </div>
        <div className="font-0 relative align-top">
          <div id="mc_embed_signup">
            <form
              action="https://moonshine.us19.list-manage.com/subscribe/post-json?u=d714004cfd866022b7dd8d3ff&amp;id=98cc66f81b&c=?"
              method="get"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div
                className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-rect-0 border-0"
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_d714004cfd866022b7dd8d3ff_98cc66f81b"
                  tabIndex={-1}
                  value=""
                />
              </div>

              <div id="mc_embed_signup_scroll">
                <div className="flex">
                  <div className="w-[40%] mr-[19px]">
                    <input
                      type="email"
                      name="EMAIL"
                      className="required email bg-black border-none border-b border-white w-full leading-[40px] text-white text-[12px] focus:outline-none"
                      id="mce-EMAIL"
                      placeholder="Email Address"
                      autoComplete="email"
                    />
                  </div>
                  <div className="w-[40%] mr-[19px]">
                    <input
                      type="text"
                      name="FNAME"
                      className="required bg-black border-none border-b border-white w-full leading-[40px] text-white text-[12px] focus:outline-none"
                      id="mce-FNAME"
                      placeholder="Name"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Keep Me Updated"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="text-[13px] text-white border border-white px-[14px] py-[7px] tracking-[1px] text-center cursor-pointer leading-[25px] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
