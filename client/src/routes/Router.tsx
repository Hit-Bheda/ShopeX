import Layout from "../components/Layout.tsx"
import Home from "../pages/Home.tsx"
import { Routes, Route } from "react-router";

const Router = () => {
  return(
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}/>
      </Route>
    </Routes>
  )
}

export default Router
