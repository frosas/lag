import React, { useState, FunctionComponent, ChangeEvent } from "react";

type Props = {
  initialVolume: number;
  onChangeVolume: (volume: number) => void;
};

const Component: FunctionComponent<Props> = props => {
  const [volume, setVolume] = useState(props.initialVolume);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    setVolume(volume);
    props.onChangeVolume(volume);
  };

  return (
    <form id="controls">
      Volume{" "}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onChange}
      />
    </form>
  );
};

export default Component;
