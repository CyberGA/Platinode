import { Card, Image, Text, Badge, Button, Group, Divider, Progress } from '@mantine/core';
import { useRouter } from "next/router"

export default function ProjectCard({src, isLive = true, alt, title, desc, amountRequested = 10, amountReceived = 5, link}) {
    const router = useRouter();
    const progress = (amountReceived / amountRequested) * 100;
    const params = { src, isLive, title, desc, amountRequested, amountReceived   }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder className="min-w-[250px]">
      <Card.Section>
        <Image
          src={src}
          height={260}
          alt={alt}
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={700} size="xl" className="font-plat">{title}</Text>
        <Badge color={ isLive ? "green" : "pink"} variant="light" p="md" className="font-plat">
          { isLive ? "Live" : "Close"}
        </Badge>
      </Group>

      <Text size="md" color="dimmed" className="font-plat">
        {desc}
      </Text>

      <Divider my="md" />

      <Text size="md" color="dimmed" className="font-plat">
        <span className="font-bold">{`${amountReceived}SUS`}</span>
        {` raised of `}
        <span className="font-bold">{`${amountReceived}SUS`}</span>
      </Text>
      <Progress color="#3bd4e1" value={progress} label={`${progress}%`} size="xl" radius="xl"  />

      <Button variant="light" size="md" fullWidth mt="md" radius="md" className="text-secondary font-plat ease-in duration-300" onClick={() => router.push({ pathname: link})} >
        View details
      </Button>
    </Card>
    );
}