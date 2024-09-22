import styled from "styled-components";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";
import { useUser } from "../features/authentication/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
