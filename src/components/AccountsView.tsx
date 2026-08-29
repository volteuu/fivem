import { useState } from 'react';
import { Title, Text, Button, Stack, Group, Card, Badge, Box, CopyButton, ActionIcon, Grid, Modal, TextInput, Table } from '@mantine/core';
import { IconCopy, IconCheck, IconPlus, IconSettings, IconUsers, IconTrash, IconPencil, IconExchange, IconShieldLock } from '@tabler/icons-react';
import { Account, DUMMY_ACCOUNTS } from '../types';
import { ManageUsersView } from './ManageUsersView';
import { ScrollArea } from '@mantine/core';

interface AccountsViewProps {
  currentAccount: Account;
}

export function AccountsView({ currentAccount }: AccountsViewProps) {
  const [accounts, setAccounts] = useState<Account[]>(DUMMY_ACCOUNTS);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(currentAccount.id);
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);

  const selectedAccount = accounts.find(a => a.id === selectedAccountId) || accounts[0];

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <Title order={2}>Moje Konta</Title>
        <Button leftSection={<IconPlus size={16} />} variant="light" color="blue">
          Dodaj konto
        </Button>
      </Group>

      <ScrollArea w="100%" offsetScrollbars type="always">
        <Group wrap="nowrap" pb="sm">
          {accounts.map(acc => (
            <Box key={acc.id} w={300} style={{ flexShrink: 0 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  cursor: 'pointer',
                  border: selectedAccountId === acc.id ? '2px solid var(--mcolor)' : '1px solid var(--border)',
                  backgroundColor: selectedAccountId === acc.id ? 'var(--bg2)' : 'var(--bg3)',
                  height: '100%'
                }}
                onClick={() => setSelectedAccountId(acc.id)}
              >
                <Badge color={acc.type === 'private' ? 'blue' : 'orange'} mb="md">{acc.type === 'private' ? 'Prywatne' : 'Służbowe'}</Badge>
                <Text fw={500} size="lg" mb="xs" truncate>{acc.name}</Text>
                <Text size="xl" fw={700} c="var(--mcolor)">
                  {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(acc.balance)}
                </Text>
              </Card>
            </Box>
          ))}
        </Group>
      </ScrollArea>

      {selectedAccount && (
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="xl" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)' }}>
              <Group justify="space-between" mb="xl">
                <Box>
                  <Text size="sm" c="dimmed">Właściciel</Text>
                  <Title order={3}>{selectedAccount.owner}</Title>
                </Box>
                <Badge size="lg" color="green" variant="light">
                  {selectedAccount.sharedUsers.find(u => u.name === 'George Gouda')?.role || 'User'}
                </Badge>
              </Group>

              <Box mb="xl">
                <Text size="sm" c="dimmed" mb="xs">Numer konta (IBAN)</Text>
                <Group gap="sm">
                  <Text style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{selectedAccount.accountNumber}</Text>
                  <CopyButton value={selectedAccount.accountNumber} timeout={2000}>
                    {({ copied, copy }) => (
                      <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    )}
                  </CopyButton>
                </Group>
              </Box>

              <Title order={4} mb="md">Zarządzanie kontem</Title>
              <Grid>
                <Grid.Col span={6}>
                  <Button fullWidth variant="default" leftSection={<IconPencil size={16} />}>Zmień nazwę</Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button fullWidth variant="default" leftSection={<IconExchange size={16} />}>Zmień właściciela</Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button fullWidth variant="light" color="blue" leftSection={<IconUsers size={16} />} onClick={() => setIsManageUsersOpen(true)}>
                    Zarządzaj użytkownikami
                  </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button fullWidth variant="light" color="red" leftSection={<IconTrash size={16} />}>Usuń konto</Button>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)', height: '100%' }}>
              <Title order={4} mb="md">Logi konta</Title>
              <Stack gap="md">
                {selectedAccount.logs.map(log => (
                  <Box key={log.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    <Group justify="space-between" mb={4}>
                      <Text size="sm" fw={500}>{log.action}</Text>
                      <Text size="xs" c="dimmed">{log.date}</Text>
                    </Group>
                    <Text size="xs" c="dimmed">Przez: {log.user}</Text>
                    <Text size="sm" mt={4}>{log.details}</Text>
                  </Box>
                ))}
                {selectedAccount.logs.length === 0 && (
                  <Text size="sm" c="dimmed" ta="center">Brak logów</Text>
                )}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      )}

      {isManageUsersOpen && selectedAccount && (
         <Modal
           opened={isManageUsersOpen}
           onClose={() => setIsManageUsersOpen(false)}
           title={<Title order={3}>Zarządzaj użytkownikami - {selectedAccount.name}</Title>}
           size="xl"
           styles={{
             content: { backgroundColor: 'var(--bg1)' },
             header: { backgroundColor: 'var(--bg1)' }
           }}
         >
           <ManageUsersView account={selectedAccount} />
         </Modal>
      )}
    </Stack>
  );
}
