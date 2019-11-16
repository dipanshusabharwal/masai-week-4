var totalItems = [];

function generateBill() {
  console.log("In generate function");

  var discount = Number(document.getElementById("discount").value);
  var tip = Number(document.getElementById("tip").value);

  if (totalItems.length == 0) {
    console.log("No items present to calculate bill");
    alertUser(8);
    reset();
    return;
  } else {
    var totalBill = 0;
    var discountAmount;
    var billAfterDiscount;
    var tax = 5;
    var taxAmount;
    var billAfterTax;
    var tipAmount;
    var billAfterTip;

    for (var w = 0; w < totalItems.length; w++) {
      for (var x = 0; x < 1; x++) {
        totalBill += totalItems[w][x + 3];
      }
    }

    console.log("Total bill before tax", totalBill);

    console.log("Discount percent", discount);
    discountAmount = Math.floor(totalBill * (discount / 100));
    console.log("Discount amount", discountAmount);
    billAfterDiscount = totalBill - discountAmount;
    console.log("Total bill after discount", billAfterDiscount);

    console.log("Fixed tax percent", tax);
    taxAmount = Math.floor(billAfterDiscount * (tax / 100));
    console.log("Tax Amount", taxAmount);
    billAfterTax = billAfterDiscount + taxAmount;
    console.log("Bill After Tax", billAfterTax);

    console.log("Tip percent", tip);
    tipAmount = Math.floor(billAfterDiscount * (tip / 100));
    console.log("Tip amount", tipAmount);
    billAfterTip = billAfterTax + tipAmount;
    console.log("Bill after tip", billAfterTip);

    console.log("Final Bill", billAfterTip);

    showBill(
      totalBill,
      discount,
      discountAmount,
      billAfterDiscount,
      tax,
      taxAmount,
      billAfterTax,
      tip,
      tipAmount,
      billAfterTip
    );
  }
}

function addModifyItem() {
  console.log("In add-modify function");

  var item = document.getElementById("item").value;
  var rate = Number(document.getElementById("rate").value);
  var quantity = Number(document.getElementById("quantity").value);
  var total;
  if (quantity && rate) {
    total = rate * quantity;
  } else {
    total = 1;
  }
  console.log(
    "Entries are: [",
    item,
    rate,
    quantity,
    total,
    "]",
    typeof item,
    typeof rate,
    typeof quantity,
    typeof total
  );

  var addEntry = [];
  addEntry.push(item);
  addEntry.push(rate);
  addEntry.push(quantity);
  addEntry.push(total);

  validEntry = true;

  for (var l = 0; l <= addEntry.length - 1; l++) {
    if (addEntry[l] == "" || addEntry[l] == 0) {
      console.log(l + 1);
      console.log("Invalid Entry");
      validEntry = false;
      alertUser(l + 1);
    }
  }
  if (addEntry[1] < 0) {
    console.log(addEntry[1]);
    console.log("Negative rate");
    validEntry = false;
    alertUser(4);
  }

  if (validEntry) {
    console.log("Valid Entries. Processing");

    var newEntry = true;

    for (var i = 0; i < totalItems.length; i++) {
      for (var j = 0; j < 1; j++) {
        if (totalItems[i][j] == item) {
          console.log("Existing item found");
          if (totalItems[i][j + 1] == rate) {
            console.log("Rate Matched");
            if (
              confirm(
                "Existing item found\n\n\nPress OK to reset to new quantity\n\nPress Cancel to update existing quantity"
              )
            ) {
              console.log("User chose to reset to new quantity", quantity);
              totalItems[i][j + 2] = quantity;
              total = rate * quantity;
            } else {
              console.log("User chose to update existing quantity", quantity);
              totalItems[i][j + 2] += quantity;
              total = rate * totalItems[i][j + 2];
            }

            totalItems[i][j + 3] = total;
            console.log("Updated total to", totalItems[i][j + 3]);
            showItems();
            newEntry = false;
          } else {
            newEntry = false;
            alertUser(5);
          }
        }
      }
    }

    if (newEntry) {
      totalItems.push(addEntry);
      showItems();
    } else {
      console.log("Existing entry found");
    }

    console.log("Total Items", totalItems);
  }

  reset();
}

