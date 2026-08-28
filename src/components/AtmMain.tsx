import { useState } from 'react';
import { Card, Title, Text, Button, Stack, Group, Box, Grid, NumberInput } from '@mantine/core';
import { IconCashBanknote, IconArrowDownLeft, IconArrowUpRight, IconLogout } from '@tabler/icons-react';
import type { Account } from '../types';

interface AtmMainProps {
  account: Account;
  onLogout: () => void;
}

export function AtmMain({ account, onLogout }: AtmMainProps) {
  const [view, setView] = useState<'main' | 'withdraw' | 'deposit'>('main');
  const [amount, setAmount] = useState<number | string>('');

  const handleAction = () => {
    // Symulacja akcji
    console.log(`Wykonano ${view === 'withdraw' ? 'wypłatę' : 'wpłatę'} kwoty ${amount}`);
    setAmount('');
    setView('main');
  };

  return (
    <Box style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg2)' }}>
      <Box p="md" style={{ borderBottom: 'var(--border)', backgroundColor: 'var(--bg3)' }}>
        <Group justify="space-between">
          <Group>
            <IconCashBanknote size={32} color="var(--mcolor)" />
            <Title order={3}>Bankomat Fleeca</Title>
          </Group>
          <Button variant="subtle" color="red" leftSection={<IconLogout size={16} />} onClick={onLogout}>
            Odbierz kartę
          </Button>
        </Group>
      </Box>

      <Box style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card shadow="xl" padding="xl" radius="md" withBorder style={{ backgroundColor: 'var(--bg1)', border: 'var(--border)', width: '100%', maxWidth: 500 }}>
          {view === 'main' && (
            <Stack gap="lg" align="center">
              <Text size="lg" fw={500}>Witaj, {account.name}</Text>
              <Box p="md" style={{ backgroundColor: 'var(--bg3)', borderRadius: 'var(--mantine-radius-md)', width: '100%', textAlign: 'center' }}>
                <Text size="sm" c="dimmed">Dostępne środki</Text>
                <Title order={2} style={{ color: 'var(--mcolor)' }}>
                  {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(account.balance)}
                </Title>
              </Box>

              <Grid w="100%" mt="md">
                <Grid.Col span={6}>
                  <Button
                    fullWidth
                    size="xl"
                    variant="light"
                    color="red"
                    leftSection={<IconArrowUpRight size={24} />}
                    onClick={() => setView('withdraw')}
                    style={{ height: 100 }}
                  >
                    Wypłata
                  </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button
                    fullWidth
                    size="xl"
                    variant="light"
                    color="green"
                    leftSection={<IconArrowDownLeft size={24} />}
                    onClick={() => setView('deposit')}
                    style={{ height: 100 }}
                  >
                    Wpłata
                  </Button>
                </Grid.Col>
              </Grid>
            </Stack>
          )}

          {(view === 'withdraw' || view === 'deposit') && (
            <Stack gap="md">
              <Group mb="md">
                <Button variant="subtle" size="xs" onClick={() => { setView('main'); setAmount(''); }}>
                  &larr; Powrót
                </Button>
                <Title order={4}>{view === 'withdraw' ? 'Wypłata gotówki' : 'Wpłata gotówki'}</Title>
              </Group>

              <NumberInput
                size="xl"
                placeholder="Podaj kwotę"
                value={amount}
                onChange={setAmount}
                min={0}
                hideControls
              />

              <Grid mt="md">
                {[50, 100, 200, 500].map(val => (
                  <Grid.Col span={6} key={val}>
                    <Button fullWidth variant="default" onClick={() => setAmount(val)}>
                      {val} PLN
                    </Button>
                  </Grid.Col>
                ))}
              </Grid>

              <Button
                mt="xl"
                size="lg"
                fullWidth
                color={view === 'withdraw' ? 'red' : 'green'}
                onClick={handleAction}
                disabled={!amount || Number(amount) <= 0}
              >
                Zatwierdź
              </Button>
            </Stack>
          )}
        </Card>
      </Box>
    </Box>
  );
}
