function doGet() {
  return HtmlService
  .createTemplateFromFile('table')
  .evaluate();
}

function getData() {
  return SpreadsheetApp
  .getActiveSheet()
  .getDataRange()
  .getValues();
}