import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {
        id: 11,
        cardHolder: 'Mr. Nice',
        MonthlyAdvertisingBudget: 1000,
        creditCardNumber: '5199 0123 7854 0927',
        expirationDate: '09/23'
      }
    ];
    return { heroes };
  }
}
