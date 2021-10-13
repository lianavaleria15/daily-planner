//target date container
const dateContainer = $("#currentDay");

//get current day and format it
const today = moment().format("Do MMMM YYYY");

//append current day to date container
dateContainer.text(today);

//get business hours and store them into an array
const businessHours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

//build time blocks
const constructTimeBlocks = (businessHours) => {
  const timeBlock = (element) => {
    const timeBlockDiv = `<div class="row">
    <div class="col time-item">${element}</div>
    <div class="col-8 past"><textarea class="textarea"></textarea></div>
    <div  class="col save-item"><i class="fas fa-save"></i></div>
  </div>`;
    return timeBlockDiv;
  };

  return businessHours.map(timeBlock).join("");
};

// render time blocks
const renderTimeBlocks = () => {
  const timeBlocks = constructTimeBlocks(businessHours);

  $(".container").append(timeBlocks);
  const callback = function () {
    console.log(this);
    console.log($(".time-item"));
    if ($(this).is(".time-item")) {
      const timeBlockHour = $(".time-item").text();
      console.log(timeBlockHour);
    }
    // if (element === moment().format("HH")) {
    // } else if (element > moment().format("HH")) {
    // }
  };
  $(".row").each(callback);
};

//function to add text to text area
const addActivityText = () => {
  const activityText = $(".textarea").text();
  return activityText;
};

//function to add activities to local storage
const addActivityToLocalStorage = () => {};

//function to get from local storage

$(document).ready(() => {
  renderTimeBlocks();
  //add event listener on save item
  $(".save-item").on("click", addActivityToLocalStorage());
});
