import { environments } from "../constant";
import EnvironmentCard from "./EnvironmentCard";

export default function Environment() {
  return (
    <div className="my-4 flex flex-wrap justify-center gap-y-4">
      {environments.map((environment) => (
        <EnvironmentCard key={environment.name} environment={environment} />
      ))}
    </div>
  );
}
