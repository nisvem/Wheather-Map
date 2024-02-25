import './App.css';
import Map from '../Map/Map';
import styled from 'styled-components';

const Main = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Main>
      <Map />
    </Main>
  );
}

export default App;
