import "./card.sass";

const MarketplaceCard = ({ img, name, available, max }) => {
    return (
        <div className="marketplace-card">
            <div className="marketplace-card__img_container">
                <img
                    src={img}
                    alt="card image"
                    className="marketplace-card__img"
                />
            </div>

            <div className="marketplace-card__text">
                <h3 className="marketplace-card__header">{name}</h3>
                <div className="marketplace-card__available">
                    <div className="marketplace-card__available_text">
                        Available
                    </div>
                    <div className="marketplace-card__available_number">
                        {available}/{max}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketplaceCard;
