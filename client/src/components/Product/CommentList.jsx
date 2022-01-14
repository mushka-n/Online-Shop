import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
    return (
        <div>
            {comments.map((comm) => (
                <Comment key={comm.id} comment={comm} />
            ))}
        </div>
    );
};

export default CommentList;
