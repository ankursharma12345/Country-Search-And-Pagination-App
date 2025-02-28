import React from "react";

const Table = ({ countries }) => {
  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white text-lg">
            <th className="py-3 px-4 text-center">Countries</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100 transition"
            >
              <td className="py-3 px-4 text-center">{data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
