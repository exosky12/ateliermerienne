<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query'

const { $tuyau } = useNuxtApp()

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

type FormField = keyof typeof form
type FieldErrors = Partial<Record<FormField, string>>

const errorMessage = ref('')
const successMessage = ref('')
const fieldErrors = reactive<FieldErrors>({})

function resetErrors() {
  errorMessage.value = ''
  successMessage.value = ''
  fieldErrors.fullName = undefined
  fieldErrors.email = undefined
  fieldErrors.password = undefined
  fieldErrors.passwordConfirmation = undefined
}

function mapVineErrors(error: any) {
  const messages = error?.response?.data?.errors ?? error?.response?.errors ?? error?.errors

  if (!Array.isArray(messages)) {
    errorMessage.value = error?.message || 'Erreur pendant la création du compte.'
    return
  }

  for (const issue of messages) {
    const field = issue?.field as FormField | undefined
    const message = issue?.message as string | undefined
    if (!field || !message) continue
    if (field in form) {
      fieldErrors[field] = message
    }
  }

  if (
    !fieldErrors.fullName &&
    !fieldErrors.email &&
    !fieldErrors.password &&
    !fieldErrors.passwordConfirmation
  ) {
    errorMessage.value = error?.message || 'Erreur de validation.'
  }
}

const registerMutation = useMutation(
  $tuyau.auth.register.mutationOptions({
    onSuccess: () => {
      successMessage.value = 'Compte créé avec succès.'
      form.fullName = ''
      form.email = ''
      form.password = ''
      form.passwordConfirmation = ''
    },
    onError: (error) => {
      mapVineErrors(error)
    },
  })
)

async function submit() {
  resetErrors()
  try {
    await registerMutation.mutateAsync({
      body: {
        fullName: form.fullName.trim() ? form.fullName.trim() : null,
        email: form.email.trim(),
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
      },
    })
  } catch {
    // handled by onError
  }
}
</script>

<template>
  <main class="mx-auto min-h-screen max-w-md p-6 flex items-center">
    <UCard class="w-full">
      <template #header>
        <h1 class="text-xl font-semibold">Créer un compte</h1>
      </template>

      <form class="space-y-4" @submit.prevent="submit">
        <UFormField label="Nom complet (optionnel)" name="fullName" :error="fieldErrors.fullName">
          <UInput v-model="form.fullName" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email" :error="fieldErrors.email">
          <UInput v-model="form.email" type="email" class="w-full" />
        </UFormField>

        <UFormField label="Mot de passe" name="password" :error="fieldErrors.password">
          <UInput v-model="form.password" type="password" class="w-full" />
        </UFormField>

        <UFormField
          label="Confirmation du mot de passe"
          name="passwordConfirmation"
          :error="fieldErrors.passwordConfirmation"
        >
          <UInput v-model="form.passwordConfirmation" type="password" class="w-full" />
        </UFormField>

        <UButton type="submit" :loading="registerMutation.isPending.value">
          Créer le compte
        </UButton>

        <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-sm text-green-700">{{ successMessage }}</p>
      </form>
    </UCard>
  </main>
</template>
