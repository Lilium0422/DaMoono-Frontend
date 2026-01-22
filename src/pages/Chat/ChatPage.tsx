import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router';
import chatIcon from '@/assets/images/chat.png';
import infoIcon from '@/assets/images/info-icon.png';
import mic from '@/assets/images/mic.png';
import moonerbot from '@/assets/images/moonerbot.png';
import plusButton from '@/assets/images/plus-button.png';
import sendButton from '@/assets/images/send-button.svg';
import BottomNav from '@/components/BottomNav';
import Layout from '../layout/Layout';
import MessageCard from './components/MessageCard';
import * as styles from './style/ChatPage.css';

// 추천 질문 목록
const recommendedQuestions = [
  '구독(유독) 추천',
  '요금제 추천',
  '휴대폰 추천',
  '신규가입 이벤트',
  '채팅 상담사 연결',
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'plan' | 'subscription' | 'phone' | 'event';
  cards?: Array<{
    title: string;
    price?: string;
    originalPrice?: string;
    discountPrice?: string;
    mainFeature?: string;
    details: Array<{ label: string; value: string }>;
  }>;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 메시지가 추가될 때마다 스크롤을 아래로
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
        type: data.type || 'text',
        cards: data.cards,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (_error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          '죄송합니다. 서버와의 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date(),
        type: 'text',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowMenu(false);
  };

  const handleQuestionClick = (question: string) => {
    if (question === '챗봇 메뉴얼') {
      navigate('/chat/manual');
      return;
    }
    handleSendMessage(question);
  };

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      handleSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Chat Header */}
        <div className={styles.chatHeader}>
          <img src={chatIcon} alt="채팅" className={styles.headerIcon} />
          <span className={styles.headerTitle}>다무너와 대화하기</span>
        </div>

        <div className={styles.content} ref={contentRef}>
          {/* Welcome Section */}
          <div className={styles.welcomeSection}>
            <img src={moonerbot} alt="무너봇" className={styles.welcomeIcon} />
            <p className={styles.welcomeText}>
              상담 챗봇 서비스입니다.
              <br />
              궁금하신 내용을 입력해 주세요.
            </p>
          </div>

          {/* Recommended Questions */}
          <div className={styles.recommendedSection}>
            <h3 className={styles.recommendedTitle}>추천질문</h3>
            <div className={styles.questionList}>
              {recommendedQuestions.map((question: string) => (
                <button
                  key={question}
                  type="button"
                  className={styles.questionButton}
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </button>
              ))}
              <button
                type="button"
                className={styles.questionButton}
                onClick={() => handleQuestionClick('챗봇 메뉴얼')}
              >
                <img src={infoIcon} alt="정보" className={styles.infoIcon} />
                챗봇 메뉴얼
              </button>
            </div>
          </div>

          {/* Messages */}
          {messages.length > 0 && (
            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div key={message.id} className={styles.messageWrapper}>
                  {message.role === 'user' ? (
                    <div className={styles.userMessageContainer}>
                      <div className={styles.userMessage}>
                        <p className={styles.userText}>{message.content}</p>
                      </div>
                      <span className={styles.timestamp}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  ) : (
                    <div className={styles.assistantMessageContainer}>
                      <div className={styles.assistantHeader}>
                        <img
                          src={moonerbot}
                          alt="무너"
                          className={styles.botIcon}
                        />
                        <span className={styles.botName}>무너</span>
                      </div>
                      <div className={styles.assistantMessage}>
                        <div className={styles.assistantText}>
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p
                                  style={{
                                    marginBottom: '0.8em',
                                    lineHeight: '1.6',
                                  }}
                                >
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul
                                  style={{
                                    marginLeft: '1.2em',
                                    marginBottom: '0.8em',
                                    lineHeight: '1.6',
                                  }}
                                >
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol
                                  style={{
                                    marginLeft: '1.2em',
                                    marginBottom: '0.8em',
                                    lineHeight: '1.6',
                                  }}
                                >
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li style={{ marginBottom: '0.4em' }}>
                                  {children}
                                </li>
                              ),
                              strong: ({ children }) => (
                                <strong style={{ fontWeight: 'bold' }}>
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em style={{ fontStyle: 'italic' }}>
                                  {children}
                                </em>
                              ),
                              h1: ({ children }) => (
                                <h1
                                  style={{
                                    fontSize: '1.5em',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5em',
                                  }}
                                >
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2
                                  style={{
                                    fontSize: '1.3em',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5em',
                                  }}
                                >
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3
                                  style={{
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5em',
                                  }}
                                >
                                  {children}
                                </h3>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                      {message.cards && message.cards.length > 0 && (
                        <MessageCard
                          cards={message.cards}
                          type={message.type || 'text'}
                        />
                      )}
                      <span className={styles.timestamp}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className={styles.messageWrapper}>
                  <div className={styles.assistantMessageContainer}>
                    <div className={styles.assistantHeader}>
                      <img
                        src={moonerbot}
                        alt="무너"
                        className={styles.botIcon}
                      />
                      <span className={styles.botName}>무너</span>
                    </div>
                    <div className={styles.assistantMessage}>
                      <p className={styles.assistantText}>
                        답변을 생성하고 있습니다...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className={styles.inputContainer}>
          {showMenu && (
            <div className={styles.menu}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={handleClearChat}
              >
                채팅 초기화
              </button>
              <button type="button" className={styles.menuItem}>
                상담사 연결
              </button>
              <button type="button" className={styles.menuItem}>
                챗봇 메뉴얼
              </button>
            </div>
          )}

          <div className={styles.inputWrapper}>
            <button
              type="button"
              className={styles.plusButton}
              onClick={() => setShowMenu(!showMenu)}
            >
              <img src={plusButton} alt="메뉴" className={styles.plusIcon} />
            </button>

            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="질문을 입력하세요"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.iconButton}
                disabled={isLoading}
              >
                <img src={mic} alt="음성 입력" className={styles.icon} />
              </button>
              <button
                type="button"
                className={styles.iconButton}
                onClick={handleSend}
                disabled={isLoading}
              >
                <img src={sendButton} alt="전송" className={styles.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </Layout>
  );
}
