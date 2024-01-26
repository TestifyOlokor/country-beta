import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackArrow from "../../assets/images/call-made.svg";
import NavBar from "../navBar/index";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./style.css";

const Country = ({ theme, setTheme }) => {
  const [countryDetails, setCountryDetails] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const isCurrentDark = theme === "dark";

  const fetchCountryDetails = async (id) => {
    const countryDocRef = doc(db, "countries", id);
    try {
      const countryDocSnapshot = await getDoc(countryDocRef);
      if (countryDocSnapshot.exists()) {
        return countryDocSnapshot.data();
      } else {
        throw new Error("Country not found");
      }
    } catch (error) {
      throw new Error("Error fetching country details: " + error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCountryDetails(id);
        console.error("sssss", data);
        setCountryDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  console.error("vvvvv", countryDetails);

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
              <img src={countryDetails?.countryName?.flag} alt="" />
            </div>
            <div className="country-display-details">
              <h1>{countryDetails?.countryName?.name}</h1>

              <div className="country-display-details-min">
                <div className="country-content">
                  <p>
                    <span>Native Name:</span>{" "}
                    {countryDetails?.countryName?.nativeName}
                  </p>
                  <p>
                    <span>Population:</span>{" "}
                    {countryDetails?.countryName?.population.toLocaleString()}
                  </p>
                  <p>
                    <span>Region:</span> {countryDetails?.countryName?.region}
                  </p>
                  <p>
                    <span>Sub Region:</span>{" "}
                    {countryDetails?.countryName?.subregion}
                  </p>
                  <p>
                    <span>Capital:</span> {countryDetails?.countryName?.capital}
                  </p>
                </div>
                <div className="country-content">
                  <p>
                    <span>Top Level Domain:</span>{" "}
                    {countryDetails?.countryName?.topLevelDomain[0]}
                  </p>
                  <p>
                    <span>Currencies:</span>{" "}
                    {countryDetails?.countryName?.currencies[0]?.code}
                  </p>
                  <p>
                    <span>Languages:</span>{" "}
                    {countryDetails?.countryName?.languages[0]?.name}
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
