import React from "react";
import { BrowserRouter as Routerr, Route, Routes } from "react-router-dom";
import Form from '../components/Form';
import Test from '../components/Test';
import Test1 from '../components/Test1';

const Router = () => {
    return (
        <Routerr>
            {/* <Header /> */}
            <div style={{ margin: '0 20px' }}>
                <Routes>
                    <Route exact path="/Send_mail/" element={<Form />} />
                    <Route exact path="/Send_mail/test" element={<Test />} />
                    <Route exact path="/Send_mail/test1" element={<Test1 />} />
                </Routes>
            </div>
        </Routerr>
    )
}


export default Router; 