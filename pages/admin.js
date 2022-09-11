import React from "react";
import { database } from "../appwrite/appwriteConfig";
import questions from "../24001-25000.json";
function admin() {
  // questions.map((question) => {
  //   const promise = database.createDocument(
  //     "631d5e36e6e443458253",
  //     "unique()",
  //     {
  //       id: question.id,
  //       question: question.question,
  //       option: question.option,
  //       answer: question.answer,
  //       quiz_id: question.quiz_id,
  //       description: question.description,
  //     }
  //   );
  //   promise.then(
  //     function (response) {
  //       console.log(response); // Success
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //     }
  //   );
  // });
  return <h1>admin</h1>;
}

export default admin;
