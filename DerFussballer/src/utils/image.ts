export async function fileToImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = url
    await new Promise((res, rej) => {
      img.onload = () => res(true)
      img.onerror = () => rej(new Error('Bild konnte nicht geladen werden'))
    })
    return img
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function resizeToPng1024Square(file: File): Promise<string> {
  const img = await fileToImage(file)
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  // Transparent Hintergrund
  ctx.clearRect(0, 0, size, size)
  // Bild einpassen und mittig platzieren
  const ratio = Math.min(size / img.width, size / img.height)
  const w = Math.round(img.width * ratio)
  const h = Math.round(img.height * ratio)
  const x = Math.round((size - w) / 2)
  const y = Math.round((size - h) / 2)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, x, y, w, h)
  return canvas.toDataURL('image/png')
}