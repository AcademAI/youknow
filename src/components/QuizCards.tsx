"use client";
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  chapter: Chapter & {
    questions: Question[];
  };
  role: string | undefined;
};

const QuizCards = ({ chapter, role }: Props) => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [questionState, setQuestionState] = React.useState<
    Record<string, boolean | null>
  >({});
  const checkAnswer = React.useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const user_answer = answers[question.id];
      if (!user_answer) return;
      if (user_answer === question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionState(newQuestionState);
    });
  }, [answers, questionState, chapter.questions]);
  return (
    <div className="flex-[1] mt-5 ml-0 sm:ml-8">
      <h1 className="text-2xl font-bold">Вопросы по теме</h1>
      <div className="mt-4">
        {role ? (
          chapter.questions.map((question) => {
            const options = JSON.parse(question.options) as string[];
            return (
              <div
                key={question.id}
                className={cn("p-3 mt-4 border border-secondary rounded-lg", {
                  "bg-green-700": questionState[question.id] === true,
                  "bg-red-700": questionState[question.id] === false,
                  "bg-secondary": questionState[question.id] === null,
                })}
              >
                <h1 className="text-lg font-semibold">{question.question}</h1>
                <div className="mt-2">
                  <RadioGroup
                    onValueChange={(e) => {
                      setAnswers((prev) => {
                        return {
                          ...prev,
                          [question.id]: e,
                        };
                      });
                    }}
                  >
                    {options.map((option, index) => {
                      return (
                        <div
                          className="flex items-center space-x-2"
                          key={index}
                        >
                          <RadioGroupItem
                            value={option}
                            id={question.id + index.toString()}
                          />
                          <Label htmlFor={question.id + index.toString()}>
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-lg font-semibold text-red-500">
            Войдите в аккаунт, чтобы ответить на вопросы и пройти тест по главе:{" "}
            {chapter.name}
          </h1>
        )}
      </div>
      {role ? (
        <Button
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background 
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 
        rounded-md px-8 w-full mt-2"
          onClick={checkAnswer}
        >
          Проверить
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuizCards;
