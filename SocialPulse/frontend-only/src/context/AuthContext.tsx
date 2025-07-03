import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePopup } from "./PopupContext";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  googletoken: string | null;
  facebooktoken: string | null;
  googlerefrestoken: string | null;
  googleusername: string | null;
  setGoogletoken: (token: string | null) => void;
  setFacebooktoken: (token: string | null) => void;
  setGoogleRefresToken: (token: string | null) => void;
  setGoogleusername: (name: string | null) => void;
  login: (userEmail: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (formData: FormData) => void;
  changePassword: (password: string) => void;
  deleteAccount: () => void;
  updateProfiledata: (name: string, email: string) => void;
  analyticsDatas: any | null;
  setAnalyticsDatas: any | null;
  analyticsData: any | null;
  setAnalyticsData: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setuser] = useState<User | null>(null);
  const [googletoken, setGoogletoken] = useState<string | null>(null);
  const [facebooktoken, setFacebooktoken] = useState<string | null>(null);
  const [analyticsDatas, setAnalyticsDatas] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [googlerefrestoken, setGoogleRefresToken] = useState<string | null>(null);
  const [googleusername, setGoogleusername] = useState<string | null>(null);
  const navigate = useNavigate();
  const { showpopup } = usePopup();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setuser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userEmail: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/signin", {
        userEmail,
        password
      });

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        setuser(user);
        setIsAuthenticated(true);
        showpopup("Login Successfully", "success")
        navigate('/dashboard')
      } 
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        showpopup("Invalid credentials", "warning");
      } else {
        showpopup("Internal Server Error", "danger");
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", {
        name,
        email,
        password
      });

      if (res.status === 200) {
        showpopup("Account Created Successfully", "success")
        navigate('/signin');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showpopup("Registration failed", "warning");
      } else {
        showpopup("Internal Server Error", "danger");
      }
    }
  };


  const updateProfiledata = async (name: string, email: string) => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.put(
        "http://localhost:3000/auth/updateprofiledata",
        {
          name,
          email
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("authUser", JSON.stringify(res.data.changedata));
        setuser(res.data.changedata);
        showpopup("profile data change successfully", "success");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showpopup("Profile Update Fail", "warning");
      } else {
        showpopup("Internal Server Error", "danger");
      }
    }
  }

  const updateProfile = async (formData) => {
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put(
        "http://localhost:3000/auth/updateprofile",
        formData
        ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (res.status === 200) {
        localStorage.setItem("authUser", JSON.stringify(res.data.changedata));
        setuser(res.data.changedata);
        showpopup("profile image change successfully", "success");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showpopup("Profile picture Updation Fail", "warning");
      } else {
        showpopup("Internal Server Error", "danger");
      }
    }
  }

  const changePassword = async (password: string) => {
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put(
        "http://localhost:3000/auth/updatepassword",
        {
          password
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (res.status === 200) {
        localStorage.setItem("authUser", JSON.stringify(res.data.changedata));
        setuser(res.data.changedata);
        showpopup("Password change successfully", "success");
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showpopup("Profile update failed", "warning");
      } else {
        showpopup("Internal Server Error", "danger");
      }
    }
  }

  const deleteAccount = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.delete(
        "http://localhost:3000/auth/deleteaccount",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (res.status == 200) {
        showpopup("account deleted successfully", "success");
        logout();
      } else {

      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showpopup("account deleted unsuccessfully", "warning");
      } else {
        showpopup("Internal Server Error", "danger");
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem('googletoken');
    localStorage.removeItem('googlerefrestoken');
    localStorage.removeItem('googleusername');
    localStorage.removeItem('facebooktoken');
    setuser(null);
    setIsAuthenticated(false);
    setFacebooktoken(null);
    setGoogletoken(null);
    setAnalyticsDatas(null);
    setAnalyticsData(null);
    showpopup("Logout Successfully");
    navigate('/signin');
  };



  useEffect(() => {
    const access_token = localStorage.getItem('googletoken');
    const refresh_token = localStorage.getItem('googlerefrestoken');
    const name = localStorage.getItem('googleusername');
    if (access_token && refresh_token && name) {
      setGoogletoken(access_token);
      setGoogleRefresToken(refresh_token);
      setGoogleusername(name);
    }
  }, []);


  useEffect(() => {
    const access_token = localStorage.getItem('facebooktoken');
    if (access_token) {
      setFacebooktoken(access_token);

    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated, login, logout, register, user, googletoken, googleusername,
      setGoogletoken, setGoogleusername, setGoogleRefresToken, googlerefrestoken, facebooktoken, setFacebooktoken,
      updateProfile, changePassword, deleteAccount, updateProfiledata, analyticsDatas, setAnalyticsDatas, analyticsData, setAnalyticsData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
