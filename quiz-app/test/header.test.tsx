import {render, screen} from "@testing-library/react"
import HeaderComponent from "../src/components/Header/Header.component.tsx"


describe("Header component", () => {
    it("should render header components", () => {
        render(<HeaderComponent title="HTML" icon={"htmlSvg"}/>)

        const title = screen.getByText(/HTML/i)
        const icon = screen.getByRole("img", {name: /html/i})
        const toggleInput = screen.getByRole("checkbox")

        expect(title).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(toggleInput).toBeInTheDocument()
    })

    it("should not render selected quiz if there is no title or icon", () => {
            render(<HeaderComponent/>)

            const title = screen.queryByText(/HTML/i)
            const icon = screen.queryByAltText(/html/i)

            expect(title).not.toBeInTheDocument()
            expect(icon).not.toBeInTheDocument()
        }
    )

    it("should render selected quiz if selected title and icon are given", () => {
        render(<HeaderComponent title="HTML" icon={"htmlSvg"}/>)

        const title = screen.getByText(/HTML/i)
        const icon = screen.getByRole("img", {name: /html/i})

        expect(title).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
    })
})