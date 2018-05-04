metaCharset='utf-8';

var baner = new PrefObj(
  "Banery i siatki | Banners and meshes."  ,//name
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
  "Blockout jednostronny | One-sided blockout ."  ,//name
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
  "Tekstylia | Textiles." ,//name
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
  widthTreshold,
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


var w = new Window ("dialog",
"Brytowanie grafiki | Graphic division", undefined, {closeButton: false});

w.alignChildren = "right";

var tab = w.add ("tabbedpanel");
tab.alignChildren = ["fill", "fill"];
tab.preferredSize = [350,300];

var panels = [];
var options = [];

var ToverlapWithGraphic = "Użyj łączenia z grafiki | Create overlap from graphic";
var TaddScaffolding = "Użyj znaczników łączenia | Use merging markers.";
var Toptimal = "Używaj mniejszych brytów, gdy to tylko możliwe | Use smaller divisions whenever possible. ";
var Toverlap = "Szerokość łączenia się grafik | Graphics' overlap";
var Tmerger = "Szerokość elementu zgrzewania | Width of weld.";
var TmaximumDivision = "Maksymalna szerokość brytu | Maximal division width.";
var TminimumDivision = "Minimalna szerokość brytu | Minimal division width.";
var ToptimalDivision = unescape(encodeURIComponent("Szerokość do której wyrównywany jest zbyt mały bryt przy preferowaniu mniejszych brytów | Optimal width for leftovers' fixing."));
var Tsuffix = "Suffix dodawany do nazwy | Suffix ";
var Tlines_Distance = "Pionowa odległość pomiędzy liniami znaczników | Vertical distance between markers.";
var TlineWidth = "Grubość znacznika | Width of marker.";
var TlineLongitude = "Szerokość znacznika | How long is a marker.";

for (var i = 0; i < choosePref.length; i++) {
  panels.push( tab.add ("tab", undefined, choosePref[i].name) );
  panels[i].alignChildren = "fill";
  options[i] = panels[i].add ("panel", undefined, "Options | Opcje");
  options[i].alignChildren = "left";

  options[i].overlapWithGraphic = options[i].add("edittext", undefined, );
                                    options[i].overlapWithGraphic.value = choosePref[i].overlapWithGraphic;

  options[i].addScaffolding =     options[i].add("checkbox", undefined, TaddScaffolding);
                                    options[i].addScaffolding.value = choosePref[i].addScaffolding;

  options[i].overlap =            options[i].add("edittext", undefined, choosePref[i].overlap);
  options[i].add("statictext", undefined, Toverlap);

  options[i].merger =             options[i].add("edittext", undefined, choosePref[i].merger);
  options[i].add("statictext", undefined, Tmerger);

  options[i].maximumDivision =    options[i].add("edittext", undefined, choosePref[i].maximumDivision);
  options[i].add("statictext", undefined, TmaximumDivision);

  options[i].minimumDivision =    options[i].add("edittext", undefined, choosePref[i].minimumDivision);
  options[i].add("statictext", undefined, TminimumDivision);

  options[i].optimalDivision =    options[i].add("edittext", undefined, choosePref[i].optimalDivision);
  options[i].add("statictext", undefined, ToptimalDivision);

  options[i].optimal =            options[i].add("edittext", undefined, Toptimal);
                                    options[i].optimal.value = choosePref[i].optimal;

  options[i].suffix =             options[i].add("edittext", undefined, choosePref[i].suffix);
  options[i].add("statictext", undefined, Tsuffix);

  options[i].lines_Distance =     options[i].add("edittext", undefined, choosePref[i].lines_Distance);
  options[i].add("statictext", undefined, Tlines_Distance);

  options[i].lineWidth =          options[i].add("edittext", undefined, choosePref[i].lineWidth);
  options[i].add("statictext", undefined, TlineWidth);

  options[i].lineLongitude =      options[i].add("edittext", undefined, choosePref[i].lineLongitude);
  options[i].add("statictext", undefined, TlineLongitude);

}

var buttons = w.add ("group");
var exporta = buttons.add ("button", undefined, "Export", {name: "ok"});
buttons.add ("button", undefined, "Cancel");

w.show ();
