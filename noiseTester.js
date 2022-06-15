"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NoiseGenerator_1 = require("./src/NoiseGenerator");
let gen = new NoiseGenerator_1.NoiseGenerator();
console.log(gen.generate(4, 3));
//console.log(gen.normalizeMatrix([[1,2],[3,4],[-1,5]]));
