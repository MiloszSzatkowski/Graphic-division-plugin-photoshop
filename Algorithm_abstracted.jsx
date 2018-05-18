preferences.numberOfHistoryStates = 80;

//units
var originalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.CM;

//background to white
app.backgroundColor.cmyk =  whiteColorObj;

//declare global variables
var overlap, merger, frameSize, cacheWidth, cacheHeight, maximumDivision;
var minimumDivision, optimalDivision, divisionAmount, dividedFully, cacheWidth, cacheHeight;
var lastDivision, preLastDivision, optimal, Sum, explicitAmount, divisionWidthsArr;

function calculate() {

  overlap = pref.overlap;
  merger = pref.merger;
  frameSize = pref.frameSize;
  maximumDivision = pref.maximumDivision;
  minimumDivision = pref.minimumDivision;
  optimalDivision = pref.optimalDivision;

  cacheWidth = app.activeDocument.width.value;
  cacheHeight = app.activeDocument.height.value;

  divisionAmount = cacheWidth / maximumDivision;

  dividedFully = Math.floor(divisionAmount);
  lastDivision = cacheWidth - dividedFully * maximumDivision;
  preLastDivision;

  optimal = pref.optimal;

  lastDivisionIsTooSmall = false;
  Sum;

  if (lastDivision < minimumDivision && optimal == true) {
  var Deq = optimalDivision - lastDivision;
  lastDivision = optimalDivision;
  preLastDivision = maximumDivision - Deq;
  lastDivisionIsTooSmall = true;
  } else if (optimal === false) {
  Sum = maximumDivision + lastDivision;
  preLastDivision = Sum / 2;
  lastDivision = preLastDivision;
  lastDivisionIsTooSmall = true;
  }

  explicitAmount = dividedFully + 1;

  //create array with division widths or empty existing
  divisionWidthsArr = [];

  if (manual.value == true && manualArr !== null) {
    var passArr;
    passArr = manualArr.toString().split(',');
    //clean array
    for (var i = 0; i < passArr.length; i++) {
      if (passArr[i] == null || passArr[i] == undefined) {
        passArr[i].splice(i, 1);
      } else {
        passArr[i] = parseInt(passArr[i]);
      }
    }
    //sum array
    var acc;
    for (var i = 0; i < passArr.length; i++) {
      acc = acc + passArr[i];
    }
    var calculateLast = true;
    if (acc > app.activeDocument.width.value) {
      calculateLast = false;
      alert("Szerokosci brytow przekraczaja wielkosc pliku | Widths of divisions are higher than width of file");
    }
    //automate last divison
    if (calculateLast) {
      var AAAlastDivision = app.activeDocument.width.value - acc;
    }
    if (calculateLast) {
      for (var i = 0; i < passArr.length; i++) {
        divisionWidthsArr.push(passArr[i]);
      }
      divisionWidthsArr.push(AAAlastDivision);
    } else {
      for (var i = 0; i < passArr.length; i++) {
        divisionWidthsArr.push(passArr[i]);
      }
    }
    //proportional:
  } else if (propo.value == true && manual.value == false ){
    var propoDiv = app.activeDocument.width.value / 2;
      for (var i = 0; i < 2; i++) {
        divisionWidthsArr.push(propoDiv);
      }
  } else {
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
  }

}

// var myPath = (app.activeDocument.path).toString().replace(/\\/g, '/');

var folderLoc;
var suffix = pref.suffix;

var Name;
var counter = 0;
var overMul;
var overDiff;
var historyStatus;
var summ;
// alert(historyStatus);

////////////////////////////////////////////////////////////////////
// all documents

var myPath ;
if (pref!==null && pref!==undefined) {
  if (Oldversion && app.documents.length !== 0) {
    myPath = app.activeDocument.path;
  } else if (Oldversion && app.documents.length === 0) {
          if (appStarted) {
            alert("Nie otwarto zadnych plikow | No files are opened");
          }
  } else if (!Oldversion){

    if (app.documents.length !== 0) {
      myPath = app.activeDocument.path;
    } else {
      myPath = Folder.selectDialog("Select output folder / Wybierz folder wyjsciowy", false, false);
    }
  }
}

var inputFolder, inputFiles;
if (Oldversion) {
    if (app.documents.length===0) {
          if (appStarted) {
            alert("Otworz pliki do przetworzenia a potem otworz skrypt | Open files for processing first");
          }
    } else {
      loop();
    }
} else if (!Oldversion){
  //It is a new version
  if (app.documents.length===0) {
    var inputFolder = Folder.selectDialog("Otworz folder do przetworzenia / Open folder for processing");
    if (inputFolder !== undefined && myPath !== undefined && inputFolder !== undefined && myPath !== undefined)  {
      inputFiles = inputFolder.getFiles();
      loopThroughFolder();
    }
  } else {
    loop();
  }
}

var extension, splitPath;
function loopThroughFolder() {
  for (var i = 0; i < inputFiles.length; i++){
    splitPath = inputFiles[i].toString().split(".");
    extension = splitPath[splitPath.length-1];
    if (
    extension=='TIF'      ||
    extension=='tif'      ||
    extension=='jpeg'     ||
    extension=='jpg'      ||
    extension=='JPEG'     ||
    extension=='JPG'
    ) {
      openedFile = app.open(inputFiles[i]);
      app.activeDocument = openedFile;
      calculate();
      divide ();
      // if (pref.closing) {
      //   app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
      //   continue;
      // }
    }
  }
}

