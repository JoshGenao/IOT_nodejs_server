/**
 * Created by joshgenao on 4/6/16.
 */


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

$('.progress-wrap[data-progress-percent]').each(function () {
    var percentage = ($(this).attr('data-progress-percent') / 100);
    console.log("Num " + percentage);
    var getProgressWrapWidth = $(this).width();
    var progressTotal = percentage * getProgressWrapWidth;
    console.log("Progress Total " + progressTotal);
    var animationLength = 2500;

    $(this).children().stop().animate({
        left: progressTotal
    }, animationLength);
});

// Socket events

// Whenever the server emits 'new raspberry pi status', update the progress bars
socket.on('new raspberry pi status', function (data) {
    updateProgressBars(data);
});
