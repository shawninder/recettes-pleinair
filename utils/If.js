export default function If ({ present, render, map }) {
  const act = map ? () => present.map(map) : render
  return present ? act() : null
}
