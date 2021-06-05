/* 
  Copyright 2020. Jefferson "jscher2000" Scher. License: MPL-2.0.
  version 0.5 - initial concept
*/

const handleShortcut = async (strName) => {
  const tabs = await browser.tabs.query({
    currentWindow: true,
    hidden: false
  }).then(tabs => tabs.sort((a, b) => a.index - b.index));

  const currentTab = tabs.find(_ => _.active);

  const nextTab = currentTab.index === tabs.length - 1 ? tabs[0] : tabs[currentTab.index + 1]

  const previousTab = currentTab.index === 0 ? tabs[tabs.length - 1] : tabs[currentTab.index - 1]

  if (strName === 'pin-tab') {
    return browser.tabs.update(currentTab.id, {
      pinned: !currentTab.pinned
    });
  }

  if (strName === 'left-tab') {
    return browser.tabs.update(previousTab.id, {
      active: true
    });
  }

  if (strName === 'right-tab') {
    return browser.tabs.update(nextTab.id, {
      active: true
    });
  }
  return;
};

browser.commands.onCommand.addListener(handleShortcut);
