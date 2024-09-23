import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuth";

export const useUser = () => {
  const {
    isPending: isLoading,
    data: user,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    isFetching,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
};
