//target date container
const dateContainer = $("#currentDay");

//get current day and format it
const today = moment().format("Do MMMM YYYY");

//append current day to date container
dateContainer.text(today);

//get business hours and store them into an array
const businessHours = [
  { id: 9, hour: "9 AM", activityText: "" },
  { id: 10, hour: "10 AM", activityText: "" },
  { id: 11, hour: "11 AM", activityText: "" },
  { id: 12, hour: "12 AM", activityText: "" },
  { id: 13, hour: "1 PM", activityText: "" },
  { id: 14, hour: "2 PM", activityText: "" },
  { id: 15, hour: "3 AM", activityText: "" },
  { id: 16, hour: "4 AM", activityText: "" },
  { id: 17, hour: "5 AM", activityText: "" },
];

//initialize local storage
const initializeLocalStorage = (businessHours) => {
  //get activities from LS; if none added, return the business hours array
  const activitiesScheduled =
    JSON.parse(localStorage.getItem("activities")) || businessHours;

  //set activities to LS
  localStorage.setItem("activities", JSON.stringify(activitiesScheduled));

  return activitiesScheduled;
};

const getClassName = (id) => {
  //get current time
  const currentTime = moment().hour();
  // const currentTime = 14;
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
const constructTimeBlocks = (businessHours) => {
  const timeBlock = (element) => {
    //get time for each time block
    const id = element.id;

    //build each time block row
    const timeBlockDiv = `<div class="row">
    <div class="col time-item">${element.hour}</div>
    <div class="col-8 ${getClassName(id)}"><textarea id=${
      element.id
    }></textarea></div>
    <div class="save-item" data-attribute ="${
      element.id
    }" class="col"><i class="fas fa-save"></i></div>
  </div>`;

    return timeBlockDiv;
  };

  return businessHours.map(timeBlock).join("");
};

// render time blocks
const renderTimeBlocks = () => {
  const timeBlocks = constructTimeBlocks(businessHours);
  $(".container").append(timeBlocks);
};

//function to add text to text area
const addActivityText = () => {
  const activityText = $(".textarea").text();
  return activityText;
};

const onReady = () => {
  // initializeLocalStorage();
  renderTimeBlocks();

  //function to add activities to local storage
  const addActivityToLocalStorage = () => {};

  //add event listener on save item
  $(".container").on("click", addActivityToLocalStorage());
};

$(document).ready(onReady);
