import { IndividualClass } from '../types/Individual';

export interface GAConfig {
  populationSize: number;
  mutationRate: number;
  crossoverRate: number;
  elitismCount: number;
  tournamentSize: number;
  charset: string;
}

export class GeneticAlgorithm {
  private config: GAConfig;
  private population: IndividualClass[];
  private generation: number;
  private target: string;
  private bestEver: IndividualClass | null;

  constructor(config: GAConfig) {
    this.config = config;
    this.population = [];
    this.generation = 0;
    this.target = '';
    this.bestEver = null;
  }

  /**
   * Initializes the population with random individuals
   * @param target The target string to evolve towards
   */
  initialize(target: string): void {
    this.target = target;
    this.generation = 0;
    this.population = [];
    this.bestEver = null;

    // Create initial random population
    for (let i = 0; i < this.config.populationSize; i++) {
      const individual = IndividualClass.createRandom(target.length, this.config.charset);
      individual.calculateFitness(target);
      this.population.push(individual);
    }

    // Sort by fitness
    this.population.sort((a, b) => b.fitness - a.fitness);
    this.bestEver = this.population[0].clone();
  }

  /**
   * Performs one generation of evolution
   */
  evolve(): void {
    // Calculate fitness for all individuals
    this.population.forEach(individual => {
      individual.calculateFitness(this.target);
    });

    // Sort population by fitness (best first)
    this.population.sort((a, b) => b.fitness - a.fitness);

    // Update best ever
    if (!this.bestEver || this.population[0].fitness > this.bestEver.fitness) {
      this.bestEver = this.population[0].clone();
    }

    // Create new population
    const newPopulation: IndividualClass[] = [];

    // Elitism: keep top individuals
    for (let i = 0; i < this.config.elitismCount && i < this.population.length; i++) {
      newPopulation.push(this.population[i].clone());
    }

    // Fill rest of population through selection, crossover, and mutation
    while (newPopulation.length < this.config.populationSize) {
      // Selection
      const parent1 = this.selectParent();
      const parent2 = this.selectParent();

      // Crossover
      let offspring: IndividualClass[];
      if (Math.random() < this.config.crossoverRate) {
        offspring = this.crossover(parent1, parent2);
      } else {
        offspring = [parent1.clone(), parent2.clone()];
      }

      // Mutation
      offspring = offspring.map(child =>
        child.mutate(this.config.mutationRate, this.config.charset)
      );

      // Add to new population
      offspring.forEach(child => {
        if (newPopulation.length < this.config.populationSize) {
          newPopulation.push(child);
        }
      });
    }

    this.population = newPopulation;
    this.generation++;
  }

  /**
   * Tournament selection: pick random individuals and return the fittest
   */
  private selectParent(): IndividualClass {
    let best: IndividualClass | null = null;

    for (let i = 0; i < this.config.tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * this.population.length);
      const contender = this.population[randomIndex];

      if (!best || contender.fitness > best.fitness) {
        best = contender;
      }
    }

    return best!.clone();
  }

  /**
   * Single-point crossover: combine genes from two parents
   */
  private crossover(parent1: IndividualClass, parent2: IndividualClass): IndividualClass[] {
    const length = parent1.genes.length;
    const crossoverPoint = Math.floor(Math.random() * length);

    // Create two children by swapping genes at crossover point
    const child1Genes = parent1.genes.substring(0, crossoverPoint) +
                        parent2.genes.substring(crossoverPoint);
    const child2Genes = parent2.genes.substring(0, crossoverPoint) +
                        parent1.genes.substring(crossoverPoint);

    return [
      new IndividualClass(child1Genes),
      new IndividualClass(child2Genes)
    ];
  }

  /**
   * Checks if the target has been found
   */
  isComplete(): boolean {
    return this.population.length > 0 && this.population[0].fitness >= 100;
  }

  /**
   * Gets the current population
   */
  getPopulation(): IndividualClass[] {
    return this.population;
  }

  /**
   * Gets the current generation number
   */
  getGeneration(): number {
    return this.generation;
  }

  /**
   * Gets the best individual ever found
   */
  getBestEver(): IndividualClass | null {
    return this.bestEver;
  }

  /**
   * Gets the best individual in current population
   */
  getBest(): IndividualClass | null {
    return this.population.length > 0 ? this.population[0] : null;
  }

  /**
   * Calculates average fitness of the population
   */
  getAverageFitness(): number {
    if (this.population.length === 0) return 0;

    const sum = this.population.reduce((acc, ind) => acc + ind.fitness, 0);
    return sum / this.population.length;
  }

  /**
   * Gets the target string
   */
  getTarget(): string {
    return this.target;
  }
}
