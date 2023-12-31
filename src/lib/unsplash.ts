// deprecated module

import axios from "axios";
export const getUnsplashImage = async (query: string) => {
  console.log(query)
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?per_page=1&query=${query}&client_id=${process.env.UNSPLASH_API_KEY}`
    );
    return response.data.results[0].urls.small_s3;
  } catch (e) {
    return null;
  }
};
