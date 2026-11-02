import React, { ChangeEvent, FunctionComponent } from "react"

type Props = {
  /** What the slider shows: 0 while muted */
  volume: number
  isMuted: boolean
  isBlocked: boolean
  onToggleMute: () => void
  onChangeVolume: (volume: number) => void
}

const AudioControls: FunctionComponent<Props> = (props) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.onChangeVolume(parseFloat(event.target.value))

  const isSoundOff = props.isMuted || props.isBlocked
  const label = isSoundOff ? "Unmute" : "Mute"
  const title = props.isBlocked
    ? "Sound was blocked by your browser. Click to turn it on"
    : label

  return (
    <form id="controls">
      <button
        type="button"
        title={title}
        aria-label={label}
        onClick={props.onToggleMute}
      >
        {isSoundOff ? "🔇" : "🔊"}
      </button>{" "}
      <input
        type="range"
        aria-label="Volume"
        min="0"
        max="1"
        step="0.01"
        value={props.volume}
        onChange={onChange}
      />
    </form>
  )
}

export default AudioControls
