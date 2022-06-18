import "./card.sass";

const ProfileCard = ({ img, name, influence }) => {
    return (
        <div className="profile-card">
            <div
                className="profile-card__img_container
            "
            >
                {/* <img src={img} alt="token name" className="profile-card__img" /> */}
            </div>
            <div className="profile-card__name">{name}</div>
            <div className="profile-card__influence">{influence}</div>
        </div>
    );
};

export default ProfileCard;
