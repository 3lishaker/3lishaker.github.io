function createLineChart(projects, NumberOfName) {

    // 1. Prepare data arrays for X and Y axis
    const dates = projects.map(project => new Date(project.updatedCompletedDate).getTime()); // Convert to timestamps
    const xpValues = projects.map(project => project.projectXP);

    // 2. Determine the chart's width and height
    const width = 1000;  // Reduced width
    const height = 500; // Reduced height
    const padding = 120; // Reduced padding around the chart

    // 3. Normalize the data to fit within the chart's dimensions
    const minXP = Math.min(...xpValues);
    const maxXP = Math.max(...xpValues);
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);

    // Create the SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.style.border = "5px solid black";
    svg.style.backgroundColor = "#4CAF50";

    // Create title 
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", "500"); // Adjusted to center the title
    title.setAttribute("y", "40");
    title.setAttribute("text-anchor", "middle");
    title.textContent = "Earned XP Per Project";
    title.setAttribute("font-size", "30"); // font size
    title.setAttribute("fill", "white");
    svg.appendChild(title);

    // 4. Scale function to convert data points to chart coordinates
    const scaleX = (date) => padding + (date - minDate) / (maxDate - minDate) * (width - 2 * padding);
    const scaleY = (xp) => height - padding - (xp - minXP) / (maxXP - minXP) * (height - 2 * padding);

    // 5. Create the line path for the chart
    let pathData = `M${scaleX(dates[0])},${scaleY(xpValues[0])}`; // Start path from the first data point
    for (let i = 1; i < projects.length; i++) {
        pathData += ` L${scaleX(dates[i])},${scaleY(xpValues[i])}`; // Add line to each subsequent point
    }

    // 6. Create the path element for the line chart
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", "blue");
    path.setAttribute("stroke-width", "2"); // Slightly smaller stroke width
    path.setAttribute("fill", "none");

    // 7. Append the path to the SVG
    svg.appendChild(path);

    // 8. Add grid lines (horizontal and vertical)
    const gridLines = 4; // number of grid lines
    for (let i = 1; i <= gridLines; i++) {

        // Horizontal grid lines
        const horizontalGridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        horizontalGridLine.setAttribute("x1", padding);
        horizontalGridLine.setAttribute("y1", scaleY(minXP + (i * (maxXP - minXP)) / gridLines));
        horizontalGridLine.setAttribute("x2", width - padding);
        horizontalGridLine.setAttribute("y2", scaleY(minXP + (i * (maxXP - minXP)) / gridLines));
        horizontalGridLine.setAttribute("stroke", "#e0e0e0");
        horizontalGridLine.setAttribute("stroke-width", "0.5");
        svg.appendChild(horizontalGridLine);

        // Vertical grid lines
        const verticalGridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        verticalGridLine.setAttribute("x1", scaleX(minDate + (i * (maxDate - minDate)) / gridLines));
        verticalGridLine.setAttribute("y1", padding);
        verticalGridLine.setAttribute("x2", scaleX(minDate + (i * (maxDate - minDate)) / gridLines));
        verticalGridLine.setAttribute("y2", height - padding);
        verticalGridLine.setAttribute("stroke", "#e0e0e0");
        verticalGridLine.setAttribute("stroke-width", "0.5");
        svg.appendChild(verticalGridLine);
    }

    // 9. X-axis (horizontal)
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", padding);
    xAxis.setAttribute("y1", height - padding);
    xAxis.setAttribute("x2", width - padding);
    xAxis.setAttribute("y2", height - padding);
    xAxis.setAttribute("stroke", "black");
    svg.appendChild(xAxis);

    // 10. Y-axis (vertical)
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", padding);
    yAxis.setAttribute("y1", padding);
    yAxis.setAttribute("x2", padding);
    yAxis.setAttribute("y2", height - padding);
    yAxis.setAttribute("stroke", "black");
    svg.appendChild(yAxis);

    // 11. Add axis labels
    const xAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    xAxisLabel.setAttribute("x", width / 2);
    xAxisLabel.setAttribute("y", height - padding / 3);
    xAxisLabel.setAttribute("text-anchor", "middle");
    xAxisLabel.setAttribute("font-weight", "bold");
    xAxisLabel.textContent = "Date";
    svg.appendChild(xAxisLabel);

    const yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yAxisLabel.setAttribute("x", padding / 2);
    yAxisLabel.setAttribute("y", height / 2);
    yAxisLabel.setAttribute("text-anchor", "middle");
    yAxisLabel.setAttribute("transform", "rotate(-90 " + padding / 2 + "," + height / 2 + ")");
    yAxisLabel.setAttribute("font-weight", "bold");
    yAxisLabel.textContent = "XP (KB)";
    svg.appendChild(yAxisLabel);

    // 12. Add value markers (tick marks)
    const tickSize = 4; // tick size
    const numTicksX = 4; // number of X ticks
    const numTicksY = 4; // number of Y ticks

    // X-axis value markers
    for (let i = 0; i <= numTicksX; i++) {
        const xTick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const xValue = minDate + (i * (maxDate - minDate)) / numTicksX;
        xTick.setAttribute("x1", scaleX(xValue));
        xTick.setAttribute("y1", height - padding);
        xTick.setAttribute("x2", scaleX(xValue));
        xTick.setAttribute("y2", height - padding + tickSize);
        xTick.setAttribute("stroke", "black");
        svg.appendChild(xTick);

        const xTickLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xTickLabel.setAttribute("x", scaleX(xValue));
        xTickLabel.setAttribute("y", height - padding + tickSize + 30); //Date label position
        xTickLabel.setAttribute("text-anchor", "middle");
        xTickLabel.textContent = new Date(xValue).toLocaleDateString();
        svg.appendChild(xTickLabel);
    }

    // Y-axis value markers
    for (let i = 0; i <= numTicksY; i++) {
        const yTick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const yValue = minXP + (i * (maxXP - minXP)) / numTicksY;
        yTick.setAttribute("x1", padding - tickSize);
        yTick.setAttribute("y1", scaleY(yValue));
        yTick.setAttribute("x2", padding);
        yTick.setAttribute("y2", scaleY(yValue));
        yTick.setAttribute("stroke", "black");
        svg.appendChild(yTick);

        const yTickLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yTickLabel.setAttribute("x", padding - tickSize - 12);
        yTickLabel.setAttribute("y", scaleY(yValue) + 4);
        yTickLabel.setAttribute("text-anchor", "end");
        yTickLabel.textContent = yValue;
        svg.appendChild(yTickLabel);
    }

    // 13. Add project names
    projects.forEach((project, index) => {

        // Add a circle at each project name
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const xPos = scaleX(dates[index]);
        const yPos = scaleY(xpValues[index]);
        circle.setAttribute("cx", xPos);
        circle.setAttribute("cy", yPos);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", "red");
        circle.setAttribute("stroke", "black");
        svg.appendChild(circle);

        if ((index + 1) % NumberOfName === 0) {

            // Add the project name near the project name
            const projectName = document.createElementNS("http://www.w3.org/2000/svg", "text");
            projectName.setAttribute("x", xPos);
            projectName.setAttribute("y", yPos - 30); // position for project name
            projectName.setAttribute("fill", "white");
            projectName.setAttribute("font-size", "12"); // font size for project names
            projectName.textContent = project.projectName;
            svg.appendChild(projectName);
        }
    });

    return svg;
}
