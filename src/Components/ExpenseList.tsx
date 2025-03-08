import { useMemo } from "react"
import ExpenseDetail from "./ExpenseDetail"
import { useBudgetStore } from '../store';

export default function ExpenseList() {

    const { expenses, currentCategory } = useBudgetStore()    
    const filteredExpenses = currentCategory ? expenses.filter( expense => expense.category === currentCategory) : expenses
     //const isEmpty = useMemo(() => expenses.length === 0, [expenses])
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
    
    return (
        <div className="bg-white shadow-lg rounded-lg p-5 max-sm:p-1.25">
            {isEmpty ? <p className="text-gray-600 text-xl font-bold text-center">No hay gastos</p> : (
                <>
                    <p className="text-gray-600 text-xl font-bold text-center">Listado de gastos</p>
                    {/* {state.expenses.map( expense => ( */}
                    {filteredExpenses.map( expense => (
                        <ExpenseDetail
                            key = {expense.id}
                            expense = {expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
