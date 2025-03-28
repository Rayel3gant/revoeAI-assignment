"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function InteractiveTableGenerator() {
  const [columns, setColumns] = useState<{ header: string; type: string }[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [columnCount, setColumnCount] = useState<number>(0);
  const [tempHeaders, setTempHeaders] = useState<string[]>([]);
  const [tempTypes, setTempTypes] = useState<string[]>([]);
  const [showInputs, setShowInputs] = useState(false);

  const handleGenerateInputs = () => {
    setTempHeaders(Array(columnCount).fill(""));
    setTempTypes(Array(columnCount).fill("text"));
    setShowInputs(true);
  };

  const handleCreateTable = () => {
    const newColumns = tempHeaders.map((header, index) => ({
      header,
      type: tempTypes[index],
    }));
    setColumns(newColumns);
    setData([Array(newColumns.length).fill("")]); // Initialize table with one empty row
    setShowInputs(false);
  };

  const handleAddRow = () => {
    setData((prevData) => [...prevData, Array(columns.length).fill("")]);
  };

  const handleAddColumn = () => {
    const header = prompt("Enter header name:");
    const type = prompt("Enter type (text or date):");

    if (header && (type === "text" || type === "date")) {
      setColumns((prevColumns) => [...prevColumns, { header, type }]);
      setData((prevData) =>
        prevData.map((row) => [...row, ""]) // Add empty cell for new column in all rows
      );
    } else {
      alert("Invalid input. Please provide a valid header name and type.");
    }
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = value;
      return newData;
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-neutral-900">Interactive Table Generator</h1>

      {/* Step 1: Input Number of Columns */}
      <div>
        <label htmlFor="columnCount" className="block font-medium text-neutral-900">
          Number of Columns:
        </label>
        <input
          type="number"
          id="columnCount"
          value={columnCount}
          onChange={(e) => setColumnCount(Number(e.target.value))}
          className="border border-neutral-900 rounded p-2 w-32 text-neutral-900"
          min={0}
        />
        <Button
          onClick={handleGenerateInputs}
          className="ml-4 text-black cursor-pointer bg-white px-4 py-2 rounded-md"
        >
          Set Columns
        </Button>
      </div>

      {/* Step 2: Input Header Names and Types */}
      {showInputs && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-neutral-900">Define Column Details</h2>
          {tempHeaders.map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="text"
                placeholder={`Header ${index + 1}`}
                value={tempHeaders[index]}
                onChange={(e) => {
                  const newHeaders = [...tempHeaders];
                  newHeaders[index] = e.target.value;
                  setTempHeaders(newHeaders);
                }}
                className="border border-neutral-900 text-neutral-900 rounded p-2 w-64"
              />
              <select
                value={tempTypes[index]}
                onChange={(e) => {
                  const newTypes = [...tempTypes];
                  newTypes[index] = e.target.value;
                  setTempTypes(newTypes);
                }}
                className="border border-neutral-900 text-neutral-900 rounded p-2"
              >
                <option value="text">Text</option>
                <option value="date">Date</option>
              </select>
            </div>
          ))}
          <Button
            onClick={handleCreateTable}
            className="mt-4 text-black cursor-pointer bg-white px-4 py-2 rounded-md"
          >
            Create Table
          </Button>
        </div>
      )}

      {/* Step 3: Render Table */}
      {columns.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Generated Table</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-neutral-900 w-full">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="border border-neutral-900 px-4 py-2 tableHeader text-neutral-200"
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="border border-neutral-900 px-4 py-2">
                        <input
                          type={columns[colIndex].type}
                          value={cell}
                          placeholder="type here"
                          onChange={(e) =>
                            handleInputChange(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full border-none outline-none text-neutral-900 text-center"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              onClick={handleAddRow}
              className="text-black cursor-pointer bg-white px-4 py-2 rounded-md"
            >
              + Add Row
            </Button>
            <Button
              onClick={handleAddColumn}
              className="text-black cursor-pointer bg-white px-4 py-2 rounded-md"
            >
              + Add Column
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
