import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import BasketAPI from "../API/basketAPI";
import ProductItem from "../components/Shop/ProductItem";

const Basket = observer(() => {
    const { user } = useContext(Context);
    const [basketProducts, setBasketProducts] = useState([]);
    const [overallPrice, setOverallPrice] = useState(0);

    useEffect(() => {
        fetchAndSetBasketProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAndSetBasketProducts = async () => {
        await BasketAPI.fetchBasketProducts(user.user.id)
            .then((data) => {
                setBasketProducts(data.sort(compareProducts));
                countOverallPrice(data);
            })
            .catch((e) => console.log(e));
    };

    const compareProducts = (a, b) => {
        a = Date.parse(a.addedToBasket);
        b = Date.parse(b.addedToBasket);
        if (a < b) return 1;
        else if (a > b) return -1;
        else return 0;
    };

    const countOverallPrice = (data) => {
        setOverallPrice(0);
        data.forEach((p) =>
            setOverallPrice((prev) => prev + p.price * p.amount)
        );
    };

    const addProduct = async (productId, versionId) => {
        await BasketAPI.addBasketProduct(user.user.id, productId, versionId)
            .then(fetchAndSetBasketProducts)
            .catch((error) => alert(error.response.data.message));
    };

    const removeProduct = async (productId, versionId) => {
        await BasketAPI.removeBasketProduct(
            user.user.id,
            productId,
            versionId
        ).then(fetchAndSetBasketProducts);
    };

    return (
        <div
            className="
                flex flex-col 
                lg:flex-row
            "
        >
            <div
                className="
                    product-list justify-around
                    md:product-list-md  
                    md:justify-between
                "
            >
                {basketProducts.map((p) => {
                    return (
                        <div>
                            <ProductItem
                                product={p}
                                basketProduct={{
                                    amount: p.amount,
                                    version: p.versionTitle,
                                    addProduct: addProduct,
                                    removeProduct: removeProduct,
                                }}
                            />
                            <div className="text-center flex flex-row items-center justify-around text-xl font-bold mt-4">
                                {p.amount}X - {p.versionTitle}
                                <div className="flex flex-col items-center justify-between">
                                    <button
                                        className="flex items-center justify-center h-8 w-8 bg-myDark text-myLight text-xl font-bold rounded-full mb-2"
                                        onClick={() =>
                                            addProduct(p.id, p.versionId)
                                        }
                                    >
                                        +
                                    </button>
                                    <button
                                        className="flex items-center justify-center h-8 w-8 bg-myDark text-myLight text-xl font-bold rounded-full"
                                        onClick={() =>
                                            removeProduct(p.id, p.versionId)
                                        }
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                className="
                    flex flex-col justify-between items-center w-[auto] h-[250px] bg-myDark rounded-[60px] text-myLight p-[40px] px-[60px] mt-[40px] mb-[40px]
                    lg:ml-[40px] lg:mt-0
                "
            >
                <div className="w-full">
                    <div className="text-3xl mb-2">Итого:</div>
                    <div className="text-5xl whitespace-nowrap">
                        {overallPrice} &#8381;
                    </div>
                </div>
                <button
                    className="
                        justify-self-end w-3/4  p-3 rounded-full font-bold text-xl ring-myLight ring-4 
                        hover:bg-myLight hover:text-myDark
                        disabled:opacity-50 disabled:bg-myLight disabled:text-myDark
                        transition ease-in-out-100
                    "
                >
                    Оплатить
                </button>
            </div>
        </div>
    );
});

export default Basket;
