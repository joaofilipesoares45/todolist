import { DataProvider } from "./context/DataContext"
import RouterApp from "./Routes"

function App() {
  return (
    <DataProvider>
      <RouterApp/>
    </DataProvider>
  )
}

export default App
