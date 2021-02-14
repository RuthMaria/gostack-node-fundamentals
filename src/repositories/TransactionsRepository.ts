import Transaction from '../models/Transaction';

interface Balance {
  income: number;

  outcome: number;
  
  total: number;
}

interface TransctionDTO{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public sum(type: string): number {
      const sum = this.transactions.reduce((accumulator, currentValue) => {
        if(currentValue.type === type)
              return accumulator += currentValue.value
        else 
              return accumulator
    }, 0)

    return sum
  }

  public getBalance(): Balance {
    
    const sumIncome = this.sum('income')
    const sumOutcome = this.sum('outcome')
    const total = sumIncome - sumOutcome

    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: total
    }

    return balance
  }

  public create({title, value, type}: TransctionDTO): Transaction {
    
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
