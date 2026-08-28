import { Affix, Button, Transition } from '@mantine/core';
import { IconTool } from '@tabler/icons-react';
import { useState } from 'react';

interface DebugToolProps {
  appMode: 'bank' | 'atm';
  setAppMode: (mode: 'bank' | 'atm') => void;
}

export function DebugTool({ appMode, setAppMode }: DebugToolProps) {
  const [mounted, setMounted] = useState(false);

  // Symulacja małego opóźnienia, żeby pokazać się po załadowaniu
  if (!mounted) {
    setTimeout(() => setMounted(true), 500);
  }

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={mounted}>
        {(transitionStyles) => (
          <Button
            leftSection={<IconTool size={16} />}
            style={transitionStyles}
            onClick={() => setAppMode(appMode === 'bank' ? 'atm' : 'bank')}
            color="dark"
            variant="filled"
          >
            Przełącz na {appMode === 'bank' ? 'Bankomat' : 'Bank'}
          </Button>
        )}
      </Transition>
    </Affix>
  );
}
