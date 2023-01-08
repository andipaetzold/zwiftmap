interface Props {
  number: number;
}

export function MarkerIcon({ number }: Props) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 31 48">
      <g transform="matrix(0.0881867,0,0,0.0881867,-0.62934,-0.679037)">
        <path
          d="M182.9,551.7C182.9,551.8 183.1,552 183.1,552C183.1,552 358.3,283 358.3,194.6C358.3,64.5 269.5,7.9 182.9,7.7C96.3,7.9 7.5,64.5 7.5,194.6C7.5,283 182.8,552 182.8,552L182.9,551.7Z"
          style={{ fill: "#2196F3" }}
        />
      </g>
      <text
        x="15"
        y="26"
        style={{ fontSize: "24px", fontFamily: "Roboto", fill: "white" }}
        textAnchor="middle"
      >
        {number}
      </text>
    </svg>
  );
}

export function getMarkerIconAsDataUrl(text: number | string = '') {
  return `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 31 48' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'%3E%3Cg transform='matrix(0.0881867,0,0,0.0881867,-0.62934,-0.679037)'%3E%3Cpath d='M182.9,551.7C182.9,551.8 183.1,552 183.1,552C183.1,552 358.3,283 358.3,194.6C358.3,64.5 269.5,7.9 182.9,7.7C96.3,7.9 7.5,64.5 7.5,194.6C7.5,283 182.8,552 182.8,552L182.9,551.7Z' style='fill:%232196F3' /%3E%3C/g%3E%3Ctext x='15' y='26' style='font-size: 24px; font-family: Roboto; fill: white' text-anchor='middle'%3E${text}%3C/text%3E%3C/svg%3E`;
}
