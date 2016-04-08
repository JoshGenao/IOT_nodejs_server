/**
 * Created by joshgenao on 4/6/16.
 */

var origPercent = 30;

// on page load...
moveProgressBar(origPercent);

// on browser resize...
$(window).resize(function () {
    moveProgressBar(origPercent);
});

var socket = io();

/** Adds the visual message to the corresponding progress bars.
 * The progress bar represents the CPU Usage, Disk Usage, and
 * Temperature of the Raspberry Pi client.
 */

function updateProgressBars(data) {
    /**
     * TODO: Need to be able to parse data and differentiate what data goes to each progress bar
     * Data passing in will be JSON data and this will be passed from the raspberry pi
     * to the server which will also push this data to the client side browser and database
     *
     * Example of data that will be received:
     * {
     *      "cpuUsage" : "96",
     *      "diskUsage" : {
     *          "free" : "3G",
     *          "used" : "12G",
     *          "total" : "15G"
     *          "Use" : "80"
     *      },
     *      "temperature" : "49.2 C"
     * }
     */

    var obj = JSON.parse(data);

}

// SIGNATURE PROGRESS
function moveProgressBar(percent, $element_wrap, $element) {

    console.log("moveProgressBar");
    origPercent = percent;
    var getPercent = percent / 100;
    //var getProgressWrapWidth = $('.progress-wrap').width();
    var getProgressWrapWidth = $element_wrap.width();
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 2500;

    // on page load, animate percentage bar to data percentage length
    // .stop() used to prevent animation queueing
    $element.find('div').stop().animate({
        left: progressTotal
    }, animationLength);

    //$('.progress-bar').stop().animate({
    //    left: progressTotal
    //}, animationLength);
}
// Socket events

// Whenever the server emits 'new raspberry pi status', update the progress bars
socket.on('new raspberry pi status', function (data) {
    updateProgressBars(data);
});
