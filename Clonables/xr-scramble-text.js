  // Register the GSAP TextPlugin
  gsap.registerPlugin(TextPlugin);

  class TextScramble {
    constructor(el) {
      this.el = el;
      this.originalText = el.textContent;
      this.words = el.textContent.split(' ');
    }

    scrambleOnce() {
      const scrambledWords = this.words.map((word) => this.scrambleWord(word));
      const scrambledText = scrambledWords.join(' ');

      this.el.textContent = scrambledText;

      this.el.offsetHeight; // Force reflow

      setTimeout(() => {
        gsap.to(this.el, {
          duration: 0.5,
          text: this.originalText,
          ease: "power2.out",
        });
      }, 50);
    }

    scrambleWord(word) {
      const chars = word.split('');
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
      return chars.join('');
    }
  }

  function initScrambleEffect(parentAttr, childAttr) {
    const parents = document.querySelectorAll(`[${parentAttr}]`);
    const independentElements = document.querySelectorAll(`[${childAttr}]`);

    parents.forEach((parent) => {
      const childElements = parent.querySelectorAll(`[${childAttr}]`);
      parent.addEventListener('mouseenter', () => {
        childElements.forEach((el) => {
          const scramble = new TextScramble(el);
          scramble.scrambleOnce();
        });
      });
    });

    independentElements.forEach((el) => {
      if (!el.closest(`[${parentAttr}]`)) {
        el.addEventListener('mouseenter', () => {
          const scramble = new TextScramble(el);
          scramble.scrambleOnce();
        });
      }
    });
  }

  // Initialize with attributes
  initScrambleEffect('xr-scramble-parent', 'xr-scramble-text');
