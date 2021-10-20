//target date container
const dateContainer = $("#currentDay");

//get current day and format it
const today = moment().format("Do MMMM YYYY");

//append current day to date container
dateContainer.text(today);

//get business hours and store them into an array
const businessHours = [
  { id: 9, hour: "9 AM" },
  { id: 10, hour: "10 AM" },
  { id: 11, hour: "11 AM" },
  { id: 12, hour: "12 AM" },
  { id: 13, hour: "1 PM" },
  { id: 14, hour: "2 PM" },
  { id: 15, hour: "3 PM" },
  { id: 16, hour: "4 PM" },
  { id: 17, hour: "5 PM" },
];

//initialize local storage
const initializeLocalStorage = () => {
  //get activities from LS; if none added, return the business hours array
  const activitiesScheduled =
    JSON.parse(localStorage.getItem("activities")) ?? {};

  //set activities to LS
  localStorage.setItem("activities", JSON.stringify(activitiesScheduled));

  return activitiesScheduled;
};

const getClassName = (id) => {
  //get current time
  const currentTime = moment().hour();
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
const constructTimeBlocks = (businessHours) => {
  const activitiesFromLocalStorage = JSON.parse(
    localStorage.getItem("activities")
  );

  const timeBlock = (element) => {
    //get time for each time block
    const id = element.id;

    //build each time block row
    const timeBlockDiv = `<div class="row d-flex sm-flex-column">
      <div class="col-2 time-item">${element.hour}</div>
      <div class="col-8 py-1 ${getClassName(
        id
      )} activity-container"><textarea class="w-100 h-100" id=${element.id}>${
      activitiesFromLocalStorage[id] ?? ""
    }</textarea></div>
      <div class="col-2 px-0"><button class="btn w-100 h-100 save-item" id="${
        element.id
      }"><i class="fas fa-save" id="${element.id}"></i></button></div>
    </div>`;

    return timeBlockDiv;
  };

  return businessHours.map(timeBlock).join("");
};

// render time blocks
const renderTimeBlocks = (businessHours) => {
  const timeBlocks = constructTimeBlocks(businessHours);
  $(".container").append(timeBlocks);
};

//function to add text to text area
const addActivityText = () => {
  const activityText = $(".textarea").text();
  return activityText;
};

const onReady = () => {
  initializeLocalStorage();
  renderTimeBlocks(businessHours);

  //callback function for event on icon click
  const addActivityToLocalStorage = (event) => {
    //get position button clicked
    const target = $(event.target);

    //if target is a button
    if (target.is("button") || target.is("i")) {
      //get time activity id
      const timeId = $(target).attr("id");

      const textArea = $(`textarea[id="${timeId}"]`);
      const activityText = textArea.val();

      // get activities values  from LS
      const activityLocalStorage = JSON.parse(
        localStorage.getItem("activities")
      );

      activityLocalStorage[timeId] = activityText;

      // //add to local storage
      localStorage.setItem("activities", JSON.stringify(activityLocalStorage));
    }
  };

  //add event listener on save item
  $(".container").on("click", addActivityToLocalStorage);
};

$(document).ready(onReady);
