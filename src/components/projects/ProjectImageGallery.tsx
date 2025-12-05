import { useState } from 'react'

// Vite glob import for all project images
const projectImages = import.meta.glob<{ default: string }>(
  '@/assets/images/projects/*.jpg',
  { eager: true }
)

/**
 * Get the resolved image URL for a filename
 */
function getImageUrl(filename: string): string | undefined {
  const key = Object.keys(projectImages).find((path) => path.endsWith(filename))
  return key ? projectImages[key].default : undefined
}

interface ProjectImageGalleryProps {
  images: string[]
  projectTitle: string
}

/**
 * Image gallery component for project screenshots
 * Shows thumbnails with a larger selected image view
 */
export function ProjectImageGallery({
  images,
  projectTitle,
}: ProjectImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className='flex aspect-video items-center justify-center rounded-md border border-silver/50 bg-silver/10'>
        <p className='text-slate'>No screenshots available</p>
      </div>
    )
  }

  const selectedImage = getImageUrl(images[selectedIndex])

  return (
    <div className='space-y-4'>
      {/* Main Image */}
      <div className='overflow-hidden rounded-md border border-silver/50 bg-silver/10'>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={`${projectTitle} screenshot ${selectedIndex + 1} of ${images.length}`}
            className='aspect-video w-full object-cover object-top'
          />
        ) : (
          <div className='flex aspect-video items-center justify-center'>
            <p className='text-slate'>Image not found</p>
          </div>
        )}
      </div>

      {/* Thumbnails - only show if more than 1 image */}
      {images.length > 1 && (
        <div
          className='flex gap-2 overflow-x-auto pb-2'
          role='tablist'
          aria-label='Screenshot thumbnails'
        >
          {images.map((filename, index) => {
            const thumbUrl = getImageUrl(filename)
            const isSelected = index === selectedIndex

            return (
              <button
                key={filename}
                onClick={() => setSelectedIndex(index)}
                role='tab'
                aria-selected={isSelected}
                aria-label={`View screenshot ${index + 1}`}
                className={`relative flex-shrink-0 overflow-hidden rounded border-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${
                  isSelected
                    ? 'border-coral'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt=''
                    aria-hidden='true'
                    className='h-16 w-24 object-cover object-top sm:h-20 sm:w-32'
                  />
                ) : (
                  <div className='flex h-16 w-24 items-center justify-center bg-silver/20 sm:h-20 sm:w-32'>
                    <span className='text-xs text-slate'>{index + 1}</span>
                  </div>
                )}
                {isSelected && (
                  <div className='absolute inset-0 border-2 border-coral' />
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Image counter */}
      <p className='text-center text-sm text-slate'>
        {selectedIndex + 1} / {images.length}
      </p>
    </div>
  )
}

