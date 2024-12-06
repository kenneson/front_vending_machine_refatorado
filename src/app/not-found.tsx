import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">🚧</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Página em Construção</h2>
        <p className="text-lg text-gray-600 mb-8">
          Desculpe, esta página ainda está sendo desenvolvida. Volte em breve!
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}
