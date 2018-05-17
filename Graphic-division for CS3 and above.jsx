
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
"Brytowanie grafiki | Graphic division", undefined);

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
var color1 = tab2.add("edittext", undefined, 'CYAN');
var color2 = tab2.add("edittext", undefined, 'RED');
var color3 = tab2.add("edittext", undefined, 'MAGENTA');
var color4 = tab2.add("edittext", undefined, 'BLACK');
var buttonColor = tab2.add ("button", undefined, "Zmien kolor znacznikow | Change markers' color");

buttonColor.onClick = function () {
  
}

myDropdown.onChange = function () {

  for (var i = 0; i < choosePref.length; i++) {
    if (choosePref[i].name.toString() == myDropdown.selection.toString()) {

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

w.show ();
