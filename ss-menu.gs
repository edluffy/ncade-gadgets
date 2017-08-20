function onOpen(e) {
  SpreadsheetApp.getUi()
  .createMenu('Inventory')
  .addItem('Update', 'newPage')
  .addItem('Select all', 'manualEdit')
  .addToUi();
}

function manualEdit() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(Inventory)();
  var range = sheet.getRange("A2:M");
  
  
  
  
}