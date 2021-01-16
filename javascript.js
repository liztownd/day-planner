$(document).ready(function () {

    var now = dayjs().format("ddd, MMM D, YYYY h:mm");
    var storedSchedule = [];

    var lsSchedule = [];

    //date shows current date and time
    $("#currentDay").text(now);

    updateTime();

    colorBlocks();

    renderSched();

    function updateTime() {
        now = setInterval(function () {
            now = dayjs().format("ddd, MMM D, YYYY h:mm");
            $("#currentDay").text(now);
            colorBlocks();
        }, 60000);
    };


    //event blocks change color depending on current time
    function colorBlocks() {

        var hour = dayjs().hour();

        console.log(hour);


        $('textarea').each(
            function () {
                var currentID = $(this).attr("id");

                if (currentID < hour) {
                    $(this).addClass("past");
                }
                else if (currentID > hour) {
                    $(this).addClass("future");
                }
                else {
                    $(this).addClass("present");
                }
            }
        );

    };// colorBlocks end tag

    //items added to the list are put in local storage on save click

    $(".saveBtn").on("click", function (event) {
        event.preventDefault();

        var schedule = {
            time: "",
            event: "",
        };

        var textArea = $(this).siblings('textarea');
        console.log(textArea);

        schedule.time = textArea.prop("id");
        schedule.event = textArea.val().trim();


        storedSchedule.push(schedule);

        console.log(schedule);

        lsSchedule = JSON.stringify(storedSchedule);

        localStorage.setItem("lsSchedule", lsSchedule);

    });


    //on reload time blocks are populated from local storage

    function renderSched() {

        var jsonSched = JSON.parse(localStorage.getItem("lsSchedule"));
        console.log(lsSchedule);
        console.log(storedSchedule);

        if (jsonSched === null) {
            return
        }
        else {
            storedSchedule = (jsonSched);

            for (i = 0; i < storedSchedule.length; i++) {
                for (j = 0; j < $("textarea").length; j++) {
                    console.log($("textarea")[j].id);
                    console.log(storedSchedule);

                    if (storedSchedule[i].time === $("textarea")[j].id) {
                        $("textarea")[j].value = storedSchedule[i].event;
                    };
                };

            }; //for loop end tag
        }; //else end tag
    };//render sched end tag



}); //doc ready end tag
