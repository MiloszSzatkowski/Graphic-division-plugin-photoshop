var baner = new PrefObj(
  false, //overlapWithGraphic
  false, //addScaffolding
  500.5, //widthTreshold
  1, //overlap
  4, //merger
  0.2, //frameSize
  490, //maximumDivision
  71, //minimumDivision
  80, //optimalDivision
  true, //optimal
  "_br_bryt_" // suffix
);

var blockout = new PrefObj(
  false, //overlapWithGraphic
  false, //addScaffolding
  300, //widthTreshold
  1, //overlap
  4, //merger
  0.2, //frameSize
  310, //maximumDivision
  71, //minimumDivision
  80, //optimalDivision
  true, //optimal
  "_bt_bryt_" // suffix
);

var epson = new PrefObj(
  true, //overlapWithGraphic
  true, //addScaffolding
  290, //widthTreshold
  3, //overlap
  0, //merger
  0.2, //frameSize
  290, //maximumDivision
  71, //minimumDivision
  80, //optimalDivision
  true, //optimal
  "_en_bryt_" // suffix
);

function PrefObj (
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
  suffix
  )   {
  this.overlapWithGraphic = overlapWithGraphic;
  this.addScaffolding = addScaffolding;
  this.widthTreshold = widthTreshold;
  this.overlap = overlap;
  this.merger = merger;
  this.frameSize = frameSize;
  this.maximumDivision = maximumDivision;
  this.minimumDivision = minimumDivision;
  this.optimalDivision = optimalDivision;
  this.optimal = optimal;
  this.suffix = suffix;
}
