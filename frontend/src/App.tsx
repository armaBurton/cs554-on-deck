// src/App.tsx
// import { AuthProvider } from "./context/authContext";
import { supabase } from "./client/supabaseClient";

export const App = () => {
  // const { user, session } = AuthProvider();

  // if (!session) {
  // return <LoginForm />;
  // }

  return (
    <div>
      {/* <h1>Welcome, {user?.email}</h1> */}
      <h1>On Deck</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  );
};

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
