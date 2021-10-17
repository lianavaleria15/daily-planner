//target date container
const dateContainer = $("#currentDay");

//get current day and format it
const today = moment().format("Do MMMM YYYY");

//append current day to date container
dateContainer.text(today);

//get business hours and store them into an array
const businessHours = [
  { id: 9, hour: "9 AM", activity: "" },
  { id: 10, hour: "10 AM", activity: "" },
  { id: 11, hour: "11 AM", activity: "" },
  { id: 12, hour: "12 AM", activity: "" },
  { id: 13, hour: "1 PM", activity: "" },
  { id: 14, hour: "2 PM", activity: "" },
  { id: 15, hour: "3 AM", activity: "" },
  { id: 16, hour: "4 AM", activity: "" },
  { id: 17, hour: "5 AM", activity: "" },
];

//initialize local storage
const initializeLocalStorage = (businessHours) => {
  //get activities from LS; if none added, return the business hours array
  const activitiesScheduled =
    JSON.parse(localStorage.getItem("activities")) ?? businessHours;

  //set activities to LS
  localStorage.setItem("activities", JSON.stringify(activitiesScheduled));

  return activitiesScheduled;
};

const getClassName = (id) => {
  //get current time
  // const currentTime = moment().hour();
  const currentTime = 12;

  //update textarea container color on each row depending on time
  if (id < currentTime) {
    return "past";
  }
  if (id === currentTime) {
    return "present";
  }
  if (id > currentTime) {
    return "future";
  }
};

//build time blocks
const constructTimeBlocks = (activitiesScheduled) => {
  const timeBlock = (element) => {
    //get time for each time block
    const id = element.id;

    //build each time block row
    const timeBlockDiv = `<div class="row d-flex sm-flex-column">
    <div class="col-2 time-item">${element.hour}</div>
    <div class="col-8 ${getClassName(id)} activity-container"><textarea id=${
      element.id
    }>${element.activity}</textarea></div>
    <div class=" col-2 save-item py-3" data-timeid="${
      element.id
    }"><i class="fas fa-save"></i></div>
  </div>`;

    return timeBlockDiv;
  };

  return activitiesScheduled.map(timeBlock).join("");
};

// render time blocks
const renderTimeBlocks = (activitiesScheduled) => {
  const timeBlocks = constructTimeBlocks(activitiesScheduled);
  $(".container").append(timeBlocks);
};

//function to add text to text area
const addActivityText = () => {
  const activityText = $(".textarea").text();
  return activityText;
};

const onReady = () => {
  initializeLocalStorage(businessHours);
  renderTimeBlocks(initializeLocalStorage(businessHours));

  //callback function for event on icon click
  const addActivityToLocalStorage = (event) => {
    //get position button clicked
    const target = $(event.target).closest(".save-item")[0];

    //get time activity id
    const timeId = $(target).data("timeid");

    //get value of textarea
    const activity = $(target).siblings(".activity-container");
    const activityText = activity.find("textarea").val();

    //if target is a button
    if (target) {
      // get activities values  from LS
      const activityLocalStorage = JSON.parse(
        localStorage.getItem("activities")
      );

      activityLocalStorage[timeId - 9].activity = activityText;

      // //add to local storage
      localStorage.setItem("activities", JSON.stringify(activityLocalStorage));
    }
  };

  //add event listener on save item
  $(".container").on("click", addActivityToLocalStorage);
};

$(document).ready(onReady);
