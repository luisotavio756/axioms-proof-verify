import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  /* max-width: 1400px; */
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
  padding: 40px 0 40px 40px;
  position: relative;

  .container-title {
    margin: 0 auto;
    max-width: 700px;
    position: relative;
  }

  .description {
    p {
      color: #fff;
      font-size: 18px;
    }

    ul {
      padding-left: 22px;

      li {
        font-family: 'Fira Code';
        font-size: 16px;
        color: #999;

        span {
          color: #fff;
        }
      }
    }
  }

  .formulas {
    /* width: 100%; */
  }

  .button-actions {
    border-top: 1px solid ${shade('0.6', '#eee')};
    margin-top: 32px;
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 16px;

    button:first-of-type {
      grid-column-start: 2;
      color: #fff;
      background-color: #f64e60;

      &:hover {
        background-color: ${shade('0.2', '#f64e60')};
      }
    }
  }

  img {
    width: 180px;
    height: auto;
  }

  .button-switch-theme {
    background: transparent;
    border: none;
    position: absolute;
    right: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    font-weight: 600;
    font-size: 16px;

    svg {
      margin-right: 4px;
    }

    &.switch-to-dark {
      color: #fff;

      &:hover {
        color: ${shade('0.2', '#fff')};
        border-bottom: 2px solid ${shade('0.2', '#fff')};
      }
    }

    &.switch-to-light {
      color: #3a3a3a;

      &:hover {
        color: ${shade('0.2', '#3a3a3a')};
        border-bottom: 2px solid ${shade('0.2', '#3a3a3a')};
      }
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.4em;
  line-height: 56px;

  max-width: 580px;
  margin: 56px 0 24px;
`;
