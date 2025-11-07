import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { GeneticAlgorithm, GAConfig } from './algorithms/GeneticAlgorithm';
import { IndividualClass } from './types/Individual';
import ControlPanel from './components/ControlPanel';
import PopulationDisplay from './components/PopulationDisplay';
import FitnessChart, { DataPoint } from './components/FitnessChart';

function App() {
  const [ga, setGa] = useState<GeneticAlgorithm | null>(null);
  const [population, setPopulation] = useState<IndividualClass[]>([]);
  const [generation, setGeneration] = useState(0);
  const [bestEver, setBestEver] = useState<IndividualClass | null>(null);
  const [averageFitness, setAverageFitness] = useState(0);
  const [target, setTarget] = useState('');
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Starts the evolution process
   */
  const startEvolution = (targetPhrase: string, config: GAConfig) => {
    // Create new GA instance
    const newGa = new GeneticAlgorithm(config);
    newGa.initialize(targetPhrase);

    setGa(newGa);
    setTarget(targetPhrase);
    setPopulation(newGa.getPopulation());
    setGeneration(newGa.getGeneration());
    setBestEver(newGa.getBestEver());
    setAverageFitness(newGa.getAverageFitness());
    setChartData([{
      generation: 0,
      bestFitness: newGa.getBest()?.fitness || 0,
      averageFitness: newGa.getAverageFitness()
    }]);
    setIsRunning(true);
    setIsComplete(false);

    // Start evolution loop
    startEvolutionLoop(newGa);
  };

  /**
   * Starts the evolution loop with setInterval
   */
  const startEvolutionLoop = (gaInstance: GeneticAlgorithm) => {
    intervalRef.current = setInterval(() => {
      evolveGeneration(gaInstance);
    }, 50); // Evolve every 50ms for smooth animation
  };

  /**
   * Evolves one generation
   */
  const evolveGeneration = (gaInstance: GeneticAlgorithm) => {
    if (gaInstance.isComplete()) {
      stopEvolution();
      setIsComplete(true);
      return;
    }

    // Evolve one generation
    gaInstance.evolve();

    // Update state
    const newPopulation = gaInstance.getPopulation();
    const newGeneration = gaInstance.getGeneration();
    const newBestEver = gaInstance.getBestEver();
    const newAvgFitness = gaInstance.getAverageFitness();

    setPopulation([...newPopulation]);
    setGeneration(newGeneration);
    setBestEver(newBestEver);
    setAverageFitness(newAvgFitness);

    // Update chart data (sample every 10 generations to avoid too much data)
    if (newGeneration % 10 === 0) {
      setChartData(prev => [...prev, {
        generation: newGeneration,
        bestFitness: newBestEver?.fitness || 0,
        averageFitness: newAvgFitness
      }]);
    }
  };

  /**
   * Stops the evolution process
   */
  const stopEvolution = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  /**
   * Resets everything to initial state
   */
  const resetEvolution = () => {
    stopEvolution();
    setGa(null);
    setPopulation([]);
    setGeneration(0);
    setBestEver(null);
    setAverageFitness(0);
    setTarget('');
    setChartData([]);
    setIsComplete(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Shakespeare Genetic Algorithm</h1>
        <p className="subtitle">Watch random text evolve into Shakespeare quotes using genetic algorithms</p>
      </header>

      <div className="app-container">
        <div className="left-panel">
          <ControlPanel
            onStart={startEvolution}
            onStop={stopEvolution}
            onReset={resetEvolution}
            isRunning={isRunning}
            isComplete={isComplete}
          />

          {chartData.length > 0 && (
            <FitnessChart data={chartData} />
          )}
        </div>

        <div className="right-panel">
          <PopulationDisplay
            population={population}
            target={target}
            generation={generation}
            bestEver={bestEver}
            averageFitness={averageFitness}
            isComplete={isComplete}
          />
        </div>
      </div>

      <footer className="app-footer">
        <p>Built with React & TypeScript | Genetic Algorithm Educational Project</p>
      </footer>
    </div>
  );
}

export default App;
