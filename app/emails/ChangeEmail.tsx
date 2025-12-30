import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface ChangeEmailProps {
  url: string
}

export const ChangeEmail = ({ url }: ChangeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmez votre nouvelle adresse email</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#1c1917',
              },
              fontFamily: {
                serif: ['Times New Roman', 'Times', 'serif'],
                sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
              },
            },
          },
        }}
      >
        <Body className="bg-white my-auto mx-auto font-sans text-stone-900">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0 font-serif tracking-tight">
                ATELIER MERIENNE
              </Heading>
            </Section>

            <Section>
              <Text className="text-black text-[14px] leading-[24px]">Bonjour,</Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Nous avons reçu une demande de modification d'adresse email pour votre compte{' '}
                <strong>Atelier Merienne</strong>.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Veuillez confirmer ce changement en cliquant sur le bouton ci-dessous :
              </Text>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#1c1917] rounded text-white text-[12px] font-semibold no-underline text-center px-6 py-4"
                  href={url}
                >
                  Confirmer la nouvelle adresse
                </Button>
              </Section>

              <Text className="text-black text-[14px] leading-[24px]">
                Ce lien est valable 30 minutes. Si vous n'êtes pas à l'origine de cette demande,
                votre compte reste sécurisé avec votre email actuel.
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              Atelier Merienne
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ChangeEmail
