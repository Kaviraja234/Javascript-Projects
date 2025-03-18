document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const textArea = document.querySelector('.text-area');
    const voiceSelect = document.getElementById('voice-select');
    const rateInput = document.getElementById('rate');
    const volumeInput = document.getElementById('volume');
    const rateValue = document.getElementById('rate-value');
    const volumeValue = document.getElementById('volume-value');
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const resumeBtn = document.querySelector('.resume-btn');
    const stopBtn = document.querySelector('.stop-btn');
    const status = document.querySelector('.status');
    
    // Initialize SpeechSynthesis
    const synth = window.speechSynthesis;
    let voices = [];
    let currentUtterance = null;
    
    // Fetch available voices
    function loadVoices() {
        voices = synth.getVoices();
        
        // Clear select options
        voiceSelect.innerHTML = '';
        
        // Add voices to select dropdown
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name;
            voiceSelect.appendChild(option);
        });
    }
    
    // Chrome loads voices asynchronously
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
    
    // Initial voice loading
    loadVoices();
    
    // Update speed and volume displays
    rateInput.addEventListener('input', () => {
        rateValue.textContent = rateInput.value;
    });
    
    volumeInput.addEventListener('input', () => {
        volumeValue.textContent = volumeInput.value;
    });
    
    // Play button functionality
    playBtn.addEventListener('click', () => {
        // Stop any current speech
        if (synth.speaking) {
            synth.cancel();
        }
        
        const text = textArea.value.trim();
        
        if (text !== '') {
            // Create new utterance
            currentUtterance = new SpeechSynthesisUtterance(text);
            
            // Set selected voice
            const selectedVoice = voiceSelect.value;
            const voice = voices.find(v => v.name === selectedVoice);
            if (voice) {
                currentUtterance.voice = voice;
            }
            
            // Set rate and volume
            currentUtterance.rate = parseFloat(rateInput.value);
            currentUtterance.volume = parseFloat(volumeInput.value);
            
            // Event handlers for speech
            currentUtterance.onstart = () => {
                updateStatus('speaking');
                updateButtons('speaking');
            };
            
            currentUtterance.onpause = () => {
                updateStatus('paused');
                updateButtons('paused');
            };
            
            currentUtterance.onresume = () => {
                updateStatus('speaking');
                updateButtons('speaking');
            };
            
            currentUtterance.onend = () => {
                updateStatus('idle');
                updateButtons('idle');
            };
            
            currentUtterance.onerror = (event) => {
                console.error('SpeechSynthesis error:', event);
                updateStatus('idle');
                updateButtons('idle');
            };
            
            // Speak the text
            synth.speak(currentUtterance);
        } else {
            alert('Please enter some text to convert to speech!');
        }
    });
    
    // Pause button functionality
    pauseBtn.addEventListener('click', () => {
        if (synth.speaking && !synth.paused) {
            synth.pause();
        }
    });
    
    // Resume button functionality
    resumeBtn.addEventListener('click', () => {
        if (synth.speaking && synth.paused) {
            synth.resume();
        }
    });
    
    // Stop button functionality
    stopBtn.addEventListener('click', () => {
        if (synth.speaking) {
            synth.cancel();
            updateStatus('idle');
            updateButtons('idle');
        }
    });
    
    // Update status display
    function updateStatus(newStatus) {
        status.className = 'status';
        status.classList.add(newStatus);
        
        switch (newStatus) {
            case 'speaking':
                status.textContent = 'Speaking...';
                break;
            case 'paused':
                status.textContent = 'Paused';
                break;
            case 'idle':
                status.textContent = 'Ready';
                break;
            default:
                status.textContent = 'Ready';
        }
    }
    
    // Update button visibility
    function updateButtons(state) {
        switch (state) {
            case 'speaking':
                playBtn.classList.add('hidden');
                resumeBtn.classList.add('hidden');
                pauseBtn.classList.remove('hidden');
                stopBtn.classList.remove('hidden');
                break;
            case 'paused':
                playBtn.classList.add('hidden');
                pauseBtn.classList.add('hidden');
                resumeBtn.classList.remove('hidden');
                stopBtn.classList.remove('hidden');
                break;
            case 'idle':
                playBtn.classList.remove('hidden');
                pauseBtn.classList.add('hidden');
                resumeBtn.classList.add('hidden');
                stopBtn.classList.add('hidden');
                break;
            default:
                playBtn.classList.remove('hidden');
                pauseBtn.classList.add('hidden');
                resumeBtn.classList.add('hidden');
                stopBtn.classList.add('hidden');
        }
    }
});