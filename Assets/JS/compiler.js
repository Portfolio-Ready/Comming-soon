// Function to update the iframe with HTML, CSS, and JavaScript
function updateOutput() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const jsCode = document.getElementById("js-code").value;

    const output = document.getElementById("output");
    const consoleMessages = document.getElementById("console-messages");
    consoleMessages.innerHTML = ""; // Clear console messages on each run

    output.contentDocument.body.innerHTML = htmlCode;

    // Clear existing styles and scripts to avoid duplicates
    output.contentDocument.head.innerHTML = ''; 

    // Create and apply the CSS in a <style> tag
    const styleTag = output.contentDocument.createElement("style");
    styleTag.innerHTML = cssCode;
    output.contentDocument.head.appendChild(styleTag);

    // Override console.log to capture logs within the iframe
    output.contentWindow.console.log = function (message) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = `> ${message}`;
        consoleMessages.appendChild(messageDiv);
    };

    // Catch errors in JavaScript and display in the console
    output.contentWindow.onerror = function (message, source, lineno, colno, error) {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = `Error: ${message} at line ${lineno}, column ${colno}`;
        errorDiv.style.color = "#ff6666"; // Red color for errors
        consoleMessages.appendChild(errorDiv);
    };

    // Create and apply the JavaScript code in a <script> tag
    const scriptTag = output.contentDocument.createElement("script");
    scriptTag.innerHTML = jsCode;
    output.contentDocument.body.appendChild(scriptTag);
}

// Run code only when the Run button is clicked
document.getElementById("run-button").addEventListener("click", updateOutput);









