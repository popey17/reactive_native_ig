import { supabase } from "@/lib/supabase/client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  userName: string;
}

interface AuthContextType {
  user: User | null;
  signUp(email:string, password:string):Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children:ReactNode}) => {

  const [user, SetUser] = useState< User | null >(null);

  const signIn = async (email: string, password: string): Promise<void> => {
    console.log(email, password)
  }

  const signUp = async (email: string, password: string): Promise<void> => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw error;

    if (data.user) console.log(user)
  }

  const updateUser = async (userData:Partial< User >): Promise<void> => {
    console.log()
  }

  return(
    <AuthContext.Provider value={{user, signUp}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if( !context ) throw new Error("must use this within the authProvider")
  return context;
}