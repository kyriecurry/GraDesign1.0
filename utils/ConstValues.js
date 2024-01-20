let BEFORE_ANIM_TIME = 1024;
let ANIM_TIME = 512;
let AFTER_ANIM_TIME = 1024;
let ITERATION_TIME = 128;

//伪代码文本颜色
const COLOR_1 = "#E26E59";
const COLOR_2 = "#1F3F3E";

//伪代码背景颜色
const COLOR_3 = "#9CCDB8";
const COLOR_4 = "#f8f9fa"; //bg-light

//排序颜色
const COLOR_5 = "#175E3D";
const COLOR_6 = "#ECD17A";

//加速播放函数
function speedUp(times) {
  BEFORE_ANIM_TIME = 1024 / times;
  ANIM_TIME = 512 / times;
  AFTER_ANIM_TIME = 1024 / times;
  ITERATION_TIME = 128 / times;
}
