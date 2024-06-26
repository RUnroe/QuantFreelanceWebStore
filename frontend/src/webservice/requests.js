const LOCAL_API_URL = "http://localhost:3005/api/";
const PRODUCTION_API_URL = "https://quant.ryanunroe.com/";

const IN_DEVELOPMENT_ENVIRONMENT = process.env.NODE_ENV === "development";

const getApiUrl = () => {
  return IN_DEVELOPMENT_ENVIRONMENT ? LOCAL_API_URL : "/api/";
};

export const requestGet = async (uri) => {
  const response = await fetch(`${getApiUrl()}${uri}`);
  return await response.json();
};

export const requestUpdate = async (uri, body) => {
  const response = await fetch(`${getApiUrl()}${uri}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};

export const requestCreate = async (uri, body, useCredentials = true, formatJsonData = true) => {
  const response = await fetch(`${getApiUrl()}${uri}`, {
    method: "POST",
    ...(useCredentials && { credentials: "include" }),
    headers: {
      "Content-Type": "application/json",
    },
    body: formatJsonData ? JSON.stringify(body) : body,
  });
  return response;
};

export const requestDelete = async (uri, body) => {
  const response = await fetch(`${getApiUrl()}${uri}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};


export const getIconUrl = (iconUrl) => {
  // Format icon url incase it comes in as just an ID
  iconUrl = iconUrl.includes("/api/") ? iconUrl : `/api/icon/${iconUrl}`;

  // If in DEV environment, get images from PROD server
  return IN_DEVELOPMENT_ENVIRONMENT
    ? `${PRODUCTION_API_URL.slice(0, -1)}${iconUrl}`
    : iconUrl;
};
