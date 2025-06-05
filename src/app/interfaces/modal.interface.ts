export interface ModalMessage {
  type: 'success' | 'delete' | 'info' | 'warning';
  title: string;
  message: string;
}
