// Function to apply or remove custom fonts
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

// Function to adjust font size
let currentFontSize = 100; // Default font size in percent
const adjustFontSize = (adjustment) => {
    const adjustmentAmount = 5; // Adjust font size by 5% for subtler changes
    if (adjustment === "increase") {
        currentFontSize += adjustmentAmount;
    } else if (adjustment === "decrease") {
        currentFontSize = Math.max(50, currentFontSize - adjustmentAmount); // Don't go below 50%
    }
    document.querySelectorAll('*').forEach(element => {
        element.style.fontSize = `${currentFontSize}%`;
    });
};

// Function to adjust font color
let currentFontColor = '#000000'; // Default font color in hex
const adjustFontColor = (adjustment) => {
    let colorValue = parseInt(currentFontColor.replace('#', ''), 16); // Convert hex to decimal
    if (adjustment === "darker") {
        colorValue = Math.max(0, colorValue - 0x101010); // Darken the color
    } else if (adjustment === "lighter") {
        colorValue = Math.min(0xFFFFFF, colorValue + 0x101010); // Lighten the color
    }
    currentFontColor = '#' + colorValue.toString(16).padStart(6, '0'); // Convert back to hex
    document.querySelectorAll('*').forEach(element => {
        element.style.color = currentFontColor;
    });
};

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "changeFont") {
        applyFont(request.fontName);
        sendResponse({status: `Font changed to ${request.fontName}`});
    } else if (request.action === "changeFontSize") {
        adjustFontSize(request.adjustment);
        sendResponse({status: `Font size adjusted to ${currentFontSize}%`});
    } else if (request.action === "changeFontColor") {
        adjustFontColor(request.adjustment);
        sendResponse({status: `Font color changed to ${currentFontColor}`});
    }
    return true; // Keep the message channel open for asynchronous operations
});
