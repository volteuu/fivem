import { Box, Card, Container, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { IconBuildingBank, IconUser, IconBriefcase } from '@tabler/icons-react';
import type { Account } from '../types';
import classes from './AccountSelection.module.css';

interface AccountSelectionProps {
  accounts: Account[];
  onSelect: (account: Account) => void;
}

export function AccountSelection({ accounts, onSelect }: AccountSelectionProps) {
  return (
    <Container size="sm" py="xl" h="100%" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Stack align="center" mb={30}>
        <IconBuildingBank size={64} style={{ color: 'var(--mcolor)' }} />
        <Title order={1} style={{ color: 'var(--color)' }}>Wybierz konto</Title>
        <Text c="dimmed">Wybierz konto, na które chcesz się zalogować</Text>
      </Stack>

      <Group grow align="stretch">
        {accounts.map((account) => (
          <UnstyledButton key={account.id} onClick={() => onSelect(account)} className={classes.cardButton}>
            <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
              <Group justify="space-between" mb="md">
                <Text fw={500} size="lg">
                  {account.type === 'private' ? 'Prywatne' : 'Służbowe'}
                </Text>
                {account.type === 'private' ? (
                  <IconUser size={24} style={{ color: 'var(--mcolor)' }} />
                ) : (
                  <IconBriefcase size={24} style={{ color: 'var(--mcolor)' }} />
                )}
              </Group>

              <Text size="sm" c="dimmed" mb="xs">
                {account.name}
              </Text>

              <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }} mb="xl">
                {account.accountNumber}
              </Text>

              <Box>
                <Text size="sm" c="dimmed">Dostępne środki</Text>
                <Text size="xl" fw={700} style={{ color: 'var(--mcolor)' }}>
                  {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(account.balance)}
                </Text>
              </Box>
            </Card>
          </UnstyledButton>
        ))}
      </Group>
    </Container>
  );
}
