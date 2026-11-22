```css

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap');

:root {
  /* Background */
  --bg-main: #0C0912;
  --bg-section: #1A1226;
  --bg-card: #292035;

  /* Purple */
  --purple: #693BA0;
  --purple-light: #B77AFF;

  /* Green */
  --toxic: #A3FF12;
  --goblin: #5B9F35;

  /* Text */
  --text: #E9E0D0;
  --muted: #9B91A8;

  /* Fonts */
  --font-heading: 'Press Start 2P', monospace;
  --font-body: 'VT323', monospace;
  --font-ui: 'Silkscreen', monospace;

  /* Effects */
  --glow-green: 0 0 15px #A3FF1266;
  --glow-purple: 0 0 15px #B77AFF55;

  --border: 3px solid var(--purple);
}

/* GLOBAL */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg-main);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 22px;
}

/* HEADINGS */

h1, h2, h3 {
  font-family: var(--font-heading);
  line-height: 1.8;
  color: var(--toxic);
}

/* NAVIGATION */

.navbar {
  background: var(--bg-section);
  border-bottom: 3px solid var(--purple);
  padding: 20px 6%;
}

/* HERO */

.hero {
  min-height: 75vh;
  background:
    radial-gradient(
      ellipse at center,
      #321B4A 0%,
      #1A1226 45%,
      #0C0912 100%
    );
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
}

/* CARDS */

.card {
  background: var(--bg-card);
  border: var(--border);
  padding: 24px;
  box-shadow: 6px 6px 0 #07050B;
  transition: 0.2s ease;
}

.card:hover {
  border-color: var(--toxic);
  transform: translateY(-5px);
  box-shadow: var(--glow-green);
}

/* BUTTONS */

.button {
  background: var(--toxic);
  color: var(--bg-main);
  border: 3px solid var(--toxic);
  padding: 16px 24px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: 0.2s;
}

.button:hover {
  background: var(--purple-light);
  border-color: var(--purple-light);
  box-shadow: var(--glow-purple);
}

/* FOOTER */

footer {
  background: var(--bg-section);
  border-top: 3px solid var(--purple);
  padding: 40px;
  text-align: center;
  color: var(--muted);
}
```