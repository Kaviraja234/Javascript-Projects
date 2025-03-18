document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const errorMessage = document.getElementById('error-message');
    const resultContainer = document.getElementById('result-container');
    const wordElement = document.getElementById('word');
    const phoneticElement = document.getElementById('phonetic');
    const pronunciationBtn = document.getElementById('pronunciation-btn');
    const wordMeaningsElement = document.getElementById('word-meanings');
    const synonymsContainer = document.getElementById('synonyms-container');
    const synonymsList = document.getElementById('synonyms-list');
    const sourceContainer = document.getElementById('source-container');
    const sourceLink = document.getElementById('source-link');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    
    // Audio object for pronunciation
    let audio = null;

    // Load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem('dictionarySearchHistory')) || [];
    renderSearchHistory();

    // Event listeners
    searchBtn.addEventListener('click', searchWord);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchWord();
        }
    });
    
    clearHistoryBtn.addEventListener('click', clearHistory);
    pronunciationBtn.addEventListener('click', playPronunciation);

    // Search for a word
    function searchWord() {
        const word = searchInput.value.trim().toLowerCase();
        
        if (!word) {
            showError('Please enter a word to search');
            return;
        }
        
        // Show loading state
        wordMeaningsElement.innerHTML = '<p>Loading...</p>';
        errorMessage.style.display = 'none';
        resultContainer.style.display = 'block';
        
        fetchWordData(word);
    }

    // Fetch word data from API
    async function fetchWordData(word) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Word not found');
            }
            
            const data = await response.json();
            displayResults(data);
            
            // Add to search history
            addToHistory(word);
            
        } catch (error) {
            showError(error.message || 'An error occurred. Please try again.');
            resultContainer.style.display = 'none';
        }
    }

    // Display dictionary results
    function displayResults(data) {
        if (!data || data.length === 0) {
            showError('No results found');
            return;
        }
        
        const wordData = data[0];
        
        // Display word and phonetic
        wordElement.textContent = wordData.word;
        phoneticElement.textContent = wordData.phonetic || '';
        
        // Handle pronunciation
        let audioUrl = '';
        if (wordData.phonetics) {
            for (const phonetic of wordData.phonetics) {
                if (phonetic.audio) {
                    audioUrl = phonetic.audio;
                    break;
                }
            }
        }
        
        if (audioUrl) {
            audio = new Audio(audioUrl);
            pronunciationBtn.style.display = 'block';
        } else {
            pronunciationBtn.style.display = 'none';
        }
        
        // Display meanings
        wordMeaningsElement.innerHTML = '';
        let allSynonyms = [];
        
        wordData.meanings.forEach(meaning => {
            // Part of speech
            const partOfSpeechElement = document.createElement('div');
            partOfSpeechElement.className = 'part-of-speech';
            partOfSpeechElement.textContent = meaning.partOfSpeech;
            wordMeaningsElement.appendChild(partOfSpeechElement);
            
            // Definitions
            meaning.definitions.forEach(def => {
                const definitionElement = document.createElement('div');
                definitionElement.className = 'definition';
                
                const definitionText = document.createElement('p');
                definitionText.textContent = def.definition;
                definitionElement.appendChild(definitionText);
                
                // Example if available
                if (def.example) {
                    const exampleElement = document.createElement('p');
                    exampleElement.className = 'example';
                    exampleElement.textContent = `"${def.example}"`;
                    definitionElement.appendChild(exampleElement);
                }
                
                wordMeaningsElement.appendChild(definitionElement);
            });
            
            // Collect synonyms
            if (meaning.synonyms && meaning.synonyms.length > 0) {
                allSynonyms = [...allSynonyms, ...meaning.synonyms];
            }
        });
        
        // Display synonyms
        if (allSynonyms.length > 0) {
            synonymsContainer.style.display = 'block';
            synonymsList.innerHTML = '';
            
            // Remove duplicates
            const uniqueSynonyms = [...new Set(allSynonyms)];
            
            uniqueSynonyms.slice(0, 10).forEach(synonym => {
                const synonymElement = document.createElement('span');
                synonymElement.className = 'synonym';
                synonymElement.textContent = synonym;
                synonymElement.addEventListener('click', () => {
                    searchInput.value = synonym;
                    searchWord();
                });
                synonymsList.appendChild(synonymElement);
            });
        } else {
            synonymsContainer.style.display = 'none';
        }
        
        // Source URL
        if (wordData.sourceUrls && wordData.sourceUrls.length > 0) {
            sourceContainer.style.display = 'block';
            sourceLink.textContent = wordData.sourceUrls[0];
            sourceLink.href = wordData.sourceUrls[0];
        } else {
            sourceContainer.style.display = 'none';
        }
        
        // Show results
        resultContainer.style.display = 'block';
    }

    // Play pronunciation audio
    function playPronunciation() {
        if (audio) {
            audio.play();
        }
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Add word to search history
    function addToHistory(word) {
        // Remove if already exists
        const index = searchHistory.indexOf(word);
        if (index !== -1) {
            searchHistory.splice(index, 1);
        }
        
        // Add to beginning of array
        searchHistory.unshift(word);
        
        // Keep only the last 10 searches
        if (searchHistory.length > 10) {
            searchHistory = searchHistory.slice(0, 10);
        }
        
        // Save to localStorage
        localStorage.setItem('dictionarySearchHistory', JSON.stringify(searchHistory));
        
        // Update history list
        renderSearchHistory();
    }

    // Render search history list
    function renderSearchHistory() {
        historyList.innerHTML = '';
        
        searchHistory.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            li.addEventListener('click', () => {
                searchInput.value = word;
                searchWord();
            });
            historyList.innerHTML += li.outerHTML;
        });
        
        // Add click event to history items
        document.querySelectorAll('#history-list li').forEach(item => {
            item.addEventListener('click', function() {
                searchInput.value = this.textContent;
                searchWord();
            });
        });
        
        // Show/hide clear button
        clearHistoryBtn.style.display = searchHistory.length > 0 ? 'block' : 'none';
    }

    // Clear search history
    function clearHistory() {
        searchHistory = [];
        localStorage.removeItem('dictionarySearchHistory');
        renderSearchHistory();
    }
});