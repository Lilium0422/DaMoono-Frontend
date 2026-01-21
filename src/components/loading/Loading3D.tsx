import { Canvas } from '@react-three/fiber';
import { Mascot } from './Mascot';
import type { Mascot3DProps } from './types';

/**
 * Loading3D
 *
 * Three.js(Canvas)를 사용한 공통 로딩 UI 컴포넌트.
 * - 내부에서 3D Canvas를 생성한다.
 * - 외부에서는 Mascot 옵션(props)만 전달하면 된다.
 *
 * 주의
 * - Canvas 설정(camera, size)은 공통 기준이므로
 *   특별한 이유가 없다면 이 파일에서 수정하지 않는다.
 * - 로딩 애니메이션 관련 로직은 Mascot / useMascotAnimation에서 관리한다.
 */

export function Loading3D(props: Mascot3DProps) {
  return (
    <Canvas
      /**
       * 공통 카메라 설정
       * z=5 기준으로 마스코트 크기를 설계했다.
       */
      camera={{ position: [0, 0, 5] }}
      /**
       * 부모 영역을 기준으로 전체를 채운다.
       * (로딩 모달 / 페이지 어디서든 재사용 가능)
       */
      style={{ width: '100%', height: '100%' }}
    >
      {/**
       * 기본 조명
       * - 이미지 기반 마스코트이므로 강한 조명은 필요 없음
       */}
      <ambientLight intensity={1} />
      {/**
       * 실제 로딩 마스코트 컴포넌트
       * - 마스코트 이미지, size, animation 옵션은 props로 제어
       */}
      <Mascot {...props} />
    </Canvas>
  );
}
