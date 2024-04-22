document.getElementById('defaultFont').addEventListener('click', function() {
    changeFont('');
  });
  
  document.getElementById('openDyslexic').addEventListener('click', function() {
    changeFont('OpenDyslexic3-Regular');
  });
  
  document.getElementById('openDyslexicBold').addEventListener('click', function() {
    changeFont('OpenDyslexic3-Bold');
  });
  document.getElementById('dyslexicGlasses').addEventListener('click', function() {
    changeFont('DyslexiaGlasses-Regular');
  });
  document.getElementById('increaseFont').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeFontSize", adjustment: "increase"});
      });
  });

  document.getElementById('decreaseFont').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "changeFontSize", adjustment: "decrease"});
      });
  });

  
  function changeFont(fontName) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "changeFont", fontName: fontName}, function(response) {
        if (chrome.runtime.lastError) {
          console.error(`Error: ${chrome.runtime.lastError.message}`);
        } else if (response) {
          console.log(response.status);
        }
      });
    });
  }
  document.getElementById('darkerFont').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeFontColor", adjustment: "darker"});
      });
  });

  document.getElementById('lighterFont').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "changeFontColor", adjustment: "lighter"});
      });
  });

  