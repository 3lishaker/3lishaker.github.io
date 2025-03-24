function createPieChart(passes, fails) {
    const total = passes + fails;
    const passPercentage = (passes / total) * 100;
    const failPercentage = (fails / total) * 100;

    // Create SVG container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "600");
    svg.setAttribute("height", "600");
    svg.style.border = "none";
    svg.style.backgroundColor = "#ffffff";
    svg.style.borderRadius = "15px";
    svg.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";

    // Add gradient definitions
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    // Pass gradient
    const passGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    passGradient.setAttribute("id", "passGradient");
    passGradient.setAttribute("x1", "0%");
    passGradient.setAttribute("y1", "0%");
    passGradient.setAttribute("x2", "100%");
    passGradient.setAttribute("y2", "100%");
    
    const passStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    passStop1.setAttribute("offset", "0%");
    passStop1.setAttribute("stop-color", "#4895ef");
    
    const passStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    passStop2.setAttribute("offset", "100%");
    passStop2.setAttribute("stop-color", "#4cc9f0");
    
    passGradient.appendChild(passStop1);
    passGradient.appendChild(passStop2);
    
    // Fail gradient
    const failGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    failGradient.setAttribute("id", "failGradient");
    failGradient.setAttribute("x1", "0%");
    failGradient.setAttribute("y1", "0%");
    failGradient.setAttribute("x2", "100%");
    failGradient.setAttribute("y2", "100%");
    
    const failStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    failStop1.setAttribute("offset", "0%");
    failStop1.setAttribute("stop-color", "#f72585");
    
    const failStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    failStop2.setAttribute("offset", "100%");
    failStop2.setAttribute("stop-color", "#b5179e");
    
    failGradient.appendChild(failStop1);
    failGradient.appendChild(failStop2);
    
    defs.appendChild(passGradient);
    defs.appendChild(failGradient);
    svg.appendChild(defs);

    // Add background
    const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    background.setAttribute("x", "0");
    background.setAttribute("y", "0");
    background.setAttribute("width", "600");
    background.setAttribute("height", "600");
    background.setAttribute("fill", "#ffffff");
    background.setAttribute("rx", "15");
    svg.appendChild(background);

    // Add title
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", "300");
    title.setAttribute("y", "50");
    title.setAttribute("text-anchor", "middle");
    title.textContent = "Your Audits Ratio";
    title.setAttribute("font-size", "24");
    title.setAttribute("font-weight", "bold");
    title.setAttribute("fill", "#4361ee");
    svg.appendChild(title);

    const subtitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    subtitle.setAttribute("x", "300");
    subtitle.setAttribute("y", "80");
    subtitle.setAttribute("text-anchor", "middle");
    subtitle.textContent = "Pass vs Fail";
    subtitle.setAttribute("font-size", "18");
    subtitle.setAttribute("fill", "#3f37c9");
    svg.appendChild(subtitle);

    // Function to create a pie slice (arc) with animation
    function createArc(radius, startAngle, endAngle, color, delay) {
        const startX = 300 + radius * Math.cos(Math.PI * startAngle / 180);
        const startY = 300 + radius * Math.sin(Math.PI * startAngle / 180);
        const endX = 300 + radius * Math.cos(Math.PI * endAngle / 180);
        const endY = 300 + radius * Math.sin(Math.PI * endAngle / 180);
        const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;

        // Create a group for the arc and its animation
        const arcGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        // Create the arc path
        const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        // Set initial path data (just a point at the center)
        arc.setAttribute("d", `M 300 300 L 300 300 Z`);
        arc.setAttribute("fill", color);
        arc.setAttribute("stroke", "#ffffff");
        arc.setAttribute("stroke-width", "2");
        
        // Add to the group
        arcGroup.appendChild(arc);
        svg.appendChild(arcGroup);
        
        // Animate the arc after a delay
        setTimeout(() => {
            // Set the final path data
            const pathData = [
                "M", 300, 300,  // Move to center
                "L", startX, startY,  // Draw line to start point
                "A", radius, radius, 0, largeArcFlag, 1, endX, endY,  // Draw the arc
                "Z"  // Close the path
            ].join(" ");
            
            arc.style.transition = "d 1s ease-out";
            arc.setAttribute("d", pathData);
        }, delay);
        
        return arcGroup;
    }

    // Calculate angles for each slice
    const passAngle = (passPercentage / 100) * 360;
    const failAngle = (failPercentage / 100) * 360;

    // Draw the pass slice
    createArc(200, 0, passAngle, "url(#passGradient)", 100);

    // Draw the fail slice
    createArc(200, passAngle, passAngle + failAngle, "url(#failGradient)", 300);

    // Add center circle for donut effect
    const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerCircle.setAttribute("cx", "300");
    centerCircle.setAttribute("cy", "300");
    centerCircle.setAttribute("r", "0");
    centerCircle.setAttribute("fill", "#ffffff");
    centerCircle.setAttribute("stroke", "#f8f9fa");
    centerCircle.setAttribute("stroke-width", "2");
    svg.appendChild(centerCircle);
    
    // Animate the center circle
    setTimeout(() => {
        centerCircle.style.transition = "r 0.5s ease-out";
        centerCircle.setAttribute("r", "100");
    }, 800);

    // Add pass label
    const passLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    passLabel.setAttribute("x", "200");
    passLabel.setAttribute("y", "200");
    passLabel.setAttribute("text-anchor", "middle");
    passLabel.textContent = "PASS";
    passLabel.setAttribute("font-size", "18");
    passLabel.setAttribute("font-weight", "bold");
    passLabel.setAttribute("fill", "#4361ee");
    passLabel.setAttribute("opacity", "0");
    svg.appendChild(passLabel);
    
    // Animate the pass label
    setTimeout(() => {
        passLabel.style.transition = "opacity 0.5s ease-in-out";
        passLabel.setAttribute("opacity", "1");
    }, 1000);

    // Add pass percentage text
    const passText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    passText.setAttribute("x", "200");
    passText.setAttribute("y", "230");
    passText.setAttribute("text-anchor", "middle");
    passText.textContent = `${Math.round(passPercentage)}%`;
    passText.setAttribute("font-size", "28");
    passText.setAttribute("font-weight", "bold");
    passText.setAttribute("fill", "#4361ee");
    passText.setAttribute("opacity", "0");
    svg.appendChild(passText);
    
    // Animate the pass percentage
    setTimeout(() => {
        passText.style.transition = "opacity 0.5s ease-in-out";
        passText.setAttribute("opacity", "1");
    }, 1200);

    // Add pass count
    const passCount = document.createElementNS("http://www.w3.org/2000/svg", "text");
    passCount.setAttribute("x", "200");
    passCount.setAttribute("y", "255");
    passCount.setAttribute("text-anchor", "middle");
    passCount.textContent = `(${passes} audits)`;
    passCount.setAttribute("font-size", "14");
    passCount.setAttribute("fill", "#4361ee");
    passCount.setAttribute("opacity", "0");
    svg.appendChild(passCount);
    
    // Animate the pass count
    setTimeout(() => {
        passCount.style.transition = "opacity 0.5s ease-in-out";
        passCount.setAttribute("opacity", "1");
    }, 1400);

    // Add fail label
    const failLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    failLabel.setAttribute("x", "400");
    failLabel.setAttribute("y", "370");
    failLabel.setAttribute("text-anchor", "middle");
    failLabel.textContent = "FAIL";
    failLabel.setAttribute("font-size", "18");
    failLabel.setAttribute("font-weight", "bold");
    failLabel.setAttribute("fill", "#f72585");
    failLabel.setAttribute("opacity", "0");
    svg.appendChild(failLabel);
    
    // Animate the fail label
    setTimeout(() => {
        failLabel.style.transition = "opacity 0.5s ease-in-out";
        failLabel.setAttribute("opacity", "1");
    }, 1000);

    // Add fail percentage text
    const failText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    failText.setAttribute("x", "400");
    failText.setAttribute("y", "400");
    failText.setAttribute("text-anchor", "middle");
    failText.textContent = `${Math.round(failPercentage)}%`;
    failText.setAttribute("font-size", "28");
    failText.setAttribute("font-weight", "bold");
    failText.setAttribute("fill", "#f72585");
    failText.setAttribute("opacity", "0");
    svg.appendChild(failText);
    
    // Animate the fail percentage
    setTimeout(() => {
        failText.style.transition = "opacity 0.5s ease-in-out";
        failText.setAttribute("opacity", "1");
    }, 1200);

    // Add fail count
    const failCount = document.createElementNS("http://www.w3.org/2000/svg", "text");
    failCount.setAttribute("x", "400");
    failCount.setAttribute("y", "425");
    failCount.setAttribute("text-anchor", "middle");
    failCount.textContent = `(${fails} audits)`;
    failCount.setAttribute("font-size", "14");
    failCount.setAttribute("fill", "#f72585");
    failCount.setAttribute("opacity", "0");
    svg.appendChild(failCount);
    
    // Animate the fail count
    setTimeout(() => {
        failCount.style.transition = "opacity 0.5s ease-in-out";
        failCount.setAttribute("opacity", "1");
    }, 1400);

    // Add total in center
    const totalLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    totalLabel.setAttribute("x", "300");
    totalLabel.setAttribute("y", "290");
    totalLabel.setAttribute("text-anchor", "middle");
    totalLabel.textContent = "TOTAL";
    totalLabel.setAttribute("font-size", "16");
    totalLabel.setAttribute("fill", "#212529");
    totalLabel.setAttribute("opacity", "0");
    svg.appendChild(totalLabel);
    
    // Animate the total label
    setTimeout(() => {
        totalLabel.style.transition = "opacity 0.5s ease-in-out";
        totalLabel.setAttribute("opacity", "1");
    }, 1600);

    // Add total count
    const totalCount = document.createElementNS("http://www.w3.org/2000/svg", "text");
    totalCount.setAttribute("x", "300");
    totalCount.setAttribute("y", "320");
    totalCount.setAttribute("text-anchor", "middle");
    totalCount.textContent = total;
    totalCount.setAttribute("font-size", "24");
    totalCount.setAttribute("font-weight", "bold");
    totalCount.setAttribute("fill", "#212529");
    totalCount.setAttribute("opacity", "0");
    svg.appendChild(totalCount);
    
    // Animate the total count
    setTimeout(() => {
        totalCount.style.transition = "opacity 0.5s ease-in-out";
        totalCount.setAttribute("opacity", "1");
    }, 1800);

    return svg;
}