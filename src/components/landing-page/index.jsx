import React, { useState } from "react";
import Card from "../countryCard";
import InputForm from "../form";
import NavBar from "../navBar";
import "./style.scss";

const LandingPage = ({ theme, setTheme }) => {
  const [countriesData, setCountriesData] = useState();

  const isCurrentDark = theme === "dark";

  return (
    <>
      <NavBar isCurrentDark={isCurrentDark} theme={theme} setTheme={setTheme} />
      <section className="main-container">
        <div className={isCurrentDark ? "dark-theme" : "light-theme"}>
          <InputForm
            isCurrentDark={isCurrentDark}
            setCountriesData={setCountriesData}
            countriesData={countriesData}
          />
        </div>
        <div className={isCurrentDark ? "dark-theme" : "light-theme"}>
          <div className="card-container">
            <Card
              setCountriesData={setCountriesData}
              countriesData={countriesData}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
