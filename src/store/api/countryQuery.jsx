export const fetchJsonDataApi = async () => {
  const response = await fetch("http://localhost:3000/countries");
  const jsonData = await response.json();
  return jsonData;
};

export const fetchJsonDataApis = async (id) => {
  const response = await fetch("http://localhost:3000/countries");
  const jsonData = await response.json();
  const countryDetails = jsonData.find((country) => country.id === id);
  return countryDetails;
};
