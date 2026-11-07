import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[100dvh] bg-[#ecdcc1] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="bg-[#FAF5EC]/95 backdrop-blur-sm p-6 sm:p-8 rounded-[24px] shadow-2xl max-w-md w-full border border-white flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
              <img
                src="/assets/logos/honda.svg"
                alt="Honda"
                className="h-6 w-auto object-contain"
              />
            </div>
            <h2 className="text-[#1A2E1A] font-black text-xl sm:text-2xl">
              Ops! Algo inesperado aconteceu.
            </h2>
            <p className="text-[#4b5d4c] font-medium text-sm leading-relaxed">
              Não se preocupe! Toque no botão abaixo para reiniciar o módulo e continuar sua jornada.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-3.5 px-6 rounded-full btn-tactile-green text-white font-black text-base uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              Reiniciar Módulo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
