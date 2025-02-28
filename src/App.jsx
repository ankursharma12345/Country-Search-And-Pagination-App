import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const App = () => {
  const [countryData, setCountryData] = useState({
    countries: [],
    originalCountries: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const getResponseData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        if (response.status === 200) {
          const countryList = response.data.map((data) => data?.name.common);
          setCountryData({
            countries: countryList.slice(0, 30),
            originalCountries: countryList.slice(0, 30),
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getResponseData();

    // For setting focus on input field
    let inputField = document.getElementById("country");
    inputField?.focus();
  }, []);

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setCurrentPage(1);
    setCountryData((prevData) => {
      const filteredCountries = prevData.originalCountries?.filter((country) =>
        country.toLowerCase().includes(searchValue)
      );

      return {
        ...prevData,
        countries: searchValue ? filteredCountries : prevData.originalCountries,
      };
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = countryData.countries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(countryData.countries.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">
          Search Country:
        </label>
        <input
          type="text"
          id="country"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Country"
          onChange={handleChange}
        />
      </div>

      <Table countries={currentCountries} />

      <div className="flex items-center mt-6 space-x-3">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Prev
        </button>

        <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
