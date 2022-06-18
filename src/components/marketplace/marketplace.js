import { useEffect } from "react";
import { Link } from "react-router-dom";

import MarketplaceCard from "../cards/marketplace-card";

import "./marketplace.sass";

const Marketplace = ({ setInMarketplace, setInProfile }) => {
    useEffect(() => {
        setInMarketplace(true);
        setInProfile(false);
    }, []);

    return (
        <div className="marketplace">
            <div className="marketplace-header">[explore]</div>
            <div className="marketplace-container">
                <Link to="/dao" style={{ textDecoration: "none" }}>
                    <MarketplaceCard
                        name="Conquer the world"
                        available={276}
                        max={1000}
                    />
                </Link>
                <Link to="/dao" style={{ textDecoration: "none" }}>
                    <MarketplaceCard
                        name="Peal Avocado"
                        available={276}
                        max={1000}
                    />
                </Link>
                <Link to="/dao" style={{ textDecoration: "none" }}>
                    <MarketplaceCard
                        name="Cut avocado"
                        available={276}
                        max={1000}
                    />
                </Link>
            </div>
        </div>
    );
};

export default Marketplace;
