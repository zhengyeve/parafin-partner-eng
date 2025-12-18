import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ParafinWidget } from "@parafin/react";
import { Header } from "./components/Header.tsx";
import { SideNav } from "./components/SideNav.tsx";
import { ButtonActions } from "./components/Buttons.tsx";

function App() {
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState("existing");

  useEffect(() => {
    // Change to false to use production or sandbox production environment
    const isDevEnvironment = false;

    const fetchToken = async () => {
      // Replace with your own Person ID. It should begin with "person_".
      const personId = localStorage.getItem("personId") || undefined;

      // Fetch Parafin token from server
      const response = await axios.get(
        `/parafin/token/${personId}/${isDevEnvironment}`
      );
      setToken(response.data.parafinToken);
    };

    if (!token) {
      fetchToken();
      // console.log("Not able to get token");
      // localStorage.clear();
    }
  });

  const fetchTokenByPerson = async ({ inputPersonId }) => {
      // Person ID. It should begin with "person_".
      const personId = inputPersonId;
      const isDevEnvironment = false;

      // Fetch Parafin token from server
      const response = await axios.get(
        `/parafin/token/${personId}/${isDevEnvironment}`
      );
      setToken(response.data.parafinToken);
  };

  if (!token) {
    return <LoadingShell>loading...</LoadingShell>;
  }

  const FormUpdatePerson = () => {    
    const [name, setName] = useState( ()=> {
      return localStorage.getItem("personId") || "N/A";
    });

    const handleSubmit = (e) => {   
        e.preventDefault();
        console.log(`Form submitted, ${name}`);
        fetchTokenByPerson({ inputPersonId: name });
        localStorage.setItem("personId", name);
        window.location.reload();
    }
    return(
      <form onSubmit = {handleSubmit}>
        <label>Display Embedded Widget for a different Person ID: </label>
          <input 
            type = 'text' 
            placeholder = 'Change to a different Person ID'
            id = 'person-id'
            name = 'person-id'
            onChange = {(e) => setName(e.target.value)} value = {name}></input>
          <button type = 'submit'>Apply</button>
      </form>
    );
  }

  const CurrentPerson = () => {
    const [name, setName] = useState( ()=> {
      return localStorage.getItem("personId") || "N/A";
    });
    return (
      <div>Current Person ID: {name}</div>
    )
  };

  return (
    <div>
      <Header />
      <ContentShell>
        <SideNav onClick={(newProduct) => setTab(newProduct)} />
        {tab === "existing" && (
          <PageShell>
            <h2>Review Embedded Widget</h2>
            <CurrentPerson />
            <FormUpdatePerson />
            <ParafinWidget
              token={token}
              product="capital"
              // Optional props below, see docs.parafin.com for more information
              externalBusinessId={undefined}
              onOptIn={undefined}
            />
          </PageShell>
        )}
        {tab === "new" && (
          <PageShell>
            <h2>Full Workflow</h2>
            {/* <CurrentPerson /> */}
            <ButtonActions />
          </PageShell>
        )}
      </ContentShell>
    </div>
  );
}

export default App;

const ContentShell = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoadingShell = styled.div`
  padding: 20px;
`;

const PageShell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  max-width: 1100px;
`;
