import { Card, Title, Text, NumberInput, Button, Stack, Group, Box, Grid } from '@mantine/core';
import { IconArrowDownLeft } from '@tabler/icons-react';
import type { Account } from '../types';

interface DepositProps {
  account: Account;
}

export function Deposit({ account }: DepositProps) {
  const depositHistory = account.history.filter(tx => tx.type === 'deposit' || tx.type === 'transfer_in');

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Grid gutter="xl" w="100%" style={{ maxWidth: 900 }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', border: 'var(--border)' }}>
            <Group mb="md">
              <Box p="xs" style={{ backgroundColor: 'rgba(56, 214, 238, 0.1)', borderRadius: 'var(--mantine-radius-md)' }}>
                <IconArrowDownLeft size={24} color="var(--mantine-color-green-5)" />
              </Box>
              <Title order={3}>Wpłata na konto</Title>
            </Group>
            <Text c="dimmed" size="sm" mb="xl">Wprowadź kwotę, którą chcesz wpłacić na swoje konto bankowe.</Text>

            <Stack gap="md">
              <NumberInput
                label="Kwota wpłaty (PLN)"
                placeholder="0.00"
                min={0}
                decimalScale={2}
                fixedDecimalScale
                size="md"
              />
              <Button size="md" color="blue" mt="md">Zatwierdź wpłatę</Button>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)' }}>
            <Title order={4} mb="md">Historia wpłat</Title>
            <Stack gap="sm">
              {depositHistory.map((tx) => (
                <Group key={tx.id} wrap="nowrap" align="center" p="xs" style={{ borderBottom: 'var(--border)' }}>
                  <IconArrowDownLeft size={20} color="var(--mantine-color-green-5)" />
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text size="sm" fw={500} truncate="end">{tx.title}</Text>
                    <Text size="xs" c="dimmed">{tx.date}</Text>
                  </Box>
                  <Text size="sm" fw={700} c="green.4">
                    +{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(tx.amount)}
                  </Text>
                </Group>
              ))}
              {depositHistory.length === 0 && (
                <Text size="sm" c="dimmed" ta="center" mt="md">Brak wpłat.</Text>
              )}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
