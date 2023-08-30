interface Props {
  label?: string;
  fill?: string;
}

export function MarkerIcon({ label, fill = "#2196F3" }: Props) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 31 48">
      <g transform="matrix(0.0881867,0,0,0.0881867,-0.62934,-0.679037)">
        <path
          d="M182.9,551.7C182.9,551.8 183.1,552 183.1,552C183.1,552 358.3,283 358.3,194.6C358.3,64.5 269.5,7.9 182.9,7.7C96.3,7.9 7.5,64.5 7.5,194.6C7.5,283 182.8,552 182.8,552L182.9,551.7Z"
          style={{ fill }}
        />
      </g>
      <text
        x="15"
        y="26"
        style={{ fontSize: "24px", fontFamily: "Roboto", fill: "white" }}
        textAnchor="middle"
      >
        {label}
      </text>
    </svg>
  );
}

export function getMarkerIconAsDataUrl({ label, fill = "#2196F3" }: Props) {
  if (label) {
    return `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 31 48' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'%3E%3Cg transform='matrix(0.0881867,0,0,0.0881867,-0.62934,-0.679037)'%3E%3Cpath d='M182.9,551.7C182.9,551.8 183.1,552 183.1,552C183.1,552 358.3,283 358.3,194.6C358.3,64.5 269.5,7.9 182.9,7.7C96.3,7.9 7.5,64.5 7.5,194.6C7.5,283 182.8,552 182.8,552L182.9,551.7Z' style='fill:${encodeURIComponent(
      fill,
    )}' /%3E%3C/g%3E%3Ctext x='15' y='26' style='font-size: 24px; font-family: Roboto; fill: white' text-anchor='middle'%3E${label}%3C/text%3E%3C/svg%3E`;
  } else {
    return `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 31 48' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'%3E%3Cg transform='matrix(0.0881867,0,0,0.0881867,-0.62934,-0.679037)'%3E%3Cpath d='M182.9,551.7C182.9,551.8 183.1,552 183.1,552C183.1,552 358.3,283 358.3,194.6C358.3,64.5 269.5,7.9 182.9,7.7C96.3,7.9 7.5,64.5 7.5,194.6C7.5,283 182.8,552 182.8,552L182.9,551.7Z' style='fill:${encodeURIComponent(
      fill,
    )}' /%3E%3Cpath d='M122.2,187.2C122.2,153.6 149.4,126.4 183,126.4C216.6,126.4 243.8,153.6 243.8,187.2C243.8,220.8 216.5,248 182.9,248C149.4,248 122.2,220.8 122.2,187.2Z' style='fill:rgb(256,256,256)' /%3E%3C/g%3E%3C/svg%3E`;
  }
}
