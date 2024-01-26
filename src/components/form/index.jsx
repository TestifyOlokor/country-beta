import React, { useState, useEffect } from "react";
import "./style.css";
import Search from "../../assets/images/search.svg";

const InputForm = ({
  countriesData,
  filteredCountries,
  setFilteredCountries,
  isCurrentDark,
}) => {
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

  const handleFilterAndSearch = (valueRe) => {
    console.log("ddd", valueRe);
    const data = countriesData;
    const filtered = data?.filter((country) => {
      const matchesRegion =
        valueRe === "" || country?.countryName?.region === valueRe;
      const matchesSearch =
        valueRe === "" ||
        country?.countryName?.name
          .toLowerCase()
          .includes(valueRe.toLowerCase());
      console.log("rn:", matchesSearch);

      return matchesRegion || matchesSearch;
    });

    console.log("ddd1", filtered);

    setFilteredCountries(filtered);
  };

  const handleRegionInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setRegionValue({
      ...regionValue,
      [name]: target.value,
    });
    handleFilterAndSearch(target.value);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setValue({
      ...value,
      [name]: target.value,
    });
    console.log("reon:", target.value);

    handleFilterAndSearch(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handleFilterAndSearch();
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
    </>
  );
};

export default InputForm;
