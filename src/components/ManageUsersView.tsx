import { useState } from 'react';
import { Title, Text, Button, Stack, Group, Card, TextInput, Avatar, Box, ActionIcon, Menu, MultiSelect } from '@mantine/core';
import { IconSearch, IconPlus, IconSettings, IconTrash, IconUserPlus } from '@tabler/icons-react';
import { Account, SharedUser, Permission } from '../types';

interface ManageUsersViewProps {
  account: Account;
}

const PERMISSION_OPTIONS = [
  { value: 'rename_account', label: 'Rename account' },
  { value: 'pay_invoice', label: 'Pay invoice' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdraw', label: 'Withdraw' },
  { value: 'logs', label: 'Logs' },
  { value: 'add_user', label: 'Add user' },
  { value: 'remove_user', label: 'Remove user' },
  { value: 'create_card', label: 'Create card' },
  { value: 'remove_card', label: 'Remove card' },
];

export function ManageUsersView({ account }: ManageUsersViewProps) {
  const [users, setUsers] = useState<SharedUser[]>(account.sharedUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handlePermissionsChange = (userId: string, newPermissions: string[]) => {
    setUsers(users.map(u => u.id === userId ? { ...u, permissions: newPermissions as Permission[] } : u));
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <TextInput
          placeholder="Search for users..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Button leftSection={<IconPlus size={16} />} color="green" variant="light">
          Add user
        </Button>
      </Group>

      <Stack gap="xs">
        {filteredUsers.map(user => (
          <Card key={user.id} padding="md" radius="md" withBorder style={{ backgroundColor: 'var(--bg2)' }}>
            <Group justify="space-between" wrap="nowrap">
              <Group>
                <Avatar color="initials" radius="xl">{user.name.split(' ').map(n => n[0]).join('')}</Avatar>
                <Box>
                  <Text size="sm" fw={500}>{user.name}</Text>
                  <Text size="xs" c="dimmed">{user.role}</Text>
                </Box>
              </Group>

              <Group>
                <Menu withinPortal position="bottom-end" shadow="sm">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconSettings size={18} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown style={{ backgroundColor: 'var(--bg3)', borderColor: 'var(--border)' }}>
                    <Menu.Label>Edit permissions</Menu.Label>
                    <Box p="xs" w={300}>
                      <MultiSelect
                        data={PERMISSION_OPTIONS}
                        value={user.permissions}
                        onChange={(val) => handlePermissionsChange(user.id, val)}
                        placeholder="Select permissions..."
                        searchable
                        clearable
                        styles={{
                          input: { backgroundColor: 'var(--bg1)' },
                          dropdown: { backgroundColor: 'var(--bg1)' }
                        }}
                      />
                    </Box>
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                      Remove user
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
