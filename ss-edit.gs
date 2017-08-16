function onEdit(e) {
  Logger.log("Script Starting");
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ui = SpreadsheetApp.getUi();
  var cell = e.range
  var range = sheet.getRange(e.range.getRow(), 1, 1, 13);
  var oldV = e.oldValue;
  var newV = e.value;
  
  Logger.log('Cell is: %s', cell.getA1Notation());
  Logger.log('Old value is %s', oldV);
  Logger.log('New value is %s', newV);
  
  // Check for errors 
  if(sheet.getSheetName() !== 'Inventory'){
    ui.alert('Wrong sheet, return');
    cell.setValue(oldV);
    return
  }else if(e.range.getRow() == 1){
    ui.alert('Wrong row, return');
    cell.setValue(oldV);
    return
  }

  
  // Declare each Column
  var URL = range.getCell(1, 1);
  var title = range.getCell(1, 2);
  var desc = range.getCell(1, 3);
  var info = range.getCell(1, 4);
  var plays = range.getCell(1, 5);
  var difficulty = range.getCell(1, 6);
  var device = range.getCell(1, 7);
  var genre = range.getCell(1, 8);
  var players = range.getCell(1, 9);
  var TYPE = range.getCell(1, 10);
  var SRC = range.getCell(1, 11);
  var IMG = range.getCell(1, 12);
  
  // Set background color
  range.setBackground('#FFE599')
  
  // Set up links
  var gameLink = title.getValue()
  .replace(' ', '-')
  .replace(' ', '-')
  .replace(' ', '-')
  .replace(' ', '-')
  .replace(' ', '-')
  .replace(' ', '-')
  .toLowerCase()
  
  URL
  .clearContent()
  .setValue(gameLink)
 
  SRC
  .clearContent()
  .setValue('https://ncade.ssl.hwcdn.net/flash/' + gameLink + '.swf')
  
  IMG
  .clearContent()
  .setValue('https://ncade.ssl.hwcdn.net/img/' + gameLink + '.jpg')
  
  //Set data Validation
  var typeVal = SpreadsheetApp.newDataValidation().requireValueInList(['SWF', 'HSWF', 'EMBED'], true)
  var gnrVal = SpreadsheetApp.newDataValidation().requireValueInList(['Racing', 'Action', 'Tower Defence', 'Arcade', 'Adventure', 'Misc', 'MMO', 'Strategy'], true)
  var plyrVal = SpreadsheetApp.newDataValidation().requireValueInList(['Singleplayer', 'Multiplayer'], true)
  var diffVal = SpreadsheetApp.newDataValidation().requireValueInList(['easy', 'medium', 'hard'], true)
  
  TYPE.setDataValidation(typeVal)
  genre.setDataValidation(gnrVal)
  players.setDataValidation(plyrVal)
  difficulty.setDataValidation(diffVal)
  Logger.log('Showing Data Validation')
}
