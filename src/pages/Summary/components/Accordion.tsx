import { useState } from 'react';
import ChevronIcon from '@/pages/Summary/assets/chevron-down.svg';
import GuideIcon from '@/pages/Summary/assets/guide.svg';
import holeMan from '@/pages/Summary/assets/holeman.png';
import * as s from '@/pages/Summary/style/Accordion.css';

interface GuideData {
  guides: {
    title: string;
    steps: string[];
  };
}

export default function Accordion({ guides }: GuideData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.accordionWrapper}>
      <button
        type="button"
        className={s.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={s.headerSection}>
          <div className={s.iconWrapper}>
            <img src={GuideIcon} alt="guide" className={s.guideIcon} />
          </div>
          <div className={s.textWrapper}>
            <p className={s.guideTitle}>이용 가이드</p>
            <p className={s.description}>
              <span className={s.highlight}>AI</span>가 자동으로{' '}
              <span className={s.highlight}>매칭</span>했어요
            </p>
          </div>
        </div>
        <img
          src={ChevronIcon}
          className={s.chevron({ open: isOpen })}
          alt={isOpen ? '닫기' : '펼치기'}
        />
      </button>

      <div className={s.content({ open: isOpen })}>
        <div className={s.contentInner}>
          <div className={s.titleWrapper}>
            <img src={holeMan} alt="holeMan" className={s.mascotImg} />
            <span className={s.contentTitle}>{guides.title}</span>
          </div>

          {guides.steps.map((step) => (
            <div key={step} className={s.stepItem}>
              <span className={s.stepNumber}>
                {guides.steps.indexOf(step) + 1}
              </span>
              <p className={s.stepText}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
