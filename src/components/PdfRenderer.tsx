'use client'

import { Loader2 } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useToast } from './ui/use-toast'
import { useResizeDetector } from 'react-resize-detector'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
  url: string
}

export default function PdfRenderer({ url }: PdfRendererProps) {
  const { toast } = useToast()

  const { width, ref } = useResizeDetector()

  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
        <div className="flex items-center gap-1.5">
          <div>PdfRenderer</div>
        </div>

        <div className="max-h-screen w-full">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive'
                })
              }}
              file={url}
              className="max-h-full"
            >
              <Page width={width ? width : 1} pageNumber={1} />
            </Document>
          </div>
        </div>
      </div>
    </div>
  )
}
