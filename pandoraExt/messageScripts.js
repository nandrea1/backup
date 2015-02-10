chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.action == "groovesharkLogin")
		$('#groovesharkLogin').show();
      sendResponse({result: "success"});
  });
  
 chrome.tabs.executeScript(null, {file:"jquery.min.js"}, function() {
    chrome.tabs.executeScript(null, {file:"pandora.js"});
});