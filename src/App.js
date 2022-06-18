import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Landing from "./components/landing";
import Marketplace from "./components/marketplace";
import Profile from "./components/profile/profile";
import Dao from "./components/dao";
import Tokens from "./components/tokens/tokens";

function App() {
    const [connected, setConnected] = useState(false);
    const [inMarketplace, setInMarketplace] = useState(false);
    const [inProfile, setInProfile] = useState(false);

    return (
        <div className="App">
            <Header
                connected={connected}
                inMarketplace={inMarketplace}
                inProfile={inProfile}
            />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/marketplace"
                    element={
                        <Marketplace
                            setInMarketplace={setInMarketplace}
                            setInProfile={setInProfile}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Profile
                            setInMarketplace={setInMarketplace}
                            setInProfile={setInProfile}
                        />
                    }
                />
                <Route path="/dao" element={<Dao />} />
                <Route path="/tokens" element={<Tokens />} />
            </Routes>
        </div>
    );
}

export default App;
