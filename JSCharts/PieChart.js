
function createPieChart(passes, fails) {
    const total = passes + fails;
    const passPercentage = (passes / total) * 100;
    const failPercentage = (fails / total) * 100;

    // Create SVG container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "600");
    svg.setAttribute("height", "600");
    svg.style.border = "5px solid black";
    svg.style.backgroundColor = "#4CAF50";

    // Add title
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", "300");
    title.setAttribute("y", "50");
    title.setAttribute("text-anchor", "middle");
    title.textContent = "Your Audits Ratio (Pass vs Fail)";
    title.setAttribute("font-size", "25");
    title.setAttribute("fill", "white");
    svg.appendChild(title);

    // Function to create a pie slice (arc)
    function createArc(radius, startAngle, endAngle, color) {
        const startX = 300 + radius * Math.cos(Math.PI * startAngle / 180);
        const startY = 300 + radius * Math.sin(Math.PI * startAngle / 180);
        const endX = 300 + radius * Math.cos(Math.PI * endAngle / 180);
        const endY = 300 + radius * Math.sin(Math.PI * endAngle / 180);
        const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;

        const pathData = [
            "M", 300, 300,  // Move to center
            "L", startX, startY,  // Draw line to start point
            "A", radius, radius, 0, largeArcFlag, 1, endX, endY,  // Draw the arc
            "Z"  // Close the path
        ].join(" ");

        const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arc.setAttribute("d", pathData);
        arc.setAttribute("fill", color);
        svg.appendChild(arc);
    }

    // Calculate angles for each slice
    const passAngle = (passPercentage / 100) * 360;
    const failAngle = (failPercentage / 100) * 360;

    // Draw the pass slice
    createArc(200, 0, passAngle, "green");

    // Draw the fail slice
    createArc(200, passAngle, passAngle + failAngle, "red");

    // Add pass percentage text - adjusted position
    const passText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    passText.setAttribute("x", "300");
    passText.setAttribute("y", "230");  // Adjusted Y for better position
    passText.setAttribute("text-anchor", "middle");
    passText.textContent = `${Math.round(passPercentage)}%`;  // Percentage text
    passText.setAttribute("font-size", "40");
    passText.setAttribute("fill", "white");
    svg.appendChild(passText);

    // Add fail percentage text - adjusted position
    const failText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    failText.setAttribute("x", "300");
    failText.setAttribute("y", "370");  // Adjusted Y for better position
    failText.setAttribute("text-anchor", "middle");
    failText.textContent = `${Math.round(failPercentage)}%`;  // Percentage text
    failText.setAttribute("font-size", "40");
    failText.setAttribute("fill", "red");
    svg.appendChild(failText);

    return svg;
}