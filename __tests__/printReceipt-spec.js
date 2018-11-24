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

const getPurchaseName = require('../printReceipt.js').getPurchaseName;
it ('get Purchase Name', () => {
    expect(getPurchaseName(collection)).toEqual(
      [ {
          barcode: 'ITEM000001',
          name: 'Sprite',
          unit: 'bottle',
          price: 3.00
        },
        {
          barcode: 'ITEM000003',
          name: 'Litchi',
          unit: 'kg',
          price: 15.00
        },
        {
          barcode: 'ITEM000005',
          name: 'Noodles',
          unit: 'bag',
          price: 4.50
        }]);
});

const getPurchaseProductInfo = require('../printReceipt.js').getPurchaseProductInfo;
it ('get Purchase Product Info', () => {
    expect(getPurchaseProductInfo(collection)).toEqual(
      [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          unit: 'bottle',
          price: 3.00,
          count: 5
        },
        {
          barcode: 'ITEM000003',
          name: 'Litchi',
          unit: 'kg',
          price: 15.00,
          count: 2
        },
        {
          barcode: 'ITEM000005',
          name: 'Noodles',
          unit: 'bag',
          price: 4.50,
          count: 3
        }]);
});

const checkPurchasePromotion = require('../printReceipt.js').checkPurchasePromotion;
it ('check Purchase Promotion', () => {
    expect(checkPurchasePromotion(collection)).toEqual(
      [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          unit: 'bottle',
          price: 3.00,
          count: 4
        },
        {
          barcode: 'ITEM000003',
          name: 'Litchi',
          unit: 'kg',
          price: 15.00,
          count: 2
        },
        {
          barcode: 'ITEM000005',
          name: 'Noodles',
          unit: 'bag',
          price: 4.50,
          count: 2
        }]);
});

const calculatePurchaseSubtotal = require('../printReceipt.js').calculatePurchaseSubtotal;
it ('calculate Purchase Subtotal', () => {
    expect(calculatePurchaseSubtotal(collection)).toEqual(
      [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          unit: 'bottle',
          price: 3.00,
          count: 4,
          subtotal: 12.00
        },
        {
          barcode: 'ITEM000003',
          name: 'Litchi',
          unit: 'kg',
          price: 15.00,
          count: 2,
          subtotal: 30.00
        },
        {
          barcode: 'ITEM000005',
          name: 'Noodles',
          unit: 'bag',
          price: 4.50,
          count: 2,
          subtotal: 9.00
        }]);
});

const calculatePurchaseTotal = require('../printReceipt.js').calculatePurchaseTotal;
it ('calculate Purchase Total', () => {
    expect(calculatePurchaseTotal(collection)).toEqual(51.00);
});

const calculateOriginalTotal = require('../printReceipt.js').calculateOriginalTotal;
it ('calculate Original Total', () => {
    expect(calculateOriginalTotal(collection)).toEqual(58.50);
});

const calculateSaving = require('../printReceipt.js').calculateSaving;
it ('calculate Saving', () => {
    expect(calculateSaving(collection)).toEqual(7.50);
});

const printReceipt = require('../printReceipt.js').printReceipt;
it ('print Receipt', () => {
    expect(printReceipt(collection)).toBe(
    "***<store earning no money>Receipt ***"+"\n"+
    "Name: Sprite, Quantity: 5 bottle, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)"+"\n"+
    "Name: Litchi, Quantity: 2 kg, Unit price: 15.00 (yuan), Subtotal: 30.00 (yuan)"+"\n"+
    "Name: Noodles, Quantity: 3 bag, Unit price: 4.50 (yuan), Subtotal: 9.00 (yuan)"+"\n"+
    "----------------------"+"\n"+
    "Total: 51.00 (yuan)"+"\n"+
    "Saving: 7.50 (yuan)"+"\n"+
    "**********************"
    );
});

