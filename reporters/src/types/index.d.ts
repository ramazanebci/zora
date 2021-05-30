import { IAssertionResult } from '../../../assert/src/index';

interface INewTestMessageInput {
  description: string;
  skip: boolean;
}

interface ITestEndMessageInput {
  description: string;
  executionTime: number;
}

interface IMessage<T> {
  type: string;
  data: T;
}

interface INewTestMessage extends IMessage<INewTestMessageInput> {
  type: 'TEST_START';
}

interface IAssertionMessage extends IMessage<IAssertionResult<unknown>> {
  type: 'ASSERTION';
}

interface ITestEndMessage extends IMessage<ITestEndMessageInput> {
  type: 'TEST_END';
}

interface IBailOutMessage extends IMessage<{ error: unknown }> {
  type: 'BAIL_OUT';
}

type Message =
  | IAssertionMessage
  | IBailOutMessage
  | ITestEndMessage
  | INewTestMessage;

export declare function newTestMessage(
  opts: INewTestMessageInput
): INewTestMessage;

export declare function assertionMessage(
  opts: IAssertionResult<unknown>
): IAssertionMessage;

export declare function testEndMessage(
  opts: INewTestMessageInput
): ITestEndMessage;

export declare function errorMessage(opts: { error: unknown }): IBailOutMessage;

interface IReporter {
  (messageStream: AsyncIterable<Message>): Promise<void>;
}

interface ILogOptions {
  log?: (message: any) => void;
  serialize?: (value: any) => string;
}

export declare function createJSONReporter(opts: ILogOptions): IReporter;

export declare function createTAPReporter(opts: ILogOptions): IReporter;

export declare function createDiffReporter(): IReporter;
