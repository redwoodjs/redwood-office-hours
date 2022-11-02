import ImageCell from 'src/components/ImageCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const ImagePage = ({ id }: { id: number }) => {
  return (
    <MainLayout>
      <ImageCell id={id} />
    </MainLayout>
  )
}

export default ImagePage
