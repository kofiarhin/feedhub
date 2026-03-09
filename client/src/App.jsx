import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const getHealth = async () => {
      const url = import.meta.env.VITE_API_URL;
      const res = await fetch(url);
      console.log(res.ok);
    };
    getHealth();
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
