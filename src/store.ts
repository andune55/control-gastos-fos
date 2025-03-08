import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Category, DraftExpense, Expense } from './types'
import { v4 as uuidv4 } from 'uuid';

type PresupuestoState = {
    presupuesto: number
    addPresupuesto: (presupuesto: number) => void   
    modal: boolean
    openModal: () => void 
    closeModal: () => void 
    expenses: Expense[]
    addExpense: (expense: DraftExpense) => void
    removeExpense: (id:Expense['id']) => void
    editingId: Expense['id']  
    getExpenseById: (id:Expense['id']) => void
    updateExpense: (expense: Expense) => void
    restartApp: () => void 
    currentCategory: Category['id']
    addFilterCategory: (id: Category['id']) => void
}

const createExpense = (draftExpense: DraftExpense ) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const useBudgetStore = create<PresupuestoState>()(
    devtools(
        persist( (set) => ({
            presupuesto: 0, 
            addPresupuesto: (cantidad: number) => {
                set(() => ({
                    presupuesto: cantidad
                }))
            },

            modal: false,
            openModal: () => {
                set(() => ({
                    modal: true
                }))
            },
            closeModal: () => {
                set(() => ({
                    modal: false
                }))
            },

            expenses: [],            
            addExpense: (expense: DraftExpense) => {    
                const expenseconId = createExpense(expense)  
                console.log(expenseconId)      
                set((state) => ({
                    expenses: [...state.expenses,expenseconId],
                    modal: false             
                }))
            },
            removeExpense: (id:Expense['id']) => {    
                set((state) => ({             
                    ...state.expenses,
                    expenses: state.expenses.filter( gasto => gasto.id !== id)          
                }))
            },

            editingId: '',  
            getExpenseById: (id:Expense['id']) => {    
                set(() => ({             
                    editingId: id,
                    modal: true     
                }))
            },
            updateExpense: (expense) => {
                set((state) => ({
                    ...state.expenses,
                    expenses: state.expenses.map(gasto => gasto.id === expense.id ? expense : gasto),
                    modal: false,
                    editingId: ''
                }))
            },
            restartApp: () => {
                set((state) => ({
                    ...state,
                    presupuesto: 0,
                    expenses: []
                }))
            },

            currentCategory: '',
            addFilterCategory: (id:Category['id']) => {    
                set((state) => ({         
                    ...state,
                    currentCategory: id                      
                }))
            }         
        }),
        {
         name: 'patient-storage'
         // storage: createJSONStorage (() => sessionStorage)
        }  
    )
)) 
