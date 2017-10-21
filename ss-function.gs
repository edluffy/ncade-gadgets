function onOpen() {
  // Create dropdown inventory menu
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Inventory')
  .addItem('Launch Function', 'siteEditor')
  .addItem('Server Check', 'serverCheck')
  .addToUi();
}

/*     *SiteEditor functions*
- Update page
- Create page
- Delete page        
*/
function siteEditor(){
  Logger.log("Site Editor Activated");
  var sheet = SpreadsheetApp.getActiveSheet()
  var range = sheet.getRange("A2:N")
  var inventory = range.getValues();
  
  var site = SitesApp.getSite("playfunblocked");
  var games = site.getChildByName("games");   
  
  // Loop through the inventory range
  var i = 0;
  numberOfRowsInRange = range.getNumRows();
  loop: for (i=0;i<numberOfRowsInRange;i++) {
    
    // Quick check function 
    var siteFunction = inventory[i][13];
    var TYPE = inventory[i][10];
    Logger.log('Function: %s', siteFunction);
    
    if(siteFunction == ('live') || siteFunction == ('dead') || TYPE != ('N')){
      continue loop;
    }
    
    // Define variables to loop through
    var row = i+1;
    var checkbox = range.getCell(row, 14);
    
    var id = inventory[i][0];
    var page = games.getChildByName(id);
    var misc = 'Challenge'
    
    var title = inventory[i][3];
    var description = inventory[i][4];
    var information = inventory[i][5];
    var difficulty = inventory[i][6];
    var genre = inventory[i][8];
    
    var SRC = encodeURI(inventory[i][11]);
    var IMG = inventory[i][12];
    
    // Take logs just because I can >:)
    Logger.log('Row Number %s', row+1);
    Logger.log('ID: %s', id);
    Logger.log('Title: %s', title);
    Logger.log('Description: %s', description);
    Logger.log('Challenge: %s', information);
    Logger.log('Difficulty: %s', difficulty);
    Logger.log('SWF: %s', inventory[i][11]);
    
    switch(siteFunction) 
    {
        // *DELETE FUNCTION*  
      case 'delete':
        page.deletePage(); 
        page.isDeleted() == true;
        checkbox.setValue('dead')
        Logger.log("Page Deleted."); 
        continue loop; 
        break; 
        
        // *SEND FUNCTION*  
      case 'send':
        // Locate template and replace variables
        var template = site.getTemplates()[0];
        var templatehtml = template.getHtmlContent();
        
        
        var newhtml = templatehtml
        .split("{{swf}}").join(SRC)
        .split("%7B%7Bswf%7D%7D").join(SRC)
        .split("{{description}}").join(description)
        .split("{{challenge}}").join(information)
        .split("{{difficulty}}").join(difficulty)
        .split("%7B%7Bdifficulty%7D%7D").join(difficulty)
        .split("{{name}}").join(id)
        .split("%7B%7Bname%7D%7D").join(id)
        .split("{{misc}}").join(misc)
        .split("%7B%7Btitle%7D%7D").join(title)
        .split("{{title}}").join(title)
        .split("%7B%7Bgenre%7D%7D").join(genre)
        .split("{{genre}}").join(genre);
        
        
        // If page does not exist, create and apply html
        if(page == null){
          var newpage = games.createPageFromTemplate(title, id, template);
          newpage.setHtmlContent(newhtml);
          checkbox.setValue('live');
          Logger.log("Game Added.");  
        }else{
          // Change page content  
          page.setHtmlContent(newhtml);
          checkbox.setValue('live');
          Logger.log("Game Added.");  
          
        }
        continue loop; 
        break; 
    }
  }
}












/*     *ServerCheck function*
- Check for dead links
- Check for redirects
*/
function serverCheck(){
  Logger.log("Server file status being checked");
  var sheet = SpreadsheetApp.getActiveSheet()
  if(sheet.getName() == 'MAIN') {
    var blueRange = sheet.getRange("K2:M")
    var blueValues = blueRange.getValues();
    var bNumRows = blueRange.getNumRows()
    var b = 0;
    
    loop: for (i=0;i<bNumRows;i++) {
      var TYPE = blueValues[i][0]
      var SRC = blueValues[i][1]
      var IMG = blueValues[i][2]
      
      if((SRC != "") && (IMG != "")) {
        UrlFetchApp.fetch(SRC) 
        UrlFetchApp.fetch(IMG) 
      }
    }
  }
}