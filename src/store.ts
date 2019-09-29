import { init, RematchRootState, RematchDispatch } from '@rematch/core'
import createSelectPlugin from '@rematch/select'
import createImmerPlugin from '@rematch/immer'
import models from './models'

const selectPlugin = createSelectPlugin()
const immerPlugin = createImmerPlugin()

export const store = init({
  models,
  plugins: [selectPlugin, immerPlugin],

})

export const { select } = store
export type Store = typeof store
export type Dispatch = RematchDispatch<typeof models>
export type IRootState = RematchRootState<typeof models>
