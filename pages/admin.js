import React from "react";
import { database } from "../appwrite/appwriteConfig";
import questions from "../quiz_questions.json";
function admin() {
  
  questions.map((question) => {
    const promise = database.createDocument(
      "630c65ec47acd826cba6","unique()",{
        "title" : question.title,
        "quiz-image" : question["quiz-image"],
        "date" : question.date
      }
    );  
    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  });
  return(
    <h1>admin</h1>
  ) 
}

export default admin;
