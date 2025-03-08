import { useMemo } from 'react';
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import { categories } from '../data/categories';
import { formatDate } from '../helpers';
import { Expense } from '../types/index';
import AmountDisplay from './AmountDisplay';
import { useBudgetStore } from '../store';
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailsProps = {
    expense : Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailsProps) {

    const { removeExpense, getExpenseById } = useBudgetStore()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0],[expense])

    const leadingActions = () => (
        <LeadingActions>
            {/* <SwipeAction onClick={() => dispatch({type: "get-expense-by-id", payload: {id: expense.id}})}> */}
            <SwipeAction onClick={() => getExpenseById(expense.id)}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => removeExpense(expense.id)}
                destructive = {true}
            >
                Eliminar
            </SwipeAction>

        </TrailingActions>
    )

    return (
     <SwipeableList>  
        <SwipeableListItem            
            leadingActions = {leadingActions()}
            trailingActions = {trailingActions()}
        >

            <div className="bg-white shadow-lg p-3 w-full border-b border-gray-200 flex gap-2 items-start">
                <div>
                    <img 
                        src={`/icono_${categoryInfo.icon}.svg`} 
                        alt="icono gasto"
                        className='w-10 shrink-0'
                    />
                </div>

                <div className='flex-1'>
                    <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                    <p>{expense.expenseName}</p>
                    <p className="text-slate-600 text-sm">{ formatDate( expense.date!.toString() ) }</p>
                </div>

                <AmountDisplay
                    amount={expense.amount}
                />
            </div>

        </SwipeableListItem>
    </SwipeableList>
    )
}
