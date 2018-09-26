
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
      0.15, //lineWidth
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


    var w = new Window ('dialog {orientation: "row", alignChildren: [" ", "top"]}',
    "Brytowanie grafiki | Graphic division", undefined, {closeButton: false});

    w.alignChildren = "right";

    var tab = w.add ("tabbedpanel");
    tab.alignChildren = ["fill", "fill"];
    tab.preferredSize = [350,300];

    var panels = [];
    var options = [];

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

    for (var i = 0; i < choosePref.length; i++) {
      panels.push( tab.add ("tab", undefined, choosePref[i].name) );
      panels[i].compareName = choosePref[i].name;
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

    var tab2 = w.add ("group");
    tab2.alignChildren = ['fill','fill'];
    tab2.preferredSize = [300,700];

    var options2 = tab2.add ("panel", undefined, "Opcje globalne | Global options");
    options2.alignChildren = ['fill','fill'];

    // options2.closing = options2.add("checkbox", undefined, "Zamknij plik po brytowaniu | Close file after division");

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

    // var Btest = options2.add ("button", undefined, "Btest");
    // Btest.onClick = function (){  alert("lol");}
    // options2

    var manual = options2.add ("checkbox", undefined, "Brytuj manualnie | Divide manually");
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

    var propo = options2.add ("checkbox", undefined, "Brytuj na pol | Divide by half");
    propo.value = false;

    byGuides = options2.add ("checkbox", undefined, "Dziel wzgl. pionowych linii pomocniczych | Divide by guidelines");
    byGuides.value = false;
    allFiles = options2.add ("checkbox", undefined, "Brytuj wszystkie pliki | Divide all files");
    allFiles.value = false;

    var okButton = options2.add ("button", undefined, 'Divide || Brytuj');

    // ("button", undefined, "Brytuj   Divide", {name: "ok"});

    var cancelButton = options2.add ("button", undefined, "Anuluj | Cancel", {name: "cancel"});

var appStarted = false;
var pref;

okButton.onClick = function (){
    ///// -- !!!!!!!!!!! pass values to algorithm !!!!!!!!!!! -- /////
    for (var i = 0; i < choosePref.length; i++) {
      if (tab.selection.compareName.toString() == choosePref[i].name.toString()) {
        var tempIndex = i;
        pref = {};

          pref.compareName = tab.selection.compareName;
          pref.overlapWithGraphic = options[tempIndex].overlapWithGraphic.value;
          pref.addScaffolding = options[tempIndex].addScaffolding.value;
          pref.overlap = parseFloat(options[tempIndex].overlap.text);
          pref.merger = parseFloat(options[tempIndex].merger.text);
          pref.frameSize = parseFloat(options[tempIndex].frameSize.text);
          pref.maximumDivision = parseFloat(options[tempIndex].maximumDivision.text);
          pref.minimumDivision = parseFloat(options[tempIndex].minimumDivision.text);
          pref.optimalDivision = parseFloat(options[tempIndex].optimalDivision.text);
          pref.optimal = options[tempIndex].optimal.value;
          pref.suffix = options[tempIndex].suffix.text;
          pref.lines_Distance = parseFloat(options[tempIndex].lines_Distance.text);
          pref.lineWidth = parseFloat(options[tempIndex].lineWidth.text);
          pref.lineLongitude = parseFloat(options[tempIndex].lineLongitude.text);
          // pref.closing = options2.closing.value;

          appStarted = true;
          w.close();
      }
    }
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
  preferences.numberOfHistoryStates = 20;
  appStarted = false;
  w.close();
}

w.show ();

var Oldversion = false;

if (appStarted) {

  #include 'Algorithm_abstracted.jsx';

}

var end = true;
