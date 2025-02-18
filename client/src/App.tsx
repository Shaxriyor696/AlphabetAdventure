import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AlphabetGame from "@/pages";

// Add this for GitHub Pages base path
const base = import.meta.env.BASE_URL;

function Router() {
  return (
    <Switch location={base}>
      <Route path="/" component={AlphabetGame} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
