export const Recount = ({ scoreDetails }) => {
  return (
    <div className="flex flex-col">
      {scoreDetails.map((player) => {
        return (
          <div className="m-2">
            <p>
              {player.name} : {player.score}/{player.scoreLimit}
            </p>
          </div>
        );
      })}
    </div>
  );
};
