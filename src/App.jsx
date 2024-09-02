import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Button from "./ui/Button";

const StyledApp = styled.main`
  padding: 20px;
  background-color: orangered;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis Application</Heading>
        <Heading as="h2">The Wild Oasis Application</Heading>
        <Heading as="h3">The Wild Oasis Application</Heading>

        <Button size="large" variation="secondary">
          Check In
        </Button>
      </StyledApp>
    </>
  );
};

export default App;
