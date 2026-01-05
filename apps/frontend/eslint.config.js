//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import { baseEslintConfig } from '@packages/config/eslint'

const config = await baseEslintConfig()

export default [...config, ...tanstackConfig]
