import Error from "./404";
// PUBLIC ROUTES
import Home from "./public/home";
import Summarize from "./public/summarize";
// AUTH ROUTES
import Login from "./auth/login";
import Signup from "./auth/signup";

// PRIVATE ROUTES
import Dashboard from "./private/dashboard";

export { Error, Home, Login, Dashboard, Summarize, Signup };
