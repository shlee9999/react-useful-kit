import.meta.glob('./examples/*.meta.ts', { eager: true })
import.meta.glob('./examples/*.tsx', { eager: true })

type ExampleMeta = {
  title: string
  description: string
  buttonText: string
}

const exampleMetas = import.meta.glob('./*/meta.ts', { eager: true }) as Record<string, { default: ExampleMeta }>
const exampleComponents = import.meta.glob('./*/example.tsx', { eager: true }) as Record<
  string,
  { default: () => React.ReactNode }
>

const examples: Record<string, ExampleMeta & { component: () => React.ReactNode }> = {}

// meta 파일들 처리
Object.entries(exampleMetas).forEach(([key, value]) => {
  const exampleName = key.replace('./', '').replace('/meta.ts', '')
  examples[exampleName] = { ...value.default, component: () => null }
})

// component 파일들 처리
Object.entries(exampleComponents).forEach(([key, value]) => {
  const exampleName = key.replace('./', '').replace('/example.tsx', '')
  if (examples[exampleName]) {
    examples[exampleName].component = value.default
  }
})

export default examples
