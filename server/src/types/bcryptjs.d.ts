declare module 'bcryptjs' {
  export function hash(data: string, salt: number): Promise<string>;
  export function hash(data: string, salt: number, callback: (err: Error | null, hash: string) => void): void;

  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function compare(data: string, encrypted: string, callback: (err: Error | null, same: boolean) => void): void;

  export function genSalt(saltRounds: number): Promise<string>;
  export function genSalt(saltRounds: number, callback: (err: Error | null, salt: string) => void): void;
}
