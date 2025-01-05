function createPiscineBarChart(PiscineCount, ChartTitle, TopResults) {

    // Set up the SVG container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "1000");
    svg.setAttribute("height", "600");
    svg.style.border = "5px solid black";
    svg.style.backgroundColor = "#4CAF50";

    // Create the title
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", "500");
    title.setAttribute("y", "40");
    title.setAttribute("text-anchor", "middle");
    title.textContent = ChartTitle;
    title.setAttribute("font-size", "30");
    title.setAttribute("fill", "white");
    svg.appendChild(title);

    // Parameters for the bar chart
    const maxHeight = 400;  // max height for bars
    const barWidth = 40;    // width of each bar
    const margin = 9;      // margin between bars

    const labels = Object.keys(PiscineCount); // Get exercise names (labels)
    const dataValues = Object.values(PiscineCount); // Get counts for each exercise
    const maxDataValue = Math.max(...dataValues) + 10; // Find max value and add buffer (10)

    const scaleY = maxHeight / maxDataValue;  // Calculate the scale for Y-axis
    const scaleX = barWidth + margin;  // Space between bars

    // Loop through the data and create bars [From 0 to TopResults]
    labels.slice(0, TopResults).forEach((label, index) => {
        const barHeight = dataValues[index] * scaleY;  // Calculate height of the bar

        // Create the bar (rectangle element)
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", scaleX * index + margin);
        bar.setAttribute("y", maxHeight - barHeight);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("class", "bar");
        bar.style.fill = "#4bc0c0";
        svg.appendChild(bar);

        // Create X-axis bar labels
        const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labelText.setAttribute("x", scaleX * index + margin + barWidth / 2);
        labelText.setAttribute("y", maxHeight + 70); // 70 to move the label below the bar
        labelText.setAttribute("text-anchor", "middle");
        labelText.setAttribute("font-size", "12");
        labelText.setAttribute("font-weight", "bold");
        labelText.setAttribute("fill", "black");
        labelText.setAttribute("transform", "rotate(-90 " + (scaleX * index + margin + barWidth / 2) + " " + (maxHeight + 70) + ")"); // 70 to move the label below the bar
        labelText.textContent = label;
        svg.appendChild(labelText);

        // Create Y-axis bar labels (Attempts)
        const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        valueText.setAttribute("x", scaleX * index + margin + barWidth / 2);
        valueText.setAttribute("y", maxHeight - barHeight - 5);  // Set Y position above the bar
        valueText.setAttribute("text-anchor", "middle");
        valueText.setAttribute("font-size", "14");
        valueText.setAttribute("font-weight", "bold");
        valueText.setAttribute("fill", "black");
        valueText.textContent = dataValues[index];  // Display the count value
        svg.appendChild(valueText);
    });

    // Draw the X-axis
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", "0");
    xAxis.setAttribute("y1", maxHeight);  // Starting point Y (at bottom)
    xAxis.setAttribute("x2", labels.length * scaleX);
    xAxis.setAttribute("y2", maxHeight);
    xAxis.setAttribute("stroke", "#fff");
    xAxis.setAttribute("stroke-width", "3");
    svg.appendChild(xAxis);

    // Draw the Y-axis
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", "0");
    yAxis.setAttribute("y1", "0");
    yAxis.setAttribute("x2", "0");
    yAxis.setAttribute("y2", maxHeight);
    svg.appendChild(yAxis);

    return svg;
}
