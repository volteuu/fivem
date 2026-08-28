import { Card, Title, Text, NumberInput, TextInput, Button, Stack, Group, Box } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

export function Transfer() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', border: 'var(--border)' }}>
      <Group mb="md">
        <Box p="xs" style={{ backgroundColor: 'rgba(56, 214, 238, 0.1)', borderRadius: 'var(--mantine-radius-md)' }}>
          <IconSend size={24} color="var(--mcolor)" />
        </Box>
        <Title order={3}>Nowy przelew</Title>
      </Group>
      <Text c="dimmed" size="sm" mb="xl">Wypełnij formularz, aby zlecić przelew na inne konto bankowe.</Text>

      <Stack gap="md">
        <TextInput
          label="Numer konta odbiorcy"
          placeholder="PL __ ____ ____ ____ ____ ____ ____"
          size="md"
        />
        <TextInput
          label="Tytuł przelewu"
          placeholder="np. Za zakupy"
          size="md"
        />
        <NumberInput
          label="Kwota przelewu (PLN)"
          placeholder="0.00"
          min={0}
          decimalScale={2}
          fixedDecimalScale
          size="md"
        />
        <Button size="md" color="blue" mt="md">Wyślij przelew</Button>
      </Stack>
    </Card>
  );
}
