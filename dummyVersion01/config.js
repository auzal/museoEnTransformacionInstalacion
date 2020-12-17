var CONFIG = {
	colorBackground : null,
	colorBackgroundGradient : null,
	colorText: null,
	margins : 0.1,
	marqueeInterval : 500,
	visualizationInterval: 1000,
	visualizationEntriesTime: 2000,
	buildingTimeOut : 10000,
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
