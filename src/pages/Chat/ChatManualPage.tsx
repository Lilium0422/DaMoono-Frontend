import { useState } from 'react';
import { useNavigate } from 'react-router';
import moonerbot from '@/assets/images/moonerbot.png';
import BottomNav from '@/components/BottomNav';
import Layout from '../layout/Layout';
import * as styles from './style/ChatManualPage.css';

export default function ChatManualPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: '다무너 상담서비스, 무너',
      subtitle: '무엇이든 물어보세요!\n챗봇 상담사 무너가 답변드려요',
      description:
        '텍스트와 음성을 통해 질문을 입력하고 답변을 빠르게 받아요.\n상담 내용을 요약하고 상담사 연결을 빠르게 진행해요!',
      image: moonerbot,
    },
    {
      title: '빠른 답변',
      subtitle: '궁금한 점을 바로 해결하세요',
      description: '요금제, 구독, 휴대폰 등\n다양한 질문에 즉시 답변드립니다.',
      image: moonerbot,
    },
    {
      title: '맞춤 추천',
      subtitle: '나에게 딱 맞는 상품을 찾아드려요',
      description:
        '사용 패턴과 예산에 맞춰\n최적의 요금제와 서비스를 추천해드립니다.',
      image: moonerbot,
    },
    {
      title: '상담사 연결',
      subtitle: '필요하면 언제든 상담사와 연결',
      description: '복잡한 문의는 전문 상담사가\n직접 도와드립니다.',
      image: moonerbot,
    },
  ];

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* 상단 타이틀 */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>다무너</span>
        </div>

        {/* 메인 컨텐츠 */}
        <div className={styles.content}>
          {/* 타이틀 */}
          <h1 className={styles.title}>{pages[currentPage].title}</h1>

          {/* 서브타이틀 */}
          <p className={styles.subtitle}>{pages[currentPage].subtitle}</p>

          {/* 페이지 인디케이터 */}
          <div className={styles.indicators}>
            {pages.map((page, index) => (
              <button
                key={page.title}
                type="button"
                className={
                  index === currentPage
                    ? styles.indicatorActive
                    : styles.indicator
                }
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>

          {/* 이미지 */}
          <div className={styles.imageContainer}>
            <img
              src={pages[currentPage].image}
              alt="무너봇"
              className={styles.image}
            />
          </div>

          {/* 설명 */}
          <p className={styles.description}>{pages[currentPage].description}</p>

          {/* 화살표 버튼 */}
          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navButton}
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
            >
              →
            </button>
          </div>
        </div>

        {/* 상담 시작하기 버튼 */}
        <button
          type="button"
          className={styles.startButton}
          onClick={handleStartChat}
        >
          상담 시작하기
        </button>
      </div>

      <BottomNav />
    </Layout>
  );
}
