import Marquee from "react-fast-marquee";

import styles from "./Comments.module.css";
import stars from "./assets/stars.svg";

const Comments = () => {
    const cardData = [
        {
            count: 0,
            para: " Lorem ipsum dolor sit amet consectetur. Pellentesque ullamcorper aliquam egestas aliquam non eget cras. Feugiat eu pellentesque diam lectus facilisi. Tellus sit in condimentum ut aliquet sed amet ultricies varius. ",
            author: "Lorem ipsum",
        },
        {
            count: 0,
            para: " Lorem ipsum dolor sit amet consectetur. Pellentesque ullamcorper aliquam egestas aliquam non eget cras. Feugiat eu pellentesque diam lectus facilisi. Tellus sit in condimentum ut aliquet sed amet ultricies varius. ",
            author: "Lorem ipsum",
        },
        {
            count: 0,
            para: " Lorem ipsum dolor sit amet consectetur. Pellentesque ullamcorper aliquam egestas aliquam non eget cras. Feugiat eu pellentesque diam lectus facilisi. Tellus sit in condimentum ut aliquet sed amet ultricies varius. ",
            author: "Lorem ipsum",
        },
    ];

    return (
        <div className={styles.comments}>
            <h2>What community tells about us?</h2>
            <div className={styles.cardContainer}>
                <Marquee style={{ width: "100vw" }} autoFill pauseOnHover>
                    {cardData.map((card, index) => (
                        <Card {...card} key={`comm${index}`} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

const Card = ({
    count,
    para,
    author,
}: {
    count?: number;
    para: string;
    author: string;
}) => {
    count; //no of stars
    return (
        <div className={styles.card}>
            <StarGroup />
            <p>{`"${para}"`}</p>
            <span>{`~${author}`}</span>
        </div>
    );
};

const StarGroup = () => {
    return (
        <div className={styles.starGroup}>
            <img src={stars} alt="" />
        </div>
    );
};

export default Comments;
