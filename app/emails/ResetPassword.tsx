import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface ResetPasswordProps {
  url: string
}

export const ResetPassword = ({ url }: ResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Réinitialisez votre mot de passe Atelier Merienne</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#1c1917',
                offwhite: '#fafaf9',
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
                Vous avez demandé à réinitialiser le mot de passe de votre compte{' '}
                <strong>Atelier Merienne</strong>.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Pour créer un nouveau mot de passe, cliquez sur le bouton ci-dessous :
              </Text>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#1c1917] rounded text-white text-[12px] font-semibold no-underline text-center px-6 py-4"
                  href={url}
                >
                  Réinitialiser le mot de passe
                </Button>
              </Section>

              <Text className="text-black text-[14px] leading-[24px]">
                ou copiez et collez ce lien dans votre navigateur :{' '}
                <Link href={url} className="text-stone-500 underline">
                  {url}
                </Link>
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en
              toute sécurité.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ResetPassword
