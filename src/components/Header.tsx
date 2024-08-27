const Header = ({
  flags,
  gameMode,
  changeGameMode,
}: {
  flags: number;
  gameMode: string;
  changeGameMode: (gameMode: string) => void;
}) => {
  return (
    <div className="header">
      <select
        defaultValue={
          gameMode[0].toUpperCase() + gameMode.slice(1, gameMode.length)
        }
        onChange={(e) => changeGameMode(e.target.value)}
      >
        <option value={"Easy"}>Easy</option>
        <option value={"Medium"}>Medium</option>
        <option value={"Hard"}>Hard</option>
      </select>
      <div className="flags">
        <img src="flag.png" alt="flag" width={25} height={25} />
        <p>{flags}</p>
      </div>
    </div>
  );
};

export default Header;
