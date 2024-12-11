import "@testing-library/dom"
import {render, screen} from "@testing-library/react"
import HeaderComponent from "../components/Header/Header.component"


describe("", () => {
    it("should render header components", () => {
        render(<HeaderComponent title="HTML" icon={"htmlSvg"}/>)

        const title = screen.getByText(/HTML/i)
        const icon = screen.getByAltText(/html/i)
        const toggleInput = screen.getByTestId(/toggle_theme/i)

        expect(title).toBeDefined()
        expect(icon).toBeDefined()
    })
})