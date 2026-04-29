import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, useFBO, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function useMaskTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

const maskVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const maskFragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uMaskTexture;
  uniform mat3 uTextureMatrix;
  void main() {
    vec4 maskColor = texture2D(uMaskTexture, vUv);
    if (maskColor.r < 0.5) discard;
    vec2 uv = (uTextureMatrix * vec3(vUv, 1.0)).xy;
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

interface TextMaskSceneProps {
  headingText: string;
}

function TextMaskScene({ headingText }: TextMaskSceneProps) {
  const width = 3.4;
  const height = 1.6;
  const cameraDistance = 3.6;
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const maskTexture = useMaskTexture();
  const buffer1 = useFBO();
  const buffer2 = useFBO();
  const viewport = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const gl = useThree((state) => state.gl);

  const virtualCameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    const maskMesh = meshRef.current;
    const planeMesh = planeRef.current;
    if (!maskMesh || !planeMesh) return;

    const target = buffer2;

    const vc = virtualCameraRef.current;
    if (vc && camera instanceof THREE.OrthographicCamera) {
      vc.position.copy(camera.position);
      vc.quaternion.copy(camera.quaternion);
      vc.scale.copy(camera.scale);
    }

    const scaleX = (viewport.width / width) * width;
    const scaleY = (viewport.height / height) * height;

    const nPosition = state.mouse.clone();
    nPosition.x *= viewport.width / 2;
    nPosition.y *= viewport.height / 2;

    maskMesh.scale.set(scaleX, scaleY, 1);
    maskMesh.position.setX(nPosition.x);
    maskMesh.position.setY(nPosition.y);

    planeMesh.scale.set(viewport.width, viewport.height, 1);

    const mat = materialRef.current;
    if (mat) {
      mat.uniforms.uTexture.value = target.texture;
      mat.uniforms.uMaskTexture.value = maskTexture;
    }

    planeMesh.visible = false;
    gl.setRenderTarget(buffer2);
    gl.render(state.scene, camera);
    gl.setRenderTarget(null);
    planeMesh.visible = true;
  });

  const textureMatrix = useMemo(() => {
    return new THREE.Matrix3();
  }, []);

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, cameraDistance]}
        zoom={size.height / height}
        left={(width * (size.width / size.height)) / -2}
        right={(width * (size.width / size.height)) / 2}
        top={height / 2}
        bottom={height / -2}
        near={0.01}
        far={cameraDistance}
      />

      <PerspectiveCamera
        ref={virtualCameraRef}
        position={[0, 0, cameraDistance]}
        fov={40}
        near={0.1}
        far={1000}
        aspect={size.width / size.height}
      />

      <mesh ref={planeRef}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="#fffff0"
          toneMapped={false}
          transparent
        />
      </mesh>

      <mesh scale={[width, height, 1]} position={[-width / 2, 0, 0]} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1c1c1c" />
        <Html zIndexRange={[-1, -10]} prepend fullscreen>
          <div
            ref={containerRef}
            style={{
              width: size.width,
              height: size.height,
              backgroundColor: '#fffff0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                color: '#1c1c1c',
                fontSize: '78px',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {headingText}
            </h2>
          </div>
        </Html>
      </mesh>

      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={maskVertexShader}
          fragmentShader={maskFragmentShader}
          uniforms={{
            uTexture: { value: buffer1.texture },
            uMaskTexture: { value: maskTexture },
            uTextureMatrix: { value: textureMatrix },
          }}
          depthWrite={false}
          transparent
        />
      </mesh>
    </>
  );
}

interface TextMaskProps {
  headingText: string;
}

export function TextMask({ headingText }: TextMaskProps) {
  return (
    <div className="mask-container">
      <h1
        className="hero-heading"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fffff0',
          textTransform: 'uppercase',
          fontSize: '78px',
          fontWeight: 600,
          textAlign: 'center',
          fontFamily: '"Manrope", sans-serif',
          letterSpacing: '-0.02em',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        {headingText}
      </h1>
      <Canvas
        dpr={[1, 2]}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <TextMaskScene headingText={headingText} />
      </Canvas>
    </div>
  );
}
