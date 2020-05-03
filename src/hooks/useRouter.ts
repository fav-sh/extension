import React from 'react'

type Routes = 'main' | 'editor'

const useRouter = () => {
  const [route, setRoute] = React.useState<Routes>('main')

  const navigate = (route: Routes) => setRoute(route)

  return { route, navigate }
}

export default useRouter
