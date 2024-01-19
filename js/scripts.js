const SMALL_ARRAY_SIZE = 10;
const SMALL_ARRAY_RANGE = 20;

const MEDIUM_ARRAY_SIZE = 25;
const MEDIUM_ARRAY_RANGE = 50;

const HUGE_ARRAY_SIZE = 40;
const HUGE_ARRAY_RANGE = 80;

const RECT_WIDTH = 20;
const RECT_MARGIN = 5;

const BEFORE_ANIMATION_TIME = 2000;
const ANIMATION_TIME = 400;
const AFTER_ANIMATION_TIME = 1800;

const COLOR_1 = "";
const COLOR_2 = "";

let draw = SVG().addTo("#draw").size(1000, 500);
let test = createArray(10);
renderArray(test);
bubbleSort(test);

function createArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * MEDIUM_ARRAY_SIZE) + 1);
  }
  return array;
}

function renderArray(array) {
  draw.clear();
  const elementWidth = 20;
  const RECT_MARGIN = 4;

  array.forEach((value, index) => {
    let distance = index * (RECT_WIDTH + RECT_MARGIN);
    let elementHeight = value * 5;

    let rect = draw
      .rect(elementWidth, elementHeight)
      .attr({ fill: "#175E3D" })
      .move(distance + 600, 375 - elementHeight)
      .addClass("rect");
  });
}

async function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      let list = SVG.find(".rect");
      list[j].fill("#ECD17A");
      list[j + 1].fill("#ECD17A");

      await new Promise((resolve) =>
        setTimeout(resolve, BEFORE_ANIMATION_TIME)
      );

      if (array[j] > array[j + 1]) {
        list[j].animate().dmove(24, 0);
        list[j + 1].animate().dmove(-24, 0);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        await new Promise((resolve) =>
          setTimeout(function () {
            renderArray(array);
            list[j].fill("#ECD17A");
            list[j + 1].fill("#ECD17A");
            resolve();
          }, 2000)
        );
      }

      list[j].fill("#175E3D");
      list[j + 1].fill("#175E3D");
    }
  }
}
