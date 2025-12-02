import { useParams } from 'react-router-dom'

/**
 * Project detail page - Individual project showcase
 */
function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-jet sm:text-4xl">
          Project: {slug}
        </h1>
        <p className="mt-4 text-lg text-slate">
          This page is under development.
        </p>
      </div>
    </div>
  )
}

export default ProjectDetailPage
