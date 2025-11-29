import info from "../data/information.json";
import ProfilCard from "../components/ProfilCard";

export default function Etudiant() {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {info.map((user, index) => (
        <ProfilCard key={index} data={user} />
      ))}
    </div>
  );
}
