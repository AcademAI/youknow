const VALIDATIONS_URL = process.env.VALIDATIONS_URL as string;

export async function getKandinskyImage(prompt: string) {
  const response = await fetch(
    `${VALIDATIONS_URL}/call_kandinsky?action=getKandinskyImage&prompt=${prompt}`
  );

  if (!response.ok) {
    console.log("search term fail");
    return null;
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    console.log("search term fail");
    return null;
  }

  const result = data.replace(/"/g, "");
  console.log(result);

  return result;
}
