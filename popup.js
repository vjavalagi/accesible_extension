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
  
  