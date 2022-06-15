"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoiseGenerator = void 0;
class NoiseGenerator {
    constructor() { }
    getUnitVector(angle) {
        return [Math.cos(angle), Math.sin(angle)];
    }
    filledGrid(res) {
        let grid = [];
        let row = [];
        let randAngle;
        for (let i = 0; i < res; i++) {
            for (let j = 0; j < res; j++) {
                randAngle = Math.random() * 2 * Math.PI;
                row.push(this.getUnitVector(randAngle));
            }
            grid.push(row);
            row = [];
        }
        return grid;
    }
    min(mat) {
        let min = mat[0][0];
        mat.forEach((row) => {
            row.forEach((elem) => {
                if (elem < min) {
                    min = elem;
                }
            });
        });
        return min;
    }
    max(mat) {
        let max = mat[0][0];
        mat.forEach((row) => {
            row.forEach((elem) => {
                if (elem > max) {
                    max = elem;
                }
            });
        });
        return max;
    }
    normalizeMatrix(mat) {
        let normalizedMatrix = [];
        const min = this.min(mat);
        const max = this.max(mat);
        mat.forEach((row) => {
            normalizedMatrix.push(row.map((elem) => {
                return ((elem - min) / (max - min));
            }));
        });
        return normalizedMatrix;
    }
    /**
     *
     * @param scale Number of grid points on a single axis
     * @param detail Width of square array in each grid square
     */
    generate(scale, detail) {
        let grid = this.filledGrid(scale);
        let nSquares = scale - 1;
        let imgWidth = nSquares * detail;
        let img = [];
        for (let tinyRow = 0; tinyRow < imgWidth; tinyRow++) {
            let row = [];
            for (let tinyCol = 0; tinyCol < imgWidth; tinyCol++) {
                const COMOffset = 1 / detail / 2;
                const pos = [COMOffset + (tinyCol * 1 / detail), -(COMOffset + (tinyRow * 1 / detail))];
                const c0 = [...grid[Math.floor(tinyRow / detail)][Math.floor(tinyCol / detail)], 0, 0];
                const c1 = [...grid[Math.floor(tinyRow / detail)][Math.floor(tinyCol / detail) + 1], 1, 0];
                const c2 = [...grid[Math.floor(tinyRow / detail) + 1][Math.floor(tinyCol / detail)], 0, -1];
                const c3 = [...grid[Math.floor(tinyRow / detail) + 1][Math.floor(tinyCol / detail) + 1], 1, -1];
                const corners = [c0, c1, c2, c3];
                let sum = 0;
                corners.forEach((corner) => {
                    const offsetVector = [pos[0] - corner[2], pos[1] - corner[3]];
                    sum += offsetVector[0] * corner[0] + offsetVector[1] * corner[1];
                });
                row.push(sum);
            }
            img.push(row);
        }
        const normalizedMatrix = this.normalizeMatrix(img);
        return normalizedMatrix;
    }
}
exports.NoiseGenerator = NoiseGenerator;
