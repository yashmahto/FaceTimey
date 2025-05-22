import { Routes , Route } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import OnboardingPage from "./pages/OnboardigPage.jsx"

import  {Toaster} from "react-hot-toast";
import { useQuery } from "@tanstack/react-query"

const App = () => {
  
// tanstack   query
// delete => post put delete

const {data , isLoading , error} = useQuery({
  queryKey:["todos"],


  queryFn : async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data;
  },
});

console.log(data);

  
  return (
    <div className="h-screen text-2xl" data-theme="coffee">
    
      <Routes>
        
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/notification" element={<NotificationPage/>} />
        <Route path="/call" element={<CallPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/onboarding" element={<OnboardingPage/>} />
      </Routes>
      
      <Toaster />
    </div>
  )
}

export default App