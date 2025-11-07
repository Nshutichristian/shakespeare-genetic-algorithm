# Shakespeare Genetic Algorithm App

A React + TypeScript application that demonstrates genetic algorithms by evolving random text into Shakespeare quotes.

## Features

- Real-time evolution visualization with color-coded character matching
- Customizable GA parameters (population size, mutation rate, elitism)
- 10 pre-loaded Shakespeare quotes + custom phrase input
- Fitness progress chart with HTML5 Canvas
- Population display showing top individuals
- Responsive design for desktop and mobile

## Quick Start

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

The `vercel.json` configuration file is already included.

### Deploy to Render.com

1. Push your code to GitHub

2. Go to [https://render.com](https://render.com) and sign up

3. Click "New +" → "Static Site"

4. Connect your GitHub repository

5. Render will automatically detect the `render.yaml` configuration

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/repository-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Project Structure

```
shakespeare-ga/
├── public/                  # Static assets
├── src/
│   ├── algorithms/
│   │   └── GeneticAlgorithm.ts    # Core GA implementation
│   ├── components/
│   │   ├── ControlPanel.tsx       # Parameter controls
│   │   ├── FitnessChart.tsx       # Progress visualization
│   │   └── PopulationDisplay.tsx  # Population viewer
│   ├── styles/
│   │   ├── ControlPanel.css
│   │   ├── FitnessChart.css
│   │   └── PopulationDisplay.css
│   ├── types/
│   │   └── Individual.ts          # Individual/Chromosome class
│   ├── App.tsx                    # Main application
│   ├── App.css
│   └── index.tsx
├── vercel.json              # Vercel deployment config
├── render.yaml              # Render.com deployment config
└── package.json

```

## How It Works

The application uses a genetic algorithm with the following components:

1. **Population**: A set of random strings (individuals)
2. **Fitness Function**: Percentage of characters matching the target phrase
3. **Selection**: Tournament selection to choose parents
4. **Crossover**: Single-point crossover to combine parent genes
5. **Mutation**: Random character changes based on mutation rate
6. **Elitism**: Best individuals preserved across generations

## Parameters

- **Population Size** (50-500): Number of individuals per generation
- **Mutation Rate** (0-10%): Probability of random character changes
- **Elitism Count** (0-10): Top individuals preserved unchanged

## Technologies

- React 18 with TypeScript
- HTML5 Canvas for charts
- CSS3 with gradients and animations
- No external dependencies for GA logic

## License

MIT License - Free for educational use
