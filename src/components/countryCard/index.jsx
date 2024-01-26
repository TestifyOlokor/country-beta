import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Card = ({ countriesData, countries }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/countries/${id}`);
  };
  console.log("test:", countriesData);

  const displayData = countries?.length > 0 ? countries : countriesData;

  return (
    <>
      {displayData?.map((country) => (
        <div
          key={country?.name}
          className="countries-container"
          onClick={() => handleClick(country?.id)}
        >
          <div className="card-flag">
            <img src={country?.countryName?.flag} alt="" />
          </div>
          <div className="country-content">
            <h1>{country?.countryName?.name}</h1>
            <p>
              <span>Population</span>: {country?.countryName?.population}
            </p>
            <p>
              <span>Region</span>: {country?.countryName?.region}
            </p>
            <p>
              <span>Capital</span>: {country?.countryName?.capital}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
