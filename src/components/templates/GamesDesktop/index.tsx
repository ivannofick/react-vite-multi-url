import { useEffect, useState } from "react";
import { FetchGames } from "../../../utlis/services/GlobalServices";
import styles from "./GamesDesktop.module.css";
import Draggable from "../../molecules/Draggable"
import { IMAGE_SIZE } from "../../../utlis/constants/config";

function GamesDesktop() {
    const [games, setGames] = useState([]);
    const [hiddenArrowLeft, setHiddenArrowLeft] = useState(Boolean(true));
    const [hiddenArrowRight, setHiddenArrowRight] = useState(Boolean(false));
    const [checkMouseUp, setCheckMouseUp] = useState(false)


    useEffect(() => {
        handleFetchData();
    }, []);
    const handleFetchData = async () => {
        const response = await FetchGames();
        setGames(response?.data);
    };
    const handleClickRight = () => {
        var productContainer = document.getElementById("productContainer");
        if (productContainer) {
            productContainer.scrollLeft += 170;
            if (productContainer.scrollLeft > 0) {
                setHiddenArrowLeft(false);
            }

            if (
                productContainer.scrollLeft + productContainer.clientWidth >=
                productContainer.scrollWidth
            ) {
                setHiddenArrowRight(true);
            }
        }
    };

    const handleClickLeft = () => {
        // const productContainer = productContainerRef.current;
        var productContainer = document.getElementById("productContainer");

        if (productContainer) {
            productContainer.scrollLeft -= 170;

            if (productContainer.scrollLeft <= 0) {
                setHiddenArrowLeft(true);
            }

            if (
                productContainer.scrollLeft + productContainer.clientWidth <=
                productContainer.scrollWidth
            ) {
                setHiddenArrowRight(false);
            }
        }
    };
    const handleRedirect = (data: { url_game?: string }) => {
        if (data?.url_game) {
            const win = window.open(data.url_game, '_blank');
            if (win) {
                win.focus();
            } else {
                console.error('Failed to open the window. Please check your popup blocker settings.');
            }
        } else {
            console.error('Invalid data or missing URL for redirection.');
        }
    }
    

    return (
        <main style={{ backgroundColor: "#181819" }}>
            <div className={styles.containerBox}>
                <div className={styles.content}>
                    <div className={styles.contentScroll}>
                        <div className={styles.contentArrow}>
                            {!hiddenArrowLeft ? (
                                <div
                                    className={
                                        styles.arrowBox + " " + styles.arrowLeft
                                    }
                                    onClick={handleClickLeft}
                                >
                                    <img
                                        src="../assets/icons/arrow_left_icon.png"
                                        className={styles.arrowIcon}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>

                        <Draggable
                            rootClass={styles.product}
                            rootId="productContainer"
                            checkMouseUpProps={checkMouseUp}
                        >
                            {games?.map((data:any) => {
                                return (
                                    <div
                                        className={styles.cardProduct}
                                        key={Math.random() + 3}
                                        style={{
                                            backgroundColor:
                                                data.background_color,
                                        }}
                                        onMouseDown={(e) =>
                                            setCheckMouseUp(true)
                                        }
                                        onClick={() => handleRedirect(data)}
                                    >
                                        <div
                                            className={styles.cardProductImage}
                                        >
                                            <img
                                                src={data.image_url}
                                                width={IMAGE_SIZE}
                                                height={IMAGE_SIZE}
                                                alt={data.name}
                                                className={
                                                    styles.cardProductImageFit
                                                }
                                            />
                                        </div>
                                        <div
                                            className={
                                                styles.cardProductContent
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.cardProductTxtTitle
                                                }
                                                style={{
                                                    color: data.title_color,
                                                }}
                                            >
                                                {data.name.substring(0, 30)}
                                            </span>
                                            <span
                                                className={
                                                    styles.cardProductTxtSpan
                                                }
                                            >
                                                {data.publisher}
                                            </span>
                                            <div
                                                className={
                                                    styles.cardProductButtonPlay
                                                }
                                                style={{
                                                    color: data.name,
                                                    backgroundColor: data.name,
                                                }}
                                            >
                                                Play
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Draggable>

                        <div className={styles.contentArrow}>
                            {!hiddenArrowRight ? (
                                <div
                                    className={
                                        styles.arrowBox +
                                        " " +
                                        styles.arrowRight
                                    }
                                >
                                    <img
                                        className={styles.arrowIconRight}
                                        src="../assets/icons/arrow_right_icon.png"
                                        onClick={handleClickRight}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default GamesDesktop;
