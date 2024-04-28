import axios from "axios";

axios.defaults.baseURL = `https://api.unsplash.com/`;
const ACCESS_KEY = `a4pgAq96anmlz4zkX458OC6jvk6ZCpANsff-yVjaSFg`;

export const getImagesUnplash = async <T>(
  searchImg: string,
  pageNumber: number
): Promise<T | undefined> => {
  const params: Record<string, string> = {
    query: searchImg,
    page: pageNumber.toString(),
    per_page: "9",
    client_id: ACCESS_KEY,
  };
  try {
    const response = await axios.get(
      `search/photos/?${new URLSearchParams(params).toString()}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
