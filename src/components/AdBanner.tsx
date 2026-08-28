import { useState, useEffect } from 'react';
import { Card, Group, Stack, Text, Title, Button, ThemeIcon, ActionIcon, Box } from '@mantine/core';
import { IconBuildingBank, IconBriefcase, IconPigMoney, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export function AdBanner() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % totalSlides);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const getBackground = () => {
    switch (slide) {
      case 0: return 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)';
      case 1: return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
      case 2: return 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)';
      default: return 'var(--bg2)';
    }
  };

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      style={{
        background: getBackground(),
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '1rem',
        color: '#fff',
        transition: 'background 0.5s ease',
        position: 'relative'
      }}
    >
      <Box style={{ minHeight: '130px' }}>
        {slide === 0 && (
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={48} radius="md" variant="white" color="blue">
              <IconBuildingBank size={32} />
            </ThemeIcon>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Title order={4} style={{ color: '#fff' }}>Zostań bohaterem!</Title>
              <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Rozpocznij karierę w policji. Dołącz do LSPD i dbaj o bezpieczeństwo!
              </Text>
              <Button variant="white" color="blue" size="xs" mt="sm" style={{ alignSelf: 'flex-start' }}>
                Aplikuj teraz
              </Button>
            </Stack>
          </Group>
        )}

        {slide === 1 && (
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={48} radius="md" variant="white" color="yellow">
              <IconBriefcase size={32} />
            </ThemeIcon>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Title order={4} style={{ color: '#fff' }}>Downtown Cab Co.</Title>
              <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Zawieziemy Cię wszędzie! Zamów taksówkę już teraz w Los Santos.
              </Text>
              <Button variant="white" color="yellow" size="xs" mt="sm" style={{ alignSelf: 'flex-start' }}>
                Zamów przejazd
              </Button>
            </Stack>
          </Group>
        )}

        {slide === 2 && (
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={48} radius="md" variant="white" color="pink">
              <IconPigMoney size={32} />
            </ThemeIcon>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Title order={4} style={{ color: '#fff' }}>Up-n-Atom Burger</Title>
              <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Najlepszy Hot Dog w Los Santos! Pyszny i gorący, tylko za $5.49!
              </Text>
              <Button variant="white" color="pink" size="xs" mt="sm" style={{ alignSelf: 'flex-start' }}>
                Zamów teraz
              </Button>
            </Stack>
          </Group>
        )}
      </Box>

      <Group justify="center" mt="md" gap="xs">
        <ActionIcon variant="transparent" color="white" onClick={prevSlide}>
          <IconChevronLeft size={16} />
        </ActionIcon>
        {[0, 1, 2].map((idx) => (
          <Box
            key={idx}
            onClick={() => setSlide(idx)}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: slide === idx ? '#fff' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
        <ActionIcon variant="transparent" color="white" onClick={nextSlide}>
          <IconChevronRight size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
