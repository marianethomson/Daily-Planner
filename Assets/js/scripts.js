//store blocks of hours - it can be reduced or expanded - currently displaying business hours (9am-5pm)
var dailyHours = 9;

//store saved activities
var savedActivities;

//show current day - header
function displayToday() {
  $("#currentDay").text(moment().format("dddd" + ", " + "MMM Do, YYYY"));
}

//change BG colour and disables the save button if time is in the past, display different BG colours for current and future time
function setBGColour(el, textTime, currTime) {
  if (textTime > currTime) {
    el.addClass("future");
  } else if (textTime < currTime) {
    el.addClass("past").css("pointer-events", "none");
  } else {
    el.addClass("present");
  }
}

//generate and populate the html elements for the time blocks passing how many hours the planner should display (see var dailyHours)
function generateTimeBlocks(hours) {
  //store text ref hour - first time block on the planner considering dailyHours as 9am-5pm
  var hour = 9;

  //get the current hours using Moments js
  var currentHour = moment().get("hour");

  //loop to create the time-blocks and their elements
  for (var i = 0; i < hours; i++) {
    //format AM/PM using Moments js
    var formatedTime = moment(hour, "H").format("h a");

    //creates the div for each interation and styles the class
    var $timeBlockDiv = $("<div>").addClass("row time-block");

    //creates the element to hold text ref hour, passes the hour number for each interation formatted as h am/pm
    var $time = $("<h4>").text(formatedTime).addClass("col-2 hour");

    //creates the element for the activity and styles the textarea and sets its id as each hour/interation
    var $activityTxtArea = $("<textarea>").addClass("col-9 description");

    //creates the activity obj
    var $activity = {
      index: hour,
      text: $activityTxtArea.val(),
    };

    $activityTxtArea.append($activity);

    //screates the save btn, styles the save button and sets its id as each hour/interation
    var $saveBtn = $("<button>")
      .text("Save")
      .addClass("col-1 saveBtn")
      .attr("id", hour);

    //display to the page
    $timeBlockDiv.append($time, $activityTxtArea, $saveBtn);

    setBGColour($activityTxtArea, hour, currentHour);
    setBGColour($saveBtn, hour, currentHour);

    $(".container").append($timeBlockDiv);

    hour++;

    $saveBtn.on("click", function (event) {
      event.preventDefault();
      // savedActivities.splice($activity.index, 0, $activity.text);
      localStorage.setItem("activity", JSON.stringify($activity));
    });
  }
}

window.onload = (event) => {
  displayToday();
  generateTimeBlocks(dailyHours);
};
