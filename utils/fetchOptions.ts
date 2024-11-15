import axios from "axios";

export const FetchOptions = async (source: string) => {
  try {
    const response = await axios.get(source);

    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch options from ${source}`, error);
    return [];
  }
};
