const textEl = document.querySelector('#quote-text'),
      authorEl = document.querySelector('#quote-author'),
      quoteBtn = document.querySelector('#quote-btn'),
      twitBtn = document.querySelector('#twitter-btn'),
      twitLink = document.querySelector('#twit-link')
      bgEl = document.querySelector('#main');

const errMessage = {
    content: "Sorry, it seems today you have to live without quotes :(",
    author: 'Quote Machine'
}


const getQuote = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    //console.log(response);
    if (!data.content) {
        
        setQuote(errMessage, textEl, authorEl);
    }
    return data
}

const setFirstQuote = async () => {

    setTimeout(() => {
        textEl.style.color = 'white';
        authorEl.style.color = 'white';
    }, 0)

    const data = await getQuote();

    upgrade(data);

    if (!data.content){
        setQuote(errMessage, textEl, authorEl);
    }
}

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

const getRandomIndex = (arr, oldNum = 0) => {
    let newNum = Math.floor(Math.random() * arr.length);
    
    if (newNum == oldNum) {
        do {
            newNum = getRandomIndex(arr);
        } while (newNum == oldNum)
    }
    
    return newNum 
};

const setQuote = ({content, author}, textEl, authorEl) => {

    textEl.textContent = content;
    authorEl.textContent = `- ${author}`;

    if (!content){
        setQuote(errMessage, textEl, authorEl);
    }
}

const setColor = (arr, index, textArr, elemArr) => {
    const color = arr[index];

    textArr.forEach(elem => {
        elem.style.color = color;
    });

    elemArr.forEach(elem => {
        elem.style.backgroundColor = color;
    });
}

const upgrade = data => {
    setQuote(data, textEl, authorEl);
    setColor(colors, randomColorIndex, [textEl, authorEl], [bgEl, quoteBtn, twitBtn]);
}

let randomColorIndex = getRandomIndex(colors);

setFirstQuote();


quoteBtn.addEventListener('click', async () => {

    textEl.style.color = 'white';
    authorEl.style.color = 'white';

    const data = await getQuote();

    let newRandomCIndex = getRandomIndex(colors, randomColorIndex);

    randomColorIndex = newRandomCIndex;
    
    setTimeout(() => upgrade(data), 700);
});

twitBtn.addEventListener('click', () => {
    const {text, author} = quotes[randomQuoteIndex];
    twitLink.setAttribute('href', `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${
        encodeURIComponent('"' + text + '" ' + author)
    }`);
});