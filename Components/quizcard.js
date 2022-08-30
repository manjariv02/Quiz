import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid, Row, Col, Radio, Button, RadioGroup } from "rsuite";
import { database } from "../appwrite/appwriteConfig";
import Scorecard from "./scorecard";
import { Query } from "appwrite";

const QuizCard = ({ isAnswer }) => {
  const [questions, setQuestions] = useState([]);
  const [optionsClicked, setOptionsClicked] = useState({});
  const router = useRouter();
  console.log("routerrrrrrrrrrr", router);
  const apiDate = router.query.date;
  const marks =
    router &&
    router.query &&
    router.query.scoreData &&
    JSON.parse(router.query.scoreData);
  if (isAnswer && !marks && apiDate) {
    router.push(`/quiz/question?date${apiDate}`);
  }

  const getQuestions = async () => {
    const data = await database.listDocuments("6305d25b57aada2625d7", [
      Query.equal("date", apiDate),
    ]);
    console.log("dataaaa", data.documents);
    setQuestions(data.documents);
  };

  const answerValidation = () => {
    const validatedAnswer = {};
    const totalQuestion = questions.length;
    let correctAnswer = 0;
    let wrongAnswer = 0;
    let notAttended = 0;
    Object.keys(optionsClicked).forEach((qnId) => {
      const foundQuestion = questions.find((question) => {
        return question.$id === qnId;
      });
      if (foundQuestion) {
        if (foundQuestion.answer === optionsClicked[qnId]) {
          correctAnswer++;
        } else if (optionsClicked[qnId] || optionsClicked[qnId] === 0) {
          wrongAnswer++;
        } else {
          notAttended++;
        }
        validatedAnswer[qnId] = {
          isCorrect: foundQuestion.answer === optionsClicked[qnId],
          selectedOption: optionsClicked[qnId],
          correctOption: foundQuestion.answer,
          description: foundQuestion.description,
        };
      }
    });
    console.log(">>>>>>", validatedAnswer);
    return {
      validatedAnswer,
      totalQuestion,
      correctAnswer,
      wrongAnswer,
      notAttended,
    };
  };

  useEffect(() => {
    getQuestions();
  }, [apiDate]);

  useEffect(() => {
    if (questions) {
      const options = {};
      questions.forEach((question) => {
        options[question.$id] = null;
      });
      setOptionsClicked(options);
    }
  }, [questions]);

  console.log({ optionsClicked });

  return (
    <div>
      {isAnswer && <Scorecard marks={marks} />}
      {questions &&
        questions.map((question, qnIndex) => {
          return (
            <Grid className="grid" key={"qn" + qnIndex}>
              <Col className="box">
                <Row className="question-title">
                  <h5 className="h5">{`Question ${qnIndex + 1}`}</h5>
                </Row>
                <Col className="grid-cell">
                  <Row className="body-question">
                    <h6>{question.questions}</h6>
                  </Row>
                  <Col className="option">
                    {question.options.map((option, opIndex) => {
                      return (
                        <RadioGroup
                          name="option-radio"
                          value={optionsClicked[question.$id]}
                          key={"op" + opIndex}
                          onChange={(val) => {
                            setOptionsClicked({
                              ...optionsClicked,
                              [question.$id]: val,
                            });
                          }}
                        >
                          <Row className="options">
                            <Radio value={opIndex} readOnly={isAnswer}>
                              {option}
                            </Radio>
                          </Row>
                        </RadioGroup>
                      );
                    })}
                  </Col>
                  <Col>
                    {isAnswer && marks && (
                      <Row className="answer-des">
                        <h6>
                          Answer Option{" "}
                          {marks &&
                            marks.validatedAnswer[question.$id] &&
                            marks.validatedAnswer[question.$id].correctOption +
                              1}{" "}
                        </h6>
                        <p>{question.description}</p>
                      </Row>
                    )}
                  </Col>
                </Col>
              </Col>
            </Grid>
          );
        })}
      <Button
        className="button-answer"
        onClick={() => {
          const scoreData = answerValidation();
          console.log("goddddddd", scoreData);
          router.push(
            {
              pathname: "/quiz/answer",
              query: {
                scoreData: JSON.stringify(scoreData),
                date : apiDate,
              },
            },
            "/quiz/answer"
          );
        }}
      >
        Submit Answer
      </Button>
    </div>
  );
};

export default QuizCard;
