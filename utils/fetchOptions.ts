import axios from "axios";

export const FetchAndStoreOptions = async (
  key: string,
  apiUrl: string,
  token?: string | null,
  expirationTime: number = 24 * 60 * 60 * 1000
) => {
  const now = new Date().getTime();
  const storedData = localStorage.getItem(key);
  const storedTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (
    storedData &&
    storedTimestamp &&
    now - parseInt(storedTimestamp) < expirationTime
  ) {
    return JSON.parse(storedData);
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    const uniqueData = data.data.result;
    // const uniqueData = ["All", ...data.data];
    if (Array.isArray(uniqueData)) {
      localStorage.setItem(key, JSON.stringify(uniqueData));
      localStorage.setItem(`${key}_timestamp`, now.toString());
      return uniqueData;
    } else {
      console.error("Invalid data format");
    }
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
    return [];
  }
};
