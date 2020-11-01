export const animateCount = (element, start, end) => {
    
    const duration = 2000;
    
    var range = end - start;

    var minTimer = 50;

    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        element.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}