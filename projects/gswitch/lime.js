// lime.js - minimal mock
var lime = lime || {};

lime.embed = function(gameName, domId, width, height, options) {
    console.log("Mock lime.embed called with:", gameName, domId, width, height, options);

    // Create a canvas if it doesn't exist
    var container = document.getElementById(domId);
    if (!container) {
        console.error("Container element '" + domId + "' not found.");
        return;
    }

    // If a canvas doesn't already exist, add one
    if (!container.querySelector('canvas')) {
        var canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        container.appendChild(canvas);
    }
};
