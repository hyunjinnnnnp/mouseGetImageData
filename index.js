const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const grayScale = document.querySelector(".grayScale");
const ctx2 = grayScale.getContext("2d");

function getDataFromMouse(e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  const getImgSize = 20;

  const imageData = ctx.getImageData(
    mouseX - getImgSize / 2,
    mouseY - getImgSize / 2,
    getImgSize,
    getImgSize
  );

  ctx2.putImageData(imageData, mouseX, mouseY);
}

function paintGray(imageData) {
  //그레이스케일만 회색으로 칠한다
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; //red
    data[i + 1] = avg; //green
    data[i + 2] = avg; //blue
  }
  ctx2.putImageData(imageData, 0, 0);
}

function drawImage() {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "./img.png";

  img.onload = function () {
    ctx.save();
    grayScale.width = this.naturalWidth;
    grayScale.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    grayScale.style.width = this.naturalWidth;
    grayScale.style.height = this.naturalHeight;
    canvas.style.width = this.naturalWidth;
    canvas.style.height = this.naturalHeight;

    //똑같은 크기의 캔버스를 만들어서 캔버스에만 사진을 넣고
    ctx.drawImage(this, 0, 0, this.width, this.height);
    //원본의 컬러를 복사한다
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    paintGray(imageData);
  };
}

function init() {
  drawImage();
  canvas.addEventListener("mousemove", getDataFromMouse);
}
window.addEventListener("load", init);
