import { Card, Title, Text, Group, Box, ScrollArea, Table, Grid, Stack, Progress } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import type { Account, Transaction } from '../types';

interface HistoryProps {
  account: Account;
}

export function History({ account }: HistoryProps) {
  const incomeTotal = account.history
    .filter(tx => tx.type === 'deposit' || tx.type === 'transfer_in')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const outcomeTotal = account.history
    .filter(tx => tx.type === 'withdraw' || tx.type === 'transfer_out')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const total = incomeTotal + outcomeTotal;
  const incomePercent = total === 0 ? 0 : (incomeTotal / total) * 100;
  const outcomePercent = total === 0 ? 0 : (outcomeTotal / total) * 100;

  const getTransactionColor = (type: Transaction['type']) => {
    return (type === 'deposit' || type === 'transfer_in') ? 'green.4' : 'red.4';
  };

  const getTransactionSign = (type: Transaction['type']) => {
    return (type === 'deposit' || type === 'transfer_in') ? '+' : '-';
  };

  const formatType = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return 'Wpłata';
      case 'withdraw': return 'Wypłata';
      case 'transfer_in': return 'Przelew';
      case 'transfer_out': return 'Przelew';
    }
  };

  const rows = account.history.map((tx) => (
    <Table.Tr key={tx.id}>
      <Table.Td>{tx.id}</Table.Td>
      <Table.Td>{tx.sender || '-'}</Table.Td>
      <Table.Td>{tx.recipient || '-'}</Table.Td>
      <Table.Td>
        <Text size="sm" fw={700} c={getTransactionColor(tx.type)}>
          {getTransactionSign(tx.type)}{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(tx.amount)}
        </Text>
      </Table.Td>
      <Table.Td>{tx.title}</Table.Td>
      <Table.Td>{formatType(tx.type)}</Table.Td>
      <Table.Td>{tx.date}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', border: 'var(--border)', height: '100%' }}>
          <Group mb="xl">
            <Box p="xs" style={{ backgroundColor: 'rgba(56, 214, 238, 0.1)', borderRadius: 'var(--mantine-radius-md)' }}>
              <IconHistory size={24} color="var(--mcolor)" />
            </Box>
            <Title order={3}>Transakcje</Title>
          </Group>

          <ScrollArea h={600} offsetScrollbars>
            <Table stickyHeader verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Od kogo</Table.Th>
                  <Table.Th>Do kogo</Table.Th>
                  <Table.Th>Kwota</Table.Th>
                  <Table.Th>Tytuł</Table.Th>
                  <Table.Th>Działanie</Table.Th>
                  <Table.Th>Data</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? rows : (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <Text ta="center" c="dimmed">Brak historii transakcji.</Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', border: 'var(--border)', height: '100%' }}>
          <Title order={4} mb="xl">Miesięczne statystyki</Title>

          <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Box
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `conic-gradient(
                  var(--mantine-color-green-5) 0% ${incomePercent}%,
                  var(--mantine-color-red-5) ${incomePercent}% ${incomePercent + outcomePercent}%,
                  var(--mantine-color-blue-5) ${incomePercent + outcomePercent}% 100%
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Title order={1}>{account.history.length}</Title>
                <Text size="sm" c="dimmed">Transakcji</Text>
              </Box>
            </Box>
          </Box>

          <Stack gap="lg">
            <Box p="md" style={{ border: 'var(--border)', borderRadius: 'var(--mantine-radius-md)' }}>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>Miesięczne przychody</Text>
                <Text size="sm" fw={700} c="green.4">
                  {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(incomeTotal)}
                </Text>
              </Group>
              <Progress value={100} color="green.5" size="md" />
            </Box>

            <Box p="md" style={{ border: 'var(--border)', borderRadius: 'var(--mantine-radius-md)' }}>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>Miesięczne wydatki</Text>
                <Text size="sm" fw={700} c="red.4">
                  {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(outcomeTotal)}
                </Text>
              </Group>
              <Progress value={100} color="red.5" size="md" />
            </Box>

            <Box p="md" style={{ border: 'var(--border)', borderRadius: 'var(--mantine-radius-md)' }}>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>Średni stan konta</Text>
                <Text size="sm" fw={700} c="blue.4">
                  {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(account.balance)}
                </Text>
              </Group>
              <Progress value={100} color="blue.5" size="md" />
            </Box>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
