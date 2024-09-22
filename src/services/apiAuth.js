import supabase from "./supabase";

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
  return data;
};

export const getCurrentUser = async () => {
  //This is going to get the session data from local storage
  const { data: session } = await supabase.auth.getSession();
  console.log("SESSION DATA", session);
  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
