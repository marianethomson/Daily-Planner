//store blocks of hours - it can be reduced or expanded - currently displaying business hours (9am-5pm)
var dailyHours = 9;

//store text ref hour - first time block on the planner
var hour = 9;

//creates an array to store all the daily events
var plannedActivities =[];

var saveBtns = $(".col-1 saveBtn");

//show current day - header
function displayToday() {
  $("#currentDay").text(moment().format("dddd" + ", " + "MMM Do, YYYY"));
}

//change BG colour and disables the save button if time is in the past, display different BG colours for current and future time
function setBGColour(el, textTime, currTime) {
  if (textTime > currTime) {
    el.addClass("future");
  } else if (textTime < currTime) {
    el.addClass("past");
  } else {
    el.addClass("present");
  }
}

//generate and populate the html elements for the time blocks passing how many hours the planner should display (see var dailyHours)
function generateTimeBlocks(hours) {
  var currentHour = moment().get("hour");
  for (var i = 0; i < hours; i++) {
    var formatedTime = moment(hour, "H").format("h a");
    $timeBlockDiv = $("<div>").addClass("row time-block");

    $timeText = $("<h4>").text(formatedTime);
    $timeDiv = $("<div>").addClass("col-2 hour").append($timeText);

    $descriptionDiv = $("<textarea>").addClass("col-9 description").text("");

    setBGColour($descriptionDiv, hour, currentHour);

    $saveBtn = $("<button>")
      .text("Save")
      .addClass("col-1 saveBtn")
      .attr("id-hour", hour);
    $saveDiv = $("<div>").addClass("saveBtn").append($saveBtn);

    $timeBlockDiv.append($timeDiv, $descriptionDiv, $saveBtn);

    $(".container").append($timeBlockDiv);
    hour++;
  }
}

//capture the scheduled plan and save it on click


saveBtns.on("click", "input", function (event) {
  event.preventDefault();

  var activity ={
      hour = $("#id-hour"),
      description = input.value.trim(),
  }

  plannedActivities[activity.hour] = activity;

  localStorage.setItem("plannedActivities", JSON.stringify(plannedActivities));
});

window.onload = (event) => {
  displayToday();
  generateTimeBlocks(dailyHours);
};
