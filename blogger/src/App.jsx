import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          console.log(userdata);
          
          dispatch(login({ userdata }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);


  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App;
