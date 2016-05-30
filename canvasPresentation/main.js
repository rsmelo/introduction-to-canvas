const canvasPresentation = (function () {

  const example1 = () => {
    const element = document.getElementById('canvas1');
    const ctx = element.getContext('2d');
    const startOffset = 24;
    const endOffset = 10;
    const { width, height } = element;

    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';

    ctx.beginPath();
    ctx.moveTo(startOffset, 25);
    ctx.lineTo(width - endOffset, 25);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - endOffset, 20);
    ctx.lineTo(width - endOffset, 30);
    ctx.lineTo(width - endOffset + 5, 25);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(startOffset, 25);
    ctx.lineTo(startOffset, height - endOffset);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(startOffset - 5, height - endOffset);
    ctx.lineTo(startOffset + 5, height - endOffset);
    ctx.lineTo(startOffset,  height - endOffset + 5);
    ctx.closePath();
    ctx.fill();

    ctx.font = '18px serif';
    ctx.fillText('(0,0)', 1, 15);
    ctx.fillText('x', width - endOffset, 10);
    ctx.fillText('y', 1, height - endOffset);
  };

  const example2 = () => {
    const element = document.getElementById('canvas2');
    const ctx = element.getContext('2d');

    ctx.strokeStyle = '#f00';
    ctx.fillStyle = '#000';

    ctx.fillRect(10, 10, 100, 100);
    ctx.strokeRect(120, 10, 100, 100);

    ctx.fillRect(10, 120, 100, 100);
    ctx.clearRect(20, 130, 80, 80);
  };

  const example3 = () => {
    const element = document.getElementById('canvas3');
    const ctx = element.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'green';

    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(100, 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 10);
    ctx.lineTo(300, 100);
    ctx.lineTo(200, 50);
    ctx.closePath();
    ctx.fill();
  };

  const init = (Reveal) => {
    Reveal.addEventListener('example1',  example1, false);
    Reveal.addEventListener('example2',  example2, false);
    Reveal.addEventListener('example3',  example3, false);
  };

  return {
    init: init
  };
})();
