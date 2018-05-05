
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

var initialBuffer = preferences.numberOfHistoryStates;
preferences.numberOfHistoryStates = 60;

//colors
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
  //grey
    var greyColorObj = new CMYKColor();
      var cc = 50;
      greyColorObj.cyan = cc;  greyColorObj.magenta  = cc;
      greyColorObj.yellow = cc;  greyColorObj.black = cc;

    var baner = new PrefObj(
      "🎂 Banery | Banner"  ,//name
      false, //overlapWithGraphic
      false, //addScaffolding
      1, //overlap
      4, //merger
      0.2, //frameSize
      490, //maximumDivision
      71, //minimumDivision
      80, //optimalDivision
      true, //optimal
      "_br_bryt_", // suffix
      50, //lines_Distance
      0.1, //lineWidth
      1 //lineLongitude
    );

    var blockout = new PrefObj(
      "🏀 Blockout"  ,//name
      false, //overlapWithGraphic
      false, //addScaffolding
      1, //overlap
      4, //merger
      0.2, //frameSize
      310, //maximumDivision
      71, //minimumDivision
      80, //optimalDivision
      true, //optimal
      "_bt_bryt_", // suffix
      50, //lines_Distance
      0.1, //lineWidth
      1 //lineLongitude
    );

    var epson = new PrefObj(
      "🎉 Tekstylia | Textiles" ,//name
      true, //overlapWithGraphic
      true, //addScaffolding
      3, //overlap
      0, //merger
      0.2, //frameSize
      290, //maximumDivision
      71, //minimumDivision
      80, //optimalDivision
      true, //optimal
      "_en_bryt_", // suffix
      50, //lines_Distance
      0.3, //lineWidth
      1 //lineLongitude
    );

    var choosePref = [baner,blockout,epson];

    function PrefObj (
      name,
      overlapWithGraphic,
      addScaffolding,
      overlap,
      merger,
      frameSize,
      maximumDivision,
      minimumDivision,
      optimalDivision,
      optimal,
      suffix,
      lines_Distance,
      lineWidth,
      lineLongitude,
      )   {
      this.name = name;
      this.overlapWithGraphic = overlapWithGraphic;
      this.addScaffolding = addScaffolding;
      this.overlap = overlap;
      this.merger = merger;
      this.frameSize = frameSize;
      this.maximumDivision = maximumDivision;
      this.minimumDivision = minimumDivision;
      this.optimalDivision = optimalDivision;
      this.optimal = optimal;
      this.suffix = suffix;
      this.lines_Distance = lines_Distance;
      this.lineWidth = lineWidth;
      this.lineLongitude = lineLongitude;
    }


    var w = new Window ('dialog {orientation: "row", alignChildren: [" ", "top"]}',
    "Brytowanie grafiki | Graphic division", undefined, {closeButton: false});

    w.alignChildren = "right";

    var tab = w.add ("tabbedpanel");
    tab.alignChildren = ["fill", "fill"];
    tab.preferredSize = [350,300];

    var panels = [];
    var options = [];

    var ToverlapWithGraphic = "Uzyj laczenia z grafiki | Create overlap from graphic:";
    var TaddScaffolding = "Uzyj znacznikow laczenia 🍌 Use merging markers:";
    var Toptimal = "Uzywaj mniejszych brytow, gdy to tylko mozliwe | Use smaller divisions whenever possible:";
    var Toverlap = "Szerokosc overlapu | Graphics' overlap:";
    var Tmerger = "Szerokosc zgrzewu | Width of weld:";
    var TmaximumDivision = "Maksymalna szerokosc brytu | Maximal division width:";
    var TminimumDivision = "Minimalna szerokosc brytu | Minimal division width:";
    var ToptimalDivision = "Szerokosc optymalna minimalnego brytu | Optimal width for leftovers' fixing:";
    var Tsuffix = "Suffix:";
    var Tlines_Distance = "Pionowa odleglosc pomiedzy liniami znacznikow | Vertical distance between markers:";
    var TlineWidth = "Grubosc znacznika | Width of marker:";
    var TlineLongitude = "Szerokosc znacznika | How long is a marker:";
    var Tframe = "Grubosc obrysowania | Width of framing:";

    for (var i = 0; i < choosePref.length; i++) {
      panels.push( tab.add ("tab", undefined, choosePref[i].name) );
      panels[i].alignChildren = "fill";
      options[i] = panels[i].add ("panel", undefined, "Opcje lokalne | Local options");
      options[i].alignChildren = ["fill", "fill"];

      options[i].add("statictext", undefined, Toverlap);
      options[i].overlap = options[i].add("edittext", undefined, choosePref[i].overlap);

      options[i].add("statictext", undefined, Tmerger);
      options[i].merger =             options[i].add("edittext", undefined, choosePref[i].merger);

      options[i].add("statictext", undefined, TmaximumDivision);
      options[i].maximumDivision =    options[i].add("edittext", undefined, choosePref[i].maximumDivision);

      options[i].add("statictext", undefined, TminimumDivision);
      options[i].minimumDivision =    options[i].add("edittext", undefined, choosePref[i].minimumDivision);

      options[i].add("statictext", undefined, ToptimalDivision);
      options[i].optimalDivision =    options[i].add("edittext", undefined, choosePref[i].optimalDivision);

      options[i].add("statictext", undefined, Tframe);
      options[i].frameSize =    options[i].add("edittext", undefined, choosePref[i].frameSize);

      options[i].optimal =            options[i].add("checkbox", undefined, Toptimal);
                                        options[i].optimal.value = choosePref[i].optimal;

                                        options[i].add("statictext", undefined, Tsuffix);
      options[i].suffix =             options[i].add("edittext", undefined, choosePref[i].suffix);


      options[i].overlapWithGraphic = options[i].add("checkbox", undefined, ToverlapWithGraphic);
      options[i].overlapWithGraphic.value = choosePref[i].overlapWithGraphic;

      options[i].add("panel");

      options[i].addScaffolding =     options[i].add("checkbox", undefined, TaddScaffolding);
      options[i].addScaffolding.value = choosePref[i].addScaffolding;

      options[i].add("statictext", undefined, Tlines_Distance);
      options[i].lines_Distance =
      options[i].add("edittext", undefined, choosePref[i].lines_Distance);

      options[i].add("statictext", undefined, TlineWidth);
      options[i].lineWidth =          options[i].add("edittext", undefined, choosePref[i].lineWidth);

      options[i].add("statictext", undefined, TlineLongitude);
      options[i].lineLongitude =      options[i].add("edittext", undefined, choosePref[i].lineLongitude);

      //

    }

    var tab2 = w.add ("tabbedpanel");
    tab2.alignChildren = ["fill", "fill"];
    tab2.preferredSize = [550,700];

    var options2 = tab2.add ("panel", undefined, "Opcje globalne | Global options");
    options2.alignChildren = ["fill", "fill"];;

    var buttonColor = options2.add ("button", undefined, "Wybierz kolor znacznikow | Choose marker color");

    var colorPanel = options2.add("panel {preferredSize: [500, 10]}", undefined, "Pole koloru");
    colorPanel.graphics.backgroundColor = w.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [0.3, 0.3, 0.3]);

    var l_color = greyColorObj;

    buttonColor.onClick = function (){
      app.showColorPicker();
      l_color = app.foregroundColor.cmyk;
      colorPanel.graphics.backgroundColor = colorPanel.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [
        mapRGB(app.foregroundColor.rgb.red,0,255,0,1), mapRGB(app.foregroundColor.rgb.green,0,255,0,1),
        mapRGB(app.foregroundColor.rgb.blue,0,255,0,1)]);
    }

    function mapRGB (num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    // options2
    var searchPath = options2.add ("statictext", undefined,
    "Program sprobuje odnalezc sciezke na automatycznie na podstawie otwartych plikow | Program will search for a path based on opened files ");


    searchPath.onClick = function(){
      sPath.text = (app.activeDocument.path) ? app.activeDocument.fullName + " 😊" : "😖 Error";
    }

    var okButton = options2.add ("button", undefined, "Brytuj 🍻  Divide" , {name: "ok"});

    var cancelButton = options2.add ("button", undefined, "Anuluj ☕ Cancel", {name: "cancel"});


    w.show ();

okButton.onClick = function (){
  alert();
}

// alert(pref.material);

//save history state
var startHistory;

//units
var originalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.CM;

//background to white
app.backgroundColor.cmyk =  whiteColorObj;

//add new layer in case the image is flat (faster than catch(e))

var overlap = pref.overlap;
var merger = pref.merger;
var frameSize = pref.frameSize;

var cacheWidth = app.activeDocument.width.value;
var cacheHeight = app.activeDocument.height.value;

var maximumDivision = pref.maximumDivision;
var minimumDivision = pref.minimumDivision;
var optimalDivision = pref.optimalDivision;

var divisionAmount = cacheWidth / maximumDivision;

var dividedFully = Math.floor(divisionAmount);
var lastDivision = cacheWidth - dividedFully * maximumDivision;
var preLastDivision;

var optimal = pref.optimal;

var lastDivisionIsTooSmall = false;
var Sum;

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
if (pref!==null && pref!==undefined) {
  var myPath = decodeURI(Folder.selectDialog("Select output folder / Wybierz folder wyjsciowy", false, false).fsName);
}
// var myPath = new File((new File($.fileName)).parent);
// var myPath = app.activeDocument.path;
// var fileS = myPath.getFiles()[0].parent;
// myPath = fileS;
// alert(myPath);

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
if (app.documents.length===0) {
  alert("Otwórz dokumenty do przetworzenia / Open files for processing");
} else {
  loop();
}

function loop() {
  for (var i = 0; i < app.documents.length; i++) {
    app.activeDocument = app.documents[i];
    app.activeDocument.flatten();
    if (myPath===null || myPath===undefined) {
      alert("Path error / Blad sciezki !")
    } else {
      divide ();
    }
  }
}

//////////////////

function divide (){

  folderLoc = new Folder(myPath) + "/";

  Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
  //init history
  startHistory = app.activeDocument.activeHistoryState ;

  for (var j = 0; j < divisionWidthsArr.length; j++) {

    if (pref.overlapWithGraphic===true) {
      if (j === 0) {
        saveState();
        resizeForDivision(divisionWidthsArr[j]+overlap,"left");

        drawLines("right");
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

        drawLines("left");
        drawLines("right");
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

        drawLines("left");
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

  //undo all
  undo (startHistory);

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
preferences.numberOfHistoryStates = initialBuffer;
