fetch('words.txt')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    
    const words = lines.map(line => {
      const [word, preposition, kasus, meaning, example] = line.split('|').map(part => part.trim());
      return { word, preposition, kasus, meaning, example };
    });

    const wordElement = document.getElementById("word");
    const prepositionElement = document.getElementById("preposition");
    const kasusElement = document.getElementById("kasus");
    const meaningElement = document.getElementById("meaning");
    const exampleElement = document.getElementById("example");
    const wordCountElement = document.getElementById("wordCount");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const totalWords = words.length;

    let currentIndex = 0;

    // Function to display the current word
    function displayWord(index) {
      const wordObj = words[index];
      wordElement.textContent = wordObj.word;
      prepositionElement.textContent = wordObj.preposition;
      kasusElement.textContent = wordObj.kasus;
      meaningElement.textContent = wordObj.meaning;
      exampleElement.textContent = wordObj.example;
      wordCountElement.textContent = `${index + 1}/${totalWords}`; // Update the word count
    }

    // Initial display
    displayWord(currentIndex);

    // Function to go to the next word
    function goToNextWord() {
      currentIndex = (currentIndex + 1) % totalWords;
      displayWord(currentIndex);
    }

    // Function to go to the previous word
    function goToPreviousWord() {
      currentIndex = (currentIndex - 1 + totalWords) % totalWords;
      displayWord(currentIndex);
    }

    // Add click event listeners to the next and previous buttons
    nextButton.addEventListener("click", goToNextWord);
    prevButton.addEventListener("click", goToPreviousWord);

    // Function to handle swipe gesture
    function handleSwipe() {
      const swipeThreshold = 50; // Adjust this value as needed
      const deltaX = touchEndX - touchStartX;

      if (deltaX > swipeThreshold) {
        goToPreviousWord();
      } else if (deltaX < -swipeThreshold) {
        if (currentIndex === 0) {
          // If at the first word, loop back to the last words
          currentIndex = totalWords - 1;
        } else {
          goToNextWord();
        }
      }
    }

    // Add swipe event listeners
    let touchStartX = 0;
    let touchEndX = 0;

    wordElement.addEventListener("touchstart", function(event) {
      touchStartX = event.changedTouches[0].screenX;
    });

    wordElement.addEventListener("touchend", function(event) {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    });

     // Fetching and displaying words code goes here
    const randomButton = document.getElementById("randomButton");

    randomButton.addEventListener("click", function() {
      const randomIndex = Math.floor(Math.random() * words.length);
      currentIndex = randomIndex;
      displayWord(randomIndex);
    });

    // Fetching and displaying words code goes here
    const wordInput = document.getElementById("wordInput");
    const goToWordButton = document.getElementById("goToWordButton");

    goToWordButton.addEventListener("click", function() {
      const wordNumber = parseInt(wordInput.value);
      if (!isNaN(wordNumber) && wordNumber >= 1 && wordNumber <= words.length) {
        currentIndex = wordNumber - 1;
        displayWord(currentIndex); // Adjust for 0-based index
      } else {
        alert("Please enter a valid word number.");
      }
    });

    // Add click event listener to the word display for testing purposes
    wordElement.addEventListener("click", goToNextWord);
  })
  .catch(error => console.error('Error reading the file:', error));

 
