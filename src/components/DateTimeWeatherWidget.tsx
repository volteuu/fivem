import { useState, useEffect } from 'react';
import { Card, Group, Stack, Text, Title, Box } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';

export function DateTimeWeatherWidget() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  const dateString = date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)', height: '100%' }}>
      <Group justify="space-between" align="center">
        <Group>
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg1)', padding: '0.5rem', borderRadius: '50%' }}>
            <IconClock size={32} color="var(--mcolor)" />
          </Box>
          <Stack gap={0}>
            <Title order={3} style={{ color: 'var(--color)' }}>{timeString}</Title>
            <Text size="sm" c="dimmed" tt="capitalize">{dateString}</Text>
          </Stack>
        </Group>

        <Box style={{ textAlign: 'right' }}>
          <Text size="xl" fw={700} style={{ color: 'var(--mantine-color-yellow-4)' }}>24°C</Text>
          <Text size="sm" c="dimmed">Słonecznie</Text>
        </Box>
      </Group>
    </Card>
  );
}
