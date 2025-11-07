export interface Individual {
  genes: string;
  fitness: number;
}

export class IndividualClass implements Individual {
  genes: string;
  fitness: number;

  constructor(genes: string, fitness: number = 0) {
    this.genes = genes;
    this.fitness = fitness;
  }

  /**
   * Creates a random individual with the specified length
   * @param length Length of the gene string
   * @param charset Available characters for genes
   */
  static createRandom(length: number, charset: string): IndividualClass {
    let genes = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      genes += charset[randomIndex];
    }
    return new IndividualClass(genes);
  }

  /**
   * Calculates fitness as the percentage of characters that match the target
   * @param target The target string to match
   */
  calculateFitness(target: string): void {
    let matches = 0;
    const length = Math.min(this.genes.length, target.length);

    for (let i = 0; i < length; i++) {
      if (this.genes[i] === target[i]) {
        matches++;
      }
    }

    // Fitness is percentage of matches
    this.fitness = (matches / target.length) * 100;
  }

  /**
   * Creates a mutated copy of this individual
   * @param mutationRate Probability (0-1) that each character will mutate
   * @param charset Available characters for mutation
   */
  mutate(mutationRate: number, charset: string): IndividualClass {
    let mutatedGenes = '';

    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        // Mutate: replace with random character
        const randomIndex = Math.floor(Math.random() * charset.length);
        mutatedGenes += charset[randomIndex];
      } else {
        // Keep original character
        mutatedGenes += this.genes[i];
      }
    }

    return new IndividualClass(mutatedGenes, 0);
  }

  /**
   * Creates a copy of this individual
   */
  clone(): IndividualClass {
    return new IndividualClass(this.genes, this.fitness);
  }
}
