import styled from "styled-components";

export const Container = styled.div`
  
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  gap: 20px;
  flex-wrap: nowrap;

  @media screen and (max-width: 1238px) {
    flex-wrap: wrap;
  }

`;

export const Content = styled.div`





  justify-content: center;

  color: var(--primary-text-color);
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--header-background-color);
  margin-right: 0px;
  justify-content: space-evenly;
  display: flex;
  
  @media screen and (max-width: 1238px) {
    max-width: 48%;
  }

  @media screen and (max-width: 868px) {
    max-width: 47%;
  }


  
  p {
    font-size: 20px;
    font-height: 400;
    line-height: 24px;
    margin-top: 20px;
    margin-bottom: 25px;
    color: var(--primary-text-color);

    @media screen and (max-width: 1440px) {
      font-size: 18px;
    }
  }

  h2 {
    color: var(--primary-text-color);
    margin-bottom: 15px;
    font-size: 24px;
    font-height: 700;
    line-height: 29px;

    @media screen and (max-width: 1440px) {
      font-size: 25px;
    }
  }

  button {
    margin-bottom: 20px;
    padding: 10px 15px !important;
    border: none !important;
    border-radius: 10px;
    color: var(--primary-text-color);
    cursor: pointer;

    @media screen and (max-width: 1440px) {
      font-size: 14px;
    }
  }
`;
