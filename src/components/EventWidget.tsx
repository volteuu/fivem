import { useState, useEffect } from 'react';
import { Card, Group, Stack, Text, Title, Box, ThemeIcon, Badge } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

export function EventWidget() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const eventDate = new Date();
      eventDate.setHours(20, 0, 0, 0);

      if (now > eventDate) {
        setTimeLeft('Wydarzenie trwa!');
        return;
      }

      const diff = eventDate.getTime() - now.getTime();
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder style={{ backgroundColor: 'var(--bg3)', border: 'var(--border)', height: '100%' }}>
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={42} radius="md" color="indigo" variant="light">
            <IconUser size={24} />
          </ThemeIcon>
          <Stack gap={4}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Nadchodzące wydarzenie</Text>
            <Title order={5} style={{ color: 'var(--color)', lineHeight: 1.2 }}>Aukcja pojazdów na Doherty</Title>
            <Text size="xs" c="dimmed">Weź udział w licytacji unikalnych pojazdów.</Text>
            <Badge color="blue" variant="light" size="sm" mt={4}>
              Partnerem wydarzenia jest Fleeca Bank
            </Badge>
          </Stack>
        </Group>

        <Box style={{ textAlign: 'right', minWidth: '70px' }}>
          <Text size="sm" fw={700} style={{ color: 'var(--mcolor)' }}>20:00</Text>
          <Text size="xs" c="dimmed">Dzisiaj</Text>
          <Text size="xs" fw={700} c="red" mt="xs">{timeLeft}</Text>
        </Box>
      </Group>
    </Card>
  );
}
