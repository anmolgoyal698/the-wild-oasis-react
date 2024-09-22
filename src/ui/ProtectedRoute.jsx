import styled from "styled-components";
import { useUser } from "../features/authentication/hooks/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  //1. Load the authenticated user
  const { isLoading, isAuthenticated, isFetching } = useUser();

  //3. If there is no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isFetching) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, isFetching, navigate]);

  // if (!isAuthenticated && !isLoading && !isFetching) {
  //   return <Navigate to="login" />;
  // }

  //2. While loading, show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //4.If there is a user, render the app
  if (isAuthenticated) return children;

  return null;
};

export default ProtectedRoute;
