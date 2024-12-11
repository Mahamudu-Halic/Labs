import "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import HomepageComponent from "../components/Homepage/Homepage.component";
import { Topics } from "../constants";

describe("homepage component", () => {
  const getQuiz = jest.fn();

  it("should render homepage components", () => {
    render(<HomepageComponent getQuiz={getQuiz} />);

    const title = screen.getByText(/welcome/i);
    const subtitle = screen.getByText(/Frontend/i);
    const message = screen.getByText(/pick a subject/i);

    const topics = screen.getAllByRole("button");

    expect(title).toBeDefined();
    expect(subtitle).toBeDefined();
    expect(message).toBeDefined();
    expect(topics).toBeDefined();
    expect(topics).toHaveLength(Topics.length);
  });

  it("should render topic buttons correctly", () => {
    render(<HomepageComponent getQuiz={getQuiz} />);

    Topics.forEach((topic) => {
      const button = screen.getByText(topic.label);
      expect(button).toBeDefined();
    });
  });

  it("should render topic icons correctly", () => {
    render(<HomepageComponent getQuiz={getQuiz} />);

    Topics.forEach((topic) => {
      const icon = screen.getByAltText(topic.icon);
      expect(icon).toBeDefined();
    });
  });

  it("should call getQuiz when a button is clicked", () => {
    render(<HomepageComponent getQuiz={getQuiz} />);

    Topics.forEach((topic, i) => {
      const button = screen.getByText(topic.label);
      button.click();
      expect(getQuiz).toHaveBeenCalledWith(topic.label);
      expect(getQuiz).toHaveBeenCalledTimes(i + 1);
    });
  });
});
