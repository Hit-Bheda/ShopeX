import { getCategories } from "@/api/actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthStore } from "@/store/AuthStore"
import { useEffect, useState } from "react"

interface ResponseType {
  _id: string;
  name: string;
  description: string | null;
}

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
  const [categories, setCategories] = useState<ResponseType[] | null>(null)
  const accessToken = useAuthStore((state) => state.accessToken)
  useEffect(() => {
    const initCategories = async () => {

      if(!accessToken) return  
      const data = getCategories(accessToken)
      // if(data)setCategories(data)
      console.log(data);
      
    }
    initCategories()
  },[])
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

