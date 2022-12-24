import { Title } from "./components/Title";
import { Counter } from "./components/Counter";

export const App = () => {
  return (
    <div>
      <Title title="Hello" subtitle={"World"} />
      <Counter />
    </div>
  );
};
