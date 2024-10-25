const fs = require('fs');


function decodeBaseValue(base, value) {
    return parseInt(value, base);
}


function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let j = 0; j < k; j++) {
        let [xj, yj] = points[j];
        let lj = yj;


        for (let m = 0; m < k; m++) {
            if (m !== j) {
                let [xm, _] = points[m];
                lj *= -xm / (xj - xm);
            }
        }

        constantTerm += lj;
    }


    return Math.round(constantTerm);
}


function solvePolynomial(inputData) {
    const { n, k } = inputData.keys;
    const points = [];


    for (const key in inputData) {
        if (key === "keys") continue; 
        const x = parseInt(key);
        const { base, value } = inputData[key]; 
        const y = decodeBaseValue(parseInt(base), value);
        points.push([x, y]); 
    }


    const selectedPoints = points.slice(0, k);
    

    return lagrangeInterpolation(selectedPoints, k);
}


function main() {
    try {

        const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
        const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));

        console.log("Test Case 1 Loaded:", testCase1);
        console.log("Test Case 2 Loaded:", testCase2);


        const secret1 = solvePolynomial(testCase1);
        const secret2 = solvePolynomial(testCase2);


        console.log(`Secret for Test Case 1: ${secret1}`);
        console.log(`Secret for Test Case 2: ${secret2}`);
    } catch (error) {
        console.error("Error reading or processing test cases:", error);
    }
}


main();
