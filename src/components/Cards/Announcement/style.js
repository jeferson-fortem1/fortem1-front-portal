import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  gap: 20px;
  flex-wrap: nowrap;


  @media screen and (max-width: 1238px) {
    // flex-wrap: wrap;
  }
`;

export const Content = styled.div`
  color: var(--primary-text-color);
  width: 100%;
  height: 120px;
  min-height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: left;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--header-background-color);
  margin-right: 0px;
  

  @media screen and (max-width: 1238px) {
    padding; 15px;
  }

  @media screen and (max-width: 1128px) {
     height: 130px;
    
  }

  // @media screen and (max-width: 968px) {
  //   height: 150px;
    
  // }

  @media screen and (max-width: 868px) {
    height: 165px;
    
  }


  
  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    
    
    color: var(--primary-text-color);

    @media screen and (max-width: 1238px) {
      font-size: 16px !important;
      line-height: 22px !important;
    }

    @media screen and (max-width: 968px) {
      font-size: 15px !important;
      line-height: 19px !important;
    }


    span, a {
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      // margin-top: 20px;
      // margin-bottom: 25px;
      color: #11ECC7 !important;
  
      @media screen and (max-width: 1238px) {
        font-size: 16px !important;
        line-height: 22px !important;
      }
  
      @media screen and (max-width: 968px) {
        font-size: 15px !important;
        line-height: 19px !important;
      }
  
      @media screen and (max-width: 868px) {
        font-size: 14px !important;
        line-height: 18px !important;
      }

  
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
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    color: var(--primary-text-color);
    background-color: ${(props) => props.theme.primary};
    cursor: pointer;

    @media screen and (max-width: 1440px) {
      font-size: 14px;
    }
  }
`;
