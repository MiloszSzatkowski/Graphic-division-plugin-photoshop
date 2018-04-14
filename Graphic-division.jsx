
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
displayDialogs = DialogModes.NO  ;

//units
var originalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.CM;

var widthTreshold = 500.5;

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


activeDocument.resizeCanvas(divisionWidthsArr[0], cacheHeight, AnchorPosition.MIDDLELEFT);

activeDocument.resizeCanvas(4, cacheHeight, AnchorPosition.MIDDLELEFT);


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
