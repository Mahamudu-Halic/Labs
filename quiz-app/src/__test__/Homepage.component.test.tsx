import { render, screen } from "@testing-library/react"; // Import screen here
import HomepageComponent from "../components/Homepage/Homepage.component.tsx";
import "@testing-library/jest-dom"; // For jest-dom matchers

describe("Homepage Component", () => {
    const getQuiz = jest.fn();

    it("should render homepage component with message and topics", () => {
        render(<HomepageComponent getQuiz={getQuiz} />);

        // Querying elements from the rendered component
        const title = screen.getByText(/Welcome/i);
        const subtitle = screen.getByText(/Frontend/i);
        const message = screen.getByText(/Pick a subject/i);
        const topics = screen.getAllByRole("button"); // Get all button elements

        // Asserting the elements are in the document
        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(topics.length).toBe(5); // Adjust the number of topics if necessary
    });
});
