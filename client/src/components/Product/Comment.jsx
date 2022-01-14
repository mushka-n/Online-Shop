import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { Context } from "../..";

const Comment = ({ comment }) => {
    const { user } = useContext(Context);

    return (
        <div
            style={{
                margin: "10px 0",
            }}
        >
            <div
                style={{
                    height: "50px",
                    width: "500px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <div>
                    {comment.rate && (
                        <div
                            style={{
                                width: "auto",
                                height: "50px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <h3
                                style={{
                                    margin: "0 7px",
                                }}
                            >
                                {comment.rate}{" "}
                            </h3>
                            <FaStar
                                style={{ width: "30px", height: "30px" }}
                                color={"#ffc107"}
                                size={30}
                            />
                        </div>
                    )}

                    <h5
                        style={{
                            width: "300px",
                            margin: "0 7px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        {comment.message}
                    </h5>
                </div>
            </div>
            {user.user.id === comment.userId && user.user.role !== "ADMIN" && (
                <div
                    style={{
                        width: "auto",
                        height: "50px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <button style={{ margin: "0 10px" }} variant="myDark">
                        Edit
                    </button>
                    <button variant="danger">X</button>
                </div>
            )}

            {user.user.role === "ADMIN" && (
                <div
                    style={{
                        width: "auto",
                        height: "50px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <button style={{ margin: "0 10px" }} variant="myDark">
                        Edit
                    </button>
                    <button variant="danger">X</button>
                </div>
            )}
        </div>
    );
};

export default Comment;
