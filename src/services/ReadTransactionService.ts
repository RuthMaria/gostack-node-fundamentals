import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;

  outcome: number;

  total: number;
}

interface TransactionDTO {
  transactions: Transaction[]
  
  balance: Balance
}

class ReadTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionDTO {
  
    const AllTransactions = this.transactionsRepository.all()
    const balance = this.transactionsRepository.getBalance()

    if(balance.total < 0)
          throw Error('Saldo insuficiente')

    const transactions: TransactionDTO = {
      transactions: AllTransactions,
      balance: balance
    }
    
    return transactions
  }
}

export default ReadTransactionService;
