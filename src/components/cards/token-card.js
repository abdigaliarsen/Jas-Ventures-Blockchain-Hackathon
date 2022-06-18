import "./card.sass";

const TokensCard = ({ name, id, number }) => {
    return (
        <div className="token-card">
            <div className="token-card__left">
                <div className="token-card__name">{name}</div>
                <div className="token-card__id">{id}</div>
            </div>
            <div className="token-card__number">{number}</div>
        </div>
    );
};

export default TokensCard;
