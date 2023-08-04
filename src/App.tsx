import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Router from "./shared/Router";
import GlobalStyle from "./GlobalStyle";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
};

export default App;
