import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;

  > div {
    p.correct {
      margin-top: 12px;
      font-family: 'Fira Code';
      font-weight: bold;
      color: #8bb03e;
    }

    p.incorrect {
      font-family: 'Fira Code';
      font-weight: bold;
      color: #f64e60;
    }
  }

  div + div {
    margin-top: 16px;
  }

  b {
    font-family: 'Fira Code';
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    color: #eee;
  }

  div {
    p {
      span {
        font-family: 'Fira Code';
        font-weight: bold;
        font-size: 16px;
        text-transform: uppercase;
        color: #eee;
      }
    }
  }
`;
