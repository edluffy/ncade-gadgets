function newPage() {
   Logger.log("Script starting.");
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Define inventory range and its values   
  var inventoryrange = sheet.getRange("Inventory!A2:M");
  var inventory = inventoryrange.getValues();
  
  // Query the correct google site (Funblocked) and locate the correct directory.
  var site = SitesApp.getSite("playfunblocked");
  var games = site.getChildByName("games");   
  
    // Loop through the inventory range looking for yellow
  var i = 0;
  numberOfRowsInRange = inventoryrange.getNumRows();
  loop: for (i=0;i<numberOfRowsInRange;i++) {
    
    var row = i+1
    Logger.log(inventoryrange.getBackground());
    if(inventoryrange.getBackground() != '#ffe599'){
      continue loop;  
    }
    
 var title = inventory[i][1];
    var desc = inventory[i][2];  
    var info = inventory[i][3];  
    var difficulty = inventory[i][5];  
    var src = encodeURIComponent(inventory[i][11]);  
    var URL = inventory[i][10];
    var page = games.getChildByName(URL);
    
    // Take logs just because I can >:)
    Logger.log('Row Number %s', row+1);
    Logger.log('Title: %s', title);
    Logger.log('Desc: %s', desc);
    Logger.log('Info:', info);
    Logger.log('Difficulty: %s', difficulty);
    Logger.log('SRC: %s', inventory[i][11]);
    Logger.log('URL: %s', URL);
  }
}
