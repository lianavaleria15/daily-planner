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
  const timeBlock = (element, index) => {
    const timeBlockDiv = `<div class="row">
    <div class="col time-item">${element}</div>
    <div class="col-8 activity-item">Activity here</div>
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
};

//function to add activities to local storage
// const addActivityToLocalStorage = () => {
//   console.log("save");
// };

//add event listener on save item
// $(".save-item").on(
//   "click",
//   (addActivityToLocalStorage = () => {
//     console.log("save");
//   })
// );

$(document).ready(() => {
  renderTimeBlocks();
  $(".save-item").on(
    "click",
    (addActivityToLocalStorage = () => {
      console.log("save");
    })
  );
});
//on window load
// window.onload = () => {
//   renderTimeBlocks();
// };
