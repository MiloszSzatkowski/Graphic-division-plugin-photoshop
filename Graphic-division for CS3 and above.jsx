
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
  " Banery | Banner"  ,//name
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
  " Blockout"  ,//name
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
  " Tekstylia | Textiles" ,//name
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
  lineLongitude
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

var ToverlapWithGraphic = "Uzyj laczenia z grafiki | Create overlap from graphic:";
var TaddScaffolding = "Uzyj znacznikow laczenia | Use merging markers:";
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

var choosePref = [baner,blockout,epson];

var Toverlap = "Szerokosc overlapu | Graphics' overlap:";

var w = new Window ('dialog {orientation: "row", alignChildren: [" ", "top"]}',
"Brytowanie grafiki | Graphic division", undefined,{closeButton: false});

var myDropdown = w.add ("dropdownlist", undefined, []);

for (var i = 0; i < choosePref.length; i++) {
   myDropdown.add('item',choosePref[i].name,i);
}

var tab = w.add ('group {orientation: "column", alignChildren: ["fill","fill"]} ');

myDropdown.selection = 1;

tab.add("statictext", undefined, Toverlap);
tab.overlap = tab.add("edittext", undefined, ' ');

tab.add("statictext", undefined, Tmerger);
tab.merger =             tab.add("edittext", undefined, ' ');

tab.add("statictext", undefined, TmaximumDivision);
tab.maximumDivision =    tab.add("edittext", undefined, ' ');

tab.add("statictext", undefined, TminimumDivision);
tab.minimumDivision =    tab.add("edittext", undefined, ' ');

tab.add("statictext", undefined, ToptimalDivision);
tab.optimalDivision =    tab.add("edittext", undefined, ' ');

tab.add("statictext", undefined, Tframe);
tab.frameSize =    tab.add("edittext", undefined, ' ');

w.add("panel");

tab.optimal =            tab.add("checkbox", undefined, Toptimal);
                                  tab.optimal.value = false;

                                  tab.add("statictext", undefined, Tsuffix);
tab.suffix =             tab.add("edittext", undefined, ' ');


tab.overlapWithGraphic = tab.add("checkbox", undefined, ToverlapWithGraphic);
tab.overlapWithGraphic.value = false;

tab.addScaffolding =     tab.add("checkbox", undefined, TaddScaffolding);
tab.addScaffolding.value = false;

tab.add("statictext", undefined, Tlines_Distance);
tab.lines_Distance =
tab.add("edittext", undefined, ' ');

tab.add("statictext", undefined, TlineWidth);
tab.lineWidth =          tab.add("edittext", undefined, ' ');

tab.add("statictext", undefined, TlineLongitude);
tab.lineLongitude =      tab.add("edittext", undefined, ' ');

var tab2 =  w.add ('group {orientation: "column", alignChildren: ["fill","fill"]} ');

tab2.add("statictext", undefined, "Kolor znacznika | Marker's color:");
var colorPanel = tab2.add("group {preferredSize: [500, 10]}", undefined, " ");
colorPanel.graphics.backgroundColor = tab2.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [0.3, 0.3, 0.3]);

var buttonColor = tab2.add ("button", undefined, "Zmien kolor znacznikow | Change markers' color");

l_color = greyColorObj;

buttonColor.onClick = function () {
  tempColor = new CMYKColor();
  color1 = Math.random() * 100;
  color2 = Math.random() * 100;
  color3 = Math.random() * 100;
  color4 = Math.random() * 100;
    tempColor.cyan = color1;  tempColor.magenta  = color2;
    tempColor.yellow = color3;  tempColor.black = color4;
  app.foregroundColor.cmyk = tempColor;
  colorPanel.graphics.backgroundColor = colorPanel.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [
    mapRGB(app.foregroundColor.rgb.red,0,255,0,1), mapRGB(app.foregroundColor.rgb.green,0,255,0,1),
    mapRGB(app.foregroundColor.rgb.blue,0,255,0,1)]);
  l_color = app.foregroundColor.cmyk;
}

