import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

import SolidButton from "../../buttons/solid-button";

const DaoInfo = () => {
    return (
        <div className="dao-info">
            <div className="dao-info__left">
                <div className="dao-info__img_container">
                    {/* <img src="" alt="" className="dao-info__img" /> */}
                </div>
                <SolidButton text="purchase token" icon={faCartArrowDown} />
            </div>
            <div className="dao-info__right">
                <div className="dao-info__name">Real estate company DAO #1</div>
                <div className="dao-info__address">0xc7bfd2be302af0782</div>
                <div className="dao-info__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </div>
                <div className="dao-info__numbers">
                    <div className="dao-info__total">
                        Listed:{" "}
                        <span className="dao-info__total_number">708/1024</span>
                    </div>
                    <div className="dao-info__obtained">
                        Your obtained:{" "}
                        <span className="dao-info__obtained_number">200</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaoInfo;
