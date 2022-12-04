import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { SocketIoConfig } from './config/socket-io.config'
import { WrappedSocket } from './app/servicos/socket-io.service'; 

/** Socket factory */
export function SocketFactory(config: SocketIoConfig) {
  return new WrappedSocket(config, null)
}

export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>(
  '__SOCKET_IO_CONFIG__'
);

@NgModule({})
export class SocketIoModule {
  static forRoot(config: SocketIoConfig): ModuleWithProviders<SocketIoModule> {
    return {
      ngModule: SocketIoModule,
      providers: [
        { provide: SOCKET_CONFIG_TOKEN, useValue: config },
        {
          provide: WrappedSocket,
          useFactory: SocketFactory,
          deps: [SOCKET_CONFIG_TOKEN],
        },
      ],
    };
  }
}
