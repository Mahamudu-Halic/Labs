import { Data, DataResponse } from "../../types";
import fetchData from "./fetchData";

/**
 * Fetches a quiz from the server and sets it to the session storage,
 * then calls the callback with the fetched quiz data.
 *
 * @param {string | ""} value - The value to fetch the quiz for. If empty,
 * the quiz from the session storage will be used.
 * @param {(value: Data) => void} callback - The callback to call with the
 * fetched quiz data.
 *
 * @returns {boolean} Whether the quiz was successfully fetched and the callback
 * was called.
 */
const getQuiz = ({value, callback}: {value: string | "", callback: (value: Data) => void}) => {
  const quiz = sessionStorage.getItem("quiz");

  const response: DataResponse = fetchData(quiz || value);

  if (response.status === "failed") {
    return;
  }

  sessionStorage.setItem("quiz", quiz || value);

  return (
    response.status === "success" && response?.data && callback(response.data)
  );
};

export default getQuiz