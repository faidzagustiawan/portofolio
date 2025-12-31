export function preloadVideo(src) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.src = src
    video.preload = "auto"
    video.muted = true

    video.onloadeddata = () => resolve()
    video.onerror = reject
  })
}