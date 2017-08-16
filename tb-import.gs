function doGet() {
  return HtmlService
  .createTemplateFromFile('tb-display')
  .evaluate();
}

function getData() {
  return SpreadsheetApp
  .getActiveSheet()
  .getDataRange()
  .getValues();
}