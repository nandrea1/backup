chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	console.log("command is: " + request.command);
	var comstring = request.command;
	try{
	window[comstring](request.data, sendResponse);
	}
	catch(e){
	console.log("Could not launch function with name " + comstring +". See Error Below: ");
	console.log(e);
	}
  });
  
  function greeting(data, callback){
  console.log("data from script is: " + data);
  callback({farewell: "this is a callback!"});
  }
  
  function launchGrooveshark(data, callback){
  var newURL = 'http://www.grooveshark.com';
  chrome.tabs.create({ url: newURL, selected: false});
  
  }
  
  