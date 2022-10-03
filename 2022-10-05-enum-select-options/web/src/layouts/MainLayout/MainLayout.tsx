import { MetaTags } from '@redwoodjs/web'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <MetaTags
        title="How To Use Human Readable Enums in a Form with a SelectList"
        description="How To Use Human Readable Enums in a Form with a SelectList"
        author="David Thyresson"
        ogUrl="https://rw-office-hours-enum-select-list.netlify.app
        ogContentUrl="https://redwoodjs.com/images/rw-og.png"
      />
      {children}
    </>
  )
}

export default MainLayout
