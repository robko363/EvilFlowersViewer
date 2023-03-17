import * as pdfjs from 'pdfjs-dist/legacy/build/pdf'
import { PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf'
import { useEffect, useState } from 'react'

import { DocumentContext } from './DocumentContext'
import Page from '../page/Page'
import BottomBar from '../bottomBar/BottomBar'
import Sidebar from '../sidebar/Sidebar'

interface IDocumentProps {
  data: string
}

const Document = ({ data }: IDocumentProps) => {
  const [activePage, setActivePage] = useState(1)
  const [scale, setScale] = useState(1)
  const [pdf, setPdf] = useState<PDFDocumentProxy>()

  const loadDocument = () => {
    pdfjs.getDocument({ data }).promise.then((doc) => {
      setPdf(doc)
    })
  }

  const downloadDocument = () => {
    const link = document.createElement('a')
    pdf?.getData().then((data) => {
      const blob = new Blob([data], { type: 'application/pdf' })
      link.href = URL.createObjectURL(blob)
      console.log(link.href)
      link.download = 'document.pdf'
      link.click()
    }) 
  }

  const nextPage = () => {
    setActivePage((prevPage) =>
      pdf && pdf?.numPages > prevPage ? prevPage + 1 : prevPage
    )
  }

  const prevPage = () => {
    setActivePage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
  }

  const setPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let page = parseInt(e.target.value)
    if (page < 1) setActivePage(1)
    else if (pdf?.numPages && page > pdf?.numPages) setActivePage(pdf?.numPages)
    else setActivePage(page)
  }

  const zoomIn = () => {
    setScale((prevScale) => prevScale + 0.25)
  }

  const zoomOut = () => {
    setScale((prevScale) => (prevScale > 0.5 ? prevScale - 0.25 : prevScale))
  }

  // Loads the document every time the data changes
  useEffect(() => {
    loadDocument()
  }, [data])

  return (
    <DocumentContext.Provider
      value={{ pdf, activePage, downloadDocument, nextPage, prevPage, setPage, scale, setScale, zoomIn, zoomOut }}
    >
      <Sidebar />
      <Page />
      <BottomBar />
    </DocumentContext.Provider>
  )
}

export default Document
