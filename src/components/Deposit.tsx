import { Card, Title, Text, NumberInput, Button, Stack, Group, Box } from '@mantine/core';
import { IconArrowDownLeft } from '@tabler/icons-react';

export function Deposit() {
  return (
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
  );
}
