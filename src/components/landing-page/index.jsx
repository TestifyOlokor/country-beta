import React, { useState, useEffect } from "react";
import Card from "../countryCard";
import InputForm from "../form";
import NavBar from "../navBar";
import { db } from "../../firebase";
import { collection, getDocs } from "@firebase/firestore";
import "./style.scss";

const LandingPage = ({ theme, setTheme }) => {
  const [countriesData, setCountriesData] = useState();
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesCollection = collection(db, "countries");
        const countriesSnapshot = await getDocs(countriesCollection);
        const countries = countriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCountriesData(countries);
        console.log("test:", countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

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
            filteredCountries={filteredCountries}
            setFilteredCountries={setFilteredCountries}
          />
        </div>
        <div
          className={`input-yun ${
            isCurrentDark ? "dark-theme" : "light-theme"
          }`}
        >
          <div className="card-container">
            <Card
              setCountriesData={setCountriesData}
              countriesData={countriesData}
              countries={filteredCountries}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
