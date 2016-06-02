const canvasPresentation = (function () {

  const startAnimating = (fps, frameFunction) => {
      let fpsInterval = 1000 / fps;
      let then = Date.now();
      animate(frameFunction, fpsInterval, then);
  };

  const animate = (executeFrame, fpsInterval, then) => {
    requestAnimationFrame(() =>  animate(executeFrame, fpsInterval, then) );
    let now = Date.now();
    let elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      executeFrame();
    }
  };

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
    const ctx = document.getElementById('canvas2').getContext('2d');

    ctx.strokeStyle = '#f00';
    ctx.fillStyle = '#000';

    ctx.fillRect(10, 10, 100, 100);
    ctx.strokeRect(120, 10, 100, 100);

    ctx.fillRect(10, 120, 100, 100);
    ctx.clearRect(20, 130, 80, 80);
  };

  const example3 = () => {
    const ctx = document.getElementById('canvas3').getContext('2d');
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
    const ctx = document.getElementById('canvas4').getContext('2d');

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
    const ctx = document.getElementById('canvas5').getContext('2d');

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

  const example6 = () => {
    let step = 0;
    const ctx = document.getElementById('canvas6').getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50,20);
    ctx.bezierCurveTo(180, 20, 10, 80, 50, 150);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    // start point
    ctx.fillRect(50, 20, 10, 10);
    // end point
    ctx.fillRect(50, 150, 10, 10);

    ctx.fillStyle = 'red';
    // control point one
    ctx.fillRect(180, 20, 10, 10);
    // control point two
    ctx.fillRect(10, 80, 10, 10);

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

  const example7 = () => {
    let step = 0;
    const ctx = document.getElementById('canvas7').getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50,20);
    ctx.quadraticCurveTo(150, 30, 50, 150);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    // start point
    ctx.fillRect(50, 20, 10, 10);
    // end point
    ctx.fillRect(50, 150, 10, 10);

    ctx.fillStyle = 'red';
    // control point
    ctx.fillRect(150, 30, 10, 10);

    const example7Step1 = () => {
      ctx.moveTo(375,25);
      ctx.quadraticCurveTo(325, 25, 325, 62.5);
    };

    const example7Step2 = () => {
      example7Step1();
      ctx.quadraticCurveTo(325, 100, 350, 100);
    };
    const example7Step3 = () => {
      example7Step2();
      ctx.quadraticCurveTo(350, 120, 330, 125);
    };
    const example7Step4 = () => {
      example7Step3();
      ctx.quadraticCurveTo(360, 120, 365, 100);
    };
    const example7Step5 = () => {
      example7Step4();
      ctx.quadraticCurveTo(425, 100, 425, 62.5);
    };
    const example7Step6 = () => {
      example7Step5();
      ctx.quadraticCurveTo(425, 25, 375, 25);
    };

    const steps = [example7Step1, example7Step2, example7Step3, example7Step4, example7Step5, example7Step6];

    const frame = () => {
      ctx.clearRect(300, 0, 200, 150);
      ctx.beginPath();
      steps[step]();
      ctx.stroke();
      if (step === steps.length -1) {
        step = 0;
      } else {
        step++;
      }
    };

    startAnimating(2, frame);
    Reveal.removeEventListener('example7',  example7, false);
  };

  const example8 = () => {
    const ctx = document.getElementById('canvas8').getContext('2d');

    const triangle = new Path2D();
    triangle.moveTo(20, 150);
    triangle.lineTo(50, 190);
    triangle.lineTo(100, 110);
    triangle.closePath();

    const circle = new Path2D(triangle);
    circle.arc(170, 60, 50, 0, 2 * Math.PI);

    const rectangle = new Path2D();
    rectangle.rect(250, 10, 100, 100);
    rectangle.addPath(circle);

    const svgPath = new Path2D('M10 10 h 80 v 80 h -80 Z');
    svgPath.addPath(rectangle);

    ctx.fill(svgPath);
  };

  const example9 = () => {
    const ctx = document.getElementById('canvas9').getContext('2d');

    ctx.font = '60px sans-serif';
    ctx.fillText('Leeroy ', 50, 50);

    ctx.font = '60px "League Gothic"';
    ctx.strokeText('Jenkins', 250, 50);
    ctx.fillText('Jenkins', 250, 120, 50);
  };

  const example10 = () => {
    const ctx = document.getElementById('canvas10').getContext('2d');

    ctx.fillStyle = '#000';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'start';
    ctx.fillText('Leeroy', 220, 50);
    ctx.textAlign = 'center';
    ctx.fillText('Leeroy', 220, 100);
    ctx.textAlign = 'end';
    ctx.fillText('Leeroy', 220, 150);
    ctx.textAlign = 'left';
    ctx.fillText('Leeroy', 220, 200);
    ctx.textAlign = 'right';
    ctx.fillText('Leeroy', 220, 250);

    ctx.fillStyle = "red";
    ctx.fillRect(220, 50, 5, 5);
    ctx.fillRect(220, 100, 5, 5);
    ctx.fillRect(220, 150, 5, 5);
    ctx.fillRect(220, 200, 5, 5);
    ctx.fillRect(220, 250, 5, 5);
  };

  const example11Texts = (ctx) => {
    ctx.font = '48px sans-serif';
    ctx.strokeStyle = 'brown';
    ctx.textBaseline = 'ideographic';
    ctx.strokeText('Leeroy', 150, 100);

    ctx.strokeStyle = 'green';
    ctx.textBaseline = 'middle';
    ctx.strokeText('Leeroy', 150, 100);

    ctx.strokeStyle = 'orange';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('Leeroy', 150, 100);
  };

  const example11 = () => {
    const ctx = document.getElementById('canvas11').getContext('2d');
    example11Texts(ctx);
  };

  const example12Texts = (ctx) => {
    ctx.font = '48px sans-serif';
    ctx.strokeStyle = '#000';
    ctx.textBaseline = 'alphabetic';
    ctx.strokeText('Leeroy', 10, 100);

    ctx.strokeStyle = 'red';
    ctx.textBaseline = 'top';
    ctx.strokeText('Leeroy', 10, 100);

    ctx.strokeStyle = 'blue';
    ctx.textBaseline = 'bottom';
    ctx.strokeText('Leeroy', 10, 100);
  };

  const example12 = () => {
    const ctx = document.getElementById('canvas12').getContext('2d');
    example12Texts(ctx);
  };

  const example13 = () => {
    const ctx = document.getElementById('canvas13').getContext('2d');
    example11Texts(ctx);
    example12Texts(ctx);
  };

  const example14 = () => {
    const ctx = document.getElementById('canvas14').getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(5, 5, 50, 150);
    ctx.fillStyle = 'rgb(255, 106, 0)';
    ctx.fillRect(60, 5, 50, 150);
    ctx.fillStyle = 'rgba(255, 106, 0, 0.5)';
    ctx.fillRect(115, 5, 50, 150);
    ctx.fillStyle = 'hsla(24, 100%, 50%, 0.5)';
    ctx.fillRect(170, 5, 50, 150);
    ctx.fillStyle = 'hsl(24, 100%, 50%)';
    ctx.fillRect(225, 5, 50, 150);
    ctx.fillStyle = 'red';
    ctx.fillRect(280, 5, 50, 150);
  };

  const example15 = () => {
    const ctx = document.getElementById('canvas15').getContext('2d');
    const horizontalGradient = ctx.createLinearGradient(0, 0, 400, 0);
    horizontalGradient.addColorStop(0, 'green');
    horizontalGradient.addColorStop(0.5, 'yellow');
    horizontalGradient.addColorStop(1, 'red');
    ctx.fillStyle = horizontalGradient;
    ctx.fillRect(0, 0, 400, 50);

    const verticalGradient = ctx.createLinearGradient(0, 55, 0, 200);
    verticalGradient.addColorStop(0, '#0000cc');
    verticalGradient.addColorStop(1, '#66ccff');
    ctx.fillStyle = verticalGradient;
    ctx.fillRect(0, 55, 400, 150);
  };

  const example16 = () => {
    const ctx = document.getElementById('canvas16').getContext('2d');
    const gradient = ctx.createRadialGradient(100, 100, 80, 100, 100, 0);
    gradient.addColorStop(0,'red');
    gradient.addColorStop(1,'white');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,200,200);

    const gradient2 = ctx.createRadialGradient(300, 100, 100, 300, 100, 20);
    gradient2.addColorStop(0,'#0f0');
    gradient2.addColorStop(0.5,'#f00');
    gradient2.addColorStop(1,'#00f');
    ctx.fillStyle = gradient2;
    ctx.fillRect(200, 0, 200, 300);
  };

  const example17 = () => {
    const ctx = document.getElementById('canvas17').getContext('2d');
    const astronaut = document.getElementById('astronaut');
    const pattern = ctx.createPattern(astronaut, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 500,250);
  };

  const example18 = () => {
    const ctx = document.getElementById('canvas18').getContext('2d');
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'grey';

    ctx.fillStyle = '#f00';
    ctx.fillRect(10, 10, 100, 100);

    ctx.beginPath();
    ctx.arc(200, 10, 50, 0, Math.PI);
    ctx.fill();

    ctx.font = '60px sans-serif';
    ctx.fillText('Aliens', 260, 100);
  };

  const example19 = () => {
    const ctx = document.getElementById('canvas19').getContext('2d');
    ctx.save();
    ctx.fillRect(10, 10, 80, 80);
    ctx.translate(200, 100);
    ctx.fillStyle = '#f00';
    ctx.fillRect(10, 10, 80, 80);
    ctx.restore();
    ctx.fillRect(400, 10, 80, 80);
    Reveal.removeEventListener('example19',  example19);
  };

  const example20 = () => {
    const ctx = document.getElementById('canvas20').getContext('2d');
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 30, 100, 100);

    ctx.save();
    ctx.rotate((Math.PI / 180) * 25);
    ctx.fillStyle = 'blue';
    ctx.fillRect(100, 30, 100, 100);

    ctx.restore();
    ctx.restore();
    ctx.fillRect(250, 30, 20, 100);
    Reveal.removeEventListener('example20',  example20);
  };

  const example21 = () => {
    console.log("21");
    const ctx = document.getElementById('canvas21').getContext('2d');

    ctx.font = '60px sans-serif';
    ctx.fillText('Leeeeeeeeroy!', 20, 50);
    ctx.scale(-1, 1);
    ctx.fillText('Leeeeeeeeroy!', -420, 150);
    ctx.resetTransform();
    ctx.scale(0.5, 1.2);
    ctx.fillText('Leeeeeeeeroy!', 20, 200);
    Reveal.removeEventListener('example21',  example21);
  };


  const example22 = () => {
    const ctx = document.getElementById('canvas22').getContext('2d');
    const dog = new Image();

    dog.src = './canvasPresentation/img/dog.png';
    dog.addEventListener('load', () => {
      ctx.drawImage(dog, 0, 0);
      ctx.drawImage(dog, 150, 10, 64, 64);
      ctx.drawImage(dog, 250, 10, 200, 200);
    });
  };

  const example23 = () => {
    const ctx = document.getElementById('canvas23').getContext('2d');
    const dog = new Image();

    dog.src = './canvasPresentation/img/dog.png';
    dog.addEventListener('load', () => {
      ctx.drawImage(dog, 0, 0);
      ctx.drawImage(dog, 53, 37, 34, 28, 150, 10, 256, 256);
      ctx.strokeStyle = 'red';
      ctx.strokeRect(53, 37, 34, 28);
    });
  };

  const example24 = () => {
    const ctx = document.getElementById('canvas24').getContext('2d');
    const jake = new Image();

    jake.src = './canvasPresentation/img/jake.jpg';
    jake.addEventListener('load', () => {
      ctx.drawImage(jake, 0, 0);
      const imageData = ctx.getImageData(0,0,jake.width, jake.height);
      let data = imageData.data;

      for (let i = 0, lenData = data.length; i < lenData; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
      ctx.putImageData(imageData, jake.width + 1,  0);
    });
  };

  const example25 = () => {
    const canvas = document.getElementById('canvas25');
    const ctx = canvas.getContext('2d');
    const ball = { x: 25, y: 80, velocity: 5, radius: 25 };
    const drawBall = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ball.x += ball.velocity;
      if (ball.x + ball.velocity > canvas.width || ball.x + ball.velocity < 0) {
        ball.velocity = -ball.velocity;
      }
      window.requestAnimationFrame(drawBall);
    };
    drawBall();
  };

  const init = (Reveal) => {
    Reveal.addEventListener('example1',  example1, false);
    Reveal.addEventListener('example2',  example2, false);
    Reveal.addEventListener('example3',  example3, false);
    Reveal.addEventListener('example4',  example4, false);
    Reveal.addEventListener('example5',  example5, false);
    Reveal.addEventListener('example6',  example6, false);
    Reveal.addEventListener('example7',  example7, false);
    Reveal.addEventListener('example8',  example8, false);
    Reveal.addEventListener('example9',  example9, false);
    Reveal.addEventListener('example10',  example10, false);
    Reveal.addEventListener('example11',  example11, false);
    Reveal.addEventListener('example12',  example12, false);
    Reveal.addEventListener('example13',  example13, false);
    Reveal.addEventListener('example14',  example14, false);
    Reveal.addEventListener('example15',  example15, false);
    Reveal.addEventListener('example16',  example16, false);
    Reveal.addEventListener('example17',  example17, false);
    Reveal.addEventListener('example18',  example18, false);
    Reveal.addEventListener('example19',  example19, false);
    Reveal.addEventListener('example20',  example20, false);
    Reveal.addEventListener('example21',  example21, false);
    Reveal.addEventListener('example22',  example22, false);
    Reveal.addEventListener('example23',  example23, false);
    Reveal.addEventListener('example24',  example24, false);
    Reveal.addEventListener('example25',  example25, false);
  };

  return {
    init: init
  };
})();
