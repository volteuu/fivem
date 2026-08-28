import { Card, Title, Text, Group, Box, ScrollArea, Table } from '@mantine/core';
import { IconHistory, IconArrowDownLeft, IconArrowUpRight } from '@tabler/icons-react';
import type { Account, Transaction } from '../types';

interface HistoryProps {
  account: Account;
}

export function History({ account }: HistoryProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
      case 'transfer_in':
        return <IconArrowDownLeft size={16} color="var(--mantine-color-green-5)" />;
      case 'withdraw':
      case 'transfer_out':
        return <IconArrowUpRight size={16} color="var(--mantine-color-red-5)" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    return (type === 'deposit' || type === 'transfer_in') ? 'green.4' : 'red.4';
  };

  const getTransactionSign = (type: Transaction['type']) => {
    return (type === 'deposit' || type === 'transfer_in') ? '+' : '-';
  };

  const rows = account.history.map((tx) => (
    <Table.Tr key={tx.id}>
      <Table.Td>
        <Group gap="sm">
          {getTransactionIcon(tx.type)}
          <Text size="sm">{tx.date}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{tx.title}</Text>
        <Text size="xs" c="dimmed">{tx.recipient || tx.sender || 'Wpłata/Wypłata gotówkowa'}</Text>
      </Table.Td>
      <Table.Td align="right">
        <Text size="sm" fw={700} c={getTransactionColor(tx.type)}>
          {getTransactionSign(tx.type)}{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(tx.amount)}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', border: 'var(--border)' }}>
      <Group mb="xl">
        <Box p="xs" style={{ backgroundColor: 'rgba(56, 214, 238, 0.1)', borderRadius: 'var(--mantine-radius-md)' }}>
          <IconHistory size={24} color="var(--mcolor)" />
        </Box>
        <Title order={3}>Pełna historia transakcji</Title>
      </Group>

      <ScrollArea h={400}>
        <Table stickyHeader verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Data</Table.Th>
              <Table.Th>Szczegóły</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Kwota</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? rows : (
              <Table.Tr>
                <Table.Td colSpan={3}>
                  <Text ta="center" c="dimmed">Brak historii transakcji.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
