const body = document.querySelector("body")
const toggleInput = document.querySelector("#toggle")
const dropdown = document.querySelector('.custom-dropdown');
const trigger = dropdown.querySelector('.dropdown-trigger');
const options = dropdown.querySelectorAll('.dropdown-option');
const selectedOption = trigger.querySelector("#selected-option")
const searchbar = document.querySelector(".searchbar")
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")
const resultsWrapper = document.querySelector("#results-wrapper")
const errorMessage = document.querySelector("#error-message")
const notFoundWrapper = document.querySelector(".not-found-wrapper")
const fonts = {
    serif: "serif",
    sans: "sans-serif",
    monospace: "monospace"
}

const renderResults = (data) => {
    resultsWrapper.innerHTML = "";


    if (!data.length) {
        notFoundWrapper.style.display = 'flex'
        notFoundWrapper.innerHTML = `
        <img alt="" class="emoji" src="./assets/images/emoji.png">
            <h3 id="not-found-title">${data.title}</h3>
            <p id="not-found-message">${data.message} ${data.resolution}</p>
        `
        return
    }

    data.forEach(item => {
        const wordWrapper = document.createElement("section")
        wordWrapper.className = "wrapper word-result-wrapper"

        const wordContainer = document.createElement("div")
        wordContainer.className = "word-container"

        wordContainer.innerHTML = `
                <h2 class="word">${item.word}</h2>
                <p class="pronunciation">${item.phonetic || ""}</p>
            `

        wordWrapper.appendChild(wordContainer);


        if (item.phonetics.length && item.phonetics[item.phonetics.length - 1].audio) {
            const playBtn = document.createElement("button")
            playBtn.className = "play-btn"
            playBtn.innerHTML = `<img alt="play" src="./assets/images/icon-play.svg">`

            const audio = document.createElement("audio")
            audio.src = item.phonetics[item.phonetics.length - 1].audio;

            playBtn.addEventListener("click", () => {
                audio.play()
            });

            wordWrapper.appendChild(playBtn)
            wordWrapper.appendChild(audio)
        }

        const wordDefinitions = document.createElement("section")
        wordDefinitions.className = "wrapper definitions"

        item.meanings.forEach(meaning => {
            const definitionItem = document.createElement("div")
            definitionItem.className = "definition-item"

            const definitionList = meaning.definitions.map(definition => (
                `
                        <li>${definition.definition}</li>
                        ${definition.example ? `<p class="example">"${definition.example}"</p>` : ""}
                    `
            )).join("")

            const synonyms = meaning.synonyms.length
                ? `<p>Synonyms</p><div class="synonyms"><span>${meaning.synonyms.join(", ")}</span></div>`
                : "";

            definitionItem.innerHTML = `
                        <div class="title">
                            <h3 class="part-of-speech">${meaning.partOfSpeech || ""}</h3>
                            <hr>
                        </div>
                
                        <p class="meaning-paragraph">Meaning</p>
                        <ul class="content">
                            ${definitionList}
                        </ul>
                
                        <div class="synonyms-container">
                            ${synonyms}
                        </div>
                `;

            wordDefinitions.appendChild(definitionItem)
        })


        const source = document.createElement("section")
        source.className = "source wrapper"

        const sourceUrls = item.sourceUrls.map(url => `<a href="${url}"  target="_blank">${url}<img alt="" src="./assets/images/icon-new-window.svg"></a>`).join("")

        source.innerHTML = `
                <p>Source</p>
                <div>
                   ${sourceUrls}
                </div>
            `
        const divider = document.createElement("hr")
        resultsWrapper.appendChild(wordWrapper)
        resultsWrapper.appendChild(wordDefinitions)
        resultsWrapper.appendChild(divider)
        resultsWrapper.appendChild(source)
    })

}

const fetchDefinition = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        return data
    } catch (error) {
        return error;
    }
}

const handleSearch = () => {
    const word = searchInput.value.trim().toLowerCase();

    searchbar.classList.remove("error");
    errorMessage.style.display = "none";
    notFoundWrapper.style.display = "none";
    notFoundWrapper.innerHTML = "";

    if (word) {
        fetchDefinition(word).then(data => renderResults(data));
    } else {
        searchbar.classList.add("error");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Whoops, can’t be empty…";
    }

    searchInput.value = "";
};


// Toggle dropdown open/close
trigger.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

// Handle option selection
options.forEach(option => {
    option.addEventListener('click', () => {
        selectedOption.textContent = option.textContent;

        options.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        const font = option.className.includes("sans") ? fonts.sans : option.className.includes("serif") ? fonts.serif : fonts.monospace
        body.style.fontFamily = font;
        sessionStorage.setItem("font", font)
        sessionStorage.setItem("fontName", option.textContent)

        dropdown.classList.remove('open');
    });
});

toggleInput.addEventListener("click", () => {
    body.classList.toggle("dark")
    toggleInput.checked ? sessionStorage.setItem("theme", "dark") : sessionStorage.setItem("theme", "")
})


// Add click event listener to the button
searchBtn.addEventListener("click", handleSearch);

// Add keydown event listener to the input
searchInput.addEventListener("keydown", (event) => {
    event.key === "Enter" && handleSearch()
});


fetchDefinition("keyboard").then(data => renderResults(data))

window.addEventListener("load", () => {
    const theme = sessionStorage.getItem("theme");
    const font = sessionStorage.getItem("font");
    const fontName = sessionStorage.getItem("fontName");

    theme && body.classList.add(theme);
    toggleInput.checked = !!theme;

    font ? body.style.fontFamily = font : "";
    fontName ? selectedOption.textContent = fontName : "";
})