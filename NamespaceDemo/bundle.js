var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function calculateLateFee(daysLate) {
            return daysLate * 0.25;
        }
        Fees.calculateLateFee = calculateLateFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function maxBooksAllowed(age) {
        return age < 12 ? 3 : 10;
    }
    Utility.maxBooksAllowed = maxBooksAllowed;
    function privateFunc() {
        console.log('This is private function');
    }
})(Utility || (Utility = {}));
/// <reference path="utility-functions.ts" />
var result1 = Utility.maxBooksAllowed(21);
console.log(result1);
var util = Utility.Fees;
// const result2 = Utility.Fees.calculateLateFee(95);
var result2 = util.calculateLateFee(95);
console.log(result2);
