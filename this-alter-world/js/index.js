"use strict";
{
	class Noise {
		// http://mrl.nyu.edu/~perlin/noise/
		constructor(octaves = 1) {
			this.p = new Uint8Array(512);
			this.octaves = octaves;
			this.init();
		}
		init() {
			for (let i = 0; i < 512; ++i) {
				this.p[i] = Math.random() * 256;
			}
		}
		lerp(t, a, b) {
			return a + t * (b - a);
		}
		grad2d(i, x, y) {
			const v = (i & 1) === 0 ? x : y;
			return (i & 2) === 0 ? -v : v;
		}
		noise2d(x2d, y2d) {
			const X = Math.floor(x2d) & 255;
			const Y = Math.floor(y2d) & 255;
			const x = x2d - Math.floor(x2d);
			const y = y2d - Math.floor(y2d);
			const fx = (3 - 2 * x) * x * x;
			const fy = (3 - 2 * y) * y * y;
			const p0 = this.p[X] + Y;
			const p1 = this.p[X + 1] + Y;
			return this.lerp(
				fy,
				this.lerp(
					fx,
					this.grad2d(this.p[p0], x, y),
					this.grad2d(this.p[p1], x - 1, y)
				),
				this.lerp(
					fx,
					this.grad2d(this.p[p0 + 1], x, y - 1),
					this.grad2d(this.p[p1 + 1], x - 1, y - 1)
				)
			);
		}
		noise(x, y) {
			let e = 1,
				k = 1,
				s = 0;
			for (let i = 0; i < this.octaves; ++i) {
				e *= 0.5;
				s += e * (1 + this.noise2d(k * x, k * y)) / 2;
				k *= 2;
			}
			return s;
		}
	}
	const canvas = {
		init() {
			this.elem = document.createElement("canvas");
			document.body.appendChild(this.elem);
			this.resize();
			return this.elem.getContext("2d");
		},
		resize() {
			this.width = this.elem.width = this.elem.offsetWidth;
			this.height = this.elem.height = this.elem.offsetHeight;
		},
		reset() {
			this.resize();
			px = 0;
			perlin.init();
		}
	};
	const pointer = {
		init(canvas) {
			["mousedown", "touchstart"].forEach((event, touch) => {
				document.addEventListener(event, e => canvas.reset(), false);
			});
		}
	};
	const perlin = new Noise(3);
	let px = 0;
	const ctx = canvas.init();
	pointer.init(canvas);
	const run = () => {
		requestAnimationFrame(run);
		ctx.lineWidth = 1;
 		ctx.globalAlpha = 0.05;
		if (px++ < canvas.width) {
			for (let i = 0; i < canvas.height / 6; i++) {
				let x = px;
				let y = Math.random() * canvas.height;
				ctx.beginPath();
      	ctx.moveTo(x, y);
				const n = perlin.noise(x * 0.01, y * 0.01);
				ctx.strokeStyle = `hsl(${-210 + n * 600}, 100%, ${900 * n * n * n}%)`;
				for (let m = 0; m < 600 && y >= 0 && y <= canvas.height; m++) {
					const n = perlin.noise(x * 0.01, y * 0.01);
					x += Math.cos(n * 14);
					y += Math.sin(n * 14);
					ctx.lineTo(x, y);
				}
				ctx.stroke();
			}
		}
	};
	run();
}