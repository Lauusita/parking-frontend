export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  end?: boolean;
  duration?: number; // Duración en milisegundos (opcional)
}
