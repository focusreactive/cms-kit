import React from 'react'

interface DefaultBlockImageProps {
  id?: string
}

export const DefaultBlockImage: React.FC<DefaultBlockImageProps> = ({ id = 'default-block-pattern' }) => (
  <svg
    fill="none"
    height="151"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 231 151"
    width="231"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath={`url(#${id})`}>
      <rect fill="#D9D9D9" height="100%" rx="2" width="100%" />
      <rect
        fill="#BCBCBC"
        height="116.063"
        transform="rotate(52.0687 33.7051 79.3051)"
        width="85.8593"
        x="33.7051"
        y="79.3051"
      />
      <rect
        fill="#BCBCBC"
        height="116.063"
        transform="rotate(52.0687 86.1219 92.6272)"
        width="85.8593"
        x="86.1219"
        y="92.6272"
      />
      <circle cx="189" cy="45" fill="#BCBCBC" r="19" />
      <rect fill="#B8B8B8" height="5" rx="2.5" width="98" x="66" y="70" />
      <rect fill="#B8B8B8" height="5" rx="2.5" width="76" x="77" y="82" />
    </g>
    <defs>
      <clipPath id={id}>
        <rect fill="white" height="151" width="231" />
      </clipPath>
    </defs>
  </svg>
)
