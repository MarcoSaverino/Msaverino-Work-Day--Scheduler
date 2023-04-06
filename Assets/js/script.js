// variable for scheduler
var workDay = [
  {
    id: "0",
    hour: "7:00 ",
    time: "07",
    meridiem: "am",
    task: ""
  },
  {
    id: "1",
    hour: "8:00 ",
    time: "08",
    meridiem: "am",
    task: ""
  },
  {
      id: "2",
      hour: "9:00 ",
      time: "09",
      meridiem: "am",
      task: ""
  },
  {
      id: "3",
      hour: "10:00 ",
      time: "10",
      meridiem: "am",
      task: ""
  },
  {
      id: "4",
      hour: "11:00 ",
      time: "11",
      meridiem: "am",
      task: ""
  },
  {
      id: "5",
      hour: "12:00 ",
      time: "12",
      meridiem: "pm",
      task: ""
  },
  {
      id: "6",
      hour: "1:00 ",
      time: "13",
      meridiem: "pm",
      task: ""
  },
  {
      id: "7",
      hour: "2:00 ",
      time: "14",
      meridiem: "pm",
      task: ""
  },
  {
      id: "8",
      hour: "3:00 ",
      time: "15",
      meridiem: "pm",
      task: ""
  },
  {
      id: "9",
      hour: "4:00 ",
      time: "16",
      meridiem: "pm",
      task: ""
  },
  {
      id: "10",
      hour: "5:00 ",
      time: "17",
      meridiem: "pm",
      task: ""
  },
  {
    id: "11",
    hour: "6:00 ",
    time: "18",
    meridiem: "pm",
    task: ""
  },
  {
    id: "12",
    hour: "7:00 ",
    time: "19",
    meridiem: "pm",
    task: ""
  },

  
]

// local storage display and save 
function getPresentdate() {
  var presentDate = moment().format('dddd, MMMM Do');
  $("#presentDay").text(presentDate);
}


function saveTasks() {
  localStorage.setItem("workDay", JSON.stringify(workDay));
}


function displayTasks() {
  workDay.forEach(function (_thisHour) {
      $(`#${_thisHour.id}`).val(_thisHour.task);
  })
}


function init() {
  var storedDay = JSON.parse(localStorage.getItem("workDay"));

  if (storedDay) {
    workDay = storedDay;
  }

  saveTasks();
  displayTasks();
}

// loads header date
getPresentdate();

// Scheduler 
workDay.forEach(function(thisHour) {
  
  var hourRow = $("<form>").attr({
      "class": "row"
  });
  $(".container").append(hourRow);

 
  var hourField = $("<div>")
      .text(`${thisHour.hour}${thisHour.meridiem}`)
      .attr({
          "class": "col-md-2 hour"
  });

 
  var hourPlan = $("<div>")
      .attr({
          "class": "col-md-9 planner_Description p-0"
      });
  var planData = $("<textarea>");
  hourPlan.append(planData);
  planData.attr("id", thisHour.id);
  if (thisHour.time < moment().format("HH")) {
      planData.attr ({
          "class": "past"
      })
  } else if (thisHour.time === moment().format("HH")) {
      planData.attr({
          "class": "present"
      })
  } else if (thisHour.time > moment().format("HH")) {
      planData.attr({
          "class": "future" 
      })
  }

  // creates save button
  var saveButton = $("<i class='far fa-save fa-lg'></i>")
  var savePlan = $("<button>")
      .attr({
          "class": "col-md-1 savebtn"
  });
  savePlan.append(saveButton);
  hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after components created
init();


// saves tasks in localStorage
$(".savebtn").on("click", function(event) {
  event.preventDefault();
  var saveIndex = $(this).siblings(".planner_Description").children(".future",).attr("id");
  workDay[saveIndex].task = $(this).siblings(".planner_Description").children(".future",).val();
  console.log(saveIndex);
  saveTasks();
  displayTasks();
})