function removeItem() {
  console.log("In remove function");

  var delItem = document.getElementById("item").value;
  console.log("User wants to remove item", delItem);

  if (delItem != "") {
    if (confirm("Are you sure you want to delete item - " + delItem + " ?")) {
      console.log("User confirmed deletion of item -", delItem);
    } else {
      console.log("User declined to delete item -", delItem);
    }
  } else {
    console.log("No item name passed for deletion", delItem);
    alertUser(6);
    return;
  }

  var delIndex = -1;

  for (var r = 0; r < totalItems.length; r++) {
    for (var s = 0; s < 1; s++) {
      if (totalItems[r][s] == delItem) {
        delIndex = r;
      }
    }
  }

  if (delIndex >= 0) {
    console.log(delItem, "found at index", delIndex);
    console.log("Deleting item", delItem);
    console.log("Total items before deletion", totalItems);
    var a = totalItems.slice(0, delIndex);
    var b = totalItems.slice(delIndex + 1, totalItems.length);
    var c = a.concat(b);
    totalItems = c;
    console.log("Total items after deletion", totalItems);
    showItems();
  } else {
    console.log("Not found", delItem, "at any index");
    alertUser(7);
    reset();
    return;
  }

  reset();
}

function reset() {
  console.log("Reset function used");
  document.getElementById("item").value = "";
  document.getElementById("rate").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("discount").value = "";
  document.getElementById("tip").value = "";
}

function alertUser(code) {
  switch (code) {
    case 1:
      alert("Enter item name");
      break;
    case 2:
      alert("Enter item rate");
      break;
    case 3:
      alert("Enter item quantity");
      break;
    case 4:
      alert("Rate cannot be negative");
      break;
    case 5:
      alert(
        "Item already exists. Rate mismatched. Enter correct rate to update"
      );
      break;
    case 6:
      alert("Enter item name for deletion");
      break;
    case 7:
      alert("Item not found for deletion");
      break;
    case 8:
      alert("No items to be billed");
      break;
  }
}

function showItems() {
  var orderPanel = document.getElementById("orderPanel");
  console.log(orderPanel);

  var paras = orderPanel.querySelectorAll("p");
  if (paras.length > 0) {
    for (var v = 0; v < paras.length; v++) {
      orderPanel.removeChild(paras[v]);
    }
  }

  for (var g = 0; g < totalItems.length; g++) {
    for (var h = 0; h < 1; h++) {
      var itm = totalItems[g][h];
      var rte = totalItems[g][h + 1];
      var qnt = totalItems[g][h + 2];
      var tot = totalItems[g][h + 3];

      var itemSummary = document.createElement("p");
      itemSummary.textContent =
        "Item: " +
        itm +
        " Rate: " +
        rte +
        " Quantity: " +
        qnt +
        " Total: " +
        tot;

      orderPanel.appendChild(itemSummary);
    }
  }
}

function showBill(a, b, c, d, e, f, g, h, i, j) {
  var billPanel = document.getElementById("billPanel");
  console.log(billPanel);

  var paras = billPanel.querySelectorAll("p");
  if (paras.length > 0) {
    for (var p = 0; p < paras.length; p++) {
      billPanel.removeChild(paras[p]);
    }
  }

  if (totalItems.length != 0) {
    var dTotalBill = document.createElement("p");
    var dDiscPer = document.createElement("p");
    var dDiscAmt = document.createElement("p");
    var dBillAftDisc = document.createElement("p");
    var dTaxPer = document.createElement("p");
    var dTaxAmt = document.createElement("p");
    var dBillAftTax = document.createElement("p");
    var dTipPer = document.createElement("p");
    var dTipAmt = document.createElement("p");
    var dFinalBill = document.createElement("p");

    dTotalBill.textContent = "Total Bill :" + a;
    dDiscPer.textContent = "Discount Percent :" + b;
    dDiscAmt.textContent = "Discount Amount :" + c;
    dBillAftDisc.textContent = "Bill After Discount :" + d;
    dTaxPer.textContent = "Tax Percent :" + e;
    dTaxAmt.textContent = "Tax Amount :" + f;
    dBillAftTax.textContent = "Bill After Tax :" + g;
    dTipPer.textContent = "Tip Percent :" + h;
    dTipAmt.textContent = "Tip Amount :" + i;
    dFinalBill.textContent = "Final Bill :" + j;

    billPanel.appendChild(dTotalBill);
    billPanel.appendChild(dDiscPer);
    billPanel.appendChild(dDiscAmt);
    billPanel.appendChild(dBillAftDisc);
    billPanel.appendChild(dTaxPer);
    billPanel.appendChild(dTaxAmt);
    billPanel.appendChild(dBillAftTax);
    billPanel.appendChild(dTipPer);
    billPanel.appendChild(dTipAmt);
    billPanel.appendChild(dFinalBill);
  }
}

function newBill() {
  console.log("Resetting for a new bill");
  totalItems = [];
  console.log("Total items", totalItems);
  console.log("Total items length", totalItems.length);
  reset();
  showItems();
  showBill();
}

var addModify = document.getElementById("addModifyItem");
var remove = document.getElementById("removeItem");
var generate = document.getElementById("generate");
var resetBill = document.getElementById("newBill");

addModify.addEventListener("click", addModifyItem);
remove.addEventListener("click", removeItem);
generate.addEventListener("click", generateBill);
resetBill.addEventListener("click", newBill);
