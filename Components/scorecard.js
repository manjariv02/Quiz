import React from "react";
import { useRouter } from "next/router";
import { Col, Grid, Row } from "rsuite";

const Scorecard = ({ marks},{apiDate}) => {
  const router = useRouter();
  console.log("apidateeeeeee, routerrrr",apiDate,router)
  return (
    marks ? (
      <Grid className="grid">
        <Col className="box">
          <Row className="score-title">
            <h2>
              YourScore {marks.correctAnswer}/{marks.totalQuestion}
            </h2>
          </Row>
        </Col>
        <Col className="rs">
          <div className="parent">
            <div className="box-inside">
              <div className="ima">
                <img
                  src="https://nationaldefenceinstitute.in/images/quiz/002-clipboard.svg"
                  width={75}
                ></img>
              </div>
              <div className="inside-flex">
                <div className="score">
                  <h4>{marks.totalQuestion}</h4>
                </div>
                <div className="final">Total Questions</div>
              </div>
            </div>
            <div className="box-inside">
              <div className="ima">
                <img
                  src="https://nationaldefenceinstitute.in/images/quiz/006-verify.svg"
                  width={75}
                ></img>
              </div>
              <div className="inside-flex">
                <div className="score">
                  <h4>{marks.correctAnswer}</h4>
                </div>
                <div className="final">Correct Answer</div>
              </div>
            </div>
            <div className="box-inside">
              <div className="ima">
                <img
                  src="https://nationaldefenceinstitute.in/images/quiz/023-remove.svg"
                  width={75}
                ></img>
              </div>
              <div className="inside-flex">
                <div className="score">
                  <h4>{marks.wrongAnswer}</h4>
                </div>
                <div className="final">Incorrect Answer</div>
              </div>
            </div>
            <div className="box-inside">
              <div className="ima">
                <img
                  src="https://nationaldefenceinstitute.in/images/quiz/003-banned.svg"
                  width={75}
                ></img>
              </div>
              <div className="inside-flex">
                <div className="score">
                  <h4>{marks.notAttended}</h4>
                </div>
                <div className="final">Not attended</div>
              </div>
            </div>
          </div>
        </Col>
      </Grid>
    ) : <div></div>
  );
};

export default Scorecard;
