import CheckoutHeader from "../components/CheckoutHeader";
import CustomerInfo from "../components/CutomerInfo";
import ShippingAddress from "../components/ShippingAddress";
import ShippingMethod from "../components/ShippingMethod";
import PaymentInfo from "../components/PaymentInfo";
import Cart from "../components/Cart";

const CheckoutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-[5%]">
      <CheckoutHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CustomerInfo />
          <ShippingAddress />
          <ShippingMethod />
          <PaymentInfo />
        </div>
        <div className="lg:col-span-1">
          <Cart className="border border-rounded" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
