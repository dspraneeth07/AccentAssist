// Enhanced Text-to-Speech utility with male American English voice

export const playCorrectPronunciation = async (text: string): Promise<void> => {
  console.log('Starting male American English pronunciation for:', text);
  
  if (!text || text.trim().length === 0) {
    throw new Error('No text provided for pronunciation');
  }
  
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported in this browser'));
      return;
    }
    
    // Cancel any ongoing speech first
    speechSynthesis.cancel();
    
    // Wait for cancellation to complete
    setTimeout(() => {
      console.log('Creating male American English speech utterance');
      const utterance = new SpeechSynthesisUtterance(text.trim());
      
      // Configure for male American English voice
      utterance.lang = 'en-US';
      utterance.rate = 1.0;    // Original speed as requested
      utterance.pitch = 0.9;   // Slightly lower pitch for male voice
      utterance.volume = 1.0;  // Full volume
      
      // Function to select the best male American voice
      const selectMaleAmericanVoice = () => {
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
        
        // Filter for American English voices
        const americanVoices = voices.filter(voice => 
          voice.lang === 'en-US' || voice.lang.startsWith('en-US')
        );
        
        console.log('American voices found:', americanVoices.map(v => ({
          name: v.name,
          lang: v.lang,
          default: v.default
        })));
        
        // Preferred male voice names (in order of preference)
        const preferredMaleVoices = [
          'Microsoft David Desktop', 'Microsoft David',
          'Google US English Male', 'US English Male',
          'Alex', 'Daniel', 'Fred', 'Ralph', 'Albert',
          'Bruce', 'Junior', 'Kathy', 'Princess', 'Vicki',
          'Victoria', 'Whisper'
        ];
        
        // Look for preferred male voices
        let selectedVoice = null;
        for (const prefName of preferredMaleVoices) {
          selectedVoice = americanVoices.find(voice => 
            voice.name.includes(prefName) || voice.name.toLowerCase().includes(prefName.toLowerCase())
          );
          if (selectedVoice) {
            console.log('Selected preferred male voice:', selectedVoice.name);
            break;
          }
        }
        
        // If no preferred male voice found, look for any male indicators
        if (!selectedVoice) {
          selectedVoice = americanVoices.find(voice => 
            voice.name.toLowerCase().includes('male') || 
            voice.name.toLowerCase().includes('man') ||
            voice.name.toLowerCase().includes('david') ||
            voice.name.toLowerCase().includes('alex') ||
            voice.name.toLowerCase().includes('daniel')
          );
          
          if (selectedVoice) {
            console.log('Selected male voice by keyword:', selectedVoice.name);
          }
        }
        
        // If still no male voice, use first American voice and adjust pitch
        if (!selectedVoice && americanVoices.length > 0) {
          selectedVoice = americanVoices[0];
          utterance.pitch = 0.8; // Lower pitch to sound more male
          console.log('Using first American voice with lower pitch:', selectedVoice.name);
        }
        
        // If no American voice at all, use any English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
          if (selectedVoice) {
            utterance.pitch = 0.8; // Lower pitch for male sound
            console.log('Using English voice with male pitch:', selectedVoice.name);
          }
        }
        
        return selectedVoice;
      };
      
      // Wait for voices to load if needed
      const setupVoice = () => {
        const selectedVoice = selectMaleAmericanVoice();
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log('Voice configured:', selectedVoice.name, selectedVoice.lang);
        } else {
          console.log('No specific voice found, using browser default with male settings');
          utterance.pitch = 0.8; // Ensure male-sounding pitch
        }
      };
      
      // Setup voice immediately if available
      if (speechSynthesis.getVoices().length > 0) {
        setupVoice();
      } else {
        // Wait for voices to load
        speechSynthesis.onvoiceschanged = () => {
          setupVoice();
        };
      }
      
      let hasResolved = false;
      let timeoutId: NodeJS.Timeout;
      
      utterance.onstart = () => {
        console.log('Male American English speech started');
        if (timeoutId) clearTimeout(timeoutId);
        
        // Set timeout based on text length
        const estimatedDuration = text.length * 80 + 3000; // Faster estimate for original speed
        timeoutId = setTimeout(() => {
          if (!hasResolved) {
            console.log('Speech timeout reached');
            hasResolved = true;
            resolve();
          }
        }, estimatedDuration);
      };
      
      utterance.onend = () => {
        console.log('Male American English speech completed');
        if (timeoutId) clearTimeout(timeoutId);
        if (!hasResolved) {
          hasResolved = true;
          resolve();
        }
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        if (timeoutId) clearTimeout(timeoutId);
        if (!hasResolved) {
          hasResolved = true;
          reject(new Error(`Speech synthesis failed: ${event.error}`));
        }
      };
      
      // Start speaking
      try {
        console.log('Starting male American English speech synthesis');
        speechSynthesis.speak(utterance);
        
        // Ultimate fallback timeout
        setTimeout(() => {
          if (!hasResolved) {
            console.log('Final fallback timeout reached');
            hasResolved = true;
            resolve();
          }
        }, text.length * 120 + 5000);
        
      } catch (error) {
        console.error('Failed to start speech synthesis:', error);
        if (!hasResolved) {
          hasResolved = true;
          reject(new Error('Speech synthesis failed to start'));
        }
      }
    }, 200);
  });
};

// Stop any ongoing speech
export const stopSpeech = () => {
  console.log('Stopping all speech synthesis');
  
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
};

// Initialize voices (simplified version)
export const initializeVoices = (): Promise<void> => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        console.log('Voices loaded:', voices.length);
        if (voices.length > 0) {
          resolve();
        } else {
          setTimeout(loadVoices, 100);
        }
      };
      
      if (speechSynthesis.getVoices().length > 0) {
        resolve();
      } else {
        speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
      }
    } else {
      console.log('Speech synthesis not supported');
      resolve();
    }
  });
};
