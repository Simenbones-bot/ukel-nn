// Lim inn denne koden i Google Apps Script (Extensions → Apps Script i Google Sheets)
// Sheet-struktur:
//   Fane: "kids"
//   A2 = "Ylva"   B2 = 0
//   A3 = "Edel"   B3 = 0

var SHEET = "kids";

function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
    var p = (e && e.parameter) || {};

    if (p.action === "add") {
      var row = p.kid === "ylva" ? 2 : 3;
      var current = Number(sheet.getRange(row, 2).getValue()) || 0;
      sheet.getRange(row, 2).setValue(current + Number(p.amount));
    }

    if (p.action === "set") {
      var row = p.kid === "ylva" ? 2 : 3;
      sheet.getRange(row, 2).setValue(Number(p.amount));
    }

    var data = {
      ylva: Number(sheet.getRange(2, 2).getValue()) || 0,
      edel: Number(sheet.getRange(3, 2).getValue()) || 0
    };

    var json = JSON.stringify(data);

    // JSONP-støtte: hvis callback-parameter er sendt, pakk inn svaret
    if (p.callback) {
      return ContentService.createTextOutput(p.callback + "(" + json + ");")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService.createTextOutput(json)
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
