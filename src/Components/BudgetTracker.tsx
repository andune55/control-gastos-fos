import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudgetStore } from "../store"
import AmountDisplay from './AmountDisplay';
import "react-circular-progressbar/dist/styles.css"
import { useMemo } from 'react';

export default function BudgetTracker() {
    const { presupuesto, expenses } = useBudgetStore()  
    
    const totalExpenses = useMemo( () => expenses.reduce((total,expense) => expense.amount + total, 0 )
        , [expenses])  
    const remainingBudget = presupuesto - totalExpenses

    const percentage = +((totalExpenses / presupuesto) * 100).toFixed(2)
    //console.log(percentage)

    return (
        <div className="flex max-sm:flex-col gap-5">
            <div className="flex justify-center max-h-[200px] max-sm:max-h-[150px]">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage >= 80? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textSize: 8,
                        textColor: percentage >= 80? '#dc2626' : '#3b82f6'
                    })}
                    text={`${percentage}% gastado`}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-2"> 
                <AmountDisplay
                    label="Presupuesto"
                    amount={presupuesto}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                /> 
            </div>
        </div>
    )
} 
