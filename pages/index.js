import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, ButtonGroup } from "rsuite";
import { v4 } from "uuid";
import { database } from "../appwrite/appwriteConfig";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 25;
  const offset = limit * page;

  const getQuestions = async () => {
    // const data = await database.listDocuments("6319a1b1021a0c2aa7ce");
    const data = await database.listDocuments(
      "6319a1b1021a0c2aa7ce",
      [],
      limit,
      offset
    );
    console.log("dataaaa", data.documents);
    setQuestions(data.documents);
  };

  useEffect(() => {
    getQuestions();
  }, [page]);

  return (
    <div className="container">
      {questions.map((data) => {
        return (
          <div className="container" key={"quiz" + v4()}>
            <div className="box">
              <div className="image">
                <Link href={`quiz/${data.slug}`}>
                  <div className="image">
                    <img src={data["image"]} />
                  </div>
                </Link>
              </div>
              <div className="content">
                <Link href={`quiz/question?date=${data.slug}`}>
                  <div className="title">
                    <h3>{data.title}</h3>
                  </div>
                </Link>
                <Link href={`/quiz/question?date=${data.slug}`}>
                  <div className="button">
                    <Button>Attend Now</Button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div className="button_1">
        <Button onClick={() => setPage(page - 1)}>Previous Page</Button>
        <Button disabled style={{ color:"black" }}>
          Current Page No: {page}
        </Button>
        <Button onClick={() => setPage(page + 1)}>Next Page</Button>
      </div>
      <style jsx>{`
        .container {
          margin-top: 20px;
        }
        .box {
          display: flex;
          margin: 0 auto;
          min-height: 150px;
          width: 70%;
        }
        .image {
          padding: 0 20px;
        }
        .content {
          padding: 0 20px;
        }

        .button_1 {
          display: flex;
          justify-content: space-evenly;
          margin: 25px 0;
        }
      `}</style>
    </div>
  );
};

export default Home;
