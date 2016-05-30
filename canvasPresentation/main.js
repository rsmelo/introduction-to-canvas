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

  const example4 = () => {
    const element = document.getElementById('canvas4');
    const ctx = element.getContext('2d');

    ctx.beginPath();
    ctx.arc(45, 45, 40, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(145, 45, 40, 0, Math.PI, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(45, 145, 40, 0, Math.PI / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(145, 145, 40, 0, Math.PI / 2, true);
    ctx.fill();
  };

  const example5 = () => {
    const element = document.getElementById('canvas5');
    const ctx = element.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(100, 20);
    ctx.arcTo(100, 100, 10, 20, 30);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    // base point
    ctx.fillRect(100, 20, 10, 10);

    ctx.fillStyle = 'red';
    // control point one
    ctx.fillRect(100, 100, 10, 10);
    // control point two
    ctx.fillRect(10, 20, 10, 10);

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(300, 20);
    ctx.lineTo(300, 70);
    ctx.arcTo(300, 150, 150, 50, 45);
    ctx.fill();

    ctx.fillStyle = 'green';
    // base point
    ctx.fillRect(300, 70, 10, 10);

    ctx.fillStyle = 'brown';
    // control point one
    ctx.fillRect(300, 150, 10, 10);
    // control point two
    ctx.fillRect(150, 50, 10, 10);

  };

  const init = (Reveal) => {
    Reveal.addEventListener('example1',  example1, false);
    Reveal.addEventListener('example2',  example2, false);
    Reveal.addEventListener('example3',  example3, false);
    Reveal.addEventListener('example4',  example4, false);
    Reveal.addEventListener('example5',  example5, false);
  };

  return {
    init: init
  };
})();
