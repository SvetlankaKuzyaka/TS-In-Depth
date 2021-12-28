/// <reference path="utility-functions.ts" />
var result1 = Utility.maxBooksAllowed(21);
console.log(result1);
var util = Utility.Fees;
// const result2 = Utility.Fees.calculateLateFee(95);
var result2 = util.calculateLateFee(95);
console.log(result2);
