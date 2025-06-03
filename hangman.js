const words = ["javascript", "python", "kodlama", "hangman"]; // Kelime listesi
const stages = [
    `
    +---+
    |   O 
    |  /|\\
    |  / \\
    ===
    `,
    `
    +---+
    |   O 
    |  /|\\
    |  /
    ===
    `,
    `
    +---+
    |   O 
    |  /|\\
    |  
    ===
    `,
    `
    +---+
    |   O 
    |  /|
    |
    ===
    `,
    `
    +---+
    |   O 
    |
    |
    ===
    `,
    `
    +---+
    |
    |
    |
    ===
    `,
    `
    +---+
    |
    |
    |
    ===
    `
];

let selectedWord = "";
let guessedLetters = "";
let remainingLives = 6;

// Oyunu başlatır ve ekranı günceller
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = "";
    remainingLives = 6;
    document.getElementById("guess-input").disabled = false; // Tahmin girişini aktif yapar
    updateDisplay();
}

// Ekranı günceller ve tahminlerin durumunu gösterir
function updateDisplay() {
    // Kelimeyi tahmin edilen harflere göre göster
    const wordDisplay = selectedWord.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");

    document.getElementById("word-display").textContent = wordDisplay;
    document.getElementById("remaining-lives").textContent = remainingLives;
    document.getElementById("message").textContent = "";

    // Kazanma durumu
    if (wordDisplay.replace(/ /g, "") === selectedWord) {
        document.getElementById("message").textContent = "Kazandınız!";
        document.getElementById("guess-input").disabled = true; // Tahmin girişini pasif yapar
    }
    // Kaybetme durumu
    else if (remainingLives === 0) {
        document.getElementById("message").textContent = `Kaybettiniz! Kelime: ${selectedWord}`;
        document.getElementById("guess-input").disabled = true; // Tahmin girişini pasif yapar
        document.getElementById("hangman-display").style.display="block";
    }
}

// Harf tahmini yapar ve ekranı günceller
function makeGuess() {
    const guess = document.getElementById("guess-input").value.toLowerCase();
    document.getElementById("guess-input").value = ""; // Tahmin kutusunu boşaltır

    if (guess && !guessedLetters.includes(guess)) { // Harf daha önce tahmin edilmediyse
        guessedLetters += guess;

        // Yanlış tahmin durumu
        if (!selectedWord.includes(guess)) {
            remainingLives--;
        }

        updateDisplay(); // Ekranı güncelle
    } else if (!guess) {
        document.getElementById("message").textContent = "Lütfen bir harf girin.";
    } else {
        document.getElementById("message").textContent = "Bu harfi zaten tahmin ettiniz.";
    }
}

// Oyunu yeniden başlatır
function restartGame() {
    startGame();
}

// İlk oyunu başlatır
startGame();
