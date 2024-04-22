const applyFont = (fontName) => {
    let styleId = 'customFontStyle'; // A unique ID for the style element
    let existingStyle = document.getElementById(styleId);

    // If no fontName is provided, remove the style element to revert to default fonts
    if (!fontName) {
        if (existingStyle) {
            existingStyle.remove();
        }
        return;
    }

    // Define the @font-face and apply the font family
    const css = `
        @font-face {
            font-family: 'OpenDyslexic3-Regular';
            src: url('${chrome.runtime.getURL('fonts/OpenDyslexic3-Regular.ttf')}') format('truetype');
        }
        @font-face {
            font-family: 'OpenDyslexic3-Bold';
            src: url('${chrome.runtime.getURL('fonts/OpenDyslexic3-Bold.ttf')}') format('truetype');
        }
        @font-face {
            font-family: 'DyslexiaGlasses-Regular';
            src: url('${chrome.runtime.getURL('fonts/Dyslexiaglasses-Regular.ttf')}') format('truetype');
        }
        * {
            font-family: ${fontName}, sans-serif !important;
        }
    `;

    // Create or update the style element
    if (!existingStyle) {
        existingStyle = document.createElement('style');
        existingStyle.id = styleId;
        document.head.appendChild(existingStyle);
    }
    existingStyle.textContent = css;
};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "changeFont") {
        applyFont(request.fontName);
        sendResponse({status: `Font changed to ${request.fontName}`});
    }
    return true; // This keeps the message channel open in case of asynchronous operations
});
