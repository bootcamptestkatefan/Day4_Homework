const collection = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
  ];

const getPurchaseCount = require('../printReceipt.js').getPurchaseCount;
it ('get Purchase Count', () => {
    expect(getPurchaseCount(collection)).toEqual(
        [{barcode: "ITEM000001", count: 5},
         {barcode: "ITEM000003", count: 2},
         {barcode: "ITEM000005", count: 3}]);
});