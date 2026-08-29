export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer_in' | 'transfer_out';
  amount: number;
  date: string;
  recipient?: string;
  sender?: string;
  title: string;
}

export type Permission =
  | 'rename_account'
  | 'pay_invoice'
  | 'transfer'
  | 'deposit'
  | 'withdraw'
  | 'logs'
  | 'add_user'
  | 'remove_user'
  | 'create_card'
  | 'remove_card';

export interface SharedUser {
  id: string;
  name: string;
  role: string;
  permissions: Permission[];
}

export interface AccountLog {
  id: string;
  date: string;
  action: string;
  user: string;
  details: string;
}

export interface Account {
  id: string;
  type: 'private' | 'business';
  name: string;
  owner: string;
  accountNumber: string;
  balance: number;
  history: Transaction[];
  chartData: { date: string; balance: number }[];
  sharedUsers: SharedUser[];
  logs: AccountLog[];
}

export const DUMMY_ACCOUNTS: Account[] = [
  {
    id: '1',
    type: 'private',
    name: 'Konto Prywatne',
    owner: 'George Gouda',
    accountNumber: 'PL 12 3456 7890 1234 5678 9012 3456',
    balance: 15420.50,
    sharedUsers: [
      {
        id: 'u1',
        name: 'George Gouda',
        role: 'Właściciel',
        permissions: ['rename_account', 'pay_invoice', 'transfer', 'deposit', 'withdraw', 'logs', 'add_user', 'remove_user', 'create_card', 'remove_card']
      }
    ],
    logs: [
      { id: 'l1', date: '2023-10-25 10:00', action: 'Stworzono konto', user: 'System', details: 'Konto zostało założone.' }
    ],
    history: [
      { id: 't1', type: 'transfer_in', amount: 5000, date: '2023-10-25', sender: 'Wypłata sp. z o.o.', title: 'Wynagrodzenie za październik' },
      { id: 't2', type: 'withdraw', amount: 200, date: '2023-10-26', title: 'Wypłata z bankomatu' },
      { id: 't3', type: 'transfer_out', amount: 150.20, date: '2023-10-27', recipient: 'Sklep Spożywczy', title: 'Zakupy' },
      { id: 't4', type: 'deposit', amount: 1000, date: '2023-10-28', title: 'Wpłata własna' },
    ],
    chartData: [
      { date: '21.10', balance: 10000 },
      { date: '22.10', balance: 9800 },
      { date: '23.10', balance: 9500 },
      { date: '24.10', balance: 9700 },
      { date: '25.10', balance: 14700 },
      { date: '26.10', balance: 14500 },
      { date: '27.10', balance: 14420.50 },
      { date: '28.10', balance: 15420.50 },
    ],
  },
  {
    id: '2',
    type: 'business',
    name: 'Konto Służbowe (Firma XYZ)',
    owner: 'Firma XYZ Sp. z o.o.',
    accountNumber: 'PL 98 7654 3210 9876 5432 1098 7654',
    balance: 125000.00,
    sharedUsers: [
      {
        id: 'u1',
        name: 'George Gouda',
        role: 'Właściciel',
        permissions: ['rename_account', 'pay_invoice', 'transfer', 'deposit', 'withdraw', 'logs', 'add_user', 'remove_user', 'create_card', 'remove_card']
      },
      {
        id: 'u2',
        name: 'Piotreq Scripts',
        role: 'User',
        permissions: ['transfer', 'deposit', 'withdraw']
      }
    ],
    logs: [
      { id: 'l1', date: '2023-10-20 08:00', action: 'Dodano użytkownika', user: 'George Gouda', details: 'Dodano użytkownika Piotreq Scripts.' },
      { id: 'l2', date: '2023-10-20 08:05', action: 'Zmieniono uprawnienia', user: 'George Gouda', details: 'Zmieniono uprawnienia dla Piotreq Scripts.' }
    ],
    history: [
      { id: 'b1', type: 'transfer_in', amount: 25000, date: '2023-10-20', sender: 'Kontrahent A', title: 'Faktura VAT 123/2023' },
      { id: 'b2', type: 'transfer_out', amount: 5000, date: '2023-10-22', recipient: 'Urząd Skarbowy', title: 'Podatek VAT' },
      { id: 'b3', type: 'transfer_out', amount: 8000, date: '2023-10-25', recipient: 'Pracownicy', title: 'Wypłaty' },
    ],
    chartData: [
      { date: '21.10', balance: 113000 },
      { date: '22.10', balance: 108000 },
      { date: '23.10', balance: 108000 },
      { date: '24.10', balance: 108000 },
      { date: '25.10', balance: 100000 },
      { date: '26.10', balance: 125000 },
    ],
  }
];
