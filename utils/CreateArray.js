function getRandomArray(size = 20, min = 1, max = 99) {
  if (size > max - min + 1) {
    console.error("无法生成不重复值的数组，长度超过范围");
    return;
  }

  let randomArray = [];

  while (randomArray.length < size) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    if (randomArray.indexOf(randomNum) === -1) {
      randomArray.push(randomNum);
    }
  }

  return randomArray;
}
