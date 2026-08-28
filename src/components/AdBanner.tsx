import { useState, useEffect } from 'react';
import { Card, Group, Stack, Text, Title, Button, ThemeIcon, Transition } from '@mantine/core';
import { IconBuildingBank, IconBriefcase } from '@tabler/icons-react';

export function AdBanner() {
  const [showPolice, setShowPolice] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPolice((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      style={{
        background: showPolice
          ? 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)'
          : 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '1rem',
        color: '#fff',
        transition: 'background 0.5s ease'
      }}
    >
      {showPolice ? (
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={48} radius="md" variant="light" color="blue" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}>
            <IconBuildingBank size={32} />
          </ThemeIcon>
          <Stack gap="xs" style={{ flex: 1 }}>
            <Title order={4} style={{ color: '#fff' }}>Zostań bohaterem!</Title>
            <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Rozpocznij karierę w policji. Poszukujemy odważnych kandydatów, którzy chcą dbać o bezpieczeństwo naszego miasta. Dołącz do LSPD!
            </Text>
            <Button variant="white" color="dark" size="xs" mt="sm" style={{ alignSelf: 'flex-start' }}>
              Aplikuj teraz
            </Button>
          </Stack>
        </Group>
      ) : (
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={48} radius="md" variant="light" color="yellow" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffd43b' }}>
            <IconBriefcase size={32} />
          </ThemeIcon>
          <Stack gap="xs" style={{ flex: 1 }}>
            <Title order={4} style={{ color: '#ffd43b' }}>Downtown Cab Co.</Title>
            <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Zawieziemy Cię wszędzie! Zamów taksówkę już teraz i ciesz się szybkim i bezpiecznym transportem po całym Los Santos.
            </Text>
            <Button variant="filled" color="yellow" size="xs" mt="sm" style={{ alignSelf: 'flex-start', color: '#000' }}>
              Zamów przejazd
            </Button>
          </Stack>
        </Group>
      )}
    </Card>
  );
}
