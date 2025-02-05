import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

export type ClothesSizeSelectorProps = {
  onSizeChange: (sizes: string[]) => void
  className?: string
}

export function SizeSelector({ onSizeChange, className }: ClothesSizeSelectorProps) {
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])

  const toggleSize = (size: string) => {
    setSelectedSizes((prevSizes) => {
      const newSizes = prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
      onSizeChange(newSizes)
      return newSizes
    })
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        Sizes
      </Label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSizes.includes(size) ? "default" : "outline"}
            className="w-8 h-8 text-[.8rem]"
            onClick={() => toggleSize(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}

