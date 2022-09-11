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
  const apiId = router.query.date;
  const marks =
    router &&
    router.query &&
    router.query.scoreData &&
    JSON.parse(router.query.scoreData);

  if (isAnswer && !marks && apiId) {
    console.log("99999999999999", apiId);
    router.push(`/quiz/question?date${apiId}`);
  }

  const getQuestions = async () => {
    const data = await database.listDocuments("6319a1b1021a0c2aa7ce", [
      Query.equal("slug", apiId),
    ]);
    console.log("iddddddd", data);

    const quiz_id = data.documents[0] && data.documents[0].id;
    console.log("iddddddd", quiz_id);

    if (quiz_id) {
      const data_Question = await database.listDocuments(
        "631d5e36e6e443458253",
        [Query.equal("quiz_id", quiz_id)]
      );
      const question_doc= data_Question.documents;
      console.log("mmmm",question_doc)
      setQuestions(question_doc)
    }
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
  }, [apiId]);

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
          const correctOption =
            marks &&
            marks.validatedAnswer[question.$id] &&
            marks.validatedAnswer[question.$id].correctOption;
          return (
            <Grid className="grid" key={"qn" + qnIndex}>
              <Col className="box">
                <Row className="question-title">
                  <h5 className="h5">{`Question ${qnIndex + 1}`}</h5>
                </Row>
                <Col className="grid-cell">
                  <Row className="body-question">
                    <h6>{question.question}?</h6>
                  </Row>
                  <Col className="option">
                    {question.option.map((optionQ, opIndex) => {
                      const correctOption =
                        marks &&
                        marks.validatedAnswer[question.$id] &&
                        marks.validatedAnswer[question.$id].correctOption;
                      return (
                        <RadioGroup
                          name="option-radio"
                          value={optionsClicked[question.$id]}
                          key={"op" + opIndex}
                        >
                          <Row
                          
                            className={`options ${
                              !isAnswer
                                ? opIndex === optionsClicked[question.$id]
                                  ? "option-user-selected"
                                  : ""
                                : !(opIndex === optionsClicked[question.$id])
                                ? opIndex === correctOption
                                  ? "option-correct-answer"
                                  : ""
                                : optionsClicked[question.$id] === correctOption
                                ? "option-correct-answer"
                                : "option-wrong-answer"
                            } `}
                            onClick={() => {
                              if (!isAnswer) {
                                setOptionsClicked({
                                  ...optionsClicked,
                                  [question.$id]: opIndex,
                                });
                              }
                            }}
                          >
                            <Radio value={opIndex} readOnly={isAnswer}>
                              {optionQ}
                            </Radio>
                          </Row>
                        </RadioGroup>
                      );
                    })}
                  </Col>
                  <Col style={{width:"100%"}}>
                    {isAnswer && marks && (
                      <Row className="answer-des">
                        <h6>Correct Answer: Option {correctOption} </h6>
                        <p>{question.description}</p>
                      </Row>
                    )}
                  </Col>
                </Col>
              </Col>
            </Grid>
          );
        })}
      {!isAnswer && (
        <Grid className="grid-button">
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
                    date: apiId,
                  },
                },
                "/quiz/answer"
              );
            }}
          >
            Submit Your Answer's
          </Button>
        </Grid>
      )}
    </div>
  );
};

export default QuizCard;
