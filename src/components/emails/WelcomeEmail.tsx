// components/emails/welcome.tsx
import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
} from "@react-email/components";

type WelcomeEmailProps = {
  name: string | null | undefined;
};

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  const previewText = `Welcome to Papermark, ${name}!`;
  console.log("новый юзер создан");

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to Papermark!
            </Heading>
            <Text className="text-sm">Hello {name},</Text>
            <Text className="text-sm">
              We're excited to have you onboard at <span>Papermark</span>. We
              hope you enjoy your journey with us. If you have any questions or
              need assistance, feel free to reach out.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/welcome`}
              >
                Get Started
              </Button>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The Papermark Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
