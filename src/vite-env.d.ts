/// <reference types="vite/client" />

declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.css' {
  const content: string
  export default content
}
