import { Card, Title, Text, NumberInput, Button, Stack, Group, Box, Grid } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import type { Account } from '../types';

interface WithdrawProps {
  account: Account;
}

export function Withdraw({ account }: WithdrawProps) {
  const withdrawHistory = account.history.filter(tx => tx.type === 'withdraw' || tx.type === 'transfer_out');

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Grid gutter="xl" w="100%" style={{ maxWidth: 900 }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', border: 'var(--border)' }}>
            <Group mb="md">
              <Box p="xs" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)', borderRadius: 'var(--mantine-radius-md)' }}>
                <IconArrowUpRight size={24} color="var(--mantine-color-red-5)" />
              </Box>
              <Title order={3}>Wypłata z konta</Title>
            </Group>
            <Text c="dimmed" size="sm" mb="xl">Wprowadź kwotę, którą chcesz wypłacić ze swojego konta bankowego.</Text>

            <Stack gap="md">
              <NumberInput
                label="Kwota wypłaty (PLN)"
                placeholder="0.00"
                min={0}
                decimalScale={2}
                fixedDecimalScale
                size="md"
              />
              <Button size="md" color="red" mt="md">Zatwierdź wypłatę</Button>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)' }}>
            <Title order={4} mb="md">Historia wypłat</Title>
            <Stack gap="sm">
              {withdrawHistory.map((tx) => (
                <Group key={tx.id} wrap="nowrap" align="center" p="xs" style={{ borderBottom: 'var(--border)' }}>
                  <IconArrowUpRight size={20} color="var(--mantine-color-red-5)" />
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text size="sm" fw={500} truncate="end">{tx.title}</Text>
                    <Text size="xs" c="dimmed">{tx.date}</Text>
                  </Box>
                  <Text size="sm" fw={700} c="red.4">
                    -{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(tx.amount)}
                  </Text>
                </Group>
              ))}
              {withdrawHistory.length === 0 && (
                <Text size="sm" c="dimmed" ta="center" mt="md">Brak wypłat.</Text>
              )}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
