import { YoutubeTranscript } from "youtube-transcript";
const YTSCRAPER_URL = process.env.YTSCRAPER_URL as string;

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);
  console.log(searchQuery);
  const response = await fetch(
    `${YTSCRAPER_URL}/search?searchQuery=${searchQuery}&maxResults=1`
  );

  // Check if the response is ok
  if (!response.ok) {
    console.log("youtube fail");
    return null;
  }

  // Parse the response body as JSON
  const data = await response.json();

  // Check if the data is not empty
  if (!data || data.length === 0) {
    console.log("youtube fail");
    return null;
  }

  // Extract the first item from the returned list
  return data[0];
}

export async function getTranscript(videoId: string) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "ru",
      country: "RU",
    });
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}