function mapRGB (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

myDropdown.onChange = function () {

  for (var i = 0; i < choosePref.length; i++) {
    if (choosePref[i].name.toString() == myDropdown.selection.toString()) {

      tab.compareName = choosePref[i].name;
      tab.overlap.text =  choosePref[i].overlap;
      tab.merger.text =  choosePref[i].merger;
      tab.maximumDivision.text =    choosePref[i].maximumDivision;
      tab.minimumDivision.text =    choosePref[i].minimumDivision;
      tab.optimalDivision.text =     choosePref[i].optimalDivision;
      tab.frameSize.text =   choosePref[i].frameSize;
      tab.optimal.value = choosePref[i].optimal;
      tab.suffix.text = choosePref[i].suffix;
      tab.overlapWithGraphic.value = choosePref[i].overlapWithGraphic;
      tab.addScaffolding.value = choosePref[i].addScaffolding;
      tab.lines_Distance.text =  choosePref[i].lines_Distance;
      tab.lineWidth.text =          choosePref[i].lineWidth;
      tab.lineLongitude.text =      choosePref[i].lineLongitude;

    }
  }

}

var manual = tab2.add ("checkbox", undefined, "Brytuj manualnie | Divide manually");
manual.value = false;
var manualArr;

manual.onClick = function (){
  if (manual.value==true) {
    manualArr = prompt("Podaj wartosci w centymetrach oddzielone przecinkiem \n| Provide values in centimeters seperated by comma    \nOstatni bryt bedzie zawsze wyliczany automatycznie - nie wpisuj go \n| Last Division will be always calculated automatically - don't include it",
    "1,2,3",
    "Brytuj manualnie | Divide manually");
    if (manualArr==null) {
      manual.value = false;
    }
  }
}

var propo = tab2.add ("checkbox", undefined, "Brytuj na pol | Divide by half");
propo.value = false;

byGuides = tab2.add ("checkbox", undefined, "Dziel wzgl. pozycji linii pomocniczych | Divide by guidelines");
byGuides.value = false;
allFiles = tab2.add ("checkbox", undefined, "Brytuj wszystkie pliki | Divide all files");
allFiles.value = false;

var okButton = tab2.add ("iconbutton", undefined, ScriptUI.newImage (File(new File((new File($.fileName)).parent +"/img.png"))));

var cancelButton = tab2.add ("button", undefined, "Anuluj | Cancel", {name: "cancel"});

var appStarted = false;
var pref;

    //// click OK !
    okButton.onClick = function (){
      ///// -- !!!!!!!!!!! pass values to algorithm !!!!!!!!!!! -- /////
        pref = {};

          pref.overlapWithGraphic = tab.overlapWithGraphic.value;
          pref.addScaffolding = tab.addScaffolding.value;
          pref.overlap = parseFloat(tab.overlap.text);
          pref.merger = parseFloat(tab.merger.text);
          pref.frameSize = parseFloat(tab.frameSize.text);
          pref.maximumDivision = parseFloat(tab.maximumDivision.text);
          pref.minimumDivision = parseFloat(tab.minimumDivision.text);
          pref.optimalDivision = parseFloat(tab.optimalDivision.text);
          pref.optimal = tab.optimal.value;
          pref.suffix = tab.suffix.text;
          pref.lines_Distance = parseFloat(tab.lines_Distance.text);
          pref.lineWidth = parseFloat(tab.lineWidth.text);
          pref.lineLongitude = parseFloat(tab.lineLongitude.text);

          appStarted = true;
          w.close();
        }

cancelButton.onClick = function (){
  pref = {};
  pref.overlapWithGraphic = false;
  pref.addScaffolding = false;
  pref.overlap = 0;
  pref.merger = 0;
  pref.frameSize = 0;
  pref.maximumDivision = 0;
  pref.minimumDivision = 0;
  pref.optimalDivision = 0;
  pref.optimal = false;
  pref.suffix = 0
  pref.lines_Distance = 0;
  pref.lineWidth = 0;
  pref.lineLongitude = 0;
  appStarted = false;
  preferences.numberOfHistoryStates = 20;
  w.close();
}

myDropdown.selection = 2;
w.show ();

// alert(pref.overlap);
//save history state
// var startHistory;

var Oldversion = true;

#include 'Algorithm_abstracted.jsx';

var end = true;
