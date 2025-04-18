export default function PaymentInfo() {
  return (
    <section className="pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Payment Info</h2>
        <span className="text-xs text-gray-500">*Required</span>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm mb-1">
            CARD NUMBER <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cardNumber"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="0000 0000 0000 0000"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm mb-1">
              EXPIRY DATE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="expiryDate"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="MM / YY"
              required
            />
          </div>

          <div>
            <label htmlFor="securityCode" className="block text-sm mb-1">
              SECURITY CODE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="securityCode"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="CVV"
              required
            />
          </div>
        </div>

        <div className="flex items-start mt-4">
          <input type="checkbox" id="saveCard" className="mt-1 mr-2" />
          <label htmlFor="saveCard" className="text-sm">
            SECURELY SAVE MY INFORMATION
          </label>
        </div>
      </div>
    </section>
  );
}
