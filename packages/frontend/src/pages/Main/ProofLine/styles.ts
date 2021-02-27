import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  margin-top: 16px;

  display: grid;
  grid-column-gap: 0.4%;

  > div {
    margin-top: 0;
  }

  .number-of-count {
    display: flex;
    align-items: center;

    span {
      font-size: 22px;
    }
  }

  select {
    background: #fff;
    border-radius: 10px;
    border: 2px solid #fff;
    padding: 16px;
    color: #666360;
    display: flex;
    align-items: center;
  }

  .actions {
    display: flex;

    .check-button {
      margin: 0;
      height: auto;
      width: unset;
    }

    .remove-button {
      margin-left: 12px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

      svg {
        transition: all 0.2s linear;
        font-size: 32px;
        color: ${({ theme }) => theme.title};
      }

      &:hover {
        svg {
          color: #f64e60;
        }
      }
    }
  }

  > p {
    margin-top: 6px;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 5;
    color: #8bb03e;

    display: flex;
    align-items: center;

    &.error {
      color: #f64e60;
    }

    svg {
      margin-left: 4px;
    }
  }
`;

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;

  .submit-button {
    margin-top: 0;
    margin-left: 8px;
    width: 100%;
    width: 200px;
  }

  .proof-lines {
    margin-top: 24px;

    > div {
      display: grid;
      grid-column-gap: 0.8%;

      > div {
        margin-top: 0;
      }

      select {
        background: #fff;
        border-radius: 10px;
        border: 2px solid #fff;
        padding: 16px;
        color: #666360;
        display: flex;
        align-items: center;
      }

      .check-button {
        margin: 0;
        width: 100px;
        height: auto;
      }
    }
  }

  @media screen and (max-width: 790px) {
    flex-direction: column;

    .submit-button {
      margin-top: 16px;
      margin-left: 0px;
      width: 100%;
    }
  }
`;
