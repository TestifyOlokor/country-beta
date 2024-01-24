import React, { useState, useEffect } from "react";
import Card from "../countryCard";
import "./style.css";
import Search from "../../assets/images/search.svg";

const InputForm = ({ countriesData, setCountriesData, isCurrentDark }) => {
  console.log("dd", countriesData);
  const [uniqueRegions, setUniqueRegions] = useState([]);

  const [value, setValue] = useState({
    Country: "",
  });

  const [regionValue, setRegionValue] = useState({
    Region: "",
  });
  console.log("Error", regionValue.Region);

  useEffect(() => {
    const regionsSet = new Set(
      countriesData?.map((country) => country?.countryName?.region)
    );
    setUniqueRegions(Array.from(regionsSet));
    console.log("region:", Array.from(regionsSet));
  }, [countriesData]);

  const handleFilter = () => {
    const data = countriesData;
    console.log("filter", regionValue?.Region, data[0]?.countryName?.region);
    const filtered = data?.filter(
      (country) => country?.countryName?.region === regionValue?.Region
    );
    console.log("fff", filtered);
    setCountriesData(filtered);
  };

  const handleRegionInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setRegionValue({
      ...regionValue,
      [name]: target.value,
    });
    handleFilter();
  };

  const handleSearch = () => {
    const data = countriesData;
    console.log("rile:", data.countryName?.name);
    const filtered = data.filter((country) =>
      country?.countryName?.name
        .toLowerCase()
        .includes(value.Country.toLowerCase())
    );
    setCountriesData(filtered);
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
