import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { partnerColor, partnerColorAlpha } from "./Header.tsx";


export const ButtonActions = () => {

    const [apiResponse, setApiResponse] = useState("");

    const initlizeBusinessAndPerson = async () => {

        const response = await axios.post(
            "/parafin/create_business_person"
        );
        setApiResponse(response.data);
        console.log("Business and Person initialized:", response.data);
        localStorage.setItem("personId", response.data.data.personId);
        localStorage.setItem("businessParafinId", response.data.data.businessParafinId);
    };

    const makeOffer = async () => {
        const response = await axios.post(
            "/parafin/create_sandbox_offer"
        );
        console.log("Offer Created:", response.data);
        setApiResponse(response.data);

        localStorage.setItem("personId", response.data.data.person.id);
        localStorage.setItem("businessParafinId", response.data.data.business.id);
        localStorage.setItem("capitalProductOfferId", response.data.data.capital_product_offer.id);
    };

    const fundCapital = async () => {
        let data = { businessParafinId: localStorage.getItem("businessParafinId") };

        const response = await axios.post(
            "/parafin/fund",
            data
        );
        console.log("Capital Funded:", response.data);
        setApiResponse(response.data);
    }

  return (
    <StyledContainer>
      <StyledButtonShell>
        <StyledButton onClick={ initlizeBusinessAndPerson }>
            Initialize Business and Person without Offer
        </StyledButton>
      </StyledButtonShell>
      <StyledButtonShell>
        <StyledButton onClick={ makeOffer }>
            Make New Pre-approved Offer
        </StyledButton>
        <StyledButton onClick={ fundCapital }>
            Fund Capital for Current Offer
        </StyledButton>
        </StyledButtonShell>
        <JsonDisplay>
            {JSON.stringify(apiResponse, null, 2)}
        </JsonDisplay>
      </StyledContainer>
  );
};

const JsonDisplay = styled.pre`
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledButtonShell = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const StyledButton = styled.div`
  display: flex;
  color: ${partnerColor};
  background-color: ${partnerColorAlpha};
  padding: 8px 16px;
  border-radius: 4px;
  justify-content: center;
  cursor: pointer;
`;

