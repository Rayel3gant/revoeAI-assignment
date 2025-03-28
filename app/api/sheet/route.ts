import { google } from "googleapis";
import { NextResponse } from "next/server";




export const GET = async () => {
  try {
      const client = new google.auth.JWT(
        process.env.CLIENT_EMAIL, undefined, process.env.CLIENT_PRIVATE_KEY!.replace(/\\n/g, '\n'), ['https://www.googleapis.com/auth/spreadsheets']
      );

    // Authorize the client
    await new Promise<void>((resolve, reject) => {
      client.authorize((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log('Authorized client.');

    const gsapi = google.sheets({ version: 'v4', auth: client });

    // Customization starts here
    const opt = {
      spreadsheetId: process.env.SHEET_ID,
      range: 'teams',
    };

    // Fetch data from Google Sheets
    const data = await gsapi.spreadsheets.values.get(opt);
    const result = data.data.values;

    console.log('Sheet data fetched:', result);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Sheet data fetched successfully',
        data: result,
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error in Sheets API:', error);

    // Check if the error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Error in Sheets API',
        error: errorMessage,
      }),
      { status: 500 }
    );
  }
  };
