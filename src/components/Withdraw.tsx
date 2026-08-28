import { useState } from 'react';
import { Card, Title, Text, NumberInput, Button, Stack, Group, Box, Grid } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import type { Account } from '../types';

interface WithdrawProps {
  account: Account;
}

export function Withdraw({ account }: WithdrawProps) {
  const withdrawHistory = account.history.filter(tx => tx.type === 'withdraw' || tx.type === 'transfer_out');
  const [customAmount, setCustomAmount] = useState(false);
  const [amount, setAmount] = useState<number | string>('');

  const quickAmounts = [1000, 5000, 10000, 50000];

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}>
      <Grid gutter="xl" w="100%" style={{ maxWidth: 1200 }}>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Card shadow="sm" padding="xl" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', border: 'var(--border)', height: '100%' }}>
            <Group mb="xl">
              <Box p="sm" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)', borderRadius: 'var(--mantine-radius-md)' }}>
                <IconArrowUpRight size={32} color="var(--mantine-color-red-5)" />
              </Box>
              <Title order={2}>Wypłata z konta</Title>
            </Group>
            <Text c="dimmed" size="md" mb="xl">Wybierz lub wprowadź kwotę, którą chcesz wypłacić ze swojego konta bankowego.</Text>

            <Stack gap="xl">
              <Grid gutter="md">
                {quickAmounts.map(val => (
                  <Grid.Col span={6} key={val}>
                    <Button
                      fullWidth
                      variant={amount === val && !customAmount ? "filled" : "light"}
                      color="red"
                      size="lg"
                      onClick={() => { setAmount(val); setCustomAmount(false); }}
                    >
                      {new Intl.NumberFormat('pl-PL').format(val)} PLN
                    </Button>
                  </Grid.Col>
                ))}
                <Grid.Col span={12}>
                  <Button
                    fullWidth
                    variant={customAmount ? "filled" : "outline"}
                    color="red"
                    size="lg"
                    onClick={() => { setCustomAmount(true); setAmount(''); }}
                  >
                    Inna kwota
                  </Button>
                </Grid.Col>
              </Grid>

              {customAmount && (
                <NumberInput
                  label="Kwota wypłaty (PLN)"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  fixedDecimalScale
                  size="xl"
                  value={amount}
                  onChange={setAmount}
                  hideControls
                />
              )}
              <Button size="xl" variant="gradient" gradient={{ from: 'red', to: 'orange' }} mt="md" disabled={!amount || Number(amount) <= 0}>
                Zatwierdź wypłatę
              </Button>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card shadow="sm" padding="xl" radius="md" withBorder style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)', height: '100%' }}>
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
