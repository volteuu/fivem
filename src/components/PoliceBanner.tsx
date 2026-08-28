import { Card, Group, Stack, Text, Title, Button, ThemeIcon } from '@mantine/core';
import { IconBuildingBank } from '@tabler/icons-react';

export function PoliceBanner() {
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '1rem',
        color: '#fff'
      }}
    >
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
    </Card>
  );
}
