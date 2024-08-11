import React from "react";
import { BrowserRouter as Router, Switch,  Route} from "react-router-dom";
import { StrictMode } from 'react';
    
 
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import MallDetailPage from "./routes/MallDetailPage";
import { MallsContext, MallsContextProvider } from "./context/MallsContext";

const App = () => {
    return (
       <StrictMode>
        <MallsContextProvider>
              <div className="container">
            <Router>
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/malls/:id/update" component={UpdatePage} />
                    <Route exact path="/malls/:id" component={MallDetailPage} />



                </Switch>
            </Router>
        </div>
        </MallsContextProvider>
        </StrictMode>

    );

};

export default App;



