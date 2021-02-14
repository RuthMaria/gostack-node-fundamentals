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

  public sumValues(type: string): number {
      const sum = this.transactions.reduce((accumulator, transaction) => {
        if(transaction.type === type)
              return accumulator += transaction.value
        else 
              return accumulator
    }, 0)

    return sum
  }

  public getBalance(): Balance {
    
    const sumIncome = this.sumValues('income')
    const sumOutcome = this.sumValues('outcome')
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
