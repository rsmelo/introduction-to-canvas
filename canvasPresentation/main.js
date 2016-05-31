const canvasPresentation = (function () {
  let fpsInterval;
  let startTime;
  let now;
  let then;
  let elapsed;

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

  const startAnimating = (fps, frameFunction) => {
      fpsInterval = 1000 / fps;
      then= Date.now();
      startTime= then;
      animate(frameFunction);
  };

  const animate = (executeFrame) => {
    requestAnimationFrame(() => { animate(executeFrame); });
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      executeFrame();
    }
  };

  const example6 = () => {
    let step = 0;

    const canvas = document.getElementById('canvas6');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50,20);
    ctx.bezierCurveTo(210, 20, 180, 100, 50, 150);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    // start point
    ctx.fillRect(50, 20, 10, 10);
    // end point
    ctx.fillRect(50, 150, 10, 10);

    ctx.fillStyle = 'red';
    // control point one
    ctx.fillRect(210, 20, 10, 10);
    // control point two
    ctx.fillRect(180, 100, 10, 10);

    const example6Step1 = () => {
      ctx.moveTo(375,40);
      ctx.bezierCurveTo(375, 37, 370, 25, 350, 25);
    };

    const example6Step2 = () => {
      example6Step1();
      ctx.bezierCurveTo(320, 25, 320, 62.5, 320, 62.5);
    };
    const example6Step3 = () => {
      example6Step2();
      ctx.bezierCurveTo(320, 80, 340, 102, 375, 120);
    };
    const example6Step4 = () => {
      example6Step3();
      ctx.bezierCurveTo(410, 102, 430, 80, 430, 62.5);
    };
    const example6Step5 = () => {
      example6Step4();
      ctx.bezierCurveTo(430, 62.5, 430, 25, 400, 25);
    };
    const example6Step6 = () => {
      example6Step5();
      ctx.bezierCurveTo(385, 25, 375, 37, 375, 40);
    };

    const steps = [example6Step1, example6Step2, example6Step3, example6Step4, example6Step5, example6Step6];
    const frame = () => {
      ctx.clearRect(300, 0, 200, 150);
      ctx.beginPath();
      steps[step]();
      ctx.fill();
      if (step === steps.length -1) {
        step = 0;
      } else {
        step++;
      }
    };

    startAnimating(2, frame);
  };

  const init = (Reveal) => {
    Reveal.addEventListener('example1',  example1, false);
    Reveal.addEventListener('example2',  example2, false);
    Reveal.addEventListener('example3',  example3, false);
    Reveal.addEventListener('example4',  example4, false);
    Reveal.addEventListener('example5',  example5, false);
    Reveal.addEventListener('example6',  example6, false);
  };

  return {
    init: init
  };
})();
