let votes = {
    candidate1: 0,
    candidate2: 0
};

function verifyAge() {
    const ageInput = document.getElementById('ageInput').value;
    const ageError = document.getElementById('ageError');
    const votingSection = document.getElementById('votingSection');
    
    if (ageInput >= 18) {
        ageError.classList.add('hidden');
        document.querySelector('.age-form').classList.add('hidden');
        votingSection.classList.remove('hidden');
    } else {
        ageError.classList.remove('hidden');
    }
}

function castVote(candidate) {
    const confirmation = document.getElementById('confirmation');
    const buttons = document.querySelectorAll('.candidate-card button');
    
    // Disable all buttons after vote
    buttons.forEach(btn => btn.disabled = true);
    
    // Record vote (client-side example)
    votes[candidate]++;
    console.log('Current votes:', votes);
    
    // Show confirmation message
    confirmation.classList.remove('hidden');
    
    // Re-enable buttons after 3 seconds
    setTimeout(() => {
        confirmation.classList.add('hidden');
        buttons.forEach(btn => btn.disabled = false);
    }, 3000);
}