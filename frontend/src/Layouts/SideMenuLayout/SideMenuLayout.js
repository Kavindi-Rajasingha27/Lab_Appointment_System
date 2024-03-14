import SideMenu from "../../components/SideMenu/SideMenu";

const SideMenuLayout = ({ children, className, style }) => {
  return (
    <>
      <SideMenu />
      <div
        className={`${className}`}
        style={style ? style : { paddingLeft: "144px", paddingTop: "55px" }}
      >
        {children}
      </div>
    </>
  );
};

export default SideMenuLayout;
