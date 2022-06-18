import { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/header/header";
import Landing from "./components/landing";
import Marketplace from "./components/marketplace";
import Profile from "./components/profile/profile";
import Dao from "./components/dao";
import Tokens from "./components/tokens/tokens";
import Vote from "./components/vote/vote";
import Abi from "./components/abi/abi";
import Purchase from "./components/purchase/purchase";

import { onConnect } from "./components/web3/index";

import {
    mockConfigInteract,
    erc20Interact,
    erc1155Interact,
    marketplaceInteract,
    daoInteract,
} from "./components/web3/contractsinteraction";

// mock config
import {
    CONTACT_ABI_mock,
    CONTACT_ADDRESS_mock,
} from "./components/configs/mockConfig";

// erc20 config
import {
    CONTACT_ABI_erc20,
    CONTACT_ADDRESS_erc20,
} from "./components/configs/erc20Config";

// erc1155 config
import {
    CONTACT_ABI_erc1155,
    CONTACT_ADDRESS_erc1155,
} from "./components/configs/erc1155Config";

// Marketplace config
import {
    CONTACT_ABI_market,
    CONTACT_ADDRESS_market,
} from "./components/configs/marketplaceConfig";

// DAO config
import {
    CONTACT_ABI_dao,
    CONTACT_ADDRESS_dao,
} from "./components/configs/daoConfig";

function App() {
    const [connected, setConnected] = useState(false);
    const [inMarketplace, setInMarketplace] = useState(false);
    const [inProfile, setInProfile] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        await onConnect().then((data) => {
            console.log(data);
            setConnected(true);
        });
    };

    useEffect(() => {
        if (connected) {
            return navigate("/marketplace");
        }

        // mockInteract({
        //     CONTACT_ABI: CONTACT_ABI_mock,
        //     CONTACT_ADDRESS: CONTACT_ADDRESS_mock,
        // });
        // erc20Interact({
        //     CONTACT_ABI: CONTACT_ABI_erc20,
        //     CONTACT_ADDRESS: CONTACT_ADDRESS_erc20,
        // });
        // erc1155Interact({
        //     CONTACT_ABI: CONTACT_ABI_erc1155,
        //     CONTACT_ADDRESS: CONTACT_ADDRESS_erc1155,
        // });
        // marketplaceInteract({
        //     CONTACT_ABI: CONTACT_ABI_market,
        //     CONTACT_ADDRESS: CONTACT_ADDRESS_market,
        // });
        daoInteract({
            CONTACT_ABI: CONTACT_ABI_dao,
            CONTACT_ADDRESS: CONTACT_ADDRESS_dao,
        });
    }, [connected]);

    return (
        <div className="App">
            <Header
                login={login}
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
                <Route
                    path="/tokens"
                    element={<Tokens setInProfile={setInProfile} />}
                />
                <Route path="/tokens/purchase" element={<Purchase />} />
                <Route
                    path="/vote"
                    element={<Vote setInProfile={setInProfile} />}
                />
                <Route path="/vote/abi" element={<Abi />} />
            </Routes>
        </div>
    );
}

export default App;
