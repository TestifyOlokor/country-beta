import { useEffect } from "react";
import DarkMoon from "../../assets/images/Path.svg";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isCurrentDark, theme, setTheme }) => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  const handleThemeChange = () => {
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("theme", isCurrentDark ? "light" : "dark");
    console.log("theme:", theme);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <nav className={isCurrentDark ? "dark-theme" : "light-theme"}>
        <div className="navBar">
          <div onClick={handleClick}>
            <h1>Where in the world?</h1>
          </div>
          <div className="navBar-drkBtn" onClick={handleThemeChange}>
            <div className="drkBtn-Img">
              <img src={DarkMoon} alt="" />
            </div>
            <p>Dark Mode</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
