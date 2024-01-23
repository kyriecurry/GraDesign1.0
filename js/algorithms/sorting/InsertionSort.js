//插入排序

//设置SVG画布大小，根据屏幕大小改变
let canvasNode = document.getElementById("drawing");
let canvasWidth = canvasNode.clientWidth;
let canvasHeight = 0.8 * window.innerHeight;

//创建SVG对象
let draw = SVG().addTo("#drawing").size(canvasWidth, canvasHeight);
let array = getRandomArray();
const originalArray = [...array];
render(array);

//实现暂停功能
let isPaused = false;
document.getElementById("pause").addEventListener("click", pause);

//暂停函数
function pause() {
  isPaused = true;
}

//实现伪代码滚动功能
let pseudoCode = document.getElementById("pseudoCode");
let pseudoText = [
  "function insertionSort(arr):",
  "&nbsp&nbsp&nbsp&nbspfor i from 1 to length(arr) - 1:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspj = i;",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspwhile j >= 0 and arr[j] < arr[j - 1]:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspswap(arr[j], arr[j - 1])",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspj = j - 1",
];
// let pseudoText = [
//   "function insertionSort(arr):",
//   "&nbsp&nbsp&nbsp&nbsplen = length(arr)",
//   "&nbsp&nbsp&nbsp&nbspfor i from 1 to len-1:",
//   "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspkey = arr[i]",
//   "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspj = i - 1",
//   "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspwhile j >= 0 and arr[j] > key:",
//   "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsparr[j + 1] = arr[j]",
//   "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspj = j - 1",
//   "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsparr[j + 1] = key",
// ];

//高亮文本颜色为COLOR_1，背景色为COLOR_3，非高亮文本颜色为COLOR2，背景色为COLOR4
pseudoText.forEach((value) => {
  const para = document.createElement("p");
  para.innerHTML = value;
  para.style.color = COLOR_2;
  para.style.backgroundColor = COLOR_4;
  pseudoCode.appendChild(para);
});
paraList = pseudoCode.childNodes;

//设置第一行伪代码为高亮
changeCodeColor(paraList[0]);

function changeCodeColor(object) {
  object.style.color = COLOR_1;
  object.style.backgroundColor = COLOR_3;
}

function changeCodeColorBack(object) {
  object.style.color = COLOR_2;
  object.style.backgroundColor = COLOR_4;
}

//开始播放函数
function play() {
  InsertionSort(array);
}

//绘制图像函数
function render(array, doneIndex = 0) {
  draw.clear();
  const elementWidth = 20;
  const elementMargin = 4;

  array.forEach((value, index) => {
    let distance = index * (elementWidth + elementMargin);
    let elementHeight = value * 2;

    if (index < doneIndex) {
      let rect = draw
        .rect(elementWidth, elementHeight)
        .attr({ fill: COLOR_7 })
        .move(distance + 10, 300 - elementHeight)
        .addClass("rect");
    } else {
      let rect = draw
        .rect(elementWidth, elementHeight)
        .attr({ fill: COLOR_5 })
        .move(distance + 10, 300 - elementHeight)
        .addClass("rect");
    }

    let text = draw
      .text(`${value}`)
      .move(distance + 10, 305)
      .font("family", "Arial")
      .font("weight", "bold");
  });
}

async function InsertionSort(arr) {
  const array = [...arr];

  changeCodeColorBack(paraList[0]);

  for (let i = 1; i < array.length; i += 1) {
    let j = i;

    changeCodeColor(paraList[1]);
    await new Promise((resolve) => setTimeout(resolve, ITERATION_TIME));
    changeCodeColorBack(paraList[1]);

    changeCodeColor(paraList[2]);
    await new Promise((resolve) => setTimeout(resolve, ITERATION_TIME));
    changeCodeColorBack(paraList[2]);

    while (j >= 1 && array[j] < array[j - 1]) {
      let list = SVG.find(".rect");

      if (isPaused) {
        list[j].fill(COLOR_6);
        list[j - 1].fill(COLOR_6);
        await new Promise((resolve) => {
          const resumeButton = document.getElementById("continue");

          resumeButton.onclick = function resumeFunction() {
            isPaused = false;
            resolve();
          };
        });
      }

      list[j].fill(COLOR_6);
      list[j - 1].fill(COLOR_6);
      changeCodeColor(paraList[3]);
      await new Promise((resolve) => setTimeout(resolve, BEFORE_ANIM_TIME));
      changeCodeColorBack(paraList[3]);

      [array[j - 1], array[j]] = [array[j], array[j - 1]];

      changeCodeColor(paraList[4]);
      list[j].animate(ANIM_TIME).dmove(-24, 0);
      list[j - 1].animate(ANIM_TIME).dmove(24, 0);

      await new Promise((resolve) =>
        //通过setTimeout函数实现短暂延迟
        setTimeout(function () {
          //重新绘制数组，并将刚才对比大小的两数组改变为正在对比的颜色，实现连贯的动画效果
          render(array);
          list[j].fill(COLOR_6);
          list[j - 1].fill(COLOR_6);
          resolve();
        }, AFTER_ANIM_TIME)
      );

      list[j].fill(COLOR_5);
      list[i].fill(COLOR_5);

      changeCodeColorBack(paraList[4]);

      j -= 1;

      changeCodeColor(paraList[5]);
      await new Promise((resolve) => setTimeout(resolve, ITERATION_TIME));
      changeCodeColorBack(paraList[5]);
    }
  }

  return array;
}
