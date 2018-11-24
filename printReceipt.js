function loadAllItems() {
    return [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'kg',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'kg',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: 'Battery',
        unit: 'box',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: 'Noodles',
        unit: 'bag',
        price: 4.50
      }
    ];
  }

  function loadPromotions() {
    return [
      {
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
          'ITEM000000',
          'ITEM000001',
          'ITEM000005'
        ]
      }
    ];
  }

function getPurchaseCount(inputBarcode){
    var rePhaseBarcode = [];

    rePhaseBarcode=inputBarcode.map(item=> item.split("-"))
//   return rePhaseBarcode;
/*[["ITEM000001"],
   ["ITEM000001"],
   ["ITEM000001"],
   ["ITEM000001"],
   ["ITEM000001"],
   ["ITEM000003","2"],
   ["ITEM000005"],
   ["ITEM000005"],
   ["ITEM000005"],
 ]
*/
    var notFinishedPurchaseCount = [];
    for (var i=0 ; i < rePhaseBarcode.length ; i++){
        var barcodeID = rePhaseBarcode[i][0];
        var count = rePhaseBarcode[i][1];
        if (rePhaseBarcode[i][1]==null){
            count=1;
        }
        if(notFinishedPurchaseCount[barcodeID]){
            notFinishedPurchaseCount[barcodeID] +=1;
        }
        else{
            notFinishedPurchaseCount[barcodeID] = 0+parseInt(count);
        }
    }
    var purchaseCount = [];
    for (var barcodeID in notFinishedPurchaseCount){
        purchaseCount.push({barcode: barcodeID, count: notFinishedPurchaseCount[barcodeID]})
    }
    return purchaseCount;
}

/*
[{barcode: ITEM000001, count: 5},
 {barcode: ITEM000003, count: 2},
 {barcode: ITEM000005, count: 3}]
*/

function getPurchaseName(inputBarcode){
    let originItemsList = loadAllItems();
    let purchaseNameList = [];
    let previousPurchaseCount = getPurchaseCount(inputBarcode);
  

    purchaseNameList = originItemsList.filter(originItem => previousPurchaseCount.find(item=> item.barcode == originItem.barcode))//      find(item=> item.barcode )     )
    return purchaseNameList;
}

/*
[
    {
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
    }
  ]
*/

function getPurchaseProductInfo(inputBarcode){
    getPurchaseNameResult = getPurchaseName(inputBarcode);
    purchaseProductInfo = [];
    getPurchaseCountResult = getPurchaseCount(inputBarcode);
    purchaseProductInfo = getPurchaseNameResult.map(getPurchaseNameResultItem => {
      var count = getPurchaseCountResult.filter(item => item.barcode == getPurchaseNameResultItem.barcode)[0].count;
      return {
        barcode: getPurchaseNameResultItem.barcode,
        name: getPurchaseNameResultItem.name,
        unit: getPurchaseNameResultItem.unit,
        price: getPurchaseNameResultItem.price,
        count
      }
    });
    return purchaseProductInfo;
}
/*[
    {
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
      price: 15.00
      count: 2
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
      count: 3
    }
  ]
*/

function checkPurchasePromotion (inputBarcode){
  promotionList = loadPromotions();
  getPurchaseProductInfoResult = getPurchaseProductInfo(inputBarcode);

  purchasePromotionList = getPurchaseProductInfoResult.map(item => {
    if (promotionList[0].barcodes.includes(item.barcode)) {
      item.count = item.count - Math.floor(item.count/3);
    }
    return item;
  });
  return purchasePromotionList;
}

/*[
    {
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
      price: 15.00
      count: 2
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
      count: 2
    }
  ]
*/

function calculatePurchaseSubtotal(inputBarcode){
  checkPurchasePromotionItem = checkPurchasePromotion(inputBarcode)
  purchaseSubtotalList = checkPurchasePromotionItem.map(item => {
    return {
      barcode: item.barcode,
      name: item.name,
      unit: item.unit,
      price: item.price,
      count: item.count,
      subtotal: item.count*item.price
    }
  });
  return purchaseSubtotalList;
}

/*[
    {
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
      price: 15.00
      count: 2,
      subtotal: 30.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
      count: 2,
      subtotal: 9.00
    }
  ]
*/

function calculatePurchaseTotal(inputBarcode){
  calculatePurchaseSubtotalItem = calculatePurchaseSubtotal(inputBarcode);
  var purchaseTotal = 0;
  for (var i=0 ; i < calculatePurchaseSubtotalItem.length ; i++){
  purchaseTotal += calculatePurchaseSubtotalItem[i].subtotal;
  }
  return purchaseTotal;
}
/*
51.00
*/

function calculateOriginalTotal(inputBarcode){
  var originalTotal = 0;
  getPurchaseProductInfoItem = getPurchaseProductInfo(inputBarcode);
  for (var i=0 ; i < getPurchaseProductInfoItem.length ; i++){
    originalTotal += getPurchaseProductInfoItem[i].count*getPurchaseProductInfoItem[i].price;
  }
  return originalTotal;
}
/*
58.50
*/

function calculateSaving(inputBarcode){
  return calculateOriginalTotal(inputBarcode) - calculatePurchaseTotal(inputBarcode);
}
/*
7.50
*/

function printReceipt(inputBarcode){
  originalcount = getPurchaseProductInfo(inputBarcode);
  subtotal = calculatePurchaseSubtotal(inputBarcode);
  total = calculatePurchaseTotal(inputBarcode);
  saving = calculateSaving(inputBarcode);
  resultStr = "***<store earning no money>Receipt ***"+"\n";
  for (var i=0 ; i < subtotal.length ; i++){
    resultStr += "Name: " + subtotal[i].name + ", Quantity: " 
                          + originalcount[i].count + " " 
                          + subtotal[i].unit + ", Unit price: " 
                          + (subtotal[i].price).toFixed(2) + " (yuan), Subtotal: " 
                          + (subtotal[i].subtotal).toFixed(2) + " (yuan)"+"\n";
  }
  resultStr += "----------------------"+"\n"+
  "Total: " + total.toFixed(2) + " (yuan)"+"\n"+
  "Saving: " + saving.toFixed(2) + " (yuan)"+"\n"+
  "**********************"
  return resultStr;
}


module.exports = {getPurchaseCount,
                  getPurchaseName,
                  getPurchaseProductInfo,
                  checkPurchasePromotion,
                  calculatePurchaseSubtotal,
                  calculatePurchaseTotal,
                  calculateOriginalTotal,
                  calculateSaving,
                  printReceipt};

