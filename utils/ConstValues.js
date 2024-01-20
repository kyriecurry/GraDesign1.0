let BEFORE_ANIM_TIME = 1024;
let ANIM_TIME = 512;
let AFTER_ANIM_TIME = 1024;
let ITERATION_TIME = 128;

function speedUp(times) {
  BEFORE_ANIM_TIME = 1024 / times;
  ANIM_TIME = 512 / times;
  AFTER_ANIM_TIME = 1024 / times;
  ITERATION_TIME = 128 / times;
}
