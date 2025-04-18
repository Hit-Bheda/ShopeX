export default function CustomerInfo() {
  return (
    <section className="border-b pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Customer Info</h2>
        <span className="text-xs text-gray-500">*Required</span>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
      </div>
    </section>
  );
}
