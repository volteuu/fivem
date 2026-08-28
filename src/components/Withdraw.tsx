import { Card, Title, Text, NumberInput, Button, Stack, Group, Box } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';

export function Withdraw() {
  return (
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
  );
}
