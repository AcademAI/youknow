const VALIDATIONS_URL = process.env.VALIDATIONS_URL as string;

export async function checkResult(
  title: string,
  units: string[],
  policies: string[]
) {
  const response = await fetch(
    `${VALIDATIONS_URL}/call_openai?action=checkResult&title=${title}&units=${units}&policies=${policies}`
  );
  if (!response.ok) {
    console.log("checkResult fail");
    return null;
  }
  const data = await response.json();
  // Check if the data is not empty
  if (!data || data.length === 0) {
    console.log("checkResult fail");
    return null;
  }
  return data;
}

export async function createUnitsNChapters(title: string, units: string[]) {
  const response = await fetch(
    `${VALIDATIONS_URL}/call_openai?action=createUnitsNChapters&title=${title}&units=${units}`
  );
  console.log(response);
  if (!response.ok) {
    console.log("createUnitsNChapters fail");
    return null;
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    console.log("createUnitsNChapters fail");
    return null;
  }

  console.log(data);
  return data;
}

export async function createImageSearchTerm(title: string) {
  const response = await fetch(
    `${VALIDATIONS_URL}/call_openai?action=createImageSearchTerm&title=${title}`
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

  console.log(data);
  return data;
}

export async function createYoutubeSummary(transcript: string) {
  const response = await fetch(
    `${VALIDATIONS_URL}/call_openai?action=createYoutubeSummary&transcript=${transcript}`
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

  console.log(data);
  return data;
}

export async function getQuestionsFromTranscript(
  transcript: string,
  chapterName: string
) {
  const response = await fetch(
    `${VALIDATIONS_URL}/call_openai?action=getQuestionsFromTranscript&transcript=${transcript}&chapterName=${chapterName}`
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

  return data;
}
