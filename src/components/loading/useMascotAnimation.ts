import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';

interface AnimationOptions {
  float?: boolean;
  floatSpeed?: number;
  rotation?: number;
}

export function useMascotAnimation({
  float = true,
  floatSpeed = 1,
  rotation = 0.15,
}: AnimationOptions) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const baseScaleRef = useRef(1);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.elapsedTime * floatSpeed;

    if (float) {
      // 강한 로딩 애니메이션
      meshRef.current.position.x = Math.sin(t * floatSpeed * 0.6) * 0.25;
      meshRef.current.position.y = Math.sin(t) * 0.18;
      meshRef.current.rotation.z = Math.sin(t * 0.8) * rotation;

      const breathing = 1 + Math.sin(t * 1.2) * 0.04;
      const finalScale = baseScaleRef.current * breathing;
      meshRef.current.scale.set(finalScale, finalScale, finalScale);
    } else {
      // 거의 정적인 상태
      meshRef.current.position.x = 0;
      meshRef.current.position.y = 0;
      meshRef.current.rotation.z = Math.sin(t) * 0.03;

      const finalScale = baseScaleRef.current * 1.01;
      meshRef.current.scale.set(finalScale, finalScale, finalScale);
    }
  });

  return { meshRef, baseScaleRef };
}
