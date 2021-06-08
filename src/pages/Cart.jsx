import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const [value, setValue] = useState(0);
  const { cart, removeCart, emptyCart } = useBooks();
  const [total, setTotal] = useState([]);
  const update = (id) => {
    removeCart(id);
    setValue(value + 1);
  };
  useEffect(() => {
    var summ = 0;
    cart.forEach(
      (elem) => (summ += parseInt(elem.data.price, 10) * elem.amount)
    );
    setTotal(summ);
  }, [cart]);

  const checkout = () => {
    emptyCart();
    toast.success("Thanks for buying!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  console.log("Este es el carrito: ", cart);
  return (
    <div className="container">
      <ToastContainer />
      {cart.length === 0 && (
        <div className="vertical-center">
          <center>
            <h2>Add a book to the cart to start shopping</h2>
          </center>
        </div>
      )}
      {cart.length !== 0 && (
        <table id="cart" class="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Product</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>
              <th style={{ width: "22%" }} class="text-center">
                Subtotal
              </th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((elem) => {
              return (
                <tr key={elem.data.title}>
                  <td data-th={elem.data.title}>
                    <div className="d-flex p-2">
                      <div class="hidden-xs">
                        <img
                          src={"../" + elem.data.img}
                          alt="..."
                          style={{ width: "250px" }}
                          className="img-responsive"
                        />
                      </div>
                      <div className="p-2">
                        <h4 className="nomargin col">{elem.data.title}</h4>
                        <p>{elem.data.descrip}</p>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price">{elem.data.price}</td>
                  <td data-th="Quantity">{elem.amount}</td>
                  <td data-th="Subtotal" class="text-center">
                    {elem.data.price * elem.amount}
                  </td>

                  <td className="actions" data-th="">
                    <button
                      className="btn btn-danger btn-sm"
                      id={elem.data.id}
                      onClick={(ev) => update(ev.target.id)}
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Link to="/Shop" className="btn btn-primary">
                  <i className="fa fa-angle-left"></i> Continue Shopping
                </Link>
              </td>
              <td colspan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <strong>Total ${total}</strong>
              </td>
              <td>
                <button
                  className="btn btn-success btn-block"
                  onClick={checkout}
                >
                  Checkout <i className="fa fa-angle-right"></i>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
