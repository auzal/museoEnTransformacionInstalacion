var CONFIG = {
	colorBackground : null,
	colorBackgroundGradient : null,
	colorText: null,
	margins : 0.1,
	marqueeInterval : 500,
	visualizationInterval: 3000,
	visualizationEntriesTime: 4000,
	buildingTimeOut : 10000,
	fontMed : null,
	fontLight : null, 
	fontBold : null, 
	maxLinks: 10,
	maxVisualizationLength: 40,
	buildingFade: 2000,
	minEntryLength: 10,
	maxEntryLength: 100,
	maxNumbersInEntry: 5,

}

var DATA = {
	forbiddenTerms : null,
 	forbiddenTermsNoFormat: null,
	keyLists : [],
	keyListsNoFormat : [],
	answers : [],
	answersNoFormat : [],
	buildingData: null,
}

var GLOBALS = {
	currentState : "STANDBY",
	keepLoadingLists : true,
	marquee : null,
	fade: null,
	building: null,
	entryVisualizer: null,
	minFontSize : 8,
	newPendingEntries: [],
}
