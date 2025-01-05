function createBarChart(passes, fails) {
    const total = passes + fails;
    const passPercentage = (passes / total) * 100;
    const failPercentage = (fails / total) * 100;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "450");
    svg.style.border = "5px solid black";
    svg.style.backgroundColor = "#4CAF50";

    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", "200");
    title.setAttribute("y", "40");
    title.setAttribute("text-anchor", "middle");
    title.textContent = "Your Audits Ratio (Pass vs Fail)";
    title.setAttribute("font-size", "25");
    title.setAttribute("fill", "white");
    svg.appendChild(title);

    // Create pass bar
    const passBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    passBar.setAttribute("x", "50");
    passBar.setAttribute("y", 120 + (120 - (passPercentage * 1.2))); // Adjusted position and scaling
    passBar.setAttribute("width", "80");
    passBar.setAttribute("height", passPercentage * 3); // Adjusted height scaling
    passBar.setAttribute("fill", "green");
    passBar.setAttribute("rx", "8"); // Slightly smaller corner radius
    svg.appendChild(passBar);

    // Add pass value text
    const passText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    passText.setAttribute("x", "90"); // Adjusted position
    passText.setAttribute("y", 120 + (120 - (passPercentage * 1.2)) - 10); // Adjusted position for better visibility
    passText.setAttribute("text-anchor", "middle");
    passText.textContent = passes;
    passText.setAttribute("font-size", "30"); // Reduced font size
    passText.setAttribute("fill", "white");
    svg.appendChild(passText);

    // Create fail bar
    const failBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    failBar.setAttribute("x", "230");
    failBar.setAttribute("y", 270 + (120 - (failPercentage * 3))); // Adjusted position and scaling
    failBar.setAttribute("width", "80"); // Reduced width
    failBar.setAttribute("height", failPercentage * 3); // Adjusted height scaling
    failBar.setAttribute("fill", "red");
    failBar.setAttribute("rx", "8"); // Slightly smaller corner radius
    svg.appendChild(failBar);

    // Add fail value text
    const failText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    failText.setAttribute("x", "270"); // Adjusted position
    failText.setAttribute("y", 270 + (120 - (failPercentage * 1.2)) - 10); // Adjusted position for better visibility
    failText.setAttribute("text-anchor", "middle");
    failText.textContent = fails;
    failText.setAttribute("font-size", "30"); // Reduced font size
    failText.setAttribute("fill", "white");
    svg.appendChild(failText);

    return svg;
}
