function doGet(e) {  
  var t = HtmlService.createTemplateFromFile('tb-display')
   t.query =  e.parameter.content
   Logger.log(t.query);
  return t.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(File) {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
};

function getData() { 
  return SpreadsheetApp
  .openById("1dMHyHtvhQZDso5hSpKTZ1oMTZJoOjZiPlXHm_eioBj8")
  .getDataRange()
  .getValues()
  
}
