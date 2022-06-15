import { NoiseGenerator } from "./src/NoiseGenerator";

let gen = new NoiseGenerator();
console.log(gen.generate(4, 3));
//console.log(gen.normalizeMatrix([[1,2],[3,4],[-1,5]]));