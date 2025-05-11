import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'

import { baseUrl } from './utils/functions'

export default function RouterApp() {
   

    return (
        <Router>
            <Routes>
                <Route exact path={baseUrl + '/'} element={<Home />} />
            </Routes>
        </Router>
    )
}