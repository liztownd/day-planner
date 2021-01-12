$(document).ready(function () {

    var now = dayjs().format("ddd, MMM D, YYYY h:mm");
    var storedSchedule = [];

    /// Matt: added the lsSchedule variable declaration here so all of the functions can see it
    var lsSchedule = null;

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

      /// Matt: $("textarea") returns an array of all elements that are "textarea" types.
      /// You will have to loop through this list if you want to modify the classes on all of them.

    $('textarea').each(
  function(){
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

    $(".saveBtn").on("click", function () {
      event.preventDefault();

      var schedule = {
        time: 0,
        event: "",
      };

      /// Matt: since $('textarea') grabs all the text areas, and we really wanted the neighboring textarea,
      /// I switched this over to using a "siblings" jQuery call. This call will return a list all of the elements
      /// that share the same "parent" element with whatever element you're on.
      /// To facilitate this I recommend using the "this" keyword to get the html element that called the click function.
      var textArea = $(this).siblings('textarea');

      /// Matt: When you have a jQuery object that's not a list of objects, you can always get the 
      /// original html object by doing a [0] after it.
      /// You can also access this without using the [0] by doing .prop("id"). textarea.prop("id")
      /// The prop function will let you get any part of an html element, including class or custom elements.
      schedule.time = textArea[0].id;
      schedule.event = textArea.val().trim();

      storedSchedule.push(schedule);

      console.log(schedule);

      /// Matt: lsSchedule was originally defined here, but when this 
      /// function ends lsSchedule would go out of scope and not be visible to other functions.
      /// I added the variable declaration to line 83 so all the functions inside the scope of the
      /// document ready function could see it.
      lsSchedule = JSON.stringify(storedSchedule);

      localStorage.setItem("lsSchedule", lsSchedule);

    });


    //on reload time blocks are populated from local storage

    function renderSched() {

      storedSchedule = localStorage.getItem(JSON.parse(lsSchedule));

      if (storedSchedule === null) {
        /// Matt: making sure storedSchedule is an array here makes sure that this 
        /// isn't null when we try to access it later.
        storedSchedule = [];
        return
      }
      else {
        for (i = 0; i < storedSchedule; i++) {
          console.log(storedSchedule);

          /// Matt: the textarea selected here was running into the same issue as in the .saveBtn callback.
          var textArea = $(this).siblings('textarea');
          if (storedSchedule[i].time === textArea[0].id) {
            textArea.text(storedSchedule[i].event);
          };

        }; //for loop end tag
      }; //else end tag
    };//render sched end tag



  }); //doc ready end tag
