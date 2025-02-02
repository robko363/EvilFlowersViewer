import { PDFDocumentProxy } from 'pdfjs-dist'
import { createContext, useContext } from 'react'

interface IDocumentContext {
  pdf?: PDFDocumentProxy
  activePage: number
  nextPage: () => void
  prevPage: () => void
  setPage: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchPage: (n: number) => void
  scale: number
  setScale: (scale: number) => void
  resetScale: () => void
  zoomIn: () => void
  zoomOut: () => void
}

export const DocumentContext = createContext<IDocumentContext | null>(null)

export const useDocumentContext = () => {
  const context = useContext(DocumentContext)

  if (context === null) throw Error('DocumentContext is null.')

  return context
}
