"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform float uTime;
uniform float uIntensity;
uniform float uAspect;

void main() {
  vec2 uv = vUv;
  vec2 uvAspect = vec2(uv.x * uAspect, uv.y);
  vec2 mouseAspect = vec2(uMouse.x * uAspect, uMouse.y);
  vec2 toMouse = uvAspect - mouseAspect;
  float dist = length(toMouse);
  float falloff = smoothstep(0.42, 0.0, dist);
  float ripple = sin(dist * 34.0 - uTime * 5.2) * 0.028;
  vec2 dir = dist > 0.0001 ? toMouse / dist : vec2(0.0);
  vec2 distortedUv = uv + dir * ripple * falloff * uIntensity;
  outColor = texture(uTex, distortedUv);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info ?? "shader compile failed");
  }
  return shader;
}

export default function WordmarkDistort({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "program link failed");
    }
    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");
    const uAspect = gl.getUniformLocation(program, "uAspect");
    const uTex = gl.getUniformLocation(program, "uTex");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Canvas 2D images are top-down; WebGL texture space is bottom-up.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const textCanvas = document.createElement("canvas");
    const tctx = textCanvas.getContext("2d")!;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const drawTextTexture = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      if (width === 0 || height === 0) return;

      // Canvas 2D's `font` property can't resolve CSS custom properties,
      // so read the browser's already-resolved font stack off the element.
      const resolvedFamily = getComputedStyle(wrap).fontFamily || "sans-serif";

      textCanvas.width = width * dpr;
      textCanvas.height = height * dpr;
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tctx.clearRect(0, 0, width, height);
      tctx.fillStyle = "#e4e6e8";
      tctx.textBaseline = "middle";
      tctx.textAlign = "left";

      const lineCount = lines.length;
      const lineHeight = height / lineCount;
      lines.forEach((line, i) => {
        const isJP = i === lineCount - 1 && lineCount > 1;
        const fontSize = isJP ? lineHeight * 0.42 : lineHeight * 0.82;
        tctx.font = `700 ${fontSize}px ${resolvedFamily}`;
        const y = lineHeight * i + lineHeight / 2;
        // shrink to fit width
        let measured = tctx.measureText(line).width;
        let size = fontSize;
        while (measured > width && size > 8) {
          size -= 2;
          tctx.font = `700 ${size}px ${resolvedFamily}`;
          measured = tctx.measureText(line).width;
        }
        tctx.fillText(line, 0, y);
      });

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    };

    document.fonts.ready.then(drawTextTexture);
    drawTextTexture();

    const ro = new ResizeObserver(() => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      drawTextTexture();
    });
    ro.observe(wrap);

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };
    let intensity = 0;
    let targetIntensity = 0;

    const onMove = (clientX: number, clientY: number) => {
      const r = wrap.getBoundingClientRect();
      targetMouse.x = (clientX - r.left) / r.width;
      targetMouse.y = 1 - (clientY - r.top) / r.height;
      targetIntensity = 1;
    };
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };
    const onLeave = () => {
      targetIntensity = 0;
    };

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchmove", onTouchMove, { passive: true });
    wrap.addEventListener("touchend", onLeave);

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const t = (now - start) / 1000;
      mouse.x += (targetMouse.x - mouse.x) * 0.12;
      mouse.y += (targetMouse.y - mouse.y) * 0.12;
      intensity += (targetIntensity - intensity) * 0.06;

      gl.useProgram(program);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uIntensity, intensity);
      gl.uniform1f(uAspect, width > 0 ? width / height : 1);
      gl.uniform1i(uTex, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchmove", onTouchMove);
      wrap.removeEventListener("touchend", onLeave);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [reduced, lines]);

  return (
    <div ref={wrapRef} className={"relative font-sans " + (className ?? "")}>
      {reduced ? (
        <div className="flex flex-col">
          {lines.map((line, i) => (
            <span
              key={i}
              className={
                i === lines.length - 1 && lines.length > 1
                  ? "font-sans text-[8vw] font-bold leading-[0.9] text-foreground sm:text-[4vw]"
                  : "font-sans text-[16vw] font-bold leading-[0.9] text-foreground sm:text-[10vw]"
              }
            >
              {line}
            </span>
          ))}
        </div>
      ) : (
        <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
      )}
      <span className="sr-only">{lines.join(" — ")}</span>
    </div>
  );
}
