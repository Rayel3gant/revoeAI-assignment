'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TableGenerator from '@/components/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { setSheet, clearToken } from '../../lib/redux/tableSlice';
import { RootState } from '../../lib/redux/store';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface JwtPayload {
  exp: number; // Expiration time in seconds since the epoch
}

const handleTokenExpiration = (
  token: string,
  dispatch: ReturnType<typeof useDispatch>, // Correct type for dispatch
  router: ReturnType<typeof useRouter> // Correct type for router
) => {
  if (!token) return;

  try {
    // Decode the JWT token to extract expiration time
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    console.log('Decoded Token:', decoded);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Calculate remaining time until token expiration
    const timeUntilExpiration = (decoded.exp - currentTime) * 1000;

    if (timeUntilExpiration > 0) {
      // Set a timeout to log out the user when the token expires
      setTimeout(() => {
        toast('Session expired. Logging out...');
        dispatch(clearToken()); // Clear token in Redux store
        router.push('/login'); // Redirect to login page
      }, timeUntilExpiration);
    } else {
      // Token has already expired
      toast('Session expired. Logging out...');
      dispatch(clearToken()); // Clear token in Redux store
      router.push('/login'); // Redirect to login page
    }
  } catch (error) {
    console.error('Failed to decode token:', error);
  }
};

const Page = () => {
  const [tableData, setTableData] = useState<(string | number)[][]>([]); // Define the type explicitly
  const [isLoading, setIsLoading] = useState(false);
  const [customTable, setCustomTable] = useState(false);
  const dispatch = useDispatch();
  const { sheetTable, token } = useSelector((state: RootState) => state.table);
  const router = useRouter();

  const getSheetData = async () => {
    setIsLoading(true);
    if (customTable) {
      setCustomTable(false);
    }
    try {
      const response = await axios.get('/api/sheet');
      console.log(response);
      if (response.data.success) {
        setTableData(response.data.data);
        dispatch(setSheet(response.data.data));
      }
    } catch (error) {
      console.error('Error fetching sheet data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (sheetTable && sheetTable.length > 0) {
      setTableData(sheetTable);
      console.log('Copied sheet data from slice');
    } else {
      getSheetData();
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleTokenExpiration(token, dispatch, router);
    }
  }, [token, dispatch, router]);

  return (
    <div className="w-full h-screen">
      <div className="w-fit mx-auto flex items-center gap-x-8 mt-4 pb-6">
        <div
          onClick={() => setCustomTable(false)}
          className="text-neutral-900 text-xs md:text-[1rem] cursor-pointer hover:text-neutral-400 hover:scale-90 transition-all duration-1000"
        >
          Get Sheet
        </div>
        <div
          onClick={() => setCustomTable(true)}
          className="text-neutral-900 text-xs md:text-[1rem] cursor-pointer hover:text-neutral-400 hover:scale-90 transition-all duration-1000"
        >
          Create Table
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-neutral-950" />
      {customTable ? (
        <TableGenerator />
      ) : (
        <div>
          <Button
            onClick={getSheetData}
            className="text-black cursor-pointer ml-4 mt-6 bg-white px-4 py-2 rounded-md hover:bg-black hover:text-white hover:scale-110 transition-all duration-1000"
          >
            {isLoading ? (
              <div className="flex items-center gap-4">
                <Image
                  src="/icons/loader.svg"
                  alt="loader"
                  className="animate-spin"
                  width={24}
                  height={24}
                />
                Loading...
              </div>
            ) : (
              <div>Get Sheet Data</div>
            )}
          </Button>
          <div className="overflow-x-auto w-11/12 mx-auto md:w-3/4">
            <h1 className="text-lg md:text-7xl font-bold text-neutral-900">
              Google Sheet Data
            </h1>
            <table className="border-collapse border border-neutral-900 w-full mt-6 text-center">
              <thead>
                <tr>
                  {tableData[0]?.map((header: string | number, index: number) => (
                    <th
                      key={index}
                      className="border border-neutral-900 px-4 py-2 font-bold text-neutral-200 tableHeader"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row: (string | number)[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string | number, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="border border-neutral-900 px-4 py-2 text-neutral-900"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
