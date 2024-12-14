import "./App.css";
import styled from "styled-components";
import bg from "./img/bg.jpg";
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";

function App() {
  return (
    <AppStyled bg={bg} className="App">
      <Orb />
      <MainLayout></MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: #fff7dd;
`;

export default App;
