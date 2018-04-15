
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
    blackColorObj.cyan = am;  blackColorObj.magenta  = am;
    blackColorObj.yellow = am;  blackColorObj.black = am;

//background to white
app.backgroundColor.cmyk =  whiteColorObj;

//add new layer in case the image is flat (faster than catch(e))
var newLayerRef = app.activeDocument.artLayers.add();
    app.activeDocument.mergeVisibleLayers();

var widthTreshold = 500.5;
var overlap = 1;
var merger = 4;

var cacheWidth = app.activeDocument.width;
var cacheHeight = app.activeDocument.height;

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

// alert(divisionWidthsArr.toString());

if (dividedFully<2) {

  resizeForDivision(divisionWidthsArr[0], "left"); //1
  resizeForDivision(divisionWidthsArr[0] + merger, "left"); //2
  undo (2);

  resizeForDivision(divisionWidthsArr[0] - overlap, "right");

} else {

  resizeForDivision(divisionWidthsArr[0], "left"); //1
  resizeForDivision(divisionWidthsArr[0] + merger, "left"); //2
  undo (2);

  var accumulate = divisionWidthsArr[0];

  for (var j = 1; j < divisionWidthsArr.length-1; j++) {

    resizeForDivision(accumulate - overlap, "right"); //1

    accumulate = accumulate + divisionWidthsArr[j];

    resizeForDivision(divisionWidthsArr[j], "left"); //2
    resizeForDivision(divisionWidthsArr[j] + merger, "left"); //3
    undo (3);

  }

}

function undo (num){
 app.activeDocument.historyStates.length - num;
}

function resizeForDivision (am , side) {
  if (side=="left") {
    activeDocument.resizeCanvas(am, cacheHeight, AnchorPosition.MIDDLELEFT);
  }
  if (side=="right") {
    activeDocument.resizeCanvas(am, cacheHeight, AnchorPosition.MIDDLERIGHT);
  }
}

// var myPath = (app.activeDocument.path).toString().replace(/\\/g, '/');
var myPath = (app.activeDocument.path);
// alert(myPath);

var folderLoc = new Folder(myPath) + "/" + "division";
//Check if it exist, if not create it.
if(!folderLoc.exists) {
  // folderLoc.create();
}

var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');

// SaveTIFF(new File(folderLoc + Name + ' ' + '.tif'));

function SaveTIFF(saveFile){
tiffSaveOptions = new TiffSaveOptions();
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.alphaChannels = true;
tiffSaveOptions.layers = true;
tiffSaveOptions.imageCompression = TIFFEncoding.JPEG;
tiffSaveOptions.jpegQuality=10;
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE);
}



// reset Units
preferences.rulerUnits = originalUnit;
