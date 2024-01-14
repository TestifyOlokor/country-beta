import React, { useState, useEffect } from "react";
import { fetchJsonDataApi } from "../../store/api/countryQuery";
import Card from "../countryCard";
import "./style.css";
import Search from "../../assets/images/search.svg";

const InputForm = ({ countriesData, setCountriesData, isCurrentDark }) => {
  const [uniqueRegions, setUniqueRegions] = useState([]);

  const [value, setValue] = useState({
    Country: "",
  });

  const [regionValue, setRegionValue] = useState({
    Region: "",
  });

  useEffect(() => {
    handleFilter();
  }, [regionValue.Region]);

  useEffect(() => {
    const regionsSet = new Set(
      countriesData?.map((country) => country?.region)
    );
    setUniqueRegions(Array.from(regionsSet));
  }, [countriesData]);

  const handleFilter = async () => {
    try {
      const data = await fetchJsonDataApi();

      const filtered = data.filter(
        (country) => country.region === regionValue.Region
      );
      setCountriesData(filtered);
    } catch (error) {
      console.error("Error fetching or filtering data:", error);
    }
  };

  const handleRegionInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setRegionValue({
      ...regionValue,
      [name]: target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const data = await fetchJsonDataApi();
      const filtered = data.filter((country) =>
        country.name.toLowerCase().includes(value.Country.toLowerCase())
      );
      setCountriesData(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setValue({
      ...value,
      [name]: target.value,
    });
    handleSearch();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          <img src={Search} alt="" className="search-icon-container" />
          <input
            className={`input ${isCurrentDark ? "dark-theme" : "light-theme"}`}
            type="text"
            name="Country"
            value={value.Country}
            onChange={handleInputChange}
            placeholder="Search for a country…"
          />
        </label>
        <label className="select-label">
          <select
            className={`input ${isCurrentDark ? "dark-theme" : "light-theme"}`}
            name="Region"
            value={regionValue.Region}
            onChange={handleRegionInputChange}
          >
            <option value="" disabled>
              Filter by Region
            </option>
            {uniqueRegions?.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
      </form>
      <Card />
    </>
  );
};

export default InputForm;
