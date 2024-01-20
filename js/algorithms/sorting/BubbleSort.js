async function bubbleSort(arr) {
  //swapped用来判断在一次遍历中是否还有交换，若无，则说明排序已完成
  let swapped = false;
  //不改变初始数组
  const array = [...arr];
  paraList[0].style.color = "black";
  // await new Promise((resolve) =>
  //   //通过setTimeout函数实现短暂延迟
  //   setTimeout(function () {
  //     paraList[0].style.color = "red";
  //     resolve();
  //   }, 2000)
  // );
  // paraList[0].style.color = "black";
  // render(array);
  //进行排序
  for (let i = 0; i < array.length - 1; i += 1) {
    // iter.i = i;
    swapped = false;
    paraList[2].style.color = "red";
    await new Promise((resolve) => setTimeout(resolve, ITERATION_TIME));
    paraList[2].style.color = "black";

    for (let j = 0; j < array.length - i - 1; j += 1) {
      paraList[3].style.color = "red";
      await new Promise((resolve) => setTimeout(resolve, ITERATION_TIME));
      paraList[3].style.color = "black";
      // iter.j = j;
      //list中保存可视化HTML元素，为一系列的长方体，其高度代表数组元素大小
      let list = SVG.find(".rect");
      if (isPaused) {
        // console.log("Async function paused");
        list[j].fill("#ECD17A");
        list[j + 1].fill("#ECD17A");
        await new Promise((resolve) => {
          const resumeButton = document.getElementById("continue");

          resumeButton.onclick = function resumeFunction() {
            isPaused = false;
            resolve();
          };
        });
      }
      //改变正在比较大小的两长方体的颜色，表示两者正在对比大小
      list[j].fill("#ECD17A");
      list[j + 1].fill("#ECD17A");
      paraList[4].style.color = "red";
      //在移动HTML元素前略微停顿，表示对比过程
      await new Promise((resolve) => setTimeout(resolve, BEFORE_ANIM_TIME));
      paraList[4].style.color = "black";
      if (array[j + 1] < array[j]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        //进行动画过程，两元素移动，表示数组中元素交换过程
        list[j].animate(ANIM_TIME).dmove(24, 0);
        list[j + 1].animate(ANIM_TIME).dmove(-24, 0);
        paraList[5].style.color = "red";
        //通过Promise对象来实现异步程序
        await new Promise((resolve) =>
          //通过setTimeout函数实现短暂延迟
          setTimeout(function () {
            //重新绘制数组，并将刚才对比大小的两数组改变为正在对比的颜色，实现连贯的动画效果
            render(array);
            list[j].fill("#ECD17A");
            list[j + 1].fill("#ECD17A");
            resolve();
          }, AFTER_ANIM_TIME)
        );
        // console.log(array);
        swapped = true;
      }

      //对比完成，将颜色变回去
      list[j].fill("#175E3D");
      list[j + 1].fill("#175E3D");
      paraList[5].style.color = "black";

      // step += 1;
    }

    if (!swapped) {
      return array;
    }
  }

  return iter;
}

// function sortWithoutAnimation(array) {
//   let currStep = 0;
//   let swapped = false;
//   // const array = [...originalArray];

//   let i = 0;
//   let j = 0;
//   for (; i < array.length; i += 1) {
//     swapped = false;

//     for (; j < array.length - i - 1; j += 1) {
//       currStep += 1;
//       if (currStep === step - 1) {
//         break;
//       }
//       if (array[j + 1] < array[j]) {
//         [array[j], array[j + 1]] = [array[j + 1], array[j]];
//         swapped = true;
//       }
//     }

//     if (!swapped) {
//       break;
//     }
//   }

//   return { arr: array, iter1: i, iter2: j };
// }

function pause() {
  isPaused = true;
  // console.log(array);
}
//pause firt, then can step forward or back
// function stepForward() {}
// function stepBack() {
// // pause();
// step -= 1;
// let info = sortWithoutAnimation(originalArray);
// // console.log(typeof info.arr);
// console.log(step);
// console.log(info);
// // render(info.arr);
// bubbleSort(info.arr, { i: info.i, j: info.j });
// }

function render(array) {
  draw.clear();
  const elementWidth = 20;
  const elementMargin = 4;

  array.forEach((value, index) => {
    let distance = index * (elementWidth + elementMargin);
    let elementHeight = value * 2;

    let rect = draw
      .rect(elementWidth, elementHeight)
      .attr({ fill: "#175E3D" })
      .move(distance + 10, 300 - elementHeight)
      .addClass("rect");

    let text = draw
      .text(`${value}`)
      .move(distance + 10, 305)
      .font("family", "Arial")
      .font("weight", "bold");
  });
}

//设置SVG画布大小，根据屏幕大小改变
let canvasNode = document.getElementById("drawing");
let canvasWidth = canvasNode.clientWidth;
let canvasHeight = 0.8 * window.innerHeight;

let isPaused = false;

// const iter = { i: 0, j: 0 };

let draw = SVG().addTo("#drawing").size(canvasWidth, canvasHeight);
let array = getRandomArray();
const originalArray = [...array];
render(array);

document.getElementById("pause").addEventListener("click", pause);
// let step = 0;

let pseudoCode = document.getElementById("pseudoCode");
let pseudoText = [
  "function bubbleSort(arr):",
  "&nbsp&nbsp&nbsp&nbsplen = length(arr)",
  "&nbsp&nbsp&nbsp&nbspfor i from 0 to len-1:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspfor j from 0 to len-i-1:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspif arr[j] > arr[j+1]:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspswap(arr[j], arr[j+1])",
];
// pseudoCode.innerHTML = pseudoText.reduce(
//   (accumulator, currentValue) => accumulator + currentValue + "<br>",
//   ""
// );
pseudoText.forEach((value) => {
  const para = document.createElement("p");
  // const node = document.createTextNode(value);
  // para.appendChild(node);
  para.innerHTML = value;
  pseudoCode.appendChild(para);
});
paraList = pseudoCode.childNodes;
paraList[0].style.color = "red";
function play() {
  bubbleSort(array);
}
