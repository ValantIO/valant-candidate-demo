import { LoggingService } from './logging.service';

export class SilentLogger implements LoggingService {
  public log(): void {}
  public error(): void {}
}
