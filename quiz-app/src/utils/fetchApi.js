import data from "../../data.json";
const fetchApi = (req) => {
  try {
    const hasNumber = /\d/.test(req);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(req);

    if (hasNumber || hasSymbol) {
      return {
        status: "failed",
        message: "request cannot contain number or symbol",
      };
    }

    const question = data.quizzes.find(
      (question) => question.title.toLowerCase() === req.toLowerCase()
    );

    if (!question) {
      return { status: "failed", message: "Question not found" };
    }

    return { status: "success", data: question };
  } catch (e) {
    console.error(e);
    return { status: "failed", message: e.message };
  }
};

export default fetchApi;
