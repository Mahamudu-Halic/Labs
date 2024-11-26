import data from "../../data.json";

type Questions = {
    question: string;
    options: string[];
    answer: string;
}

type Data = {
    title: string;
    icon: string;
    questions: Questions[]
}

const fetchData = (req: string): { status: string, data?: Data, message?: string } => {
    try {
        const hasNumber: boolean = /\d/.test(req);
        const hasSymbol: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(req);

        if (hasNumber || hasSymbol) {
            return {
                status: "failed",
                message: "request cannot contain number or symbol",
            };
        }

        const question: Data | undefined = data.quizzes.find(
            (question: Data) => question.title.toLowerCase() === req.toLowerCase()
        );

        if (!question) {
            return {status: "failed", message: "Question not found"};
        }

        return {status: "success", data: question};
    } catch (e) {
        console.error(e);
        return {status: "failed", message: "oops, something went wrong"};
    }
};

export default fetchData;
