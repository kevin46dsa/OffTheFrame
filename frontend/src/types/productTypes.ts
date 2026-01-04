export type Product = {
    id: string
    sku: string
    title: string
    description: string
    artist: string
    category: string
    price: number
    isFeatured: boolean
    keywords: string[]
    images: { primary: string, gallery: string[], download: string }
}
