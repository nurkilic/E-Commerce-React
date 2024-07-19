import "./App.css";
import Header from "./components/Header";
import PageContainer from "./container/PageContainer";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import { useEffect } from "react";
import {
  getFromBasketFromStorage,
  productCounts,
} from "./redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { changeTheme } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFromBasketFromStorage());
    dispatch(productCounts());
  }, []);

  return (
    <div className={`h-screen ${changeTheme ? "text-white" : "text-black"}`}>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
      </PageContainer>
    </div>
  );
}

export default App;
