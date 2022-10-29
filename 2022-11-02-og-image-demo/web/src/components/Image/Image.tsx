const Image = ({ image }) => {
  return (
    <div className="border-1 rounded-md bg-gray-50 p-4 shadow-md">
      <h3 className="mb-4 text-xl">{image.name}</h3>
      <div className="align-center mb-4 flex justify-center">
        <img src={image.src} className="h-48" />
      </div>
      <p className="text-md text-gray-500">{image.path}</p>
    </div>
  )
}

export default Image
