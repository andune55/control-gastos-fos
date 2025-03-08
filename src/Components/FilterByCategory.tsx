import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudgetStore } from "../store"

export default function FilterByCategory() {

    const { addFilterCategory } = useBudgetStore() 

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        console.log(value)
        addFilterCategory(value)
    }
  return (
    <div className="bg-white px-5 py-2.5">
      <form action="">        
        {/* <label htmlFor="category">Filtrar gastos</label> */}
        <select 
            id="category"
            className="bg-slate-100 p-3 w-full rounded rounded-t-none"
            onChange={handleChange}
        >
            <option value="">-- Filtrar categorías</option>
            {categories.map(category => (
                <option 
                    key={category.id}
                    value={category.id}
                >
                    {category.name}
                </option>
            ))}
        </select>       
      </form>
    </div>
  )
}
