import { YoutubeTranscript } from "youtube-transcript";

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);
  console.log(searchQuery)
  const response = await fetch(
    `http://172.19.0.6:8224/search?searchQuery=${searchQuery}&maxResults=1`
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
/*
export async function getQuestionsFromTranscript(
  transcript: string,
  chapter_name: string
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };


  const questions: Question[] = await strict_output(
    "Ты - помощник, способный генерировать вопросы и ответы, длина каждого Q или A не должна превышать 15 слов. В ответе верни массив, состоящий из JSON объектов.",
    new Array(5).fill(
      `Сгенерируй сложный вопрос о главе: ${chapter_name} исходя из этого текста:\n" +
       ${transcript}`
    ),
    {
      question: "вопрос",
      answer: "правильный ответ",
      option1: 'вариант 1',
      option2: 'вариант 2',
      option3: 'вариант 3',
     
    }
  );
  console.log({questions})
  return questions;
}
*/