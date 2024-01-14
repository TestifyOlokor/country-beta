import React, { useEffect } from "react";
import { fetchJsonDataApi } from "../../store/api/countryQuery";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Card = ({ countriesData, setCountriesData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonDataApi();
        setCountriesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setCountriesData]);

  const handleClick = (id) => {
    navigate(`/countries/${id}`);
  };

  return (
    <>
      {countriesData?.map((country) => (
        <div
          key={country?.id}
          className="countries-container"
          onClick={() => handleClick(country?.id)}
        >
          <div className="card-flag">
            <img src={country?.flag} alt="" />
          </div>
          <div className="country-content">
            <h1>{country?.name}</h1>
            <p>
              <span>Population</span>: {country?.population.toLocaleString()}
            </p>
            <p>
              <span>Region</span>: {country?.region}
            </p>
            <p>
              <span>Capital</span>: {country?.capital}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
