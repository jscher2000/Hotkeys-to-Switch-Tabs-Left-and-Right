/* 
  Copyright 2020. Jefferson "jscher2000" Scher. License: MPL-2.0.
  version 0.5 - initial concept
*/

/**** Keyboard shortcut handler ****/
browser.commands.onCommand.addListener((strName) => {
	// Get current window non-hidden tabs
	browser.tabs.query({
		currentWindow: true,
		hidden: false
	}).then((arrTabs) => {
		// Sort the tab array by position just in case it isn't already
		console.log(arrTabs);
		arrTabs.sort( function(a,b) {return (a.index - b.index);} )
		console.log(arrTabs);
		// Locate the active tab in the array
		var nActive = arrTabs.findIndex( oTab => oTab.active === true );
		// Make the appropriate tab active instead
		if (strName === 'left-tab'){
			// Figure out the tab id
			if (nActive > 0){
				var newId = arrTabs[nActive - 1].id;
			} else {
				// go to the last tab
				newId = arrTabs[arrTabs.length - 1].id;
			}
			// Make it active
			browser.tabs.update(newId, {active:true});
		} else if (strName === 'right-tab'){
			// Figure out the tab id
			if (nActive < (arrTabs.length - 1)){
				newId = arrTabs[nActive + 1].id;
			} else {
				// go to the first tab
				newId = arrTabs[0].id;
			}
			// Make it active
			browser.tabs.update(newId, {active:true});
		}
	});
})