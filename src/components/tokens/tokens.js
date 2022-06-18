import SolidButton from "../buttons/solid-button";

import TokensCard from "../cards/token-card";

import "./token.sass";

const Tokens = () => {
    return (
        <div className="tokens">
            <h2 className="tokens-header">12.3 otc left</h2>
            <div className="tokens-button">
                <SolidButton text="create +" />
            </div>
            <div className="tokens-container">
                <TokensCard
                    name="token name"
                    id="id01294012957512"
                    number="10000"
                />
                <TokensCard
                    name="token name"
                    id="id01294012957512"
                    number="10000"
                />
            </div>
        </div>
    );
};

export default Tokens;
