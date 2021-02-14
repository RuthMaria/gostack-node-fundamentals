import { Router } from 'express';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import ReadTransactionService from '../services/ReadTransactionService';
 import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const readTransaction = new ReadTransactionService(transactionsRepository)
    
    const transaction = readTransaction.execute()

    return response.json(transaction)
    
  } catch (err) {
       return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {

    const { title, value, type } = request.body

    const createTransaction = new CreateTransactionService(transactionsRepository)
    
    const transaction = createTransaction.execute({
      title,
      type, 
      value
    })

    return response.json(transaction)

  } catch (err) {
       return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
