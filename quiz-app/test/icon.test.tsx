import IconComponent from "../src/components/Icon/Icon.component.tsx";
import {render, screen} from "@testing-library/react";

describe("Icon component", () => {
    it("should render icon", () => {
        render(<IconComponent icon={"htmlSvg"} customClassName={"html"}/>)

        const icon = screen.getByRole("img", {name: /html/i});

        expect(icon).toBeInTheDocument();
    })
})