function loop() {
  for (var i = 0; i < app.documents.length; i++) {
    app.activeDocument = app.documents[i];
    app.activeDocument.flatten();
    if (myPath===null || myPath===undefined) {
      alert("Path error / Blad sciezki !")
    } else {
      calculate();
      divide ();
      // if (pref.closing) {
      //   app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
      //   continue;
      // }
    }
  }
}

//////////////////

function divide (){

  folderLoc = new Folder(myPath) + "/";

  Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
  //init history
  // startHistory = app.activeDocument.activeHistoryState ;

  for (var j = 0; j < divisionWidthsArr.length; j++) {

    if (pref.overlapWithGraphic===true) {
      if (j === 0) {
        saveState();

        resizeForDivision(divisionWidthsArr[j]+overlap,"left");

        if (pref.addScaffolding) {  drawLines("right");   }
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
        resizeForDivision(divisionWidthsArr[j]+overlap,"left");

        if (pref.addScaffolding) { drawLines("left"); }
        if (pref.addScaffolding) { drawLines("right"); }
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

        if (pref.addScaffolding) { drawLines("left"); }
        frame ();

        SaveTIFF(new File(folderLoc + Name + suffix + "_0" + (j+1) + "_" +
        Math.round(app.activeDocument.width.value) + "_x_" +
        Math.round(app.activeDocument.height.value) +
        '_' + '.tif'));

        undo(historyStatus);
      }
    } else if (pref.overlapWithGraphic===false) {
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

  }  //end of loop
  //
  // //undo all
  // undo (startHistory);

} //end of divide

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

function ParaDrawLines (startXY, endXY, width ) {
  // two element array of numbers for x,y start of line,
// two element array of numbers for x,y endof line,
//number;line width in pixels
// uses foreground color
     var desc = new ActionDescriptor();
        var lineDesc = new ActionDescriptor();
            var startDesc = new ActionDescriptor();
            startDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), startXY[0] );
            startDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), startXY[1] );
        lineDesc.putObject( charIDToTypeID('Strt'), charIDToTypeID('Pnt '), startDesc );
            var endDesc = new ActionDescriptor();
            endDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), endXY[0] );
            endDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), endXY[1] );
        lineDesc.putObject( charIDToTypeID('End '), charIDToTypeID('Pnt '), endDesc );
        lineDesc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Pxl'), width );
    desc.putObject( charIDToTypeID('Shp '), charIDToTypeID('Ln  '), lineDesc );
    desc.putBoolean( charIDToTypeID('AntA'), true );
    executeAction( charIDToTypeID('Draw'), desc, DialogModes.NO );
}

var startPoint, endPoint, lineWidth, lines, y_cord, initialCmyk, multi, factor, lines_Distance;

function drawLines (side){

  app.foregroundColor.cmyk =  l_color;
  app.backgroundColor.cmyk =  l_color;

  //correct cm to px
  app.preferences.rulerUnits = Units.CM;
  oCM = app.activeDocument.width.value;
  app.preferences.rulerUnits = Units.PIXELS;
  oPX = app.activeDocument.width.value;
  factor = oPX/oCM; // --> factor
  // alert(rmmW +"mm / "+rpixW +"pix\n factor " + factor);

  lines = [];
  lineWidth = pref.lineWidth * factor;
  lineLongitude = pref.lineLongitude * factor;
  lines_Distance = pref.lines_Distance * factor;

  //index has to be an integer
  num_of_lines = parseInt(Math.floor( app.activeDocument.height.value / lines_Distance));

  // populate array accord.:
  // passing array values to drawing function
  // startPoint = [118,434];
  // endPoint = [335,434];

  if (side == "right"){
    for (var i = 1; i < num_of_lines+1; i++) {
      y_cord = lines_Distance*i;
      lines[i] =  {
        start : [ app.activeDocument.width.value - lineLongitude , y_cord],
        end : [ app.activeDocument.width.value , y_cord]
      }

    }
  } else if (side == "left") {
    for (var i = 1; i < num_of_lines+1; i++) {
      y_cord = lines_Distance*i;

      lines[i] =  {
        start : [ 0, y_cord],
        end : [ lineLongitude , y_cord]
      }

    }
  }

  // alert(lines[1].start)

  //for every object in array, draw line
  for (var i = 1; i < lines.length; i++) {
    ParaDrawLines ( lines[i].start , lines[i].end , lineWidth);
  }

   app.foregroundColor.cmyk =  blackColorObj;
   app.backgroundColor.cmyk =  whiteColorObj;
   app.preferences.rulerUnits = Units.CM;
}

function SaveTIFF(saveFile){
tiffSaveOptions = new TiffSaveOptions();
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.alphaChannels = true;
tiffSaveOptions.layers = true;
tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW;
// tiffSaveOptions.jpegQuality=12;
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE);
}

// reset Units
preferences.rulerUnits = originalUnit;
preferences.numberOfHistoryStates = 20;
