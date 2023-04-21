import { createPinia } from "pinia"
const store = createPinia()
import useLargeScreenStore from './modules/largeScreen'
export default function useStore() {
  return {
    largeScreen: useLargeScreenStore()
  }
}
export { store }

