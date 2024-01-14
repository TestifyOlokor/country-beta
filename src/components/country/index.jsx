import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackArrow from "../../assets/images/call-made.svg";
import NavBar from "../navBar/index";
import { fetchJsonDataApis } from "../../store/api/countryQuery";
import "./style.css";

const Country = ({ theme, setTheme }) => {
  const [countryDetails, setCountryDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const isCurrentDark = theme === "dark";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonDataApis(id);
        setCountryDetails(data);
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!countryDetails) {
    return <div>Loading...</div>;
  }
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <NavBar isCurrentDark={isCurrentDark} theme={theme} setTheme={setTheme} />
      <div className={`re-cnt ${isCurrentDark ? "dark-theme" : "light-theme"}`}>
        <section className="country-display-card-container ">
          <div className="card-cntr-back" onClick={handleBackClick}>
            <div>
              <img src={BackArrow} alt="" />
            </div>
            <div>
              <p>Back</p>
            </div>{" "}
          </div>
          <div className="country-display-card">
            <div className="country-display-image">
              <img src={countryDetails?.flag} />
            </div>
            <div className="country-display-details">
              <h1>{countryDetails?.name}</h1>

              <div className="country-display-details-min">
                <div className="country-content">
                  <p>
                    <span>Native Name:</span> {countryDetails?.nativeName}
                  </p>
                  <p>
                    <span>Population:</span>{" "}
                    {countryDetails?.population.toLocaleString()}
                  </p>
                  <p>
                    <span>Region:</span> {countryDetails?.region}
                  </p>
                  <p>
                    <span>Sub Region:</span> {countryDetails?.subregion}
                  </p>
                  <p>
                    <span>Capital:</span> {countryDetails?.capital}
                  </p>
                </div>
                <div className="country-content">
                  <p>
                    <span>Top Level Domain:</span>{" "}
                    {countryDetails?.topLevelDomain[0]}
                  </p>
                  <p>
                    <span>Currencies:</span>{" "}
                    {countryDetails?.currencies[0]?.code}
                  </p>
                  <p>
                    <span>Languages:</span> {countryDetails?.languages[0]?.name}
                  </p>
                </div>
              </div>
              <div className="brder">
                <p>
                  <span>Border Countries:</span>{" "}
                </p>
                <div className="brder-cntr">
                  {countryDetails?.borders &&
                    countryDetails?.borders?.map((border, index) => (
                      <div className="brder-cnt" key={index}>
                        <p>{border}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Country;
