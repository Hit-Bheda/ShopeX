import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "home-garden", label: "Home & Garden" },
  { value: "toys", label: "Toys" },
]

export type BasicProductCategoryDropdownProps = {
  onSelectCategory: (category: string) => void
  placeholder?: string
  className?: string
  value?: string
}

export function ProductCategoryDropdown({
  onSelectCategory,
  placeholder = "Select category",
  className,
  value
}: BasicProductCategoryDropdownProps) {
  return (
    <Select value={value} onValueChange={onSelectCategory}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

