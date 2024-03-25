import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { MdFileDownloadDone } from "react-icons/md";

const Premium = () => {
  const { premium } = useContext(AuthContext);
  const buyPremiumHandler = async (event) => {
    const token = localStorage.getItem("token");
    try {
      let res = await axios.get("http://localhost:3000/purchase/premium", {
        headers: { Authorization: token },
      });
      var options = {
        key: res.data.key_id,
        orderid: res.data.order.id,
        handler: async function (res) {
          let response = await axios.post(
            "http://localhost:3000/purchase/update",
            { orderid: options.orderid, payment_id: res.razorpay_payment_id },
            { headers: { Authorization: token } }
          );
          alert("You are a Premium User");
          localStorage.setItem("token", response.data.token);
          premium();
        },
      };
      console.log(options);
      let rzp1 = new window.Razorpay(options); //this line is not working
      console.log(rzp1);
      rzp1.open();
      event.preventDefault();
      rzp1.on("payment.failed", (response) => {
        alert("Payment Failed Try Again!");
      });
    } catch (error) {}
  };

  return (
    <main>
      <div
        class="row row-cols-1 row-cols-md-3 mb-3 text-center"
        style={{ marginLeft: "25%" }}
      >
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">Free</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">
                $0<small class="text-body-secondary fw-light">/mo</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>10 users included</li>
                <li>2 GB of storage</li>
                <li>Email support</li>
                <li>Help center access</li>
              </ul>
              <button
                type="button"
                class="w-100 btn btn-lg btn-outline-primary"
              >
                Current Plan
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">Pro</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">
                $15<small class="text-body-secondary fw-light">/mo</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>Get access to premium features</li>
                <li>Leader Board </li>
                <li>Help center access</li>
                <li>Early Bird Discounts on future offers.</li>
              </ul>
              <button
                type="button"
                class="w-100 btn btn-lg  btn-outline-primary"
                onClick={buyPremiumHandler}
              >
                Become a Premium User
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 class="display-6 text-center mb-4">Compare plans</h2>

      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr>
              <th style={{ width: "34%" }}></th>
              <th style={{ width: "22%" }}>Free</th>
              <th style={{ width: "22%" }}>Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="text-start">
                Add Expenses
              </th>
              <td>
                <svg class="bi" width="24" height="24">
                  <MdFileDownloadDone style={{ fontSize: "25px" }} />
                </svg>
              </td>
              <td>
                <svg class="bi" width="24" height="24">
                  <MdFileDownloadDone style={{ fontSize: "25px" }} />
                </svg>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start">
                Track Expenses
              </th>
              <td>
                <svg class="bi" width="24" height="24">
                  <MdFileDownloadDone style={{ fontSize: "25px" }} />
                </svg>
              </td>
              <td>
                <svg class="bi" width="24" height="24">
                  <MdFileDownloadDone style={{ fontSize: "25px" }} />
                </svg>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="row" class="text-start">
                Leader Board
              </th>
              <td></td>
              <td>
                <svg class="bi" width="24" height="24">
                  <MdFileDownloadDone style={{ fontSize: "25px" }} />
                </svg>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start">
                Download Expense Files
              </th>
              <td></td>
              <td>
                <svg class="bi" width="24" height="24">
                  <MdFileDownloadDone style={{ fontSize: "25px" }} />
                </svg>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start">
                Premium User Badge
              </th>
              <td></td>
              <td>
                <svg class="bi" width="24" height="24">
                  <MdFileDownloadDone style={{ fontSize: "25px" }} />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Premium;
