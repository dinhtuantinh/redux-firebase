import React, { useState, useEffect } from "react";
import { db as firebaseDB } from "../firebase";
import { useParams, Link } from "react-router-dom";
import "./css/View.css";

const View = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    firebaseDB
      .child(`products/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ ...snapshot.val() });
        } else {
          setProduct({});
        }
      });
  }, [id]);
  
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Mô tả chi tiết sản phẩm</p>
        </div>
        <div className="container">
          <strong>Tên: </strong>
          <span>{product.name}</span>
          <br />
          <br />
          <strong>Mô tả </strong>
          <span>{product.desc}</span>
          <br />
          <br />
          <strong>Số lượng: </strong>
          <span>{product.quantity}</span>
          <br />
          <br />
          <Link to="/">
            <button className="bttn btn-edit btn-edit-view">Quay lại</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
