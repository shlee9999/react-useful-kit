import React, { Component } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: '20px',
              border: '2px solid red',
              borderRadius: '8px',
              backgroundColor: '#ffebee',
              color: '#c62828',
            }}
          >
            <h3>🚨 에러 발생!</h3>
            <p>
              <strong>에러 메시지:</strong>
            </p>
            <pre
              style={{
                backgroundColor: '#ffcdd2',
                padding: '10px',
                borderRadius: '4px',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {this.state.error?.message || '알 수 없는 에러'}
            </pre>
            <p style={{ marginTop: '15px', fontSize: '14px' }}>
              이것이 AlertProvider 없이 useAlertModal을 사용했을 때 발생하는 실제 에러입니다.
            </p>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
