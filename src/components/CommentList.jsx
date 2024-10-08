/*eslint-disable*/
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo đã cài đặt và nhập Bootstrap

// Component hiển thị một bình luận
// const Commentt = ({ name, comment }) => (
// 	<div className="card mb-2">
// 		<div className="card-body">
// 			<h5 className="card-title">{name}</h5>
// 			<p className="card-text">{comment}</p>
// 		</div>
// 	</div>
// );

// Component hiển thị danh sách bình luận và form thêm bình luận
const CommentList = ({ comment }) => {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	console.log(comments);

	// Giả sử bạn lấy tên người dùng từ localStorage
	const userName = localStorage.getItem("username") || "Khách hàng";

	const handleChange = (e) => {
		setNewComment(e.target.value);
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (newComment) {
	// 		setComments([...comments, { name: userName, comment: newComment }]);
	// 		setNewComment("");
	// 	}
	// };

	useEffect(() => {
		setComments(comment);
		console.log(comment);
	}, [comment]);

	return (
		<div className="comment-section mt-4">
			<h2>Bình luận sản phẩm</h2>

			{/* Form thêm bình luận mới */}
			<form className="comment-form mb-4">
				<div className="mb-3">
					<textarea className="form-control" placeholder="Nhập bình luận của bạn" value={newComment} onChange={handleChange} rows="3" required />
				</div>
				<button type="submit" className="btn btn-primary">
					Gửi bình luận
				</button>
			</form>

			{/* Danh sách bình luận */}
			{/* <div className="comment-list">
				{comments.map((comment, index) => (
					<Comment key={index} name={comment.id_customer} comment={comment.comment} />
				))}
			</div> */}
		</div>
	);
};

export default CommentList;
