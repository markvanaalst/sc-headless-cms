#!/usr/bin/env node

const fetch = require("node-fetch");

const clientId = "A5cLWiOrk5F1h8YH8X00pwaSmazwyOb7";
const clientSecret = "q72ZsJ4Y1ed6HW6lg_XUWY1EB4zcmfd-JO59CvQqP2JdSSKvkFurWX7-Z4nl5QcX";
const baseUrl = "https://content-api.sitecorecloud.io";
const authUrl = "https://auth.sitecorecloud.io";
const audiences = "https://api.sitecorecloud.io";

export default function GetToken() {
  console.log("Get token");

  const response = fetch(baseUrl + "/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      audiences: audiences,
    }),
  });

  return response;

  // 'Authorization: Bearer TDEwNE9XYTlOaXBSQnBpS2J2WjhybjNsbVdaYmhaSFhxcS9xRjdHL0ZIYz18aGMtZGV2LXJlbGF0aW9ucy1lYS1hM2I3ZQ=='

  //headers: {
  //  Authorization: `Bearer ${accessToken}`
  //}
}
