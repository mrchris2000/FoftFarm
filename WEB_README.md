# FOFT Farm - Web Edition

A modern React-based recreation of the classic FOFT Farm farming simulation game!

## 🎮 About the Game

FOFT Farm is a farming simulation where you manage a farm, raise cows, grow grain, and navigate various random events. Build your agricultural empire while avoiding bankruptcy, disease, and natural disasters!

### Game Features

- **Buy and Sell**: Trade cows and grain at fluctuating market prices
- **Improvements**: Upgrade your dairy and farm to increase production
- **Farm Life**: Hire bulls to breed cows and plant grain for future harvests
- **Random Events**: Face challenges like BSE outbreaks, rat infestations, robberies, and more
- **Economic System**: Dynamic pricing, interest on debt, and maintenance costs

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone this repository or download the files
2. Install dependencies:

```bash
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

The game will open in your browser at `http://localhost:5173`

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment

This React application can be deployed to various hosting platforms:

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Netlify

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Import your repository to Vercel
2. It will auto-detect Vite configuration
3. Deploy!

### Other Static Hosting

Simply upload the contents of the `dist/` folder to any static web hosting service.

## 🎯 How to Play

1. **Starting Out**: You begin with $2,000
2. **Buy Cows**: Purchase cows to produce milk
3. **Upgrade Dairy**: Improve your dairy to increase milk production per cow
4. **Grow Grain**: Plant grain to feed your cows
5. **Upgrade Farm**: Better farms produce more grain
6. **Watch Out**: Random events can help or hurt your farm!
7. **Goal**: Build the biggest, most profitable farm you can!

### Tips

- Keep enough grain to feed your cows (they eat 0.5 tons per cow per turn)
- Upgrade your dairy early for steady milk income
- Watch your debt - high interest rates can spiral out of control
- Don't overcrowd your animals or store too much grain
- Save money for emergencies and random events

## 🎲 Random Events

The game features many random events including:
- 🦠 BSE (Mad Cow Disease) outbreaks
- 🐀 Rats eating grain
- 🥷 Robberies
- 🏦 Bank threats
- 🌪️ Natural disasters
- And more!

## 🛠️ Technologies Used

- React 18
- Vite
- Modern JavaScript (ES6+)
- CSS3 with CSS Grid and Flexbox

## 📝 Original Game

This is a recreation of the classic BASIC game FOFT Farm, originally written in QBasic and later ported to Perl. The web version maintains the core gameplay while adding a modern, user-friendly interface.

## 📜 License

This project is open source and available for anyone to use, modify, and enjoy!

## 🎊 Credits

Original game concept and mechanics from the BASIC versions (FOFT.BAS, FOFT2.BAS, FOFT2A.BAS) and Perl version (foft2a.pl).

Modernized and recreated with React for the web!

---

**Enjoy farming and watch out for those rats! 🐀🌾**
