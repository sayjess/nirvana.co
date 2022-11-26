import { Route, Routes } from "react-router-dom";

import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import Shop from "./routes/shop/Shop";
import SignIn from "./routes/sign-in/SignIn";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path="shop" element={<Shop />}/>
        <Route path="signin" element={<SignIn />}/>
      </Route>
    </Routes>
  )
}

export default App;
