export interface ICommand
{
    Execute(from: string, to: string, message: string): void;
}
