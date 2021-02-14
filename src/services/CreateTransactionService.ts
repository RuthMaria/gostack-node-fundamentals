import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    
    const balance = this.transactionsRepository.getBalance()
    const isNotAbleTransition = type === 'outcome' && value > balance.total

    if(isNotAbleTransition)
          throw Error('Transação negada!')
  
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value
    })

    return transaction
  }
}

export default CreateTransactionService;
