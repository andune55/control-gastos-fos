import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}
export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className="text-xl text-blue-600">
        {/* {label}: {''} */}
        {label && `${label}: `}
        <span className="text-black max-sm:text-[16px] font-bold">{formatCurrency(amount)}</span>
    </p>
  )
} 
