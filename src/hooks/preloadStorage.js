const PRELOAD_KEY = 'app_assets_preloaded_v1'

export const hasPreloadedAssets = () => {
  return localStorage.getItem(PRELOAD_KEY) === 'true'
}

export const markAssetsPreloaded = () => {
  localStorage.setItem(PRELOAD_KEY, 'true')
}
