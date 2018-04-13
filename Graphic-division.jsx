
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
//
// Hello Word Script
// Remember current unit settings and then set units to
// the value expected by this script
var originalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.CM;

var cacheWidth = app.activeDocument.width;
var cacheHeight = app.activeDocument.width;

var maximumDivision = 490;
var minimumDivision = 71;

var divisionAmount = cacheWidth / maximumDivision;

var dividedFully = Math.ceil(divisionAmount);
var lastDivision = 
Math.floor();

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
