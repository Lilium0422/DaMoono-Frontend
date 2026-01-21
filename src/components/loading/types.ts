export type MascotSize = 'sm' | 'md' | 'lg';

export interface Mascot3DProps {
  textureUrl: string; // 쓰고 싶은 마스코트 이미지 URL
  size?: MascotSize; // 마스코트 사이즈
  float?: boolean; // true면 원래 움직임, false면 느리게 (빠른 화면 전환일 때 사용)
  floatSpeed?: number; // 움직이는 속도 조절값
  rotation?: number; // 회전하는 범위 크기값
}
