/// <reference path="utility-functions.ts" />

const result1 = Utility.maxBooksAllowed(21);
console.log(result1);

import util = Utility.Fees;

// const result2 = Utility.Fees.calculateLateFee(95);
const result2 = util.calculateLateFee(95);
console.log(result2);

