import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "rsuite";
import { v4 } from "uuid";
import { database } from "../appwrite/appwriteConfig";
import datas from "../quiz_questions.json";

const Home = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    const data = await database.listDocuments("630c65ec47acd826cba6");
    console.log("dataaaa", data.documents);
    setQuestions(data.documents);
  };

  useEffect(()=>{
    getQuestions();
  },[])

  return questions.map((data) => {
    return (
      <div className="container" key={"quiz"+v4()}>
        <div className="box">
          <div className="image">
            <Link href={`quiz/question?date=${data.date}`}>
              <div className="image">
                <img src={data["quiz-image"]} />
              </div>
            </Link>
          </div>
          <div className="content">
            <Link href={`quiz/question?date=${data.date}`}>
              <div className="title">
                <h3>{data.title} {data.date}</h3>
              </div>
            </Link>
            <Link href={`/quiz/question?date=${data.date}`}>
              <div className="button">
                <Button>Attend Now</Button>
              </div>
            </Link>
          </div>
        </div>

        <style jsx>{`
        .container{
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
        `}</style>
      </div>
    );
  });
};

export default Home;
