import numeral from 'numeral';

export const animateCount = (element, start, end) => {
    
    const duration = 1000;
    
    const price = end.toString().replace(/[.]+/g, "");
    const priceFormat = numeral(price).format('0,0');

    console.log(start, price)

    var range = price - parseFloat(start.toString().replace(/[.]+/g, ""));

    var minTimer = 50;

    var stepTime = Math.abs(Math.floor(duration / range));
    
    stepTime = Math.max(stepTime, minTimer);
    
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(price - (remaining * range));

        element.innerHTML = numeral(value).format('0,0').replace(/[,]+/g, ".");
        if (value == price) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}