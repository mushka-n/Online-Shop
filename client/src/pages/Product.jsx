import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { usePalette } from "react-palette";
import { useParams } from "react-router";
import { Context } from "..";
import BasketAPI from "../API/basketAPI";
import ProductAPI from "../API/productAPI";
import Comments from "../components/Product/CommentList";
import StartRating from "../components/Product/StartRating";
import ColorManager from "../components/Shop/ColorManager";

const Product = observer(() => {
    const [product, setProduct] = useState({ info: [], versions: [] });
    const { user } = useContext(Context);
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState([]);
    const [chosenVersion, setChosenVersion] = useState(null);

    const [picture, setPicture] = useState(null);
    const { data, loading, error } = usePalette(picture);
    let gradient;
    if (gradient === undefined && !loading)
        gradient = ColorManager.gradientFromHex(data.vibrant, 180, -40, 70);

    useEffect(() => {
        ProductAPI.fetchOneProduct(id).then((data) => {
            setProduct(data);
            setPicture(process.env.REACT_APP_API_URL + data.img);
        });
        ProductAPI.fetchComments(id).then((data) =>
            sortAndSetComments(data.rows)
        );
    }, []);

    const addToCart = async () => {
        await BasketAPI.addBasketProduct(user.user.id, id, chosenVersion);
    };

    const addComment = async () => {
        sortAndSetComments([{ rate: rating, message }, ...comments]);
        await ProductAPI.addComment(user.user.id, id, message, rating);
    };

    const sortAndSetComments = (comments) => {
        let sortedComments = [];
        comments.forEach((comm) => {
            if (comm.userId === user.user.id) {
                sortedComments = [comm, ...sortedComments];
            } else {
                sortedComments.push(comm);
            }
        });
        setComments(sortedComments);
    };

    return (
        <div
            className="
                flex flex-col items-start justify-center
                lg:h-[500px] lg:flex-row
            "
        >
            {/* PICTURE */}
            <div
                style={{ background: `${gradient}` }}
                className="
                    flex flex-col w-full h-[500px] items-center p-[25px] rounded-[60px]
                    lg:w-1/3
                "
            >
                <div className="flex justify-center w-full h-full ">
                    <div className="flex items-center justify-center w-auto h-auto">
                        <img
                            className="max-h-full h-auto w-auto"
                            src={picture}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            {/* INFO & VERSIONS */}
            <div
                className="
                    flex flex-col md:flex-row w-full h-auto mt-[40px]
                    md:none md:h-auto
                    lg:w-2/3 lg:h-[500px] lg:mt-0
                "
            >
                {/* INFO */}
                <div
                    className=" 
                        bg-myLight w-full h-full rounded-[60px] px-[40px] mb-[40px]
                        md:w-1/2
                    "
                >
                    <div className="text-5xl text-myDark mb-4 text-center">
                        {product.name}
                    </div>
                    <div className="text-4xl text-myDark mb-8 text-center">
                        {product.price}
                    </div>

                    <div className="flex flex-col w-full h-auto items-start justify-start ">
                        {product.info.map((i) => (
                            <div
                                className="
                                    flex flex-row w-full first:rounded-tl-full  bg-myDark mb-2 text-lg
                                    last:rounded-bl-full
                                "
                                key={i.id}
                            >
                                <span className=" text-myLight w-1/2 text-center p-1">
                                    {i.title}
                                </span>
                                <span className="w-1/2 text-center p-1 bg-myLight">
                                    {i.description}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* VERSIONS */}
                <div
                    className="
                        flex flex-col w-full h-auto items-center justify-between border-4 border-myDark rounded-[60px] px-[20px] py-[30px] mb-[40px]
                        md:w-1/2 
                        lg:min-h-[500px]
                        last:justify-self-end
                    "
                >
                    <div className="flex flex-col mb-[40px]">
                        {product.versions.map((v) => (
                            <div
                                key={v.id}
                                className="flex flex-row items-center justify-start cursor-pointer mb-3"
                            >
                                <input
                                    className="
                                    appearance-none cursor-pointer rounded-full h-8 w-8 mt-1 mr-2 bg-myLight bg-no-repeat border-myDark border-4
                                    checked:bg-myDark checked:border-myDark 
                                    transition ease-in-out-100
                                "
                                    type="radio"
                                    value={"" + v.id}
                                    checked={chosenVersion === "" + v.id}
                                    onChange={(e) =>
                                        setChosenVersion(e.target.value)
                                    }
                                    id={v.id}
                                />
                                <label
                                    className="cursor-pointer form-check-label inline-block text-myDark text-2xl"
                                    htmlFor={v.id}
                                >
                                    {v.title}
                                </label>
                            </div>
                        ))}
                    </div>

                    <button
                        className="
                        justify-self-end w-3/4  p-3 rounded-full font-bold text-xl ring-myDark ring-4 
                        hover:bg-myDark hover:text-myLight
                        disabled:opacity-50 disabled:bg-myLight disabled:text-myDark
                        transition ease-in-out-100
                    "
                        disabled={chosenVersion === null}
                        onClick={addToCart}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
        //     <Form>
        //         <Form.Group
        //             className="mb-3"
        //             controlId="exampleForm.ControlTextarea1"
        //         >
        //             <Form.Label>Оставьте комментарий</Form.Label>
        //             <Form.Control
        //                 as="textarea"
        //                 rows={3}
        //                 value={message}
        //                 onChange={(e) => setMessage(e.target.value)}
        //             />
        //             <Row>
        //                 <h3 style={{ display: "inlineBlock", width: "auto" }}>
        //                     {product.rating}
        //                 </h3>
        //                 <StartRating rating={rating} setRating={setRating} />
        //             </Row>
        //             <Row>
        //                 <Button style={{ width: "200px" }} onClick={addComment}>
        //                     Оставить комментарий
        //                 </Button>
        //             </Row>
        //         </Form.Group>
        //     </Form>
        //     <Comments comments={comments} />
        // </Container>
    );
});

export default Product;
