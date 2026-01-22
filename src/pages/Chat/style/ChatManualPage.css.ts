import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#FEFDFD',
  paddingBottom: '80px',
});

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #f0f0f0',
});

export const headerTitle = style({
  fontFamily: 'S-Core Dream',
  fontSize: '20px',
  fontWeight: 600,
  color: '#333',
});

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
  gap: '24px',
});

export const title = style({
  fontFamily: 'S-Core Dream',
  fontSize: '24px',
  fontWeight: 700,
  color: '#333',
  margin: 0,
  textAlign: 'center',
});

export const subtitle = style({
  fontFamily: 'S-Core Dream',
  fontSize: '16px',
  fontWeight: 400,
  color: '#666',
  margin: 0,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  lineHeight: '1.5',
});

export const indicators = style({
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  marginTop: '8px',
});

export const indicator = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#D9D9D9',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
});

export const indicatorActive = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#FFE253',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const imageContainer = style({
  width: '100%',
  maxWidth: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 0',
});

export const image = style({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
});

export const description = style({
  fontFamily: 'S-Core Dream',
  fontSize: '14px',
  fontWeight: 400,
  color: '#999',
  margin: 0,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  lineHeight: '1.6',
});

export const navigation = style({
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  marginTop: '20px',
});

export const navButton = style({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  fontSize: '20px',
  color: '#333',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s',
  ':hover': {
    backgroundColor: '#f5f5f5',
  },
  ':disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
});

export const startButton = style({
  position: 'fixed',
  bottom: '80px',
  left: '20px',
  right: '20px',
  padding: '16px',
  backgroundColor: '#FBE88A',
  border: 'none',
  borderRadius: '12px',
  fontFamily: 'S-Core Dream',
  fontSize: '16px',
  fontWeight: 600,
  color: '#333',
  cursor: 'pointer',
  transition: 'all 0.3s',
  ':hover': {
    backgroundColor: '#FFE253',
  },
});
