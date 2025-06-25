"use server";
import fs from "fs";
import path from "path";
async function writeLog(message: string) {
  const logFileName = "app.log";
  const logFilePath = path.join(process.cwd(), "logs", logFileName);
  console.log(logFilePath);
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} : ${message}\n`;

  try {
    await fs.promises.appendFile(logFilePath, logEntry);
  } catch (error) {
    console.error("Failed to write log:", error);
  }
}

export async function makeCall(phoneNumberToCall: any) {
  console.log("Calling:", phoneNumberToCall, new Date().toISOString());
  const apiKey = process.env.EXOTEL_API_KEY;
  const apiToken = process.env.EXOTEL_API_TOKEN;
  const subdomain = process.env.EXOTEL_SUBDOMAIN;
  const sid = process.env.EXOTEL_SID;
  const callerId = process.env.EXOTEL_CALLER_ID;
  const exomlUrl = process.env.EXOTEL_EXOML_URL;
  if (
    !apiKey ||
    !apiToken ||
    !subdomain ||
    !sid ||
    !phoneNumberToCall ||
    !callerId ||
    !exomlUrl
  ) {
    return {
      success: false,
      error: "Missing required configuration or phone number.",
    };
  }
  const dataString = new URLSearchParams({
    From: phoneNumberToCall,
    CallerId: callerId,
    Url: exomlUrl,
  }).toString();
  const exotelApiUrl = `https://${subdomain}/v1/Accounts/${sid}/Calls/connect`;
  const auth = btoa(`${apiKey}:${apiToken}`);
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: dataString,
  };

  try {
    const response = await fetch(exotelApiUrl, requestOptions);
    const responseBody = await response.text();

    if (response.ok) {
      console.log("Exotel API Success:", responseBody);
      writeLog(responseBody);
      return {
        success: true,
        message: "Call initiated successfully!",
        data: responseBody,
      };
    } else {
      console.error(
        "Exotel API Error (Status:",
        response.status,
        "Body:",
        responseBody
      );
      writeLog(responseBody);
      return {
        success: false,
        error: `Exotel API call failed: ${response.status} - ${responseBody}`,
        details: responseBody,
      };
    }
  } catch (error: any) {
    console.error("Error making Exotel API call:", error);
    return {
      success: false,
      error: "Internal server error during call initiation.",
      details: error.message,
    };
  }
}
