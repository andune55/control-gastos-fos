import { useState, useMemo, ChangeEvent, FormEvent } from "react"
import { useBudgetStore } from "../store"

export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const { addPresupuesto } = useBudgetStore()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{  
        //setBudget(+e.target.value)      
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() =>{
        return isNaN(budget) || budget <= 0
    }, [budget])
    //console.log(isValid)

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log('Añadir o definir presupuesto')
        addPresupuesto(budget)  
        console.log(budget)     
    }  

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
} 