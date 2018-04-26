
var pluginName = "Graphic-division";

var licenceAuthor = "00"

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
$.level = 0;
//debugger; // launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

var gScriptResult;

//no dialogs
// displayDialogs = DialogModes.NO  ;

//config
// var appdata = $.getenv("APPDATA")
// var xmlFile = new File(appdata + "\\adobe\\ExportAsPNG_Settings.xml");
// xmlFile.open("r");
// var xml = new XML (xmlFile.read());
// xml.DefaultSavePath = "Testing AGAIN";
// xmlFile.close();
// xmlFile.open("w");
// xmlFile.write(xml);
// xmlFile.close();
//

//save history state
var startHistory = app.activeDocument.activeHistoryState ;

//units
var originalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.CM;

//background templates
  //white
  var whiteColorObj = new CMYKColor();
    var am = 0;
    whiteColorObj.cyan = am;  whiteColorObj.magenta  = am;
    whiteColorObj.yellow = am;  whiteColorObj.black = am;
  //black
  var blackColorObj = new CMYKColor();
    var bm = 100;
    blackColorObj.cyan = bm;  blackColorObj.magenta  = bm;
    blackColorObj.yellow = bm;  blackColorObj.black = bm;

//background to white
app.backgroundColor.cmyk =  whiteColorObj;

//add new layer in case the image is flat (faster than catch(e))
var newLayerRef = app.activeDocument.artLayers.add();
    app.activeDocument.mergeVisibleLayers();

var widthTreshold = 500.5;
var overlap = 1;
var merger = 4;
var frameSize = 0.2;

var cacheWidth = app.activeDocument.width.value;
var cacheHeight = app.activeDocument.height.value;

// alert(typeof(app.activeDocument.width.value));

if (cacheWidth<widthTreshold) {
  // alert("too short");
  // return;
}

var maximumDivision = 490;
var minimumDivision = 71;

var divisionAmount = cacheWidth / maximumDivision;

var dividedFully = Math.floor(divisionAmount);
var lastDivision = cacheWidth - dividedFully * 490;
var preLastDivision;

var lastDivisionIsTooSmall = false;

if (lastDivision < minimumDivision) {
var Sum = maximumDivision + lastDivision;
preLastDivision = Sum / 2;
lastDivision = preLastDivision;
lastDivisionIsTooSmall = true;
}

var explicitAmount = dividedFully + 1;

//create array with division widths
var divisionWidthsArr = [];

if (!lastDivisionIsTooSmall) {
  for (var i = 0; i < dividedFully; i++) {
      divisionWidthsArr.push(maximumDivision);
  }
  divisionWidthsArr.push(lastDivision);
} else {
  for (var i = 0; i < dividedFully-1; i++) {
      divisionWidthsArr.push(maximumDivision);
  }
  divisionWidthsArr.push(preLastDivision);
  divisionWidthsArr.push(lastDivision);
}

// alert(resizeCanvas().toString());
// alert(divisionWidthsArr.toString());

// var myPath = (app.activeDocument.path).toString().replace(/\\/g, '/');
var myPath = (app.activeDocument.path);
// alert(myPath);

var folderLoc = new Folder(myPath) + "/";
var suffix = "_bryt_"

//Check if it exist, if not create it.
if(!folderLoc.exists) {
  // folderLoc.create();
}

var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
var counter = 0;
var overMul;
var overDiff;
var historyStatus;
var summ;
// alert(historyStatus);

////////////////////////////////////////////////////////////////////



for (var j = 0; j < divisionWidthsArr.length; j++) {

  if (j === 0) {
    saveState();
    resizeForDivision(divisionWidthsArr[j],"left");
    resizeForDivision(divisionWidthsArr[j]+merger,"left");
    frame ();
    SaveTIFF(new File(folderLoc + Name + suffix + "_0" + (j+1) + "_" +
    Math.round(app.activeDocument.width.value) + "_x_" +
    Math.round(app.activeDocument.height.value) +
    '_' + '.tif'));
    undo(historyStatus);
  } else if (j !== divisionWidthsArr.length-1) {
    saveState();
    summ = 0;
    for (var i = 0; i < j; i++) {
      summ = summ + divisionWidthsArr[i];
    }
    resizeForDivision(app.activeDocument.width.value - summ + overlap*j,"right");
    resizeForDivision(divisionWidthsArr[j],"left");
    resizeForDivision(divisionWidthsArr[j]+merger,"left");
    frame ();
    SaveTIFF(new File(folderLoc + Name + suffix + "_0" + (j+1) + "_" +
    Math.round(app.activeDocument.width.value) + "_x_" +
    Math.round(app.activeDocument.height.value) +
    '_' + '.tif'));
    undo(historyStatus);
  } else {
    saveState();
    summ = 0;
    for (var i = 0; i < j; i++) {
      summ = summ + divisionWidthsArr[i];
    }
    resizeForDivision(app.activeDocument.width.value - summ + overlap*j,"right");
    frame ();
    SaveTIFF(new File(folderLoc + Name + suffix + "_0" + (j+1) + "_" +
    Math.round(app.activeDocument.width.value) + "_x_" +
    Math.round(app.activeDocument.height.value) +
    '_' + '.tif'));
    undo(historyStatus);
  }

}

///////////////////////////////////

//obligatory function
function undo (state) {
 app.activeDocument.activeHistoryState = state;
}

function saveState () {
  historyStatus = app.activeDocument.activeHistoryState ;
}

function resizeForDivision (am , side) {
  if (side=="left") {
    activeDocument.resizeCanvas(am, cacheHeight, AnchorPosition.MIDDLELEFT);
  }
  if (side=="right") {
    activeDocument.resizeCanvas(am, cacheHeight, AnchorPosition.MIDDLERIGHT);
  }
  if (side=="center") {
    activeDocument.resizeCanvas(am, cacheHeight, AnchorPosition.MIDDLECENTER);
  }
}

function frame () {
  app.backgroundColor.cmyk =  blackColorObj;

    activeDocument.resizeCanvas(
      app.activeDocument.width.value + frameSize,
      app.activeDocument.height.value + frameSize,
      AnchorPosition.MIDDLECENTER);

  app.backgroundColor.cmyk =  whiteColorObj;
}


// SaveTIFF(new File(folderLoc + Name + ' ' + '.tif'));

function SaveTIFF(saveFile){
tiffSaveOptions = new TiffSaveOptions();
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.alphaChannels = true;
tiffSaveOptions.layers = true;
tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW;
// tiffSaveOptions.jpegQuality=12;
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE);
}

//undo all
undo (startHistory);

// reset Units
preferences.rulerUnits = originalUnit;
