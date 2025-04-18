import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShippingAddressSchema } from "../schemas";

type ShippingAddressType = z.infer<typeof ShippingAddressSchema>;

export default function ShippingAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressType>({
    resolver: zodResolver(ShippingAddressSchema),
  });

  const onSubmit = (data: ShippingAddressType) => {
    console.log("Shipping Data:", data);
    // pass to zustand or wherever needed
  };

  return (
    <section className="border-b pb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Shipping Address</h2>
          <span className="text-xs text-gray-500">*Required</span>
        </div>

        <div className="space-y-4">
          {/* STREET ADDRESS 1 */}
          <div>
            <label htmlFor="streetAddress" className="block text-sm mb-1">
              STREET ADDRESS <span className="text-red-500">*</span>
            </label>
            <input
              id="streetAddress"
              className="w-full border rounded p-2"
              {...register("streetAddress")}
            />
            {errors.streetAddress && (
              <p className="text-sm text-red-600">
                {errors.streetAddress.message}
              </p>
            )}
          </div>

          {/* STREET ADDRESS 2 */}
          <div>
            <label htmlFor="streetAddress2" className="block text-sm mb-1">
              STREET ADDRESS 2
            </label>
            <input
              id="streetAddress2"
              className="w-full border rounded p-2"
              {...register("streetAddress2")}
            />
          </div>

          {/* CITY + STATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm mb-1">
                CITY <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                className="w-full border rounded p-2"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm mb-1">
                STATE <span className="text-red-500">*</span>
              </label>
              <input
                id="state"
                className="w-full border rounded p-2"
                {...register("state")}
              />
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* ZIP CODE */}
          <div>
            <label htmlFor="zipCode" className="block text-sm mb-1">
              ZIP/POSTAL CODE <span className="text-red-500">*</span>
            </label>
            <input
              id="zipCode"
              className="w-full border rounded p-2"
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <p className="text-sm text-red-600">{errors.zipCode.message}</p>
            )}
          </div>

          {/* COUNTRY */}
          <div>
            <label htmlFor="country" className="block text-sm mb-1">
              COUNTRY
            </label>
            <select
              id="country"
              className="w-full border rounded p-2"
              {...register("country")}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
            {errors.country && (
              <p className="text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label htmlFor="phone" className="block text-sm mb-1">
              PHONE
            </label>
            <input
              id="phone"
              className="w-full border rounded p-2"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
