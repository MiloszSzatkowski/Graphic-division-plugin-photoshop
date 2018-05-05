metaCharset='utf-8';

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

var okButton = options2.add ("button", undefined, "Brytuj 🍻  Divide" , {name: "ok"});

var cancelButton = options2.add ("button", undefined, "Anuluj ☕ Cancel", {name: "cancel"});

w.show ();
