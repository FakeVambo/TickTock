const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

startClock = () => {
  const [w, h] = [canvas.width, canvas.height];

  const ctx = canvas.getContext("2d");
  let gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "gray");
  gradient.addColorStop(1, "white");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  clock = () => {
    // Frame
    ctx.beginPath();
    const r = Math.min(w / 2, h / 2) * 0.8;
    ctx.arc(w / 2, h / 2, r, 0, 360);
    gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, r);
    gradient.addColorStop(0, "#434343");
    gradient.addColorStop(0.5, "black");
    gradient.addColorStop(1, "#434343");
    ctx.fillStyle = gradient;
    ctx.fill();

    const r2 = r * 0.88;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r2, 0, 360);
    gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, r);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "whitesmoke");
    ctx.fillStyle = gradient;
    ctx.fill();

    //Numbers
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Palatino";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const r3 = r2 * 0.9;

    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 * Math.PI) / 180;
      const x = w / 2 + r3 * Math.sin(angle);
      const y = h / 2 - r3 * Math.cos(angle);
      ctx.fillText(i.toString(), x, y);
    }

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 7.5, 0, 360);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = (((hours % 12) * 30 + minutes / 2) * Math.PI) / 180;
    const minAngle = (minutes * 6 * Math.PI) / 180;
    const secAngle = (seconds * 6 * Math.PI) / 180;

    // Hands
    const hourLength = r2 * 0.5;
    const minLength = r2 * 0.7;
    const secLength = r2 * 0.75;

    drawHand(w / 2, h / 2, hourLength, hourAngle, 8, "black");
    drawHand(w / 2, h / 2, minLength, minAngle, 6, "black");
    drawHand(w / 2, h / 2, secLength, secAngle, 2, "red");

    requestAnimationFrame(clock);
  };

  drawHand = (ax, ay, length, angle, lineWidth, color) => {
    const x = ax + length * Math.sin(angle);
    const y = ay - length * Math.cos(angle);

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(ax, ay);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  };

  clock();
};

startClock();
