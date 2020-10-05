
const mapNumber = (number, inMin, inMax, outMin, outMax) => {
	return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export const circleRadius = (duration, interval) => {
	if (interval === 'days') return mapNumber(duration, 365, 0, 0, 360);
	else if (interval === 'hours') return mapNumber(duration, 100, 0, 0, 360);
	else if (interval === 'minutes') return mapNumber(duration, 60, 0, 0, 360);
	else if (interval === 'seconds') return mapNumber(duration, 60, 0, 0, 360);
} 


const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  

export const describeArc = (x, y, radius, startAngle, endAngle) => {

    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
  
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
    const d = [
			"M", start.x, start.y, 
			"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  
    return d;       
  }
  