interface Props {
  seconds: number;
}

export function Time({ seconds: secondsInput }: Props) {
  const seconds = secondsInput % 60;
  const minutes = ((secondsInput - seconds) / 60) % 60;
  const hours = ((secondsInput - seconds) / 60 - minutes) / 60;

  if (hours === 0) {
    if (minutes === 0) {
      return <>{seconds}s</>;
    } else {
      return (
        <>
          {minutes}:{seconds.toString().padStart(2, "0")}min
        </>
      );
    }
  } else {
    return (
      <>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}h
      </>
    );
  }
}
