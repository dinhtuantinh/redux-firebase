import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db as firebaseDB } from "../firebase";
import { toast } from "react-toastify";
import "./css/AddEdit.css";

const initialState = {
  name: "",
  desc: "",
  quantity: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, desc, quantity } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    firebaseDB.child("products").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc || !quantity) {
      toast.error("Vui lòng nhập đủ các trường đầu vào");
    } else {
      if (!id) {
        firebaseDB.child("products").push(state, (err) => {
          console.log("state", state);
          if (err) {
            toast.error(err);
          } else {
            toast.success("Thêm sản phẩm thành công");
          }
        });
      } else {
        firebaseDB.child(`products/${id}`).set(state, (err) => {
          console.log("state", state);
          if (err) {
            toast.error(err);
          } else {
            toast.success("Cập nhật sản phẩm thành công");
          }
        });
      }
      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
          border: "1px solid rgb(82, 98, 247)",
        }}
        onSubmit={handleSubmit}
      >
        <label className="form-label" htmlFor="name">Tên</label>
        <input
          type="text"
          id="name"
          name="name"
          place="Product Name ..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label className="form-label" htmlFor="desc">Mô tả</label>
        <input
          type="text"
          id="desc"
          name="desc"
          place="Product desc ..."
          value={desc || ""}
          onChange={handleInputChange}
        />
        <label className="form-label" htmlFor="quantity">Số lượng</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          place="Your quantity No ..."
          value={quantity || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Sửa" : "Lưu"} />
      </form>
    </div>
  );
};

export default AddEdit;
