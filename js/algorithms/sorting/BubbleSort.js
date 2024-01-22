//冒泡排序

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
  "function bubbleSort(arr):",
  "&nbsp&nbsp&nbsp&nbsplen = length(arr)",
  "&nbsp&nbsp&nbsp&nbspfor i from 0 to len-1:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspfor j from 0 to len-i-1:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspif arr[j] > arr[j+1]:",
  "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspswap(arr[j], arr[j+1])",
];

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
paraList[0].style.color = COLOR_1;
paraList[0].style.backgroundColor = COLOR_3;

//开始播放函数
function play() {
  bubbleSort(array);
}

//绘制图像函数
function render(array, doneIndex = array.length) {
  draw.clear();
  const elementWidth = 20;
  const elementMargin = 4;

  array.forEach((value, index) => {
    let distance = index * (elementWidth + elementMargin);
    let elementHeight = value * 2;

    if (index > doneIndex) {
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

//冒泡排序及排序动画实现
async function bubbleSort(arr) {
  //swapped用来判断在一次遍历中是否还有交换，若无，则说明排序已完成
  let swapped = false;

  //不改变初始数组
  const array = [...arr];

  //取消第一行伪代码高亮
  paraList[0].style.color = COLOR_2;
  paraList[0].style.backgroundColor = COLOR_4;

  for (let i = 0; i < array.length - 1; i += 1) {
    swapped = false;

    //伪代码第三行高亮
    paraList[2].style.color = COLOR_1;
    paraList[2].style.backgroundColor = COLOR_3;
    await new Promise((resolve) => setTimeout(resolve, ITERATION_TIME));
    paraList[2].style.color = COLOR_2;
    paraList[2].style.backgroundColor = COLOR_4;

    for (let j = 0; j < array.length - i - 1; j += 1) {
      //伪代码第四行高亮
      paraList[3].style.color = COLOR_1;
      paraList[3].style.backgroundColor = COLOR_3;
      await new Promise((resolve) => setTimeout(resolve, ITERATION_TIME));
      paraList[3].style.color = COLOR_2;
      paraList[3].style.backgroundColor = COLOR_4;

      //list中保存可视化HTML元素，为一系列的长方体，其高度代表数组元素大小
      let list = SVG.find(".rect");

      //实现暂停功能
      if (isPaused) {
        list[j].fill(COLOR_6);
        list[j + 1].fill(COLOR_6);
        await new Promise((resolve) => {
          const resumeButton = document.getElementById("continue");

          resumeButton.onclick = function resumeFunction() {
            isPaused = false;
            resolve();
          };
        });
      }

      //改变正在比较大小的两长方体的颜色，表示两者正在对比大小
      list[j].fill(COLOR_6);
      list[j + 1].fill(COLOR_6);

      paraList[4].style.color = COLOR_1;
      paraList[4].style.backgroundColor = COLOR_3;
      //在移动HTML元素前略微停顿，表示对比过程
      await new Promise((resolve) => setTimeout(resolve, BEFORE_ANIM_TIME));
      paraList[4].style.color = COLOR_2;
      paraList[4].style.backgroundColor = COLOR_4;

      if (array[j + 1] < array[j]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        //进行动画过程，两元素移动，表示数组中元素交换过程
        list[j].animate(ANIM_TIME).dmove(24, 0);
        list[j + 1].animate(ANIM_TIME).dmove(-24, 0);

        paraList[5].style.color = COLOR_1;
        paraList[5].style.backgroundColor = COLOR_3;

        //通过Promise对象来实现异步程序
        await new Promise((resolve) =>
          //通过setTimeout函数实现短暂延迟
          setTimeout(function () {
            //重新绘制数组，并将刚才对比大小的两数组改变为正在对比的颜色，实现连贯的动画效果
            render(array);
            list[j].fill(COLOR_6);
            list[j + 1].fill(COLOR_6);
            resolve();
          }, AFTER_ANIM_TIME)
        );
        swapped = true;
      }

      //对比完成，将颜色变回去
      list[j].fill(COLOR_5);
      list[j + 1].fill(COLOR_5);

      paraList[5].style.color = COLOR_2;
      paraList[5].style.backgroundColor = COLOR_4;

      render(array, array.length - i - 1);
    }

    if (!swapped) {
      return array;
    }
  }

  return array;
}
