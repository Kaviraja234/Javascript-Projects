document.addEventListener('DOMContentLoaded', () => {
    const jocks = [
        "Crushing reps like a madman!",
        "Squat day = leg day = gain day!",
        "Muscle confusion is my strategy!",
        "Protein pancakes for the win!",
        "DOMS? More like DOM-inance!",
        "I measure my life in PBs!",
        "Gym hair? Don't care!",
        "If it's not heavy, why bother?",
        "Rest days are for the weak!",
        "I don't stop until I'm swole!",
        "Weights first, shower later!",
        "Bro science works for me!",
        "My heart rate is always elevated!",
        "I lift, therefore I am!",
        "Gym tan laundry - the holy trinity!",
        "Sweat equity is my currency!",
        "Mirror selfies are progress pics!",
        "I'm not addicted to lifting... maybe.",
        "Why run when you can lift?",
        "My motto: Eat, sleep, lift, repeat!"
    ];

    let autoGenerateInterval;

    function generateJock() {
        const randomIndex = Math.floor(Math.random() * jocks.length);
        const jockElement = document.getElementById('jockText');
        jockElement.style.transform = 'scale(1.1)';
        setTimeout(() => jockElement.style.transform = 'scale(1)', 200);
        jockElement.textContent = jocks[randomIndex];
    }

    // Initial generation
    generateJock();

    // Auto-generate every 5 seconds
    autoGenerateInterval = setInterval(generateJock, 5000);

    // Manual generation with button
    document.getElementById('generateBtn').addEventListener('click', () => {
        clearInterval(autoGenerateInterval);
        generateJock();
        autoGenerateInterval = setInterval(generateJock, 5000);
    });
});