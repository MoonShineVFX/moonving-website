function MobileNavBtn({ toggleTrueFalse }: { toggleTrueFalse: () => void }) {
  return (
    <div
      className="block md:hidden  fixed top-0 right-0 z-[100] cursor-pointer"
      id="mobile-menu-btn-bar"
    >
      <span
        className="block p-[5px]"
        id="mobile-menu-btn"
        onClick={toggleTrueFalse}
      >
        <img
          className="block w-[35px]"
          src="https://firebasestorage.googleapis.com/v0/b/moonshinewebsite21.appspot.com/o/img_icon%2Fmenu.svg?alt=media&token=96615d4d-e220-4e96-8fae-063abf8d7e1c"
          alt="open"
        />
      </span>
    </div>
  );
}

export default MobileNavBtn;
