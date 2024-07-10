import React from "react";
import { BrowserRouter as Routerr, Route, Routes } from "react-router-dom";
import Form from '../components/Form';
import Test from '../components/Test';

const Router = () => {
    return (
        <Routerr>
            {/* <Header /> */}
            <div style={{ margin: '0 20px' }}>
                <Routes>
                    <Route exact path="/react_task/" element={<Form />} />
                    <Route exact path="/react_task/test" element={<Test />} />
                </Routes>
            </div>
        </Routerr>
    )
}


export default Router;