import { useState } from 'react';
import { AccountSelection } from './components/AccountSelection';
import { BankMain } from './components/BankMain';
import { AtmMain } from './components/AtmMain';
import { DebugTool } from './components/DebugTool';
import { type Account, DUMMY_ACCOUNTS } from './types';

function App() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [appMode, setAppMode] = useState<'bank' | 'atm'>('bank');

  const handleLogout = () => {
    setSelectedAccount(null);
  };

  return (
    <>
      <div style={{
        width: '80vw',
        height: '60vh',
        backgroundColor: 'var(--bg1)',
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
      }}>
        {selectedAccount ? (
          appMode === 'bank' ? (
            <BankMain account={selectedAccount} onLogout={handleLogout} />
          ) : (
            <AtmMain account={selectedAccount} onLogout={handleLogout} />
          )
        ) : (
          <AccountSelection accounts={DUMMY_ACCOUNTS} onSelect={setSelectedAccount} />
        )}
      </div>

      <DebugTool appMode={appMode} setAppMode={setAppMode} />
    </>
  );
}

export default App;
