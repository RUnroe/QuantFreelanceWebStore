const getApiUrl = () => {
    return process.env.NODE_ENV === "development" ? 
        "http://localhost:3005/" :
        "/";
}

export const requestGet = async (uri) => {
    console.log(`${getApiUrl()}${uri}`)
    const response = await fetch(`${getApiUrl()}${uri}`);
    return await response.json();
}
