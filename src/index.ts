import { SetupServer } from "./app/server";

(async (): Promise<void> => {
  try {
    const server = new SetupServer();
    await server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await server.close();
          console.info(`App exited with success`);
          process.exit();
        } catch (error) {
          console.error(`App exited with error: ${error}`);
          process.exit();
        }
      });
    }
  } catch (error) {
    console.error(`App exited with error: ${error}`);
    process.exit();
  }
})();
