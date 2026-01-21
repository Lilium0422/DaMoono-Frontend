import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { TextureLoader } from 'three';
import { sizeMap } from './constants';
import type { Mascot3DProps } from './types';
import { useMascotAnimation } from './useMascotAnimation';

export function Mascot({
  textureUrl,
  size = 'md',
  float = true,
  floatSpeed = 1,
  rotation = 0.15,
}: Mascot3DProps) {
  /**
   * textureUrl로 전달받은 이미지를 로드
   * - planeGeometry에 이미지 스티커처럼 붙이기 위함
   */
  const texture = useLoader(TextureLoader, textureUrl);

  /**
   * 마스코트 애니메이션 관련 ref와 로직
   * - float: 위아래 부유 효과
   * - rotation: 좌우 살짝 흔들리는 회전
   */
  const { meshRef, baseScaleRef } = useMascotAnimation({
    float,
    floatSpeed,
    rotation,
  });

  /**
   * size 값이 변경되면 기준 scale 값을 갱신
   * - 실제 scale 애니메이션은 useMascotAnimation 내부에서 처리
   */
  useEffect(() => {
    baseScaleRef.current = sizeMap[size];
  }, [size, baseScaleRef]);

  return (
    /**
     * mesh = 화면에 실제로 렌더링되는 3D 객체
     * meshRef를 통해 애니메이션 적용
     * geometry는 고정값 사용, 크기는 scale로 조절
     */
    <mesh ref={meshRef}>
      <planeGeometry args={[3.5, 3.5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
