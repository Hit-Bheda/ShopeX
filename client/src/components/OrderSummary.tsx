export default function OrderSummary() {
  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-medium mb-4">ORDER SUMMARY</h2>

      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <div className="bg-gray-100 w-12 h-12 mr-3 flex-shrink-0"></div>
          <div className="flex-grow">
            <h3 className="font-medium">Item Name</h3>
            <p className="text-sm text-gray-500">Size: M</p>
          </div>
          <div className="text-right">$55</div>
        </div>

        <div className="flex items-start">
          <div className="bg-gray-100 w-12 h-12 mr-3 flex-shrink-0"></div>
          <div className="flex-grow">
            <h3 className="font-medium">Custom Baggy Jeans</h3>
            <p className="text-sm text-gray-500">Size: L</p>
          </div>
          <div className="text-right">$220</div>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>$275</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>$275 USD</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        By placing your order you agree to our Terms and Conditions, Privacy and
        Returns policies.
      </div>

      <button className="w-full bg-blue-500 text-white py-3 rounded font-medium">
        PLACE ORDER
      </button>
    </div>
  );
}
