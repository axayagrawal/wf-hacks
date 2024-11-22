
  // Register the GSAP TextPlugin
  gsap.registerPlugin(TextPlugin);

  class TextScramble {
    constructor(el) {
      this.el = el;
      this.originalText = el.textContent; // Store the original text
      this.words = el.textContent.split(' '); // Split text into words
    }

    scrambleOnce() {
      // Scramble the words
      const scrambledWords = this.words.map((word) => this.scrambleWord(word));
      const scrambledText = scrambledWords.join(' ');

      // Set the scrambled text instantly using textContent
      this.el.textContent = scrambledText;

      // Force reflow to ensure the scrambled text is displayed
      this.el.offsetHeight; // Accessing this property forces reflow

      // Add a small delay before animating the text back to the original
      setTimeout(() => {
        // Animate back to the original text using GSAP
        gsap.to(this.el, {
          duration: 0.5, // Duration of the animation
          text: this.originalText, // Animate to the original text
          ease: "power2.out", // Smooth easing for the transition
        });
      }, 50); // Short delay before the animation starts
    }

    scrambleWord(word) {
      const chars = word.split(''); // Split the word into characters

      // Shuffle the characters
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }

      return chars.join(''); // Return scrambled word
    }
  }

  // Initialize the scramble effect for both parent-child and independent elements
  function initScrambleEffect(parentAttr, childAttr) {
    const parents = document.querySelectorAll(`[${parentAttr}]`);
    const independentElements = document.querySelectorAll(`[${childAttr}]`);

    // Parent-Child Case
    parents.forEach((parent) => {
      const childElements = parent.querySelectorAll(`[${childAttr}]`);

      parent.addEventListener('mouseenter', () => {
        childElements.forEach((el) => {
          const scramble = new TextScramble(el);
          scramble.scrambleOnce();
        });
      });
    });

    // Independent Elements Case
    independentElements.forEach((el) => {
      if (!el.closest(`[${parentAttr}]`)) {
        el.addEventListener('mouseenter', () => {
          const scramble = new TextScramble(el);
          scramble.scrambleOnce();
        });
      }
    });
  }

  // Call the function with the custom attribute names
  initScrambleEffect('data-parent', 'data-scramble');

