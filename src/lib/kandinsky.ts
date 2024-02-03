const VALIDATIONS_URL = process.env.VALIDATIONS_URL as string;

export async function getKandinskyImage(prompt: string) {
  //searchQuery = encodeURIComponent(searchQuery);
  const response = await fetch(
    `${VALIDATIONS_URL}/call_kandinsky?action=getKandinskyImage&prompt=${prompt}`
  );

  // Check if the response is ok
  if (!response.ok) {
    console.log("search term fail");
    return null;
  }

  // Parse the response body as JSON
  const data = await response.json();

  // Check if the data is not empty
  if (!data || data.length === 0) {
    console.log("search term fail");
    return null;
  }

  // Extract the first item from the returned list
  const result = data.replace(/"/g, "");
  console.log(result);

  return result;
}
