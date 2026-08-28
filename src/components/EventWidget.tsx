import { Card, Group, Stack, Text, Title, Box, ThemeIcon } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

export function EventWidget() {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)', marginBottom: '1rem', height: '100%' }}>
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={42} radius="md" color="indigo" variant="light">
            <IconUser size={24} />
          </ThemeIcon>
          <Stack gap={4}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Nadchodzące wydarzenie</Text>
            <Title order={5} style={{ color: 'var(--color)', lineHeight: 1.2 }}>Aukcja pojazdów na Doherty</Title>
            <Text size="xs" c="dimmed">Weź udział w licytacji unikalnych pojazdów i zdobądź wymarzone auto.</Text>
          </Stack>
        </Group>

        <Box style={{ textAlign: 'right', minWidth: '70px' }}>
          <Text size="sm" fw={700} style={{ color: 'var(--mcolor)' }}>20:00</Text>
          <Text size="xs" c="dimmed">Dzisiaj</Text>
        </Box>
      </Group>
    </Card>
  );
}
