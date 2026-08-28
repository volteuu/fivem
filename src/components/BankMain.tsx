import { useState } from 'react';
import { AppShell, Burger, Group, NavLink, Title, Text, Card, Grid, Stack, Badge, Box, Button, ScrollArea, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowDownLeft, IconArrowUpRight, IconBuildingBank, IconHistory, IconLogout, IconSend, IconCreditCard, IconPigMoney } from '@tabler/icons-react';
import { AreaChart } from '@mantine/charts';
import type { Account, Transaction } from '../types';
import classes from './BankMain.module.css';
import { Deposit } from './Deposit';
import { Withdraw } from './Withdraw';
import { Transfer } from './Transfer';
import { History } from './History';
import { DateTimeWeatherWidget } from './DateTimeWeatherWidget';
import { AdBanner } from './AdBanner';
import { EventWidget } from './EventWidget';

interface BankMainProps {
  account: Account;
  onLogout: () => void;
}

export function BankMain({ account, onLogout }: BankMainProps) {
  const [opened, { toggle }] = useDisclosure();
  const [activeTab, setActiveTab] = useState<'main' | 'deposit' | 'withdraw' | 'transfer' | 'history'>('main');

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
      case 'transfer_in':
        return <IconArrowDownLeft size={20} color="var(--mantine-color-green-5)" />;
      case 'withdraw':
      case 'transfer_out':
        return <IconArrowUpRight size={20} color="var(--mantine-color-red-5)" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    return (type === 'deposit' || type === 'transfer_in') ? 'green.4' : 'red.4';
  };

  const getTransactionSign = (type: Transaction['type']) => {
    return (type === 'deposit' || type === 'transfer_in') ? '+' : '-';
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <AppShell.Header style={{ backgroundColor: 'var(--bg2)', borderBottom: 'var(--border)', position: 'absolute' }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="var(--color)" />
            <IconBuildingBank size={30} style={{ color: 'var(--mcolor)' }} />
            <Title order={3} style={{ color: 'var(--color)' }}>Fleeca Bank</Title>
          </Group>
          <Button variant="subtle" color="red" leftSection={<IconLogout size={16} />} onClick={onLogout}>
            Wyloguj
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ backgroundColor: 'var(--bg3)', borderRight: 'var(--border)', position: 'absolute' }}>
        <Stack gap="sm">
          <Text size="xs" fw={500} c="dimmed" tt="uppercase">Operacje</Text>
          <NavLink label="Pulpit" leftSection={<IconBuildingBank size={20} />} active={activeTab === 'main'} onClick={() => setActiveTab('main')} className={classes.navLink} />
          <NavLink label="Wpłać" leftSection={<IconArrowDownLeft size={20} />} active={activeTab === 'deposit'} onClick={() => setActiveTab('deposit')} className={classes.navLink} />
          <NavLink label="Wypłać" leftSection={<IconArrowUpRight size={20} />} active={activeTab === 'withdraw'} onClick={() => setActiveTab('withdraw')} className={classes.navLink} />
          <NavLink label="Przelewy" leftSection={<IconSend size={20} />} active={activeTab === 'transfer'} onClick={() => setActiveTab('transfer')} className={classes.navLink} />

          <Divider my="sm" color="var(--border)" />

          <Text size="xs" fw={500} c="dimmed" tt="uppercase">Historia</Text>
          <NavLink label="Historia operacji" leftSection={<IconHistory size={20} />} active={activeTab === 'history'} onClick={() => setActiveTab('history')} className={classes.navLink} />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: 'var(--bg1)', height: '100%', overflow: 'auto' }}>
        {activeTab === 'main' && (
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack>
                <Grid>
                  <Grid.Col span={6}>
                    <DateTimeWeatherWidget />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <EventWidget />
                  </Grid.Col>
                </Grid>

                <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.mainCard}>
                  <Group justify="space-between" mb="md">
                  <Box>
                    <Text size="sm" c="dimmed">Dostępne środki</Text>
                    <Title order={1} style={{ color: 'var(--mcolor)' }}>
                      {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(account.balance)}
                    </Title>
                  </Box>
                  <Badge color="blue" variant="light" size="lg">
                    {account.type === 'private' ? 'Konto Prywatne' : 'Konto Służbowe'}
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" mb="xs">{account.name}</Text>
                <Text size="sm" style={{ fontFamily: 'monospace' }} mb="xl">{account.accountNumber}</Text>

                <Grid mt="md" mb="md">
                  <Grid.Col span={6}>
                    <Card withBorder padding="sm" radius="md" style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)' }}>
                      <Group>
                        <IconPigMoney size={32} color="var(--mantine-color-green-4)" />
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase">Przychody (Ostatnie 30 dni)</Text>
                          <Text fw={700} size="lg" c="green.4">
                            +{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(account.history.filter(tx => tx.type === 'deposit' || tx.type === 'transfer_in').reduce((acc, curr) => acc + curr.amount, 0))}
                          </Text>
                        </Box>
                      </Group>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Card withBorder padding="sm" radius="md" style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)' }}>
                      <Group>
                        <IconCreditCard size={32} color="var(--mantine-color-red-4)" />
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase">Wydatki (Ostatnie 30 dni)</Text>
                          <Text fw={700} size="lg" c="red.4">
                            -{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(account.history.filter(tx => tx.type === 'withdraw' || tx.type === 'transfer_out').reduce((acc, curr) => acc + curr.amount, 0))}
                          </Text>
                        </Box>
                      </Group>
                    </Card>
                  </Grid.Col>
                </Grid>

                <Box mt="sm">
                  <Text size="sm" fw={500} mb="xs">Historia salda (ostatnie dni)</Text>
                  <AreaChart
                    h={150}
                    data={account.chartData}
                    dataKey="date"
                    series={[{ name: 'balance', color: 'cyan.5' }]}
                    curveType="monotone"
                    withGradient
                  />
                </Box>
              </Card>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.mainCard} h="100%">
              <Title order={4} mb="md">Ostatnie transakcje</Title>
              <ScrollArea h={350} offsetScrollbars>
                <Stack gap="md">
                  {account.history.map((tx) => (
                    <Group key={tx.id} wrap="nowrap" align="flex-start" className={classes.transactionItem} p="sm" preventGrowOverflow={false}>
                      <Box mt={4}>{getTransactionIcon(tx.type)}</Box>
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text size="sm" fw={500} truncate="end">{tx.title}</Text>
                        {(tx.recipient || tx.sender) && (
                          <Text size="xs" c="dimmed" truncate="end">{tx.recipient || tx.sender}</Text>
                        )}
                        <Text size="xs" c="dimmed" mt={4}>{tx.date}</Text>
                      </Box>
                      <Box style={{ flexShrink: 0 }}>
                        <Text size="sm" fw={700} c={getTransactionColor(tx.type)} style={{ whiteSpace: 'nowrap' }}>
                          {getTransactionSign(tx.type)}{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(tx.amount)}
                        </Text>
                      </Box>
                    </Group>
                  ))}
                  {account.history.length === 0 && (
                    <Text size="sm" c="dimmed" ta="center" mt="xl">Brak transakcji.</Text>
                  )}
                </Stack>
              </ScrollArea>

              <AdBanner />
            </Card>
          </Grid.Col>
        </Grid>
        )}

        {activeTab === 'deposit' && <Deposit account={account} />}
        {activeTab === 'withdraw' && <Withdraw account={account} />}
        {activeTab === 'transfer' && <Transfer />}
        {activeTab === 'history' && <History account={account} />}
      </AppShell.Main>
    </AppShell>
  );
}
