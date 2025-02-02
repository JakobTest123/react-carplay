import { DongleConfig, TouchAction, CarplayMessage } from 'node-carplay/web'

export type CarplayWorkerMessage = { data: CarplayMessage }

export type KeyCommand = 'left' |
  'right' |
  'selectDown' |
  'selectUp' |
  'back' |
  'down' |
  'home' |
  'play' |
  'pause' |
  'next' |
  'prev'

export type Command =
  | { type: 'stop' }
  | { type: 'start'; payload: Partial<DongleConfig> }
  | { type: 'touch'; payload: { x: number; y: number; action: TouchAction } }
  | { type: 'microphoneInput'; payload: Int16Array }
  | { type: 'frame'}
  | { type: 'keyCommand', command: KeyCommand}

export interface CarPlayWorker
  extends Omit<Worker, 'postMessage' | 'onmessage'> {
  postMessage(message: Command, transfer?: Transferable[]): void
  onmessage: ((this: Worker, ev: CarplayWorkerMessage) => any) | null
}
