const Header = ({title, description, reset}: { title: string, description: string, reset?: () => void }) => {
    return (
        <header>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

            <button onClick={reset}>Reset</button>
        </header>
    )
}

export default Header