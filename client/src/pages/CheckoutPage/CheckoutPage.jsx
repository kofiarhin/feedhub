import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartStoreId,
  selectCartTotal,
} from "../../features/cart/cartSelectors";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { formatCurrency } from "../../utils/currency";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const storeId = useSelector(selectCartStoreId);
  const total = useSelector(selectCartTotal);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    notes: "",
    fulfillmentType: "delivery",
  });
  const createOrder = useCreateOrder();

  const submit = async (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      storeId,
      items: items.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
      })),
    };

    await createOrder.mutateAsync(payload);
    navigate("/orders");
  };

  return (
    <section>
      <h1>Checkout</h1>
      <form className="app-stack" onSubmit={submit}>
        <input
          required
          placeholder="Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        />
        <input
          required
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          required
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <select
          value={form.fulfillmentType}
          onChange={(e) =>
            setForm({ ...form, fulfillmentType: e.target.value })
          }
        >
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>
        <p>Order total: {formatCurrency(total)}</p>
        <button type="submit" disabled={createOrder.isPending}>
          {createOrder.isPending ? "Placing..." : "Place order"}
        </button>
      </form>
    </section>
  );
};

export default CheckoutPage;
